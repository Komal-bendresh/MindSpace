const JournalEntry = require("../models/journalModel");

// Get mood trend (last 7 or 30 days)
const moodScoreMap = {
  happy: 5,
  relaxed: 4,
  neutral: 3,
  sad: 2,
  angry: 1,
};

// Get mood trend (last 7 or 30 days) — Updated with numeric score
const getMoodTrends = async (req, res) => {
  const { range } = req.query; // '7' or '30'
  const days = parseInt(range) || 7;
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - days);

  try {
    const entries = await JournalEntry.find({
      user: req.user._id,
      createdAt: { $gte: fromDate },
    }).sort({ createdAt: 1 });

    const data = entries.map((entry) => ({
      date: entry.createdAt.toISOString().slice(0, 10),
      mood: entry.mood,
      score: moodScoreMap[entry.mood.toLowerCase()] || 3, // default neutral
    }));

    res.json({ data });
  } catch (err) {
    res.status(500).json({ message: "Failed to get mood trends" });
  }
};

// Get emotion frequency (for pie chart)
const getEmotionFrequency = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id });
    const moodCount = {};

    entries.forEach(entry => {
      moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
    });

      const pieData = Object.keys(moodCount).map((emotion) => ({
      emotion,
      count: moodCount[emotion],
    }));
    res.json({ data: pieData }); 
  } catch (err) {
    res.status(500).json({ message: "Failed to get emotion frequency" });
  }
};


module.exports = { getMoodTrends, getEmotionFrequency };