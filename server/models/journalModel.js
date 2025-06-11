
const mongoose = require("mongoose");

const journalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mood: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  text: {
    type: String,
    default: "",
  },
  imageUrl: {
  type: String,
  default: "",
},
audioUrl: {
  type: String,
  default: "",
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JournalEntry", journalEntrySchema);
