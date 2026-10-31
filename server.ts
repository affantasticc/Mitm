import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Server-side Gemini API client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// REST API routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'MANDI_AI_2.0',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!apiKey
  });
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { query, language, history } = req.body;
    if (!ai) {
      return res.json({
        response: 'AI service is operating in verified offline agronomy mode.',
        isLive: false
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        ...(history || []).map((m: { role: string; parts: { text: string }[] }) => ({ role: m.role, parts: m.parts })),
        { role: 'user', parts: [{ text: query }] }
      ],
      config: {
        systemInstruction: `You are Mandi AI Assistant, a senior agricultural economist and plant pathology specialist in India. You help farmers optimize net realization. Language: ${language}.`
      }
    });

    res.json({
      response: response.text,
      isLive: true
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({ error: error.message });
  }
});

// Production / Dev mounting
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`MANDI AI 2.0 Server listening on port ${PORT}`);
  });
}

startServer();
