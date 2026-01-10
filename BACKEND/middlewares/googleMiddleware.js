import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import { CLIENT_ID, CLIENT_SECRET, JWT_SECRET } from "../configs/env.config.js";

const client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  "http://localhost:8000/api/v1/auth/google/callback"
);

export const googleAuth = (req, res) => {
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });

  res.redirect(url);
};

export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const ticket = client.verifyIdToken({
      idToken: tokens.id_token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub: googleId, email, name, picture } = payload;

    // 1. Find or create user in DB
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        googleId,
        avatar: picture,
        provider: "google",
      });
    }

    // 2. Issue your own JWT
    const appToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // 3. Redirect back to frontend
    res.redirect(`http://localhost:5173/oauth-success?token=${appToken}`);
  } catch (err) {
    console.error(err);
    res.redirect("http://localhost:5173/login?error=google");
  }
};
