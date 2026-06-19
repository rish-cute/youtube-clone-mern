import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";

dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);

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
