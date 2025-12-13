import { Router } from "express";
import limiter from "../middlewares/limiter.middlewares.js";

import {
  createUrl,
  getUser,
  getUrls,
  deleteUrl,
  updateUrl,
} from "../controllers/shorten.controller.js";

const shortenRouter = Router();

shortenRouter.post("/", limiter, createUrl);

shortenRouter.get("/urls", limiter, getUrls);

shortenRouter.get("/user/:id", limiter, getUser);

shortenRouter.put("/:id", limiter, updateUrl);

shortenRouter.delete("/url/:id", limiter, deleteUrl);

export default shortenRouter;
