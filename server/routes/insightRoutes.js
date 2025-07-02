const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {getWeeklyInsights} = require("../controllers/insightController");

router.get('/tips', authMiddleware, getWeeklyInsights);

module.exports = router;
