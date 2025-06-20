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

export const createJournalEntry = async (data) => {
  return await axios.post('/api/journal', data);
};
