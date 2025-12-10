import { Router } from "express";
import {
  loginController,
  logoutController,
  signUpController,
  checkUserStatusController,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUpController);

authRouter.post("/login", loginController);

authRouter.post("/logout", logoutController);

authRouter.get("/check", checkUserStatusController);

export default authRouter;
