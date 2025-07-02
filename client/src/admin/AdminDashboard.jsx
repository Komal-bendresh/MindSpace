
import { useEffect, useState } from "react";
import UsersList from "./UsersList";
import ReviewsList from "./ReviewsList";
import axios from "axios";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
  const [tab, setTab] = useState("users");

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get("/api/admin/stats", { withCredentials: true });
      setStats(res.data);
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <button
  onClick={() => setTab("users")}
  className={`block mb-4 px-4 py-2 rounded ${
    tab === "users"
      ? "bg-blue-500 text-white font-semibold"
      : "bg-gray-200 text-gray-700"
  }`}
>
  Users
</button>

<button
  onClick={() => setTab("reviews")}
  className={`block px-4 py-2 rounded ${
    tab === "reviews"
      ? "bg-blue-500 text-white font-semibold"
      : "bg-gray-200 text-gray-700"
  }`}
>
  Reviews
</button></div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {tab === "users" && <UsersList />}
        {tab === "reviews" && <ReviewsList />}
      </div>
    </div>
  );
}
