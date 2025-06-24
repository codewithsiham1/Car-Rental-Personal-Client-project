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
      <div className='mt-10'>
      <h3 className='text-2xl font-bold mb-4'>Student Reviews</h3>
      {
        reviews.length > 0 ? reviews.map((rev, i) => (
          <div key={i} className='border p-3 rounded mb-2 bg-gray-50'>
            <p className='font-semibold'>{rev.reviewerName}</p>
            <p className='text-yellow-500'>{"⭐".repeat(rev.rating)}</p>
            <p className='text-sm text-gray-600'>{rev.comment}</p>
          </div>
        )) : <p>No reviews yet.</p>
      }
    </div>
    );
};

export default Sectionreview;