import { Router } from "express";
import {
  loginController,
  logoutController,
  signUpController,
  checkUserStatusController,
  googleController,
  googleCallbackController,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signUpController);

authRouter.post("/login", loginController);

authRouter.post("/logout", logoutController);

authRouter.get("/check", authMiddleware, checkUserStatusController);

authRouter.get("/google", googleController);

authRouter.get("/google/callback", googleCallbackController);

export default authRouter;
