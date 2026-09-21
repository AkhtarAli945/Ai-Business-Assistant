import express from "express";
import ChatMessage from "../models/ChatMessage.js";
import { retrieveRelevantChunks, buildContextBlock } from "../services/ragService.js";
import { askLLM } from "../services/llmService.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

const SYSTEM_PROMPT = `You are Vantra, an internal AI business assistant. Answer the user's
question using ONLY the provided context from company documents when it's relevant. If the
context doesn't contain the answer, say so plainly and answer from general knowledge instead,
making clear you're doing so. Keep answers concise and cite sources like [Source 1] where you
use them.`;

// GET /api/chat/history
router.get("/history", async (req, res) => {
  try {
    const history = await ChatMessage.find({ userId: req.userId }).sort({ createdAt: 1 }).limit(100);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/chat  { message }
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    await ChatMessage.create({ userId: req.userId, role: "user", content: message });

    const chunks = await retrieveRelevantChunks(req.userId, message, 5);
    const context = buildContextBlock(chunks);

    const reply = await askLLM([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Context:\n${context}\n\nQuestion: ${message}` },
    ]);

    const citations = [...new Set(chunks.map((c) => c.source))];
    await ChatMessage.create({ userId: req.userId, role: "assistant", content: reply, citations });

    res.json({ reply, citations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
