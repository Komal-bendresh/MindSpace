const axios = require("axios");
const JournalEntry = require("../models/journalModel.js");
require("dotenv").config();

const getWeeklyInsights = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id });
    const combinedText = entries.map(e => e.text).join(" ");

    const prompt = `
You are a helpful mental wellness assistant.

1. Based on the journal text, identify the most common mood or emotion.
2. Suggest one helpful tip for that mood.
3. Give a short motivational quote (1–2 lines only).

Journal:
"""${combinedText}"""

Respond in this JSON format:
{
  "topEmotion": "...",
  "emotionTip": "...",
  "motivation": "..."
}
`;

    // ✅ Gemini API call
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    // ✅ Gemini response parsing
    const rawText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonMatch = rawText.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      throw new Error("Invalid JSON format returned by Gemini");
    }

    const insights = JSON.parse(jsonMatch[0]);
    res.json(insights);

  } catch (err) {
    console.error("Gemini Insight Error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to generate insights" });
  }
};

module.exports = { getWeeklyInsights };
