import express from "express";
import multer from "multer";
import Document from "../models/Document.js";
import { chunkText, embedText } from "../services/embeddingService.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/documents
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.userId }).select("fileName sourceType createdAt");
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/documents/upload  (multipart form: file)
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const text = req.file.buffer.toString("utf-8");
    const rawChunks = chunkText(text);

    const chunks = [];
    for (const chunkStr of rawChunks) {
      const embedding = await embedText(chunkStr);
      chunks.push({ text: chunkStr, embedding });
    }

    const doc = await Document.create({
      userId: req.userId,
      fileName: req.file.originalname,
      chunks,
    });

    res.json({ id: doc._id, fileName: doc.fileName, chunkCount: chunks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/documents/:id
router.delete("/:id", async (req, res) => {
  try {
    await Document.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
