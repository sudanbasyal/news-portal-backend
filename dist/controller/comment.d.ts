import { Response, NextFunction } from "express";
import { Request } from "../interface/request";
export declare const addComment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getAllCommentsOfAnArticle: (req: Request, res: Response, next: NextFunction) => Promise<void>;
