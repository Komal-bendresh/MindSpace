import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/verify-otp', { email, otp });
      toast.success(res.data.message);
      // redirect to home
      window.location.href = '/home';
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    if (!email) {
      toast.warn("Please enter your email first");
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Verify OTP</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="email"
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
        <button
          type="button"
          className="w-full mt-2 text-sm text-blue-600 underline"
          onClick={handleResend}
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
