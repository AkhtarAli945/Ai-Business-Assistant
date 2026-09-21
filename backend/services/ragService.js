import Document from "../models/Document.js";
import { embedText, cosineSimilarity } from "./embeddingService.js";

/**
 * Retrieve the top-k most relevant chunks across all of a user's documents
 * for a given query, using local embeddings + cosine similarity (free — no vector DB needed).
 */
export async function retrieveRelevantChunks(userId, query, topK = 5) {
  const queryEmbedding = await embedText(query);
  const docs = await Document.find({ userId }).lean();

  const scored = [];
  for (const doc of docs) {
    for (const chunk of doc.chunks) {
      const score = cosineSimilarity(queryEmbedding, chunk.embedding);
      scored.push({ score, text: chunk.text, source: doc.fileName });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

export function buildContextBlock(chunks) {
  if (!chunks.length) return "No relevant internal documents were found for this query.";
  return chunks
    .map((c, i) => `[Source ${i + 1}: ${c.source}]\n${c.text}`)
    .join("\n\n---\n\n");
}
