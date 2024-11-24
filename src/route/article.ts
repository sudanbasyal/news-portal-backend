import { Router } from "express";
import {
  addArticle,
  allArticles,
  changeArticleStatus,
  getArticle,
  getArticleBySlug,
  searchArticles,
  updateArticle,
} from "../controller/article";
import { authenticate } from "../middleware/auth";
import upload from "../middleware/fileUpload";

const articleRouter = Router();

articleRouter.post(
  "/create",
  authenticate,
  // validateReqBody(addArticleSchema),
  upload.single("image"),
  addArticle
);
articleRouter.get("/slug/:slug", getArticleBySlug);
articleRouter.get("/search", searchArticles);
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
