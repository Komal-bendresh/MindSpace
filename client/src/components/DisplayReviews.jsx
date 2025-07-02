import { useEffect, useState } from "react";
import axios from "axios";

const DisplayReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get("/api/reviews");
      setReviews(res.data.reviews);
      setAvg(res.data.avgRating);
    };
    fetchReviews();
  }, []);

  return (
    <div className="p-4 rounded bg-white dark:bg-zinc-900 shadow mt-6">
      <h3 className="text-lg font-semibold">⭐ Average Rating: {avg}</h3>
      <div className="mt-4 space-y-3">
        {reviews.map((r, i) => (
          <div key={i} className="border p-2 rounded">
            <p><strong>{r.user?.name}</strong> rated {r.rating} ⭐</p>
            <p className="text-sm text-gray-600 italic">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayReviews;
