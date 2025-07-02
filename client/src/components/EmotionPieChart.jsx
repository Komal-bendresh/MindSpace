// src/components/EmotionPieChart.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

const EmotionPieChart = ({ data }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Emotion Frequency</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
             <Pie
            data={Array.isArray(data) ? data : []}
            dataKey="count"
            nameKey="emotion"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
            >
            {Array.isArray(data) &&
                data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmotionPieChart;
