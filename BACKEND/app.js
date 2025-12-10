import express from "express";
import connectToMongoDB from "./db.js";
import cors from "cors";
import shortenRouter from "./routes/shorten.routes.js";
import shortCodeRouter from "./routes/shortCode.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://smallurl-wisf.onrender.com"], // or use an array for multiple origins
    credentials: true,
  })
);

app.use("/api/v1/shorten", shortenRouter);
app.use("/api/v1/:shortcode", shortCodeRouter);
app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToMongoDB();
});
