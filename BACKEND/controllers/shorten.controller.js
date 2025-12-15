import { nanoid } from "nanoid";
import URL from "../models/url.model.js";
import { BASE_URL } from "../configs/env.config.js";

export const createUrl = async (req, res) => {
  const { url, alias } = req.body;

  try {
    const cleanedUrl = url?.trim();

    if (!cleanedUrl || typeof cleanedUrl !== "string") {
      const error = new Error("Invalid URL provided.");
      error.statusCode = 400;
      throw error;
    }

    const urlPattern =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    if (!urlPattern.test(cleanedUrl)) {
      const error = new Error("Invalid URL format.");
      error.statusCode = 400;
      throw error;
    }

    let shortCode;

    if (!alias) {
      let attempts = 0;
      const maxAttempts = 5;

      while (attempts < maxAttempts) {
        shortCode = nanoid(6);
        const existing = await URL.findOne({ shortCode });

        if (!existing) {
          break;
        }

        attempts++;
        console.log(
          `Collision detected for ${shortCode}, retrying... (${attempts}/${maxAttempts})`
        );
      }

      if (attempts === maxAttempts) {
        const error = new Error(
          "Unable to generate unique short code. Please try again."
        );
        error.statusCode = 500;
        throw error;
      }
    } else {
      const cleanedAlias = alias.trim();

      if (!cleanedAlias) {
        const error = new Error("Alias cannot be empty.");
        error.statusCode = 400;
        throw error;
      }

      if (/\W/.test(cleanedAlias)) {
        const error = new Error(
          "Alias cannot contain special characters. Try using words."
        );
        error.statusCode = 400;
        throw error;
      }

      shortCode = cleanedAlias;
    }

    const shortenedUrl = `${BASE_URL}/${shortCode}`;
    console.log(
      `cleanedurl: ${cleanedUrl}, shortCode: ${shortCode},   shortUrl: ${shortenedUrl}, userId: ${
        req.user?._id || null
      }`
    );

    const newUrl = await URL.create({
      originalUrl: cleanedUrl,
      shortCode,
      shortUrl: shortenedUrl,
      userId: req.user?._id || null,
    });

    return res.status(201).json({ success: true, data: newUrl });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "This alias is already taken. Please try another one.",
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
