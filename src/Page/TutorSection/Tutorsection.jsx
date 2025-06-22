import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import Sectiontitle from '../Sectiontitle/Sectiontitle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Make sure to import these CSS globally (App.jsx or main.jsx)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { axiosSecure } from '../../Hooks/UseaxiosSecure/UseAxiosSecure';
import Usecart from '../../Hooks/Usecart/Usecart';
import Useauth from '../../Hooks/Useauth/Useauth';
import Swal from 'sweetalert2';

const Tutorsection = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
 const navigate=useNavigate();
 const {user}=Useauth()
 const [,refetch]=Usecart()
  useEffect(() => {
    fetch('/Tutor.json') // must be inside public/
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

  const handleAddToCart = (session) => {
      console.log('clicked',session)
      if(user && user.email){
        // TODO:send cart to database
        const cartItem = {
      tutorId: session._id,
      email: user.email,
      name: session.tutorName,
      image: session.tutorImage,
      price: session.registrationFee
    };
    axiosSecure.post('/cart',cartItem)
    .then((res)=>{
      console.log(res.data)
      if(res.data.insertedId){
        toast.success("sucessfully add to your cart")
         // refetch
    refetch()
      }
    })
   
      }
      else{
        Swal.fire({
  title: "You Are Not LogedIn?",
  text: "Please Login Add To the cart!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes,login!"
}).then((result) => {
  if (result.isConfirmed) {
    navigate('/login')
  }
});
      }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
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
                <div className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-5 flex flex-col h-full">
                  <img
                    src={session.tutorImage}
                    alt={session.tutorName}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border"
                    loading="lazy"
                  />
                  <h2 className="text-xl font-bold text-center mb-1">{session.sessionTitle}</h2>
                  <p className="text-center text-gray-700 font-medium">Tutor: {session.tutorName}</p>
                  <p className="text-sm text-gray-600 mt-2 mb-3 flex-grow">{session.sessionDescription}</p>
                  <p><strong>Fee:</strong> {session.registrationFee === 0 ? "Free" : `$${session.registrationFee}`}</p>
                  <p><strong>Duration:</strong> {session.sessionDuration}</p>
                  <button
                    onClick={() => handleAddToCart(session)}
                    className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-full transition font-medium"
                  >
                    Add to Cart
                  </button>
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
