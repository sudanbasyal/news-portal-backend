import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
export declare function validateReqQuery(schema: Schema): (req: Request, res: Response, next: NextFunction) => void;
export declare function validateReqBody(schema: Schema): (req: Request, res: Response, next: NextFunction) => void;
export declare function validateReqParams(schema: Schema): (req: Request, res: Response, next: NextFunction) => void;
export declare const validateFormData: (schema: Schema) => (req: Request, res: Response, next: NextFunction) => void;
