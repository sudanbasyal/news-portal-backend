import { Router } from "express";
import { addComment, getAllCommentsOfAnArticle } from "../controller/comment";

const commentRouter = Router();

commentRouter.post("/:id/add", addComment);
commentRouter.get("/:id/all", getAllCommentsOfAnArticle);

export default commentRouter;
