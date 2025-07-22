const shortenRouter = require("express").Router();
const urlModel = require("../models/urlModel");
const { nanoid } = require("nanoid");

shortenRouter.post("/", async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.render("index", {
      shortenedUrl: null,
      error: "You must be logged in to shorten URLs.",
    });
  }
  const { url } = req.body;
  const shortCode = nanoid(7);
  const shortenedUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

  try {
    await urlModel.create({
      originalUrl: url,
      shortCode,
      userId: req.user._id,
    });
    res.render("index", { shortenedUrl, error: null });
    console.log({
      userId: req.user._id,
      shortCode,
      longUrl: url,
    });
  } catch (err) {
    console.error("Error creating shortened URL:", err);
    return res.render("index", {
      shortenedUrl: null,
      error: "Failed to shorten URL.",
    });
  }
});

shortenRouter.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  // Here you would typically retrieve the original URL using the ID
  let originalUrl = null;
  try {
    const urlDoc = await urlModel.findById(id);
    if (urlDoc) {
      originalUrl = urlDoc.originalUrl;
    }
  } catch (err) {
    console.error("Error finding URL by ID:", err);
  }
  res.render("index", { shortenedUrl: null, error: null, originalUrl });
});

shortenRouter.get("/urls", async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.render("urls", {
      urls: [],
      error: "You must be logged in to view your URLs.",
    });
  }
  try {
    const userUrls = await urlModel.find({ userId: req.user._id });
    return res.render("urls", {
      urls: userUrls,
      protocol: req.protocol,
      host: req.get("host"),
      error: null,
    });
  } catch (err) {
    console.error("Error fetching user URLs:", err);
    return res.render("urls", {
      urls: [],
      error: "Failed to retrieve URLs.",
    });
  }
});

module.exports = shortenRouter;
