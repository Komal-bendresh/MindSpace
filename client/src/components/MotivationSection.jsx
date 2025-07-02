import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeeklyInsightsCard = () => {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getTips = async () => {
      const res = await axios.get("/api/insights/tips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInsights(res.data);
    };
    getTips();
  }, []);

  return (
    <div className="p-4 rounded shadow bg-white dark:bg-zinc-900">
      <h2 className="text-lg font-bold mb-2">Your Weekly Insights</h2>
      <p className="mb-2">🌟 Motivation: {insights?.motivation}</p>
      <p className="mb-1 text-indigo-600">📈 Most Felt Emotion: <strong>{insights?.topEmotion}</strong></p>
      <p className="text-sm text-gray-500 italic">💡 Tip: {insights?.emotionTip}</p>
    </div>
  );
};

export default WeeklyInsightsCard;
