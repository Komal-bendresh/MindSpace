// src/pages/admin/ReviewsList.jsx
import { useEffect, useState } from "react";
import axios from '../api/axios';

export default function ReviewsList() {
 const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await axios.get("/api/reviews", { withCredentials: true });
      setReviews(res.data.reviews);
  };

  const deleteReview = async (id) => {
    await axios.delete(`/api/admin/delete-review/${id}`, { withCredentials: true });
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
      <ul className="space-y-4">
        
        {reviews.map((r) => (
          <li key={r._id} className="p-4 border rounded">
            <p><strong>User:</strong> {r.user?.email}</p>
            <p><strong>Rating:</strong> {r.rating}</p>
            <p><strong>Review:</strong> {r.comment}</p>
            <button
              onClick={() => deleteReview(r._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
