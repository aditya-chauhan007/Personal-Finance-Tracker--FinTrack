import express from "express";
import { getBudgets, upsertBudget } from "../controllers/budgetController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.use(authMiddleware);
router.get("/", getBudgets);
router.put("/:category", upsertBudget);
export default router;
