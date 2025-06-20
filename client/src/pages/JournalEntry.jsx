import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // optional, for feedback
import {createJournalEntry} from "../api/auth";

const JournalEntry = () => {
  const [mood, setMood] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!mood || !text) {
      toast.error('Please select a mood and write something.');
      return;
    }

    try {
      setLoading(true);
      const res = await createJournalEntry({ mood, text });
      toast.success('Journal saved!');
      setText('');
      setMood('');
    } catch (error) {
      toast.error('Error saving entry.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen font-sans text-[18px]/[22px]">

      {/* Left Panel - History Placeholder */}
      <aside className="w-1/3 bg-gray-100 dark:bg-zinc-900 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">🕓 Journal History</h2>
        {/* We'll add real entries here later */}
        <p className="text-gray-500 dark:text-zinc-400">No entries yet.</p>
      </aside>

      {/* Right Panel */}
      <main className="flex-1 p-6 bg-white dark:bg-zinc-950">
        <h2 className="text-xl font-semibold mb-4">🧠 Add New Entry</h2>

        {/* Mood Selector */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2 rounded-lg border dark:bg-zinc-800 dark:text-white"
          >
            <option value="">Select mood</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😞 Sad</option>
            <option value="angry">😠 Angry</option>
            <option value="relaxed">😌 Relaxed</option>
            <option value="neutral">😐 Neutral</option>
          </select>
        </div>

        {/* Journal Textarea */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Journal</label>
          <textarea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:text-white resize-none"
            placeholder="Write your thoughts..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          {loading ? 'Saving...' : 'Save Entry'}
        </button>
      </main>
    </div>
  );
};

export default JournalEntry;
