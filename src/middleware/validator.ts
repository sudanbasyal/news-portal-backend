import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("ValidatorMiddleware");

export function validateReqQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info("Validating query params");
    const { error, value } = schema.validate(req.query);

    if (error) {
      logger.error("Error validating query params", { error });
      console.log(error);
      next(new BadRequestError(error.message));
    }

    req.query = value;

    next();
  };
}

export function validateReqBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info("Validating request body");

    const { error, value } = schema.validate(req.body);

    if (error) {
      logger.error("Error validating request body", { error });
      next(new BadRequestError(error.message));
    }

    req.body = value;

    next();
  };
}

export function validateReqParams(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info("Validating request params");
    const { error, value } = schema.validate(req.params);

    if (error) {
      logger.error("Error validating request params", { error });
      next(new BadRequestError(error.message));
    }
    req.params = value;
    next();
  };
}
