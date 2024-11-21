import { Router } from "express";

import { authenticate } from "../middleware/auth";
import {
  createCategory,
  deleteCategory,
  getAllArticlesByCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controller/category";

const categoryRouter = Router();

categoryRouter.post(
  "/create",
  authenticate,
  // validateReqBody(addArticleSchema),
  createCategory
);
categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.patch("/:id", authenticate, updateCategory);
categoryRouter.delete("/:id", authenticate, deleteCategory);
categoryRouter.get("/:id/articles", getAllArticlesByCategory);
export default categoryRouter;
