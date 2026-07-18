import express from "express";
import { getAdminStats, getAdminUsers, getAdminUserSummary, updateAdminUserRole } from "../controllers/adminController.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);
router.get("/stats", getAdminStats);
router.get("/users", getAdminUsers);
router.get("/users/:id", getAdminUserSummary);
router.put("/users/:id/role", updateAdminUserRole);

export default router;
