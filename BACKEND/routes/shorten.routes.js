import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import {
  createUrl,
  getUrl,
  getUrls,
  deleteUrl,
  updateUrl,
} from "../controllers/shorten.controller.js";

const shortenRouter = Router();

shortenRouter.post("/", createUrl);

shortenRouter.get("/urls", authMiddleware, getUrls);

shortenRouter.get("/urls/:id", authMiddleware, getUrl);

shortenRouter.put("/:id", authMiddleware, updateUrl);

shortenRouter.delete("/url/:id", authMiddleware, deleteUrl);

export default shortenRouter;
