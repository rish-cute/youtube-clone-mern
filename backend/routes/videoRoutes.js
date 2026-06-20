import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createVideo,
  getAllVideos,
  getVideoById,
} from "../controllers/videoController.js";
const router = express.Router();

// Upload a video
router.post("/", protect, createVideo);
// Get all videos
router.get("/", getAllVideos);
// Get single video
router.get("/:id", getVideoById);

export default router;