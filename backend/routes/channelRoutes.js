import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createChannel,
  getChannelById,
} from "../controllers/channelController.js";
const router = express.Router();

// Create a channel
router.post("/", protect, createChannel);
// Get channel details
router.get("/:id", getChannelById);

export default router;