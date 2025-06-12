const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  messages: [
    {
      role: String,
      content: String,
    },
  ],
  lastDate: String,
  dailyCount: { type: Number, default: 0 },
},{
  timestamps:true,
});

module.exports = mongoose.model("Chat", chatSchema);
