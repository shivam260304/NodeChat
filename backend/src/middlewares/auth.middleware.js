import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Await the asynchronous call to `User.findById`
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Populate `req.user` with the resolved user document
    next();
  } catch (e) {
    console.log("Error in authUser middleware", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
