import { User } from "../interface/user";
import { comparePassword } from "../utils/encrypter";

import config from "../config";
import { sign, verify } from "jsonwebtoken";
import { BadRequestError } from "../error/BadRequestError";
import * as userService from "./user";
import loggerWithNameSpace from "../utils/logger";
const logger = loggerWithNameSpace("authService");
export const login = async (body: Pick<User, "email" | "password">) => {
  const existingUser = await userService.findByEmail(body.email);
  if (!existingUser) {
    throw new BadRequestError("User not found");
  }

  const userPassword = await comparePassword(
    body.password,
    existingUser.password
  );
  if (!userPassword) throw new BadRequestError("Password doesn't match");
  const user = await userService.getUser(existingUser.id);
  if (!user) throw new BadRequestError("User not found");
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const secretKey = config.jwt.secret!;

  const accessToken = sign(payload, secretKey, {
    expiresIn: config.jwt.accessExpiration,
  });

  const refreshToken = sign(payload, secretKey, {
    expiresIn: config.jwt.refreshTokenExpiration,
  });
  return { accessToken, refreshToken };
};

export const logout = async (refreshToken: string) => {
  try {
    const decoded = verify(refreshToken, config.jwt.secret!);
    if (!decoded) {
      throw new BadRequestError("Invalid refresh token");
    }

    return {
      accessToken: null,
      refreshToken: null,
    };
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        throw new BadRequestError("Token has expired");
      }
      if (error.name === "JsonWebTokenError") {
        throw new BadRequestError("Invalid token");
      }
    }
    throw new BadRequestError("Invalid refresh token");
  }
};
