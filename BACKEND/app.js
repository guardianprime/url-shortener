const express = require("express");
const { connectToMongoDB } = require("./db");
const EnsureLoggedIn = require("connect-ensure-login");
const passport = require("passport");
const session = require("express-session");
const userModel = require("./models/userModel");
const urlModel = require("./models/urlModel");
const cors = require("cors");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

connectToMongoDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:5173", // or use an array for multiple origins
    credentials: true,
  })
);

passport.use(userModel.createStrategy());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use(
  "/shorten",
  EnsureLoggedIn.ensureLoggedIn(),
  require("./routes/shorten")
);

app.post("/signup", (req, res, next) => {
  console.log("Signup attempt:", req.body);
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }

  userModel.register(new userModel({ username }), password, (err, user) => {
    if (err) {
      let errorMsg = "Error registering user.";

      if (err.name === "UserExistsError") {
        errorMsg = "A user with that username already exists.";
      } else if (err.name === "MissingUsernameError") {
        errorMsg = "No username was given.";
      } else if (err.name === "MissingPasswordError") {
        errorMsg = "No password was given.";
      }

      return res.status(400).json({ error: errorMsg });
    }

    // Authenticate the new user immediately after registration
    passport.authenticate("local")(req, res, () => {
      return res.status(200).json({ message: "Signup successful" });
    });
  });
});

app.post("/login", (req, res, next) => {
  console.log("Login attempt:", req.body);

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Passport error:", err);
      return res.status(500).json({ error: "Internal server error." });
    }

    if (!user) {
      const errorMsg = info?.message || "Username or password is incorrect.";
      return res.status(400).json({ error: errorMsg });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login session error:", err);
        return res.status(500).json({ error: "Failed to log in user." });
      }

      return res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json("Error logging out");
    }
    res.redirect("/");
  });
});

app.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await urlModel.findOne({ shortCode });

    if (urlDoc) {
      //  increment clicks
      urlDoc.clicks++;
      await urlDoc.save();

      // Redirect to original URL
      return res.redirect(urlDoc.originalUrl);
    } else {
      // Short code not found
      return res.status(404).send("Short URL not found");
    }
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
