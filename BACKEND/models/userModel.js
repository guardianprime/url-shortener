const passportLocalMongoose = require("passport-local-mongoose");

// models/User.js
const mongoose = require("mongoose");

// Define the User schema
const userModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // No duplicate usernames
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userModel.plugin(passportLocalMongoose);

// Export the User model
module.exports = mongoose.model("User", userModel);
