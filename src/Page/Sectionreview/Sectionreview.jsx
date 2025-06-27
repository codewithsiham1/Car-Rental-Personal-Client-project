import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Sectionreview = () => {
  const { id: sessionId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reviews') 
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter((rev) => rev.sessionId === sessionId);
        setReviews(filtered);
      });
  }, [sessionId]);

  return (
    <div className='mt-10 px-4 sm:px-6 md:px-10 max-w-5xl mx-auto'>
      <h3 className='text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left'>
        Student Reviews
      </h3>
      {
        reviews.length > 0 ? (
          reviews.map((rev, i) => (
            <div 
              key={i} 
              className='border p-4 sm:p-6 rounded-lg mb-4 bg-gray-50 shadow-sm hover:shadow-md transition'
            >
              <p className='font-semibold text-base sm:text-lg'>{rev.reviewerName}</p>
              <p className='text-yellow-500 text-sm sm:text-base mb-2'>{"⭐".repeat(rev.rating)}</p>
              <p className='text-gray-700 text-sm sm:text-base'>{rev.comment}</p>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500 text-sm sm:text-base'>No reviews yet.</p>
        )
      }
    </div>
  );
};

export default Sectionreview;
