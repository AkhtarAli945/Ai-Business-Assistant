import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    userId: { type: String, default: "demo-user", index: true },
    role: { type: String, enum: ["user", "assistant"], required: true },
    content: { type: String, required: true },
    citations: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("ChatMessage", chatMessageSchema);
