import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
export declare const RequestLogger: (req: Request, res: Response, next: NextFunction) => void;
