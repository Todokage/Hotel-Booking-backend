const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch {
    res.status(400).json({ error: "User exists or bad data" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login payload:", { email, password: !!password });

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    console.log("User from DB:", user);

    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("Missing JWT_SECRET:", process.env.JWT_SECRET);
      return res.status(500).json({ error: "Server error: JWT not configured" });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token, user: { name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error("Login exception:", err.message, err.stack);
    return res.status(500).json({ error: "Unexpected server error" });
  }
});



module.exports = router;
