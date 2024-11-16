import httpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import { Request } from "../interface/request";
import * as authService from "../service/auth";
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userLogin = await authService.login(req.body);
    res.status(httpStatusCodes.OK).json(userLogin);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body.refreshToken);
    await authService.logout(req.body.refreshToken!);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
