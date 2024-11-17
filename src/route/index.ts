import { Router } from "express";
import authRoutes from "./auth";
import articleRoutes from "./article";
import categoryRoutes from "./category";
const router = Router();

router.use("/auth", authRoutes);
router.use("/article", articleRoutes);
router.use("/category", categoryRoutes);

export default router;
