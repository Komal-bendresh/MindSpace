
import React, { useEffect, useState } from "react";
import {
  fetchMoodTrends,
  fetchEmotionFrequency,
} from "../api/auth";
import { fetchWeeklyInsights } from "../api/auth";
import WeeklyInsightsCard from "../components/MotivationSection";
import MoodTrendChart from "../components/MoodTrendChart";
import EmotionPieChart from "../components/EmotionPieChart";
import { toast } from "react-hot-toast";

const Analytics = () => {
  const [moodData, setMoodData] = useState([]);
  const [emotionData, setEmotionData] = useState([]);
  const [insights, setInsights] = useState(null);
 

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const mood = await fetchMoodTrends(7);
        const emotion = await fetchEmotionFrequency();
       

        setMoodData(mood);
        setEmotionData(emotion);
       
      } catch (err) {
        toast.error("Failed to load analytics");
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Your Mood Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodTrendChart data={moodData} />
        <EmotionPieChart data={emotionData} />
        <WeeklyInsightsCard />
        
      </div>
    </div>
  );
};

export default Analytics;
