const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.json({ status: "error", error: "Email already exists" });
    }

    const lastUser = await User.findOne().sort({ userId: -1 });
    const newUserId = lastUser ? lastUser.userId + 1 : 1;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      userId: newUserId,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin || false,
      fullName: req.body.fullName,
    });
    res.json({ status: "User Created Successfully! " });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.json({ status: "error", error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.json({ status: "error", error: "Invalid credentials" });
    }
    const payload = {
      email: req.body.email,
      isAdmin: user.isAdmin,
      userId: user.userId,
    };
    const token = jwt.sign(payload, "secret123", { expiresIn: 3600 });

    res.json({
      status: "User Logged In Successfully",
      message: "Bravo",
      accessToken: token,
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
});

module.exports = router;
