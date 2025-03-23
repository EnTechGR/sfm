const express = require("express");
const axios = require("axios");
require("dotenv").config();
const router = express.Router();

// Route to fetch vehicles
router.get("/", async (req, res) => {
  const authHash = req.cookies.auth_hash;

  if (!authHash) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const response = await axios.get(process.env.VEHICLES_API_URL, {
      params: { hash: authHash },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Vehicle Fetch Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching vehicle data" });
  }
});

module.exports = router;
