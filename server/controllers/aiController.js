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
  "emotion": "detected mood or emotion",
  "selfCare": "1 self-care suggestion",
  "affirmation": "1 short daily affirmation",
  "goal": "1 weekly goal suggestion"
}

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
       timeout: 30000,
      }
    );

    // Extract Gemini response
    const rawText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Match JSON inside response
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Gemini did not return valid JSON");
    }

    const analysis = JSON.parse(jsonMatch[0]);

    res.status(200).json(analysis);
  } catch (error) {
    console.error("Gemini AI Error:", error.response?.data || error.message);
    res.status(500).json({ message: "AI analysis failed" });
  }
};

module.exports = {
  analyzeMood,
};
