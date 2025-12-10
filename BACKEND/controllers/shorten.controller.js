import { nanoid } from "nanoid";
import urlModel from "../models/url.model.js";

export const createUrl = async (req, res) => {
  const { url, alias } = req.body;
  console.log(url, alias);
  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Invalid URL provided." });
  }

  const cleanedUrl = url.trim();
  const shortCode = nanoid(5);
  const shortenedUrl = `${req.protocol}://${req.get(
    "host"
  )}/${shortCode}/${alias}`;

  try {
    const existing = await urlModel.findOne({ shortCode });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, error: "Alias is already taken." });
    }

    await urlModel.create({
      originalUrl: cleanedUrl,
      shortCode,
      alias,
      shortUrl: shortenedUrl,
      userId: req.user ? req.user._id : null,
    });

    return res.status(201).json({ success: true, data: shortenedUrl });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Failed to shorten URL." });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
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
};

export const getUrls = async (req, res) => {
  /*  if (!req.user || !req.user._id) {
    return res.json({
      urls: [],
      error: "You must be logged in to view your URLs.",
    });
  } */
  try {
    /* const userUrls = await urlModel.find({ userId: req.user._id });
    return res.json({
      urls: userUrls,
      protocol: req.protocol,
      host: req.get("host"),
      error: null,
    }); */
  } catch (err) {
    res.json({ error: "Error fetching user URLs:" });
    return res.json({
      urls: [],
      error: "Failed to retrieve URLs.",
    });
  }
};

export const deleteUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await urlModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "URL not found." });
    }

    return res.status(200).json({ message: "URL deleted successfully." });
  } catch (err) {
    return res.status(500).json({ error: "Error deleting URL." });
  }
};
