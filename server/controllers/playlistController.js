const User = require("../models/User");

const generatePlaylist = async (req, res) => {
  const { emotion } = req.body;
  const user = await User.findById(req.user._id);

  const today = new Date().toDateString();
  const lastUsed = user.playlistLimit?.lastUsed?.toDateString();

  // Smart mood → playlist logic
  const mood = emotion?.toLowerCase() || "neutral";

  const playlistMap = {
  happy: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC",   // Energetic, Feel Good
  sad: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1",     // Calm & Comforting
  angry: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO",   // Chill & Lo-Fi
  relaxed: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO", // Ambient
  neutral: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4fpCWaHOned", // Balanced & Uplifting
};


  const moodBasedRedirect = {
    happy: playlistMap.happy, // reinforce joy
    sad: playlistMap.relaxed,   // uplift mood
    angry: playlistMap.relaxed, // calm down
    relaxed: playlistMap.happy, // maintain vibe
    neutral: playlistMap.neutral, // keep light
  };

  const playlistUrl = moodBasedRedirect[mood] || playlistMap.neutral;

  // Save to user's history

  
  await user.save();

  res.status(200).json({
    success: true,
    playlist: playlistUrl,
    message: `Here's a playlist to help you with your "${mood}" mood 🎶`,
  });
};



module.exports = { generatePlaylist };
