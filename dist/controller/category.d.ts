import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
interface PaginationQuery {
    page?: string;
    limit?: string;
}
export declare const createCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllCategories: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteCategory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllArticlesByCategory: (req: Request<any, any, any, PaginationQuery>, res: Response, next: NextFunction) => Promise<void>;
export {};
