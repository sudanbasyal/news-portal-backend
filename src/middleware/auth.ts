import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
import { verify } from "jsonwebtoken";
import config from "../config";
import { User } from "../interface/user";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("AuthMiddleware");

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Access denied"));
    return;
  }
  try {
    const user = verify(token[1], config.jwt.secret!) as User;
    req.user = user;

    logger.info("user authenticated");
    next();
  } catch (error) {
    throw new UnauthenticatedError("please login again");
  }
};

export const authorize = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (!user) {
      return;
    }

    console.log("user permissions", user.role);
    const hasPermission = user.role === "admin";
    logger.info("checking user permission", hasPermission);

    if (!hasPermission) {
      next(new UnauthenticatedError("Forbidden"));
    }
    logger.info("user authorized");

    next();
  };
};
