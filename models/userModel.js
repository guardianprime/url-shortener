// models/User.js
const mongoose = require("mongoose");

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // No duplicate usernames
    trim: true,
  },
  password: {
    type: String,
    required: true,
    // Note: Always store a hashed password!
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the User model
module.exports = mongoose.model("User", UserSchema);
