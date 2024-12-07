import { NextFunction, Request, Response } from "express";
export declare function genericErrorHandler(error: Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
