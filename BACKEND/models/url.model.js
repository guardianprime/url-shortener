import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shortUrl: {
      type: String,
      required: true,
    },
    qrCode: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clicks: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", UrlSchema);

export default Url;
