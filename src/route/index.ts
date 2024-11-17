import { Router } from "express";
import authRoutes from "./auth";
import articleRoutes from "./article";
import categoryRoutes from "./category";
import commentRoutes from "./comment";
const router = Router();

router.use("/auth", authRoutes);
router.use("/article", articleRoutes);
router.use("/category", categoryRoutes);
router.use("/comment", commentRoutes);
export default router;
