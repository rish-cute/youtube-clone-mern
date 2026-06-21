import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  searchVideos,
  filterVideosByCategory,
} from "../controllers/videoController.js";

const router = express.Router();

// Upload a video
router.post("/", protect, createVideo);

// Search videos
router.get("/search", searchVideos);

// Filter videos by category
router.get("/category/:category", filterVideosByCategory);

// Get all videos
router.get("/", getAllVideos);

// Get single video
router.get("/:id", getVideoById);

// Update video
router.put("/:id", protect, updateVideo);

// Delete video
router.delete("/:id", protect, deleteVideo);

export default router;