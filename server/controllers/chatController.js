const Chat = require("../models/chatModel")

const chatWithAI = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "Message required" });

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

    if (req.user.role !== "admin") {//admin can chat unlimited time
    if (chat.dailyCount >= 5) {
      return res.status(403).json({ message: "Daily limit reached (5 messages)" });
    }

     }
    chat.messages.push({ 
        role: "user", 
        content: message 
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chat.messages,
      max_tokens: 75,
    });

    const reply = completion.choices[0].message.content;

    chat.messages.push({ 
        role: "assistant", 
        content: reply });
    chat.dailyCount += 1;

    await chat.save();

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat Error:", err.message);
    res.status(500).json({ message: "Chat failed" });
  }
};


module.exports = { chatWithAI };
