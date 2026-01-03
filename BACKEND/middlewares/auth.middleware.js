import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env.config.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      const error = new Error("Authorization Header is missing");
      error.statusCode = 401;
      throw error;
    }

    if (!authHeader.startsWith("Bearer ")) {
      const error = new Error("Authorization header must be Bearer");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      const error = new Error("token can not be empty or null");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(error.statusCode || 401).json({
      success: false,
      error: error.message,
    });
  }
};

export const optionalAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

export default authMiddleware;
