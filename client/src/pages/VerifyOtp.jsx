import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { verifyOtp } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const VerifyOtp = () => {
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const [debugError, setDebugError] = useState('');


  useEffect(() => {
    const fromSignup = location.state?.email;
    if (fromSignup) {
      setEmail(fromSignup);
      sessionStorage.setItem("pendingSignupEmail", fromSignup);
    } else {
      const saved = sessionStorage.getItem("pendingSignupEmail");
      if (saved) setEmail(saved);
    }
  }, [location]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await verifyOtp({ email, otp });
      const { user } = res.data;
      const fakeToken = "session-cookie";
      login(fakeToken, user);
      sessionStorage.removeItem("pendingSignupEmail");
      toast.success(res.data.message);
      window.location.href = '/journal';
    } catch (err) {
     
       const message = err.response?.data?.message || err.message || 'OTP verification failed';
      toast.error(message);
      setDebugError(JSON.stringify(err.response?.data || err.message));
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (!email) {
      toast.warn("Email missing. Please signup again.");
      return;
    }

    try {
      const res = await axios.post('/api/auth/resend-otp', { email });
      toast.success(res.data.message || "OTP resent");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resending OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-lg transition-all duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
        Verify OTP
      </h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <button
          type="button"
          className="w-full mt-2 text-sm text-blue-600 dark:text-blue-400 underline"
          onClick={handleResend}
        >
          Resend OTP
        </button>
      </form>
      {debugError && (
  <p className="mt-4 text-sm text-red-600 break-words">
    Debug Error: {debugError}
  </p>
)}
<p className="text-xs text-gray-500">Email: {email}</p>
<p className="text-xs text-gray-500">OTP: {otp}</p>

    </div>
  );
};

export default VerifyOtp;
