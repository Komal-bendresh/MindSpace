import axios from './axios';

export const signupUser = async (data) => {
  return await axios.post('/signup', data);
};

export const verifyOtp = async (data) => {
  return await axios.post('/verify-otp', data);
};

export const loginUser = async (data) => {
  return await axios.post('/login', data);
};