
import { useEffect, useState } from "react";
import axios from '../api/axios';
import {
  Star,
  TrendingUp,
  Users,
  MessageCircle,
} from 'lucide-react';

const DisplayReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/api/reviews");
        setReviews(res.data.reviews || []);
        setAvg(Number(res.data.avgRating));
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (index) => {
    const colors = [
      'from-pink-500 to-rose-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-purple-500 to-violet-500',
      'from-orange-500 to-amber-500',
      'from-indigo-500 to-blue-500'
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-gray-200 dark:border-zinc-700 mt-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-zinc-700 rounded-lg mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-gray-200 dark:border-zinc-700 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-gray-200 dark:border-zinc-700 mt-8 backdrop-blur-sm">
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Customer Reviews
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            What our community is saying
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {typeof avg === 'number' ? avg.toFixed(1) : '0.0'}
              </span>
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Users className="w-4 h-4" />
            {reviews.length} reviews
          </div>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="group border border-gray-200 dark:border-zinc-700 p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 hover:scale-[1.01] bg-gradient-to-br from-gray-50/50 to-white dark:from-zinc-800/50 dark:to-zinc-900"
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getAvatarColor(index)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                {getInitials(review.user?.name || 'Anonymous')}
              </div>

              <div className="flex-1">
                {/* User info and rating */}
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {review.user?.name || 'Anonymous User'}
                  </h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                      {review.rating}/5
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  "{review.comment}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No reviews yet
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            Be the first to share your experience!
          </p>
        </div>
      )}
    </div>
  );
};

export default DisplayReviews;
