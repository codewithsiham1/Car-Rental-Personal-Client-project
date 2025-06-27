import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ReviewSection = () => {
  const { sessionId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;

    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter reviews for the given sessionId
        const sessionReviews = data.filter(
          (r) => String(r.sessionId) === String(sessionId)
        );
        setReviews(sessionReviews);
      })
      .catch((error) => {
        console.error("Failed to load reviews:", error);
        setReviews([]);
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-5 bg-gray-50 rounded-md shadow-md text-center">
        <p className="text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-5 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">
        Student Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center">No reviews found.</p>
      ) : (
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 30,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
        >
          {reviews.map(
            ({ reviewId, reviewerName, rating, comment, timestamp }) => (
              <SwiperSlide key={reviewId} style={{ width: "300px" }}>
                <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 h-full">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {reviewerName}
                    </h3>
                    <span className="text-yellow-400 font-bold text-xl">
                      {"⭐".repeat(rating)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 min-h-[80px]">{comment}</p>
                  <p className="text-xs text-gray-400 italic text-right">
                    {new Date(timestamp).toLocaleDateString()}
                  </p>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      )}
    </div>
  );
};

export default ReviewSection;
