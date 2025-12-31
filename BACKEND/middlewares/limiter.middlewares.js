import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: (req, res) => (req.user ? 50 : 10),
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many URLs created from this IP, please try again later.",
    });
  },
});

export default limiter;
