const shortenRouter = require("express").Router();
const urlModel = require("../models/urlModel");
const EnsureLoggedIn = require("connect-ensure-login");
const { nanoid } = require("nanoid");

shortenRouter.post("/", async (req, res) => {
  const { url, alias } = req.body;

  // Use alias if provided, else generate with nanoid
  const shortCode = alias?.trim() !== "" ? alias.trim() : nanoid(7);
  const shortenedUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

  try {
    // Check for duplicate alias
    const existing = await urlModel.findOne({ shortCode });
    if (existing) {
      return res.status(400).json({ error: "Alias is already taken." });
    }

    await urlModel.create({
      originalUrl: url,
      shortCode,
      userId: req.user ? req.user._id : null,
    });

    return res.status(201).json({ shortenedUrl });
  } catch (err) {
    return res.status(500).json({ error: "Failed to shorten URL." });
  }
});

shortenRouter.get(
  "/user/:id",
  // EnsureLoggedIn.ensureLoggedIn(),
  async (req, res) => {
    const { id } = req.params;
    // Here you would typically retrieve the original URL using the ID
    let originalUrl = null;
    try {
      const urlDoc = await urlModel.findById(id);
      if (urlDoc) {
        originalUrl = urlDoc.originalUrl;
      }
    } catch (err) {
      res.json({ error: "Error finding URL by ID:" });
    }
    res.json({ originalUrl });
  }
);

shortenRouter.get(
  "/urls",
  EnsureLoggedIn.ensureLoggedIn(),
  async (req, res) => {
    if (!req.user || !req.user._id) {
      return res.json({
        urls: [],
        error: "You must be logged in to view your URLs.",
      });
    }
    try {
      const userUrls = await urlModel.find({ userId: req.user._id });
      return res.json({
        urls: userUrls,
        protocol: req.protocol,
        host: req.get("host"),
        error: null,
      });
    } catch (err) {
      res.json({ error: "Error fetching user URLs:" });
      return res.json({
        urls: [],
        error: "Failed to retrieve URLs.",
      });
    }
  }
);

shortenRouter.delete(
  "/urls/:id",
  EnsureLoggedIn.ensureLoggedIn(),
  async (req, res) => {
    const { id } = req.params;

    try {
      await urlModel.findByIdAndDelete(id);
      res.redirect("/urls");
    } catch (err) {
      res.json({ error: "Error deleting URL:" });
      res.redirect("/urls");
    }
  }
);

module.exports = shortenRouter;
