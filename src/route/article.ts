import { Router } from "express";
import {
    addArticle,
    allArticles,
    changeArticleStatus,
    getArticle,
    updateArticle,
} from "../controller/article";
import upload from "../middleware/fileUpload";

const articleRouter = Router();

articleRouter.post(
  "/create",
  //   authenticate,
  //   authorize,
  upload.single('image'),
  //   validateReqBody(addArticleSchema),
  addArticle
);
articleRouter.get("/all", allArticles);
articleRouter.get("/:id", getArticle);
articleRouter.patch(
  "/:id",
  upload.single('image'),
  updateArticle
);
articleRouter.patch("/:id/status", changeArticleStatus);
export default articleRouter;
