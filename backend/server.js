import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Enable CORS for frontend requests
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Channel routes
app.use("/api/channels", channelRoutes);

// Video routes
app.use("/api/videos", videoRoutes);

// Comment routes
app.use("/api/comments", commentRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "YouTube Clone API Running",
  });
});

const PORT = process.env.PORT || 5000;

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
