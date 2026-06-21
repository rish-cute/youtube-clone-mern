import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  addComment,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Add comment
router.post("/:videoId", protect, addComment);

// Get comments by video
router.get("/:videoId", getCommentsByVideo);

// Update comment
router.put("/:commentId", protect, updateComment);

// Delete comment
router.delete("/:commentId", protect, deleteComment);

export default router;
