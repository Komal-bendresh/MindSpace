const axios = require("axios");
const Chat = require("../models/chatModel");

const chatWithAI = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(401).json({ message: "Message required" });

  try {
    let chat = await Chat.findOne({ user: req.user._id });

    const today = new Date().toDateString();

    if (!chat) {
      chat = await Chat.create({
        user: req.user._id,
        messages: [],
        lastDate: today,
        dailyCount: 0,
      });
    }

    if (chat.lastDate !== today) {
      chat.lastDate = today;
      chat.dailyCount = 0;
    }

    if (req.user.role !== "admin" && chat.dailyCount >= 5) {
      return res.status(403).json({ message: "Daily limit reached (5 messages)" });
    }

    const cleanedMessages = chat.messages.map(m => ({
      role: m.role,
      content: m.content,
    }));

    const groqMessages = [
      {
        role: "system",
        content: `You are a kind and caring mental health assistant. 
         Speak like a supportive friend. Be empathetic, warm, and conversational. 
         Always remember what the user has previously said and respond naturally.
        Summerize your reply in 75 tokens only.
        Detect the user's language. 
        If the user is using Hinglish (mix of Hindi and English), respond in the same style.
        Use Hindi words but write them in English letters (like "main thik hoon").
        DO NOT use full English or Hindi script. Do not translate fully into English.
        Keep your reply friendly, like a best friend.`,
      },
      ...cleanedMessages,

    ];

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192",
        messages: groqMessages,
        max_tokens: 75,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    
    chat.messages.push(
       { role: "user", content: message },
      { role: "assistant", content: reply }
    );

    chat.dailyCount += 1;
    await chat.save();

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat Error:", err.message);
    res.status(500).json({ message: "Chat failed" });
  }
};


const getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ user: req.user._id });
    if (!chat) return res.status(200).json({ messages: [] });

    return res.status(200).json({ messages: chat.messages });
  } catch (err) {
    console.error("Get Chat Error:", err.message);
    return res.status(500).json({ message: "Failed to load chat history" });
  }
};

module.exports = { chatWithAI , getChatHistory,};