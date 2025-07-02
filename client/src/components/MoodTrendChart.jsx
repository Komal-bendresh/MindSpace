import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Map mood string to emoji
const moodEmojiMap = {
  happy: "😄",
  relaxed: "😇",
  neutral: "😐",
  sad: "😢",
  angry: "🤬",
};

const MoodLineChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-sm text-gray-500">No mood trend data available</p>;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded shadow w-full h-[400px]">
      <h2 className="text-lg font-semibold p-2 mb-4">Mood Trend (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
          <Tooltip
            formatter={(value, name, props) => {
              const mood = props.payload?.mood || '';
              return [`${value} (${mood})`, 'Mood Score'];
            }}
          />
          <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2}>
            <LabelList
                dataKey="mood"
                content={({ x, y, value }) => (
                  <text x={x} y={y} dy={6} textAnchor="middle" fontSize={18}>
                    {moodEmojiMap[value?.toLowerCase()?.trim()] || "🧠"}
                  </text>
                )}
              />
          </Line>
        </LineChart>
      </ResponsiveContainer>
      </div>
  );
};

export default MoodLineChart;
