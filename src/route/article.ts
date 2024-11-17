import { Router } from "express";
import {
  addArticle,
  allArticles,
  changeArticleStatus,
  getArticle,
  updateArticle,
} from "../controller/article";
import upload from "../middleware/fileUpload";
import { validateReqBody } from "../middleware/validator";
import { authenticate, authorize } from "../middleware/auth";
import { addArticleSchema } from "../schema/article";

const articleRouter = Router();

articleRouter.post(
  "/create",
  authenticate,
  // validateReqBody(addArticleSchema),
  upload.single("image"),
  addArticle
);
articleRouter.get("/all", allArticles);
articleRouter.get("/:id", getArticle);
articleRouter.patch(
  "/:id",
  authenticate,
  upload.single("image"),
  updateArticle
);
articleRouter.patch("/:id/status", authenticate, changeArticleStatus);
export default articleRouter;
