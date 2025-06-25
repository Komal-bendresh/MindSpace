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

export const createJournalEntry = async ({ mood, text }) => {
  const res = await axios.post(
    "/api/journal",
    { mood, text },
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
