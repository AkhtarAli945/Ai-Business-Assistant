import express from "express";
import { askLLM } from "../services/llmService.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

const SUMMARY_PROMPT = `You are Vantra, an internal AI business assistant. Summarize the meeting
transcript into structured JSON with exactly this shape:
{
  "keyTopics": ["..."],
  "decisions": ["..."],
  "actionItems": [{ "task": "...", "owner": "...", "dueDate": "..." }]
}
If an owner or due date isn't mentioned, use "Unassigned" or "Not specified". Return ONLY the JSON object.`;

// POST /api/meetings/summarize  { transcript }
router.post("/summarize", async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript || transcript.trim().length < 20) {
      return res.status(400).json({ error: "Please provide a transcript of at least a few sentences." });
    }

    const raw = await askLLM(
      [
        { role: "system", content: SUMMARY_PROMPT },
        { role: "user", content: transcript },
      ],
      { jsonMode: true }
    );

    const summary = JSON.parse(raw);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
