const shortenRouter = require("express").Router();

shortenRouter.post("/", (req, res) => {
  const { url } = req.body;
  // Here you would typically shorten the URL and return it
  const shortenedUrl = `http://short.url/${Math.random()
    .toString(36)
    .substring(7)}`;
  res.render("index", { shortenedUrl, error: null });
  console.log(`Shortened URL: ${shortenedUrl}`);
  console.log(`Original URL: ${url}`);
});

module.exports = shortenRouter;
