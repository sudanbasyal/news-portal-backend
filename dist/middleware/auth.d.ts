import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
export declare const authorize: () => (req: Request, res: Response, next: NextFunction) => void;
