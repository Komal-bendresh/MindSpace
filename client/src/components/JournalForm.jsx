import React, { useState, useEffect } from "react";
import { createJournalEntry, updateJournalEntry } from "../api/auth";
import { toast } from "react-hot-toast";

const moods = [
  { label: "Happy", value: "happy", emoji: "😄" },
  { label: "Sad", value: "sad", emoji: "😢" },
  { label: "Angry", value: "angry", emoji: "😠" },
  { label: "Relaxed", value: "relaxed", emoji: "😌" },
  { label: "Neutral", value: "neutral", emoji: "😐" },
];

const JournalForm = ({ onEntryAdded, editingEntry, clearEditing }) => {
  const [mood, setMood] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // Prefill data when editing
  useEffect(() => {
    if (editingEntry) {
      setMood(editingEntry.mood || "");
      setTitle(editingEntry.title || "");
      setText(editingEntry.text || "");
    } else {
      setMood("");
      setTitle("");
      setText("");
    }
  }, [editingEntry]);

  const handleSubmit = async () => {
    if (!mood || !text) {
      toast.error("Please select a mood and write something.");
      return;
    }

    try {
      setLoading(true);
      if (editingEntry) {
        await updateJournalEntry(editingEntry._id, { mood, title, text });
        toast.success("Journal updated!");
        clearEditing(); // Exit edit mode
      } else {
        await createJournalEntry({ mood, title, text });
        toast.success("Journal saved!");
      }

      // Clear form
      setMood("");
      setTitle("");
      setText("");
      onEntryAdded(); // Refresh entries
    } catch (err) {
      toast.error("Error saving entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-2/3 p-4">
      <h2 className="text-lg font-semibold mb-4">
        {editingEntry ? "Edit Entry" : "New Entry"}
      </h2>

      {/* Title input */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-white"
          placeholder="Title (optional)"
        />
      </div>

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

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading
            ? editingEntry
              ? "Updating..."
              : "Saving..."
            : editingEntry
            ? "Update Entry"
            : "Save Entry"}
        </button>

        {editingEntry && (
          <button
            type="button"
            onClick={clearEditing}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default JournalForm;
