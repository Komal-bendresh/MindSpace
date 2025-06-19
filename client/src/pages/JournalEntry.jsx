import React from 'react';

const JournalEntry = () => {
  return (
    <div className="flex h-screen font-sans text-[18px]/[22px]">
      
      {/* Left Panel - Journal History */}
      <aside className="w-1/3  text-white  bg-gray-100 dark:bg-zinc-900 p-4 overflow-y-auto">
        <h2 className="text-xl text-white font-semibold mb-4">🕓 Journal History</h2>
        {/* Later: Filter + List of entries */}
        <div className="space-y-2">
          <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-sm">Mood: 😊 <br />“Had a good day today…”</div>
          {/* Map entries here */}
        </div>
      </aside>

      {/* Right Panel - Mood + Entry */}
      <main className="flex-1 p-6 bg-white dark:bg-zinc-950">
        <h2 className="text-xl  text-white font-semibold mb-4">🧠 Add New Entry</h2>

        {/* Mood Selector */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Mood</label>
          <select className="w-full p-2 rounded-lg border dark:bg-zinc-800 dark:text-white">
            <option>😊 Happy</option>
            <option>😞 Sad</option>
            <option>😠 Angry</option>
            <option>😌 Relaxed</option>
            <option>😐 Neutral</option>
          </select>
        </div>

        {/* Journal Textarea */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Journal</label>
          <textarea
            rows={6}
            className="w-full p-3 rounded-lg border dark:bg-zinc-800 dark:text-white resize-none"
            placeholder="Write your thoughts..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
          Save Entry
        </button>
      </main>
    </div>
  );
};

export default JournalEntry;
