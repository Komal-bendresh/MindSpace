import React, { useState } from "react";
import { createJournalEntry } from "../api/auth";
import { toast } from "react-hot-toast";

const moods = [
  { label: "Happy", value: "happy", emoji: "😄" },
  { label: "Sad", value: "sad", emoji: "😢" },
  { label: "Angry", value: "angry", emoji: "😠" },
  { label: "Relaxed", value: "relaxed", emoji: "😌" },
  { label: "Neutral", value: "neutral", emoji: "😐" },
];

const JournalForm = () => {
  const [mood, setMood] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
   
    if (!mood || !text) {
      toast.error("Please select a mood and write something.");
      return;
    }


     try {
      setLoading(true);
      await createJournalEntry({ mood, title, text });
      toast.success("Journal saved!");
      setMood("");
      setText("");
      setTitle("");
      onEntryAdded(); 
      console.log("Entry saved") 
    } catch (err) {
      toast.error("Error saving entry.");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="w-full lg:w-2/3 p-4">
      <h2 className="text-lg font-semibold mb-4">New Entry</h2>

      {/* Emoji Mood Selector */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Mood</label>
        <div className="flex gap-3">
          {moods.map((m) => (
            <button
              key={m.value}
              type="button"
              onClick={() => setMood(m.value)}
              className={`text-3xl transition-all p-2 rounded-full border ${
                mood === m.value
                  ? "bg-blue-100 dark:bg-blue-800 border-blue-500"
                  : "bg-gray-100 dark:bg-zinc-800 border-transparent"
              }`}
            >
              {m.emoji}
            </button>
          ))}
        </div>
        {mood && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Selected: {mood}
          </p>
        )}
      </div>

      {/* Textarea */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Journal</label>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-white"
          placeholder="Write your thoughts..."
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Entry"}
      </button>
    </div>
  );
};

export default JournalForm;
