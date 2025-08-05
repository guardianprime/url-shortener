const shortenRouter = require("express").Router();
const urlModel = require("../models/urlModel");
const { nanoid } = require("nanoid");

shortenRouter.post("/", async (req, res) => {
  if (!req.user || !req.user._id) {
    console.log("You must be logged in to shorten URLs.");
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
    console.log(shortenedUrl);
    res.json({ shortenedUrl });
  } catch (err) {
    console.error("Error creating shortened URL:", err);
    console.log("Failed to shorten URL.");
    return res.json({
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
  console.log(originalUrl);
  // res.json( {  originalUrl });
});

shortenRouter.get("/urls", async (req, res) => {
  if (!req.user || !req.user._id) {
    console.log("You must be logged in to view your URLs.");
    return res.json({
      urls: [],
      error: "You must be logged in to view your URLs.",
    });
  }
  try {
    const userUrls = await urlModel.find({ userId: req.user._id });
    console.log(userUrls, req.protocol, req.get("host"));
    return res.json({
      urls: userUrls,
      protocol: req.protocol,
      host: req.get("host"),
      error: null,
    });
  } catch (err) {
    console.error("Error fetching user URLs:", err);
    return res.json({
      urls: [],
      error: "Failed to retrieve URLs.",
    });
  }
});

shortenRouter.delete("/urls/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await urlModel.findByIdAndDelete(id);
    res.redirect("/urls");
  } catch (err) {
    console.error("Error deleting URL:", err);
    res.redirect("/urls");
  }
});

module.exports = shortenRouter;
