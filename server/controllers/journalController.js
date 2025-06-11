
const JournalEntry = require("../models/journalModel");

// ➕ Create a new journal entry
const createJournalEntry = async (req, res) => {
  const {  mood, title, text, imageUrl, audioUrl  } = req.body;

  try {
    if (!mood || !title) {
      return res.status(400).json({ message: "Mood and title are required." });
    }

    const newEntry = await JournalEntry.create({
      user: req.user._id,
    mood,
    title,
    text,
    imageUrl,
    audioUrl,
    });

    res.status(201).json({
      message: "Journal entry created successfully.",
      entry: newEntry,
    });
  } catch (err) {
    console.error("Create Journal Error:", err.message);
    res.status(500).json({ message: "Error creating journal entry." });
  }
};

//  Get all journal entries of logged-in user
const getUserJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ entries });
  } catch (err) {
    console.error("Fetch Journal Error:", err.message);
    res.status(500).json({ message: "Error fetching journal entries." });
  }
};


// edit journal
const editJournalEntry = async (req, res) => {
  const { id } = req.params;
  const { title, text, mood, imageUrl, audioUrl } = req.body;

  try {
    const updated = await JournalEntry.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, text, mood, imageUrl, audioUrl },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Entry not found" });

    res.status(200).json({ message: "Entry updated", entry: updated });
  } catch (err) {
    res.status(500).json({
        error,
        message: "Error occured while updating Entry "
     });
  }
};


//DELETE
const deleteJournalEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await JournalEntry.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deleted) return res.status(404).json({ message: "Entry not found" });

    res.status(200).json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};


// get entries by date
const getEntriesByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const start = new Date(date);
    const end = new Date(start);
    end.setDate(end.getDate() + 1); // next day

    const entries = await JournalEntry.find({
      user: req.user._id,
      createdAt: { $gte: start, $lt: end },
    }).sort({ createdAt: -1 });

    res.status(200).json({ entries });
  } catch (err) {
    res.status(500).json({ message: "Failed to get entries by date" });
  }
};


module.exports = {
  createJournalEntry,
  getUserJournalEntries,
  editJournalEntry,
  deleteJournalEntry,
  getEntriesByDate
};
