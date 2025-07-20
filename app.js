const express = require("express");
const { connectToMongoDB } = require("./db");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

connectToMongoDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { shortenedUrl: null, error: null });
});

app.use("/shorten", require("./routes/shorten"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
