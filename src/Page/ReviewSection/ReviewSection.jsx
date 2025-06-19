import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewSection = () => {
  const { sessionId } = useParams(); // URL থেকে sessionId নিবে
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      })
      .catch(() => setReviews([]));
  }, [sessionId]);

  return (
    <div className="max-w-7xl mx-auto p-5 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">Student Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {reviews.map(({ reviewId, reviewerName, rating, comment, timestamp }) => (
            <div
              key={reviewId}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg text-gray-800">{reviewerName}</h3>
                <span className="text-yellow-400 font-bold text-xl">
                  {'⭐'.repeat(rating)}
                </span>
              </div>
              <p className="text-gray-700 mb-4 min-h-[80px]">{comment}</p>
              <p className="text-xs text-gray-400 italic text-right">
                {new Date(timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
