import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("role");
    if (!user) return res.status(401).json({ message: "User not found" });
    if (user.role !== "admin") return res.status(403).json({ message: "Admin access required" });
    next();
  } catch (error) {
    next(error);
  }
};

export default adminMiddleware;
