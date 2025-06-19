import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loader from "../../assets/image/loader3.gif";
import { FcRating } from 'react-icons/fc';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import { toast } from 'react-toastify';

const SeassionDetails = () => {
  const [session, setSession] = useState(null);
  const { id } = useParams();
  const currentDate = new Date();
  const { user, userRole } = useContext(Authcontext);

  useEffect(() => {
    fetch("/Study.json")
      .then(res => res.json())
      .then(data => {
        const match = data.find(item => item._id === id);
        setSession(match);
      });
  }, [id]);

  const isOngoing = () => {
    if (!session) return false; // 🛑 session null হলে false return
    const start = new Date(session.registrationStart).getTime();
    const end = new Date(session.registrationEnd).getTime();
    return currentDate.getTime() >= start && currentDate.getTime() <= end;
  };

  const handleBooking = () => {
    if (session.registrationFee === 0) {
      toast.success("🎉 Booked for Free");
    } else {
      toast.error("💳 Redirecting to Payment");
    }
  };

  // 🛡️ Booking Button disable condition
  const isDisabled = !isOngoing() || userRole === "admin" || userRole === "tutor";

  // ⏳ Show loader before session data loads
  if (!session) {
    return (
      <div className='text-center mt-10'>
        <img src={loader} alt="Loading..." className="mx-auto w-12 h-12" />
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6'>
      <h2 className='text-3xl font-bold text-blue-600 mb-3'>{session.title}</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <img src={session.image} alt={session.title} className='w-full rounded-lg' />
        </div>
        <div>
          <p className='text-gray-700 mb-2'><strong>Description:</strong> {session.description}</p>
          <p className='text-gray-700 mb-1'><strong>Category:</strong> {session.category}</p>
          <p className='text-gray-700 mb-1'><strong>Tutor Name:</strong> {session.tutorName || 'N/A'}</p>
          <p className='text-gray-700 mb-1 flex items-center gap-2'>
            <strong>Rating:</strong>
            <FcRating /><FcRating /><FcRating /><FcRating /> {session.rating}
          </p>
          <p className='text-gray-700 mb-1'><strong>Registration Period:</strong> {session.registrationStart} ➝ {session.registrationEnd}</p>
          <p className='text-gray-700 mb-1'><strong>Class Period:</strong> {session.classStartDate || 'N/A'} ➝ {session.classEndDate || 'N/A'}</p>
          <p className='text-gray-700 mb-1'><strong>Duration:</strong> {session.duration || 'N/A'}</p>
          <p className='text-gray-700 mb-1'>
            <strong>Registration Fee:</strong>
            {session.registrationFee === 0 ? (
              <span className='text-green-600 font-bold'> Free</span>
            ) : (
              ` $${session.registrationFee}`
            )}
          </p>
        </div>
      </div>

      <div className='mt-6 flex items-stretch justify-between'>
        <p className={`text-sm font-semibold px-3 py-1 rounded-full 
          ${isOngoing() ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isOngoing() ? 'Registration Ongoing' : 'Registration Closed'}
        </p>

        <button
          onClick={handleBooking}
          disabled={isDisabled}
          className={`btn btn-primary ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isDisabled ? 'Registration Closed' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default SeassionDetails;
