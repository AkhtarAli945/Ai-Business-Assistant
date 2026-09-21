// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import authRoutes from "./routes/auth.js";
// import chatRoutes from "./routes/chat.js";
// import documentRoutes from "./routes/documents.js";
// import meetingRoutes from "./routes/meetings.js";
// import reportRoutes from "./routes/reports.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: "10mb" }));

// app.use("/api/auth", authRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/documents", documentRoutes);
// app.use("/api/meetings", meetingRoutes);
// app.use("/api/reports", reportRoutes);

// app.get("/api/health", (req, res) => {
//   res.json({ status: "ok", service: "vantra-backend" });
// });

// const PORT = process.env.PORT || 5000;

// async function start() {
//   try {
//     if (process.env.MONGODB_URI) {
//       await mongoose.connect(process.env.MONGODB_URI);
//       console.log("MongoDB connected");
//     } else {
//       console.warn("No MONGODB_URI set — running without persistence.");
//     }
//     app.listen(PORT, () => console.log(`Vantra backend running on port ${PORT}`));
//   } catch (err) {
//     console.error("Failed to start server:", err.message);
//     process.exit(1);
//   }
// }

// start();




import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";
import documentRoutes from "./routes/documents.js";
import meetingRoutes from "./routes/meetings.js";
import reportRoutes from "./routes/reports.js";

dotenv.config();

const app = express();

// In production, set CORS_ORIGIN to your deployed Vercel URL (e.g. https://your-app.vercel.app).
// Left unset, it allows all origins — fine for local development.
const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors(corsOrigin ? { origin: corsOrigin } : {}));

app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/reports", reportRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "vantra-backend" });
});

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MongoDB connected");
    } else {
      console.warn("No MONGODB_URI set — running without persistence.");
    }
    app.listen(PORT, () => console.log(`Vantra backend running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

start();
