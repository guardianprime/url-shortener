const shortenRouter = require("express").Router();
const { urlModel } = require("../models/urlModel");

shortenRouter.post("/", (req, res) => {
  const { url } = req.body;
  // Here you would typically shorten the URL and return it
  const shortenedUrl = `http://short.url/${Math.random()
    .toString(36)
    .substring(7)}`;
  urlModel.create({ originalUrl: url, shortenedUrl });
  res.render("index", { shortenedUrl, error: null });
  console.log(`Shortened URL: ${shortenedUrl}`);
  console.log(`Original URL: ${url}`);
});

shortenRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  // Here you would typically retrieve the original URL using the ID
  const originalUrl = urlModel.findById(id);
  res.render("index", { shortenedUrl: null, error: null, originalUrl });
});

module.exports = shortenRouter;
