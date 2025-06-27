import React, { useState, useEffect } from 'react';

const ReviewSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/reviews.json')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Student Reviews
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map(({ reviewId, reviewerName, rating, comment, timestamp }) => (
            <div
              key={reviewId}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{reviewerName}</h3>
                <div className="text-yellow-400 text-xl font-bold">
                  {"⭐".repeat(rating)}
                </div>
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
