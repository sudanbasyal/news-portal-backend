import { Router } from "express";

import { authenticate } from "../middleware/auth";
import {
  createCategory,
  deleteCategory,
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
export default categoryRouter;
