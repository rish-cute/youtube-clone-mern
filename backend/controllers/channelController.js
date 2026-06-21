import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;

    // Validate required field
    if (!channelName) {
      return res.status(400).json({
        message: "Channel name is required",
      });
    }

    // Check if user already owns a channel
    const existingChannel = await Channel.findOne({
      owner: req.user._id,
    });

    if (existingChannel) {
      return res.status(400).json({
        message: "User already owns a channel",
      });
    }

    // Create channel
    const channel = await Channel.create({
      channelName,
      description,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Channel created successfully",
      channel,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get channel details by ID
export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate("owner", "username email");

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    const videos = await Video.find({
      channel: channel._id,
    });

    res.status(200).json({
      channel,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};