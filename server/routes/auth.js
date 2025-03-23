const express = require("express");
const axios = require("axios");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const router = express.Router();

router.use(cookieParser());

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const response = await axios.get(process.env.AUTH_API_URL, {
      params: { login: email, password: password },
    });

    if (response.data.success) {
        res.cookie("auth_hash", response.data.hash, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });
      res.json({ success: true});
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Authentication service error" });
  }
});

module.exports = router;
