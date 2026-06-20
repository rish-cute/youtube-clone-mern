import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// Create a new video
export const createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !thumbnailUrl ||
      !videoUrl ||
      !category
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Find user's channel
    const channel = await Channel.findOne({
      owner: req.user._id,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found. Create a channel first",
      });
    }

    // Create video
    const video = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channel: channel._id,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channel", "channelName")
      .populate("owner", "username");

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};