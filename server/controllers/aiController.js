const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const analyzeMood = async (req, res) => {
  const { journalText } = req.body;

  if (!journalText) {
    return res.status(400).json({ message: "Journal text is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", 
      messages: [
        {
          role: "system",
          content: `You are a compassionate mental health assistant. 
          Analyze the journal entry below and reply with:
          - Emotion detected
          - 1 Self-care suggestion
          - 1 Daily affirmation
          - 1 Weekly goal suggestion
          Reply in max 100 words.`,
        },
        {
          role: "user",
          content: journalText,
        },
      ],
      max_tokens: 150, // to stay within ~100 words
      temperature: 0.7,
    });

    const analysis = response.choices[0].message.content;
    res.status(200).json({ analysis });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ message: "AI analysis failed" });
  }
};

module.exports = {
    analyzeMood
} ;
