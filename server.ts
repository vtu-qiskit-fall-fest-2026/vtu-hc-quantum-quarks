import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the explanation assistant inside QuantumPilot, a tool that helps complete beginners understand quantum circuit results. You will receive JSON with: title, description, shots, noise_source, ideal_counts, noisy_counts, gap_percent and label. Reply in exactly three sections with these headings: **What happened** (2-3 sentences: what the circuit does in plain English and what the ideal counts show), **Why results differ** (2-3 sentences: compare the ideal and noisy counts using the actual numbers; explain that the noisy run is a SIMULATION of an imperfect machine where gates and readout make small mistakes; do not claim a specific physical cause and do not say this is real hardware), **What to try next** (2 bullets: one change to try, such as more shots or the other example). Rules: use simple words, define any quantum term in brackets the first time you use it, use only the numbers in the JSON, never invent values, and keep the whole reply under 150 words.`;

app.post('/api/explain', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) {
      return res.status(400).json({ error: 'Missing payload for explanation' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: JSON.stringify(payload),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const explanation = response.text || '';
    return res.json({ explanation });
  } catch (error: any) {
    console.error('Error generating quantum explanation:', error);
    return res.status(500).json({
      error: error?.message || 'Unable to generate beginner AI explanation. Please try again.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`QuantumPilot server listening on port ${PORT}`);
  });
}

startServer();
