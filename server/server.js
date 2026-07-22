import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import budgetRoutes from "./routes/budgets.js";
import schemeRoutes from "./routes/schemes.js";
import transactionRoutes from "./routes/transactions.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();
const app = express();
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL].filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    const isLocalDev = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || "");
    if (!origin || isLocalDev || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json());
app.get("/", (req, res) => res.json({ message: "FinTrack API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));
