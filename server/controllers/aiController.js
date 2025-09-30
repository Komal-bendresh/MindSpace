const axios = require("axios");

const analyzeMood = async (req, res) => {
  const { journalText } = req.body;

  if (!journalText) {
    return res.status(400).json({ message: "Journal text is required" });
  }

  try {
    // Prompt asking Gemini to return strict JSON
   const prompt = `
You are a compassionate mental health assistant. 
Analyze the journal entry below and reply ONLY in JSON with these keys:
{
  "emotion": "detected mood or emotion (1-3 words, empathetic tone)",
  "selfCare": "1 self-care suggestion in 1 sentence, warm and supportive",
  "affirmation": "1 short daily affirmation, positive and encouraging",
  "goal": "1 weekly goal suggestion in 1 sentence, practical and kind"
}

Make sure each value is natural, empathetic, and written in plain English.

Journal:
"""${journalText}"""
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
        timeout: 50000,
      }
    );

    // Extract Gemini response
    const rawText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";


    // Clean Gemini output
    const cleaned = rawText
      .replace(/```json/gi, "") // remove starting ```json
      .replace(/```/g, "") // remove ending ```
      .trim();

    let analysisJson;
    try {
      analysisJson = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON Parse Error:", err.message, "Raw:", cleaned);
      return res.status(500).json({ message: "Failed to parse Gemini JSON" });
    }

    // Convert JSON to single analysis string (Groq-style)
    const analysis = `
Emotion: ${analysisJson.emotion}
Self-care: ${analysisJson.selfCare}
Affirmation: ${analysisJson.affirmation}
Goal: ${analysisJson.goal}
`;

    res.status(200).json({ analysis });
  } catch (error) {
    console.error("Gemini AI Error:", error.response?.data || error.message);
    res.status(500).json({ message: "AI analysis failed" });
  }
};

module.exports = {
  analyzeMood,
};