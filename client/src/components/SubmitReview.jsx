import { useState } from "react";
import axios from "axios";

const SubmitReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "/api/reviews",
      { rating, comment },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Thanks for your feedback!");
    setRating(0);
    setComment("");
  };

  return (
    <div className="p-4 rounded bg-white dark:bg-zinc-800 shadow max-w-md mx-auto">
      <h3 className="font-semibold mb-2 text-lg">Rate MindSpace</h3>

      {/* Star Rating */}
      <div className="flex mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="text-2xl transition-colors"
          >
            <span className={star <= (hover || rating) ? "text-yellow-400" : "text-gray-400"}>
              ★
            </span>
          </button>
        ))}
      </div>

      {/* Textarea for review */}
      <textarea
        className="w-full mt-2 p-2 rounded border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-black dark:text-white"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        rows={4}
      />

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        disabled={rating === 0}
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitReview;
