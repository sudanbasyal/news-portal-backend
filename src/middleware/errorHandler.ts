import httpStatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { BadRequestError } from "../error/BadRequestError";
import { ForbiddenError } from "../error/ForbiddenError";
import { ConflictError } from "../error/ConflictError";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("Errorhandler");

// Mapping error classes to HTTP status codes
const errorResponseMapping: Record<string, number> = {
  UnauthenticatedError: httpStatusCodes.UNAUTHORIZED,
  BadRequestError: httpStatusCodes.BAD_REQUEST,
  ForbiddenError: httpStatusCodes.FORBIDDEN,
  ConflictError: httpStatusCodes.CONFLICT,
  NotFoundError: httpStatusCodes.NOT_FOUND,
};

// Error class mapping
const errorClassMapping = {
  UnauthenticatedError,
  BadRequestError,
  ForbiddenError,
  ConflictError,
  NotFoundError,
};

// Generic error handler function
export function genericErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error.stack) {
    logger.error(error.stack);
  }

  const errorType = Object.keys(errorClassMapping).find(
    (type) =>
      error instanceof
      errorClassMapping[type as keyof typeof errorClassMapping],
  );

  if (errorType) {
    return res.status(errorResponseMapping[errorType]).json({
      message: error.message,
    });
  }

  return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
}
