import { Router } from "express";

import {
  createUrl,
  getUser,
  getUrls,
  deleteUrl,
  updateUrl,
} from "../controllers/shorten.controller.js";

const shortenRouter = Router();

shortenRouter.post("/", createUrl);

shortenRouter.get("/urls", getUrls);

shortenRouter.get("/user/:id", getUser);

shortenRouter.put("/:id", updateUrl);

shortenRouter.delete("/url/:id", deleteUrl);

export default shortenRouter;
