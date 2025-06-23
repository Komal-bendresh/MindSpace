import React, { useState } from "react";
import { getJournalEntries } from "../api/auth"

const moods = [
  { label: "Happy", value: "happy", emoji: "😄" },
  { label: "Sad", value: "sad", emoji: "😢" },
  { label: "Angry", value: "angry", emoji: "😠" },
  { label: "Relaxed", value: "relaxed", emoji: "😌" },
  { label: "Neutral", value: "neutral", emoji: "😐" },
];

const RecentEntriesPanel = ({  entries = []  }) => {

 

  return (
    <div className="w-full lg:w-1/3 border-r border-gray-200 dark:border-zinc-800 p-4 overflow-y-auto max-h-[80vh]">
      <h2 className="text-lg font-semibold mb-4">Your Entries</h2>
      {entries.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No entries yet.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
            <li
              key={entry._id}
              className="p-3 bg-gray-100 dark:bg-zinc-800 rounded-lg shadow text-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl">
                  {moods.find((m) => m.value === entry.mood)?.emoji || "📝"}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="line-clamp-2">{entry.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentEntriesPanel;
