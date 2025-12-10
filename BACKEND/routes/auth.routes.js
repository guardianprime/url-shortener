import { Router } from "express";
import {
  loginController,
  logoutController,
  signUpController,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", signUpController);

authRouter.post("/login", loginController);

authRouter.post("/logout", logoutController);

export default authRouter;
