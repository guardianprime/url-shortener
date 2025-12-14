import { Router } from "express";

import {
  createUrl,
  getUrl,
  getUrls,
  deleteUrl,
  updateUrl,
} from "../controllers/shorten.controller.js";

const shortenRouter = Router();

shortenRouter.post("/", createUrl);

shortenRouter.get("/urls", getUrls);

shortenRouter.get("/urls/:id", getUrl);

shortenRouter.put("/:id", updateUrl);

shortenRouter.delete("/url/:id", deleteUrl);

export default shortenRouter;
