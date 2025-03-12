require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const OpenAI = require("openai");  // ✅ FIXED OpenAI import

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/', limits: { fileSize: 10 * 1024 * 1024 } });

// OpenAI API Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ FIXED OpenAI Initialization
});

// Upload Endpoint
app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

        const filePath = req.file.path;
        let resumeText = '';

        // Extract text from PDF
        if (req.file.mimetype === 'application/pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const pdfData = await pdfParse(dataBuffer);
            resumeText = pdfData.text;
        } else {
            return res.status(400).json({ error: 'Unsupported file format. Use PDF.' });
        }

        // Split text into bullet points
        const lines = splitIntoBullets(resumeText);

        // Analyze Each Bullet Point
        const analysisResults = [];
        for (let line of lines) {
            if (line.trim() === '') continue;

            const aiResult = await getAiFeedback(line);
            analysisResults.push({
                original: line,
                feedback: aiResult.feedback,
                rewrite: aiResult.rewrite,
            });
        }

        fs.unlinkSync(filePath); // Remove uploaded file
        return res.json({ analysis: analysisResults });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Function to split text into bullet points
function splitIntoBullets(text) {
    return text.split(/\r?\n|\u2022|\u2023|\u25E6/).map((l) => l.trim());
}

// Function to Get AI Feedback from OpenAI
async function getAiFeedback(line) {
    console.log("🔑 Sending request to OpenAI for:", line);

    const prompt = `You are an expert resume reviewer. The user provided a resume bullet: "${line}".
    1. Analyze and give feedback on what's missing or could be improved.
    2. Rewrite it using strong action verbs, measurable impact, and clear structure.
    Return JSON: {"feedback": "...", "rewrite": "..."}`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",  // ✅ Use this if gpt-4 is not available
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
            temperature: 0.7,
        });

        console.log("✅ OpenAI Response:", response.choices[0].message.content);

        let parsed;
        try {
            parsed = JSON.parse(response.choices[0].message.content);
        } catch (e) {
            parsed = { feedback: response.choices[0].message.content, rewrite: "" };
        }

        return parsed;
    } catch (error) {
        console.error("⚠️ OpenAI API Error:", error.response?.data || error.message);
        return { feedback: "Error getting AI feedback", rewrite: "" };
    }
}

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));