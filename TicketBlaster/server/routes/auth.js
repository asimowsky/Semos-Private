const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../services/authService");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
