import express from "express";
import { retrieveRelevantChunks, buildContextBlock } from "../services/ragService.js";
import { askLLM } from "../services/llmService.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

const REPORT_PROMPT = `You are Vantra, an internal AI business assistant. Write a clear,
well-structured business report in Markdown (with headings) covering the requested focus area,
based on the provided context. If context is thin, note that and keep the report concise rather
than inventing facts.`;

// POST /api/reports/generate  { focus, dateFrom, dateTo }
router.post("/generate", async (req, res) => {
  try {
    const { focus, dateFrom, dateTo } = req.body;
    if (!focus) return res.status(400).json({ error: "focus is required" });

    const chunks = await retrieveRelevantChunks(req.userId, focus, 8);
    const context = buildContextBlock(chunks);

    const rangeNote =
      dateFrom && dateTo ? `Date range requested: ${dateFrom} to ${dateTo}.` : "No specific date range given.";

    const report = await askLLM([
      { role: "system", content: REPORT_PROMPT },
      {
        role: "user",
        content: `Focus area: ${focus}\n${rangeNote}\n\nContext:\n${context}`,
      },
    ]);

    res.json({ report, sources: [...new Set(chunks.map((c) => c.source))] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
