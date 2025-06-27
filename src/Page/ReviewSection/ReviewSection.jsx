import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const ReviewSection = () => {
  const { sessionId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        const sessionReviews = data.filter(r => r.sessionId === sessionId);
        setReviews(sessionReviews);
      })
      .catch(() => setReviews([]));
  }, [sessionId]);

  return (
    <div className="max-w-7xl mx-auto p-5 bg-gray-50 rounded-md shadow-md">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-blue-700 text-center">
        Student Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center text-base sm:text-lg">No reviews found.</p>
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
          style={{ paddingBottom: '3rem' }} // for pagination spacing
        >
          {reviews.map(({ reviewId, reviewerName, rating, comment, timestamp }) => (
            <SwiperSlide
              key={reviewId}
              style={{ width: "280px", maxWidth: "90vw" }} // maxWidth limits on small screens
              className="mx-auto"
            >
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 h-full flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg text-gray-800 truncate max-w-[150px] sm:max-w-full">{reviewerName}</h3>
                  <span className="text-yellow-400 font-bold text-xl select-none">
                    {"⭐".repeat(rating)}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 flex-grow min-h-[80px] overflow-hidden">{comment}</p>
                <p className="text-xs text-gray-400 italic text-right mt-auto">
                  {new Date(timestamp).toLocaleDateString()}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ReviewSection;
