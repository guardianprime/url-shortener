const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { shortenedUrl: null, error: null });
});

app.post("/shorten", (req, res) => {
  const { url } = req.body;
  // Here you would typically shorten the URL and return it
  const shortenedUrl = `http://short.url/${Math.random()
    .toString(36)
    .substring(7)}`;
  res.render("index", { shortenedUrl, error: null });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
