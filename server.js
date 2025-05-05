// server.js
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv/config");

const app = express();
app.use(cors());
app.use(express.json());

// POST endpoint that receives form data and forwards it to Sheet.best
app.post("/submit", async (req, res) => {
  try {
    const response = await fetch("https://api.sheetbest.com/sheets/ef4d1f1d-5f4b-4728-b775-c70af5e5119f", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    if (response.ok) {
      res.status(200).json({ success: true });
    } else {
      const text = await response.text();
      res.status(500).json({ success: false, error: text });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
