import { Router } from "express";
import Url from "../models/url.model.js";
const shortCodeRouter = Router();

shortCodeRouter.get("/", async (req, res) => {
  const { shortcode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortcode });

    if (urlDoc) {
      //  increment clicks
      urlDoc.clicks++;
      await urlDoc.save();

      // Redirect to original URL
      return res.redirect(urlDoc.originalUrl);
    } else {
      // Short code not found
      return res.status(404).json({ error: "Short URL not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

export default shortCodeRouter;
