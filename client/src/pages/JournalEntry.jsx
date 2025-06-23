import React, { useEffect, useState } from "react";
import JournalForm from "../components/JournalForm";
import RecentEntriesPanel from "../components/RecentEntriesPanel";
import { getJournalEntries } from "../api/auth";

const JournalEntry = () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const res = await getJournalEntries();
     setEntries(res?.entries || []);
    //   if (typeof onEntryAdded === 'function') {
    // onEntryAdded();
  // }
       console.log("Submitting...")
    } catch (err) {
      console.error("Error fetching journals:", err);
    }
  };

useEffect(() => {
  fetchEntries(); 
}, []);
console.log("Fetching journals...");

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      <RecentEntriesPanel entries={entries} />
      <JournalForm onEntryAdded={fetchEntries} />
    </div>
  );
};

export default JournalEntry;
