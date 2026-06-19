import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verify JWT token and protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if authorization header contains a bearer token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user information to request object
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      res.status(401).json({
        message: "Not authorized, token missing",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

export default protect;