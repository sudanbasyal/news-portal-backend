import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
interface SearchQuery {
    q?: string;
}
interface PaginationQuery {
    page?: string;
    limit?: string;
}
export declare const addArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const allArticles: (req: Request<any, any, any, PaginationQuery>, res: Response, next: NextFunction) => Promise<void>;
export declare const getArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const changeArticleStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const searchArticles: (req: Request<any, any, any, SearchQuery>, res: Response, next: NextFunction) => Promise<void>;
export declare const getArticleBySlug: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getBreakingNews: (req: Request<any, any, any, PaginationQuery>, res: Response, next: NextFunction) => Promise<void>;
export {};
