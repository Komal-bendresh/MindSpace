import React, { useState, useEffect, useRef } from "react";
import { createJournalEntry, updateJournalEntry, analyzeJournalEntry,generatePlaylist, } from "../api/auth";
import { toast } from "react-hot-toast";
import PlaylistSection from "./PlaylistSection";
import { 
  Mic, 
  Volume2, 
  VolumeX, 
  Brain, 
  Music, 
  Save, 
  Edit3, 
  X, 
  Sparkles,
  Heart,
  MessageCircle,
  PlayCircle,
  ExternalLink,
  Loader2
} from "lucide-react";

const moods = [
  { label: "Happy", value: "happy", emoji: "😄", color: "from-yellow-400 to-orange-500" },
  { label: "Sad", value: "sad", emoji: "😢", color: "from-blue-400 to-blue-600" },
  { label: "Angry", value: "angry", emoji: "😠", color: "from-red-400 to-red-600" },
  { label: "Relaxed", value: "relaxed", emoji: "😌", color: "from-green-400 to-emerald-500" },
  { label: "Neutral", value: "neutral", emoji: "😐", color: "from-gray-400 to-gray-600" },
];

const JournalForm = ({ onEntryAdded, editingEntry, clearEditing }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [mood, setMood] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const recognitionRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [playlistUrl, setPlaylistUrl] = useState("");

    const selectedMoodData = moods.find(m => m.value === mood);

  // Initialize speech recognition once
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText((prev) => prev + " " + transcript);
        toast.success("Voice added to journal");
      };

      recognitionRef.current.onerror = () => {
        toast.error("Voice recognition failed");
      };
    }
  }, []);

  useEffect(() => {
  if (editingEntry) {
  setMood(editingEntry.mood || "");
  setTitle(editingEntry.title || "");
  setText(editingEntry.text || "");
  setAiAnalysis(editingEntry.analysis || "");
  setPlaylistUrl(editingEntry.playlistUrl || "");
  setShowAnalysis(!!editingEntry.analysis);

  // if (editingEntry.analysis) {
  //   handleTextToSpeech(editingEntry.analysis);
  // }

  } else {
    setMood("");
    setTitle("");
    setText("");
    setAiAnalysis("");
    setShowAnalysis(false);
  }
}, [editingEntry]);


  const handleAIAnalysis = async () => {
    if (!text.trim()) return toast.error("Please write your journal first.");

    try {
      setLoading(true);
      setAnalyzing(true);
    const result = await analyzeJournalEntry(text); 
    setAiAnalysis(result);
    // handleTextToSpeech(result);
    setShowAnalysis(true);

    const detected = result.match(/Emotion detected:\s*(\w+)/i)?.[1]?.toLowerCase();
    setEmotion(detected);
    

let generatedUrl = "";
if (detected) {
  try {
    const res = await generatePlaylist(detected); 
    generatedUrl = res.playlist;
    setPlaylistUrl(res.playlist);
  } catch (err) {
    toast.error("Playlist generation failed.");
  }
}


      const payload = { mood, title, text, analysis: result ,playlistUrl};


      if (!editingEntry) {
        await createJournalEntry(payload);
        toast.success("Journal auto-saved after analysis!");
        onEntryAdded();
      } else {
        await updateJournalEntry(editingEntry._id, payload);
        toast.success("Journal updated with new analysis!");
      }

    } catch (err) {
      toast.error("AI analysis failed.Our AI assistant is temporarily unavailable. Please try again shortly.");
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    if (!mood || !text) {
      toast.error("Please select a mood and write something.");
      return;
    }

    try {
      setLoading(true);
      const payload = { mood, title, text, analysis: aiAnalysis ,playlistUrl};
      if (editingEntry) {
        await updateJournalEntry(editingEntry._id, payload);
        toast.success("Journal updated!");
        clearEditing();
      } else {
        await createJournalEntry(payload);
        toast.success("Journal saved!");
      }

      setMood("");
      setTitle("");
      setText("");
      setAiAnalysis("");
      setShowAnalysis(false);
      onEntryAdded();
    } catch (err) {
      toast.error("Error saving entry.");
    } finally {
      setLoading(false);
    }
  };

const handleAnalysis = async () => {
  const analysis = await analyzeJournalEntry(text);
  setAnalysisText(analysis);
  const detected = analysis.match(/Emotion detected:\s*(\w+)/i)?.[1]?.toLowerCase();
  setEmotion(detected);
};

  const handleSpeechToText = () => {
    if (!recognitionRef.current) return toast.error("Speach To Text Failed");
    recognitionRef.current.start();
    toast("Listening...");
  };

  const handleTextToSpeech = (textToSpeak) => {
  if (!window.speechSynthesis) return toast.error("Text To Speach Failed");

  if (isSpeaking) {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    return;
  }

  const utter = new SpeechSynthesisUtterance(textToSpeak);
  utter.lang = "en-US";

  utter.onend = () => setIsSpeaking(false);
  utter.onerror = () => {
    setIsSpeaking(false);
  };

  setIsSpeaking(true);
  speechSynthesis.speak(utter);


};

  return (
    <div className="w-full lg:w-2/3 p-4">
      {/* <h2 className="text-lg font-semibold mb-4">{editingEntry ? "Edit Entry" : "New Entry"}</h2>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg dark:bg-zinc-900 dark:border-zinc-700"
          placeholder="Title (optional)"
        />
      </div> */}

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {editingEntry ? "Edit Your Journal" : "New Journal Entry"}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-13">
          Express your thoughts and let AI help you understand your emotions
        </p>
      </div>

      <div className="mb-6">
        <label className=" mb-3 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 border-2 border-gray-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          placeholder="Give your journal entry a title (optional)"
        />
      </div>


      <div className="mb-6">
        <label className=" mb-4 font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Heart className="w-4 h-4" />
          How are you feeling today?
        </label>

        <div className="grid grid-cols-5 gap-3">
          {moods.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMood(m.value)}
              className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                mood === m.value
                  ? "border-purple-500 bg-gradient-to-r " + m.color + " shadow-lg"
                  : "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:border-purple-300 dark:hover:border-purple-600"
              }`}
            >
              <div className="text-3xl mb-2 ">{m.emoji}</div>
              <div className={`text-sm font-medium ${
                mood === m.value 
                  ? "text-white" 
                  : "text-gray-700 dark:text-gray-300"
              }`}>
                {m.label}
              </div>
              {mood === m.value && (
                <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
              )}
            </button>
          ))}
        </div>
        {mood && (
          <div className="mt-3 flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
            <Sparkles className="w-4 h-4" />
            Selected mood: {selectedMoodData?.label}
          </div>
        )}
      </div>




      <div className="mb-4">
        <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
          Share your thoughts
        </label>
        <div className="relative">
          <textarea
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-4 border-2 border-gray-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            placeholder="Write about your day, your feelings, your thoughts... Let it all out. This is your safe space."
          />
          </div>

          <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={handleSpeechToText}
            disabled={isSpeaking}
            className={`flex items-center mb-2 gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isSpeaking
                ? "bg-red-500 text-white animate-pulse"
                : "bg-green-600 hover:bg-green-700 text-white hover:shadow-lg"
            }`}
          >
            <Mic className="w-4 h-4" />
            {isSpeaking ? "Listening..." : "Dictate"}
          </button>
          
          <button
            type="button"
            onClick={() => handleTextToSpeech(text)}
            disabled={!text || isSpeaking}
            className="flex items-center mb-2 gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            {isSpeaking ? "Stop Speaking" : "Read Aloud"}
          </button>
        </div>
      

         <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleSubmit}
          disabled={loading || !mood || !text}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02]"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {loading 
            ? (editingEntry ? "Updating..." : "Saving...") 
            : (editingEntry ? "Update Entry" : "Save Entry")
          }
        </button>

        <button
          onClick={handleAIAnalysis}
          disabled={!text || analyzing}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02]"
        >
          {analyzing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Brain className="w-4 h-4" />
          )}
          {analyzing ? "Analyzing..." : "AI Mood Analysis"}
        </button>


        {editingEntry && (
          <button
            onClick={clearEditing}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 px-4 py-3 rounded-xl font-medium transition-all duration-200"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        )}
      </div>
      </div>

     <button
     onClick={async () => {
    if (!mood && !emotion) {
      toast.error("Please select a mood or run AI analysis.");
      return;
    }
    try {
      const detectedMood = emotion || mood;
      const res = await generatePlaylist(detectedMood);
      setPlaylistUrl(res.playlist);
      toast.success("Playlist generated!");
    } catch (err) {
      toast.error("Failed to generate playlist.");
    }
  }}
  className="flex items-center gap-1 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-[1.02]"
>
  🎵 Generate Playlist
</button>

     {showAnalysis && aiAnalysis && (
  <div className="mt-4 p-4 bg-gray-100 dark:bg-zinc-800 rounded overflow-auto">
    <h3 className="font-semibold mb-2">🧠 AI Mood Analysis</h3>
    <pre className="text-sm whitespace-pre-wrap">{aiAnalysis}</pre>

    <div className="flex flex-wrap gap-3 mt-4">
      <button
        onClick={() => handleTextToSpeech(aiAnalysis)}
        className="bg-indigo-600 text-white px-4 py-1 rounded"
      >
        {isSpeaking ? "⏹️ Stop Speaking" : "🔊 Speak Analysis"}
      </button>
    </div>

    {playlistUrl && (
      <div className="mt-6">
        <h4 className="text-md font-semibold mb-2">🎵 Mood-Based Playlist</h4>
        {playlistUrl.includes("spotify") || playlistUrl.includes("youtube") ? (
          
          <iframe
            src={playlistUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Mood Playlist"
            className="rounded-lg shadow"
          ></iframe>
        ) : (
          <a
            href={playlistUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-pink-600 text-white px-4 py-1 rounded inline-block"
          >
            🎧 Listen to Playlist
          </a>
        )}
      </div>
    )}
  </div>
)}

     
    </div>
    
  );
};

export default JournalForm;
