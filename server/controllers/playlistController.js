const User= require("../models/User")

const generatePlaylist = async (req, res) => {
  const { emotion } = req.body;
  const user = await User.findById(req.user._id);

  const today = new Date().toDateString();
  const lastUsed = user.playlistLimit?.lastUsed?.toDateString();

  // Limit: 1 playlist/day for free users
  if (!user.isPremium && lastUsed === today && user.playlistLimit.count >= 1) {
    return res.status(403).json({
      success: false,
      message: "Daily playlist limit reached. Upgrade for unlimited access.",
    });
  }

  const playlistMap = { /* same as before */ };
  const mood = emotion?.toLowerCase() || "neutral";
  const playlistUrl = playlistMap[mood] || playlistMap["neutral"];

  if (user.isPremium) {
  user.savedPlaylists.push({
    url: playlistUrl,
    mood,
    date: new Date(),
  });
  await user.save();
}

  // Update usage
  if (lastUsed !== today) {
    user.playlistLimit = { count: 1, lastUsed: new Date() };
  } else {
    user.playlistLimit.count += 1;
  }

  await user.save();

  res.status(200).json({
    success: true,
    playlist: playlistUrl,
    message: `Here's your mood-lifting playlist 🌈`,
  });
};


const getSavedPlaylists = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    playlists: user.savedPlaylists.reverse(), // newest first
  });
};


module.exports = { generatePlaylist , getSavedPlaylists };
