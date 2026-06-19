import Channel from "../models/Channel.js";

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