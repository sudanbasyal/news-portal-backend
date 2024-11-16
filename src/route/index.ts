import { Router } from "express";
import authRoutes from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.use("/auth", authRoutes);

export default router;
