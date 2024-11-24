import { Request as ExpressRequest } from "express";
import { User } from "./user";

export interface Request<P = any, ResBody = any, ReqBody = any, ReqQuery = {}>
  extends ExpressRequest<P, ResBody, ReqBody, ReqQuery> {
  user?: User;
  refreshToken?: string | null;
  file?: Express.Multer.File;
  searchTerm?: string | null;
}
