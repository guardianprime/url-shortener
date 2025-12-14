import { nanoid } from "nanoid";
import urlModel from "../models/url.model.js";

export const createUrl = async (req, res) => {
  const { url, alias } = req.body;

  try {
    if (!url || typeof url !== "string") {
      const error = new Error("Invalid URL provided.");
      error.statusCode = 400;
      throw error;
    }

    let shortCode;

    const cleanedUrl = url.trim();

    if (!alias) {
      shortCode = nanoid(5);
    } else {
      let cleanedAlias = alias.trim();
      let checkForSpecialCharacters = /\W/.test(cleanedAlias);

      if (checkForSpecialCharacters) {
        const error = new Error(
          "Alias can not contain special characters. try using words"
        );
        error.statusCode = 400;
        throw error;
      }

      shortCode = cleanedAlias;
    }

    const shortenedUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;

    const existing = await urlModel.findOne({ shortCode });

    if (existing) {
      const error = new Error("Alias is already taken.");
      error.statusCode = 409;
      throw error;
    }

    const newUrl = await urlModel.create({
      originalUrl: cleanedUrl,
      shortCode,
      shortUrl: shortenedUrl,
      userId: req.user ? req.user._id : null,
    });

    if (!newUrl) {
      const error = new Error("could not shorten string something went wrong");
      error.statusCode = 500;
      throw error;
    }

    console.log(newUrl);

    return res.status(201).json({ success: true, data: newUrl });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "This short code already exists. Please try another alias.",
      });
    }

    return res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const getUrl = async (req, res) => {
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
