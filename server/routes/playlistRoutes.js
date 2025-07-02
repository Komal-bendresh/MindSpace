const express = require("express");
const router = express.Router();

const { generatePlaylist, getSavedPlaylists } = require("../controllers/playlistController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/playlist", authMiddleware, generatePlaylist);


module.exports = router;