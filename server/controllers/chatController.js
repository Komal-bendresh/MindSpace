const axios = require("axios");
const Chat = require("../models/chatModel");
require("dotenv").config();

// const chatWithAI = async (req, res) => {
//   const { message } = req.body;
//   const chatId = req.params.id;
//   if (!message) return res.status(401).json({ message: "Message required" });

//   try {
//     let chat = await Chat.findById(chatId);
//     const today = new Date().toDateString();

//     if (!chat) {
//       chat = await Chat.create({
//         user: req.user._id,
//         messages: [],
//         sessionName: `Chat 1`,
//         lastDate: today,
//         dailyCount: 0,
//       });
//     }

//     if (chat.lastDate !== today) {
//       chat.lastDate = today;
//       chat.dailyCount = 0;
//     }

//     // ✅ System-style prompt for Gemini
//     const systemPrompt = `You are a kind and caring mental health assistant. 
// Speak like a supportive friend: empathetic, warm, and conversational. 
// Always remember what the user has previously said and respond naturally.
// Detect the user's language and respond in the same style (e.g., Hinglish in Latin script).
// Always directly acknowledge the user's most recent message. 
// Avoid generic or unrelated replies. 
// Use Hindi words in English letters (like "main thik hoon"), never Hindi script. 
// Summarize your reply in 100 words max.`;

//     // ✅ Convert old chat history into Gemini format
//     const geminiMessages = [
//       {
//         role: "user", // acts as "system" context
//         parts: [{ text: systemPrompt }],
//       },
//       ...chat.messages.map((m) => ({
//         role: m.role === "assistant" ? "model" : "user",
//         parts: [{ text: m.content }],
//       })),
//       {
//         role: "user",
//         parts: [{ text: message }],
//       },
//     ];

//     // ✅ Call Gemini API
//     const response = await axios.post(
//        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
//       {
//         contents: geminiMessages,
//       },
//       {
//         headers: { "Content-Type": "application/json" },
//         timeout: 30000,
//       }
//     );

//     let reply =
//       response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "Sorry, I couldn’t generate a reply.";

//     // ✅ Save chat
//     chat.messages.push(
//       { role: "user", content: message, date: new Date() },
//       { role: "assistant", content: reply, date: new Date() }
//     );

//     chat.dailyCount += 1;
//     await chat.save();

//     return res.status(200).json({ reply });
//   } catch (err) {
//     console.error("Chat Error:", err.response?.data || err.message);
//     return res.status(500).json({ message: "Chat failed internally." });
//   }
// };

const GEMINI_MODEL = "gemini-2.5-flash";

const chatWithAI = async (req, res) => {
  const { message } = req.body;
  const chatId = req.params.id;
  if (!message) return res.status(401).json({ message: "Message required" });

  try {
    let chat = await Chat.findById(chatId);
    const today = new Date().toDateString();

    if (!chat) {
      chat = await Chat.create({
        user: req.user._id,
        messages: [],
        sessionName: `Chat 1`,
        lastDate: today,
        dailyCount: 0,
      });
    }

    if (chat.lastDate !== today) {
      chat.lastDate = today;
      chat.dailyCount = 0;
    }

    const systemPrompt = `You are a kind and caring mental health assistant.
Speak like a supportive friend: empathetic, warm, and conversational.
Detect the user's language and reply in the same style (e.g., Hinglish).
Keep reply <= 100 words.`;

    const geminiMessages = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...chat.messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: geminiMessages },
      { headers: { "Content-Type": "application/json" } }
    );

    let reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Sorry, I couldn’t generate a reply.";

    // Save chat
    chat.messages.push(
      { role: "user", content: message, date: new Date() },
      { role: "assistant", content: reply, date: new Date() }
    );

    chat.dailyCount += 1;
    await chat.save();

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat Error:", err.response?.data || err.message);
    return res.status(500).json({ message: "Chat failed internally." });
  }
};


const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(chats);
  } catch (err) {
    console.error("Get Chat Error:", err.message);
    return res.status(500).json({ message: "Failed to load chat history" });
  }
};

const clearChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat || chat.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Chat not found" });
    }

    chat.messages = [];
    chat.dailyCount = 0;
    chat.lastDate = new Date().toDateString();

    await chat.save();
    return res.status(200).json({ message: "Chat cleared" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to clear chat" });
  }
};

const startNewChat = async (req, res) => {
  try {
    const chatCount = await Chat.countDocuments({ user: req.user._id });
    const newChat = await Chat.create({
      user: req.user._id,
      messages: [],
      sessionName: `Chat ${chatCount + 1}`,
    });
    res.status(201).json(newChat);
  } catch (err) {
    res.status(500).json({ message: "Failed to start new chat" });
  }
};

const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, 
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json({ message: "Chat deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete chat" });
  }
};


module.exports = { chatWithAI, getChatHistory, clearChatHistory, startNewChat,deleteChat };