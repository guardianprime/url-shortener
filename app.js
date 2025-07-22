const express = require("express");
const { connectToMongoDB } = require("./db");
const EnsureLoggedIn = require("connect-ensure-login");
const passport = require("passport");
const session = require("express-session");
const userModel = require("./models/userModel");
const urlModel = require("./models/urlModel");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;

connectToMongoDB();

app.set("view engine", "ejs");
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

passport.use(userModel.createStrategy());

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.get("/", EnsureLoggedIn.ensureLoggedIn(), (req, res) => {
  res.render("index", { shortenedUrl: null, error: null });
});

app.use(
  "/shorten",
  EnsureLoggedIn.ensureLoggedIn(),
  require("./routes/shorten")
);

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.get("/signup", (req, res) => {
  res.render("signup", { error: null });
});

app.post("/signup", (req, res) => {
  userModel.register(
    new userModel({ username: req.body.username }),
    req.body.password,
    (err) => {
      if (err) {
        console.error("Error registering user:", err);
        return res.status(500).send("Error registering user");
      } else {
        // User registered successfully
        passport.authenticate("local")(req, res, () => {
          res.redirect(`/shorten/user/${req.user.id}`);
        });
      }
    }
  );
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
});

app.get("/short.url/:shortCode", async (req, res) => {
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
    console.error("Error during redirect:", err);
    return res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
