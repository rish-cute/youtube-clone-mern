import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createVideo } from "../controllers/videoController.js";

const router = express.Router();

// Upload a video
router.post("/", protect, createVideo);

export default router;