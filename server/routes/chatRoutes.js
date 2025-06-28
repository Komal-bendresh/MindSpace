const express = require("express");
const router = express.Router();
const { chatWithAI ,getChatHistory} = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/ai", authMiddleware, chatWithAI);
router.get("/chat-history", authMiddleware, getChatHistory);

module.exports = router;
