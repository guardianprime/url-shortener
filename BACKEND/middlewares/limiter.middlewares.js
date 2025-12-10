import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: (req, res) => (req.user ? 20 : 10),
  message: "Too many URLs created from this IP, please try again later.",
});

export default limiter;
