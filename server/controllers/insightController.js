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

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 5000,
      }
    );

 const rawText = response.data.choices[0].message?.content;

const jsonMatch = rawText.match(/\{[\s\S]*?\}/);
if (!jsonMatch) {
  throw new Error("Invalid JSON format returned by GROQ");
}

   const insights = JSON.parse(jsonMatch[0]);
res.json(insights);

  } catch (err) {
    console.error("GROQ Insight Error:", err);
    res.status(500).json({ message: "Failed to generate insights" });
  }
};

module.exports = { getWeeklyInsights };
