const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getMoodTrends,
  getEmotionFrequency,
} = require("../controllers/analyticsController");

router.get("/mood-trends", auth, getMoodTrends);
router.get("/emotion-frequency", auth, getEmotionFrequency);


module.exports = router;
