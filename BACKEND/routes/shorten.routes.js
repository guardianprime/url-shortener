import { Router } from "express";
import limiter from "../middlewares/limiter.middlewares.js";

import {
  createUrl,
  getUser,
  getUrls,
  deleteUrl,
} from "../controllers/shorten.controller.js";

const shortenRouter = Router();

shortenRouter.post("/", limiter, createUrl);

shortenRouter.get("/user/:id", limiter, getUser);

shortenRouter.get("/urls", limiter, getUrls);

shortenRouter.delete("/url/:id", limiter, deleteUrl);

export default shortenRouter;
