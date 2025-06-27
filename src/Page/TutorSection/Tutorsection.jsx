import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Sectiontitle from '../Sectiontitle/Sectiontitle';
import 'react-toastify/dist/ReactToastify.css';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Tutorsection = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/Tutor.json') 
      .then(res => res.json())
      .then(data => {
        const approvedSessions = data.filter(session => session.status === "approved");
        setSessions(approvedSessions);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch sessions:", err);
        setLoading(false);
      });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  if (loading) {
    return <div className="text-center py-10 text-lg font-semibold text-gray-600">Loading sessions...</div>;
  }

  return (
    <>
      <Sectiontitle
        heading="Our Trending Courses"
        subHeading="Check out most 🔥 courses in the market"
      />

      <div className="px-4 py-6 max-w-7xl mx-auto overflow-hidden">
        {sessions.length === 0 ? (
          <p className="text-center text-gray-600">No approved sessions found.</p>
        ) : (
          <Slider {...sliderSettings}>
            {sessions.map(session => (
              <div key={session._id} className="px-3">
                <div className="bg-white border rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col h-full">
                  <img
                    src={session.tutorImage}
                    alt={session.tutorName}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto mb-4 border"
                    loading="lazy"
                  />
                  <h2 className="text-xl font-bold text-center text-purple-700 mb-1">{session.sessionTitle}</h2>
                  <p className="text-center text-gray-800 font-medium">Tutor: {session.tutorName}</p>
                  <p className="text-sm text-gray-600 mt-2 mb-3 text-center">{session.sessionDescription}</p>
                  <div className="text-center mt-auto">
                    <p><strong>Fee:</strong> {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}</p>
                    <p><strong>Duration:</strong> {session.sessionDuration}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export default Tutorsection;
