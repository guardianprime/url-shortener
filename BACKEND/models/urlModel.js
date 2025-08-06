// models/Url.js
const mongoose = require("mongoose");

// Define the URL schema
const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true, // ✅ THIS is the unique part
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

// Export the Url model
module.exports = mongoose.model("Url", UrlSchema);
