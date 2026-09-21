import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
  text: { type: String, required: true },
  embedding: { type: [Number], required: true },
});

const documentSchema = new mongoose.Schema(
  {
    userId: { type: String, default: "demo-user", index: true },
    fileName: { type: String, required: true },
    sourceType: { type: String, default: "upload" },
    chunks: { type: [chunkSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
