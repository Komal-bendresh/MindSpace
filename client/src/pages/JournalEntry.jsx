import React, { useEffect, useState } from "react";
import JournalForm from "../components/JournalForm";
import RecentEntriesPanel from "../components/RecentEntriesPanel";
import { getJournalEntries } from "../api/auth";
import {deleteJournalEntry} from '../api/auth';
import {updateJournalEntry } from '../api/auth';
import { toast } from "react-toastify";


const JournalEntry = () => {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  const fetchEntries = async () => {
  try {
    const entries = await getJournalEntries(); 
    setEntries(entries || []);
  } catch (err) {
    console.error("Error fetching journals:", err);
  }
};

      const handleEdit = (entry) => {
        setEditingEntry(entry); 
      };

      const handleDelete = async (id) => {
        try {
          await deleteJournalEntry(id);
          toast.success("Journal Deleted Successfully")
          fetchEntries(); 
        } catch (err) {
          console.error("Delete failed", err);
        }
      };

useEffect(() => {
  fetchEntries(); 
}, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 mt-10">
      
      <JournalForm 
  onEntryAdded={fetchEntries}
  editingEntry={editingEntry}
  clearEditing={() => setEditingEntry(null)}
  />
  <RecentEntriesPanel entries={entries}
       onEdit={handleEdit}
       onDelete={handleDelete} />
    </div>
  );
};

export default JournalEntry;
