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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = await parseBody(req);
  const { name = '', email = '', phone = '', message = '' } = body || {};

  if (!name.trim() || !email.trim() || !phone.trim()) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }

  const provider = (process.env.NOTIFY_PROVIDER || 'pushover').toLowerCase();

  try {
    if (provider === 'pushover') {
      const token = process.env.PUSHOVER_APP_TOKEN;
      const user = process.env.PUSHOVER_USER_KEY;
      if (!token || !user) {
        return res.status(500).json({ ok: false, error: 'Pushover not configured' });
      }

      const payload = new URLSearchParams({
        token,
        user,
        title: `New portfolio message from ${name}`,
        message: `Email: ${email}\nPhone: ${phone}\n\nNotes: ${message || '—'}`,
      });

      const response = await fetch('https://api.pushover.net/1/messages.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });

      if (!response.ok) {
        const text = await response.text();
        return res.status(502).json({ ok: false, error: text || 'Pushover failed' });
      }

      return res.status(200).json({ ok: true });
    }

    if (provider === 'ntfy') {
      const topic = process.env.NTFY_TOPIC;
      const server = process.env.NTFY_SERVER || 'https://ntfy.sh';
      if (!topic) {
        return res.status(500).json({ ok: false, error: 'ntfy not configured' });
      }

      const response = await fetch(`${server}/${topic}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Title': `New portfolio message from ${name}`,
        },
        body: `Email: ${email}\nPhone: ${phone}\n\nNotes: ${message || '—'}`,
      });

      if (!response.ok) {
        const text = await response.text();
        return res.status(502).json({ ok: false, error: text || 'ntfy failed' });
      }

      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ ok: false, error: 'Unknown provider' });
  } catch (error) {
    return res.status(500).json({ ok: false, error: 'Notification failed' });
  }
}
