import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createVideo,
  getAllVideos,
} from "../controllers/videoController.js";

const router = express.Router();

// Upload a video
router.post("/", protect, createVideo);
// Get all videos
router.get("/", getAllVideos);

export default router;