import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../configs/env.config.js";

export const signUpController = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ username, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: newUsers[0],
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 400;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User signed in successsfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || error,
    });
  }
};

export const logoutController = (req, res) => {
  res.send("this is the auth logout controller");
};

export const checkUserStatusController = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"] || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, error: "Authorization header must be Bearer" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "token can not be empty" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "token verified successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    return res
      .status(error.statusCode || 401)
      .json({ success: false, error: error.message || error });
  }
};
