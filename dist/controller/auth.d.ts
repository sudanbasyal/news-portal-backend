import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
