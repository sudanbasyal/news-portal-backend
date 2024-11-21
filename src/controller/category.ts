import httpStatusCode from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
import loggerWithNameSpace from "../utils/logger";
import * as categoryService from "../service/category";
const categoryController = loggerWithNameSpace("categoryController");

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    categoryController.info("Creating new category");
    await categoryService.createCategory(req.body);
    res.status(httpStatusCode.CREATED).json({
      message: "Category created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    categoryController.info("Fetching all categories");
    const categories = await categoryService.getAllCategories();
    res.status(httpStatusCode.OK).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    categoryController.info("Fetching category by id");
    const id = req.params.id;
    const category = await categoryService.getCategory(id);
    res.status(httpStatusCode.OK).json({
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    categoryController.info("Updating category");
    const id = req.params.id;
    await categoryService.updateCategory(id, req.body);
    res.status(httpStatusCode.OK).json({
      message: "Category updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    categoryController.info("Deleting category");
    const id = req.params.id;
    await categoryService.deleteCategory(id);
    res.status(httpStatusCode.OK).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllArticlesByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    categoryController.info("Fetching articles by category");
    const categoryId = req.params.id;
    const articles = await categoryService.getAllArticlesByCategory(categoryId);
    res.status(httpStatusCode.OK).json({
      message: "Articles fetched successfully",
      data: articles,
    });
  } catch (error) {
    next(error);
  }
}
