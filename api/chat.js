import profile from '../src/config/profile.js';

const parseBody = async (req) => {
  if (req.body) return req.body;
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const buildContext = () => {
  const {
    name,
    title,
    summary,
    location,
    availability,
    email,
    phone,
    githubUrl,
    linkedInUrl,
    education,
    experience,
    projects,
    skills,
    activities,
  } = profile;

  return [
    `Name: ${name}`,
    `Title: ${title}`,
    `Summary: ${summary}`,
    `Location: ${location}`,
    `Availability: ${availability}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `GitHub: ${githubUrl}`,
    `LinkedIn: ${linkedInUrl}`,
    '',
    'Education:',
    ...(education || []).map((e) => `- ${e.school} — ${e.degree} (${e.year})`),
    '',
    'Experience:',
    ...(experience || []).map(
      (e) =>
        `- ${e.role} @ ${e.org} (${e.dates}) | ${e.bullets?.slice(0, 2).join(' ') || ''}`
    ),
    '',
    'Projects:',
    ...(projects || []).map(
      (p) =>
        `- ${p.title} (${p.date}) | ${p.summary || ''} | ${p.bullets?.slice(0, 2).join(' ')}`
    ),
    '',
    'Skills:',
    `- Languages: ${(skills?.languages || []).join(', ')}`,
    `- Frameworks/Libraries: ${(skills?.frameworks || []).join(', ')}`,
    `- Databases/Cloud: ${(skills?.databasesCloud || []).join(', ')}`,
    `- Tools: ${(skills?.tools || []).join(', ')}`,
    `- Professional: ${(skills?.professional || []).join(', ')}`,
    '',
    'Activities:',
    ...(activities || []).map(
      (a) => `- ${a.org} (${a.dates}) | ${(a.bullets || []).join('; ')}`
    ),
  ].join('\n');
};

const extractText = (data) => {
  if (!data) return '';
  if (data.output_text) return data.output_text;
  const output = data.output || [];
  const parts = output.flatMap((item) => item.content || []);
  return parts
    .map((part) => part.text || part.value || '')
    .filter(Boolean)
    .join('');
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = await parseBody(req);
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const question = String(body.question || '').trim();

  const inputMessages = [
    ...messages.slice(-8).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 2000),
    })),
  ];
  if (question) {
    inputMessages.push({ role: 'user', content: question });
  }

  if (inputMessages.length === 0) {
    return res.status(400).json({ ok: false, error: 'No message provided' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ ok: false, error: 'OpenAI API key not configured' });
  }

  const instructions = `You are the assistant for Manit Dankhara's portfolio website.
Answer ONLY using the portfolio data below. If the answer is not in the data, say:
"I don't have that information in the portfolio yet. You can reach out at ${profile.email}."
Keep answers concise, friendly, and helpful.

PORTFOLIO DATA:
${buildContext()}
`;

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        instructions,
        input: inputMessages,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ ok: false, error: text || 'OpenAI request failed' });
    }

    const data = await response.json();
    const reply = extractText(data) || 'Sorry, I could not generate a response.';
    return res.status(200).json({ ok: true, reply });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Chat request failed' });
  }
}
