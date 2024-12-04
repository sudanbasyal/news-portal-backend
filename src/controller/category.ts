import httpStatusCode from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
import loggerWithNameSpace from "../utils/logger";
import * as categoryService from "../service/category";
import * as articleService from "../service/article";
const categoryController = loggerWithNameSpace("categoryController");
interface PaginationQuery {
  page?: string;
  limit?: string;
}
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
  req: Request<any, any, any, PaginationQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    categoryController.info("Fetching articles by category");
    const categoryId = req.params.id;
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "5", 10);

    const articles = await articleService.getAllArticlesByCategory(categoryId, {
      page,
      limit,
    });
    res.status(httpStatusCode.OK).json({
      message: "Articles fetched successfully",
      ...articles,
    });
  } catch (error) {
    next(error);
  }
};
