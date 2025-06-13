const express = require("express");
const router = express.Router();

const {
  generatePlaylist 
} = require("../controllers/playlistController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/playlist", authMiddleware, generatePlaylist);

