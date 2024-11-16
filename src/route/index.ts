import { Router } from "express";
import authRoutes from "./auth";
import articleRoutes from "./article";

const router = Router();

router.use("/auth", authRoutes);
router.use("/article", articleRoutes);

export default router;
