import jwt from "jsonwebtoken";
import User from '../models/User.js'

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers?.authorization && req.headers?.authorization?.split(" ")[1]);
    if (!token) {
      return res.status(401).json({ message: "Authorization required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find the user associated with the token
    const user = await User.findById(decoded.userId, "-password");
    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    // Attach user to request object and proceed
    req.user = user;
    next();
  } catch (error) {
    // Handle potential errors during verification
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

 export default authMiddleware;