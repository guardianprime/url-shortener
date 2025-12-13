import { nanoid } from "nanoid";
import urlModel from "../models/url.model.js";

export const createUrl = async (req, res) => {
  const { url, alias } = req.body;

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ success: false, error: "Invalid URL provided." });
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

    if (!urlDoc) {
      const error = new Error("This url does not exist");
      error.statusCode = 401;
      throw error;
    }
    originalUrl = urlDoc.originalUrl;
  } catch (error) {
    res
      .status(error.statusCode || 401)
      .json({ success: false, error: "Error finding URL by ID:" });
  }
  res.status(200).json({ success: true, data: originalUrl });
};

export const getUrls = async (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({
      success: false,
      error: "You must be logged in to view your URLs.",
    });
  }

  try {
    const userUrls = await urlModel.find({ userId: req.user._id });

    return res.json({
      success: true,
      data: {
        urls: userUrls,
        protocol: req.protocol,
        host: req.get("host"),
      },
    });
  } catch (err) {
    res.json({ error: "Error fetching user URLs:" });
    return res.status(404).json({
      success: false,
      error: "Failed to retrieve URLs.",
    });
  }
};

export const updateUrl = async (req, res) => {
  const id = req.params.id;
  const dataToUpdate = req.body;

  try {
    if (!id) {
      const error = new Error("Url id must be provided.");
      error.statusCode = 401;
      throw error;
    }

    if (dataToUpdate.url === null || dataToUpdate === undefined) {
      const error = new Error("req body can not be empty");
      error.statusCode = 401;
      throw error;
    }

    if (!dataToUpdate) {
      const error = new Error(
        "The url new url to be updated needs to be provided"
      );
      error.statusCode = 401;
      throw error;
    }

    const updatedUrl = await Url.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
    });

    if (!updatedUrl) {
      const error = new Error("could not update the url");
      error.statusCode = 401;
      throw error;
    }

    res.status(200).json({ success: true, data: updatedUrl });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await urlModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: "URL not found." });
    }

    return res
      .status(200)
      .json({ success: true, data: { message: "URL deleted successfully." } });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Error deleting URL." });
  }
};
