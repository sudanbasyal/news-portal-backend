import { Router } from "express";

import { authenticate, authorize } from "../middleware/auth";
import { validateReqBody, validateReqParams } from "../middleware/validator";

import { login, logout } from "../controller/auth";
import { loginSchema } from "../schema/auth";

const authRouter = Router();
authRouter.post("/login", validateReqBody(loginSchema), login);
authRouter.post("/logout", logout);

export default authRouter;
