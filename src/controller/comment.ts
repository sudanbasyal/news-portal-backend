import * as commentService from "../service/comment";
import { Response, NextFunction } from "express";
import httpStatusCode from "http-status-codes";
import { Request } from "../interface/request";
import loggerWithNameSpace from "../utils/logger";

const commentController = loggerWithNameSpace("commentController");

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    commentController.info("adding comment");
    console.log(req.body);
    const newComment = await commentService.createComment(
      req.body,
      req.params.id
    );
    res.status(httpStatusCode.OK).json({
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCommentsOfAnArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    commentController.info("fetching all comments of an article");
    const comments = await commentService.getAllCommentsOfAnArticle(
      req.params.id
    );
    res.status(httpStatusCode.OK).json({
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};
