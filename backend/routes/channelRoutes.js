import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createChannel } from "../controllers/channelController.js";

const router = express.Router();

// Create a channel
router.post("/", protect, createChannel);

export default router;