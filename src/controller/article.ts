import httpStatusCode from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
import loggerWithNameSpace from "../utils/logger";
import * as articleService from "../service/article";
const articleController = loggerWithNameSpace("articleController");

export const addArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    articleController.info("Adding new article");

    const addArticle = await articleService.newArticle(req.body, req.file);
    res.status(httpStatusCode.CREATED).json({
      message: "Article added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const allArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    articleController.info("Fetching all articles");
    const allArticles = await articleService.getArticles();
    res.status(httpStatusCode.OK).json({
      message: "All articles fetched successfully",
      data: allArticles,
    });
  } catch (error) {
    next(error);
  }
};

export const getArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    articleController.info("Fetching article by id");
    const id = req.params.id;
    const article = await articleService.getArticleById(id);
    res.status(httpStatusCode.OK).json({
      message: "Article fetched successfully",
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    articleController.info("Updating article");
    const id = req.params.id;
    const updateArticle = await articleService.updateArticle(id, req.body);
    res.status(httpStatusCode.OK).json({
      message: "Article updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    articleController.info("Deleting article");
    const id = req.params.id;
    const deleteArticle = await articleService.deleteArticle(id);
    res.status(httpStatusCode.OK).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const changeArticleStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    articleController.info("Changing article status");
    const id = req.params.id;
    const status = req.body.status;
    const changeArticleStatus = await articleService.changeArticleStatus(
      id,
      status
    );
    res.status(httpStatusCode.OK).json({
      message: "Article status changed successfully",
    });
  } catch (error) {
    next(error);
  }
};
