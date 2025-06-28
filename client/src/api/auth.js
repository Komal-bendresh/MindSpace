import axios from './axios';

export const signupUser = async (data) => {
  return await axios.post('/api/auth/signup', data);
};

export const verifyOtp = async (data) => {
  return await axios.post('/api/auth/verify-otp', data);
};

export const loginUser = async (data) => {
  return await axios.post('/api/auth/login', data);
};

export const createJournalEntry = async ({ mood, text ,title}) => {
  const res = await axios.post(
    "/api/journal",
    { mood, text ,title},
    { withCredentials: true } 
  );
  return res.data.entry;
};

export const getJournalEntries = async () => {
  const res = await axios.get("/api/journal/my-entries", {
    withCredentials: true, 
  });
  return res.data.entries;
};

export const deleteJournalEntry = async (id) => {
  return await axios.delete(`/api/journal/delete/${id}`);
};

export const updateJournalEntry = async (id, data) => {
  return await axios.put(`/api/journal/edit/${id}`, data);
};

export const analyzeJournalEntry = async (text) => {
  const res = await axios.post("/api/ai/analyze", { journalText: text });
  return res.data.analysis;
};

export const sendMessageToAI = async (message) => {
  const token = localStorage.getItem("token");

  const res = await axios.post( "/api/chat/ai", { message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.reply;
};


export const getChatHistory = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/chat/chat-history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.messages;
};