import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import loader from "../../assets/image/loader3.gif";
import { FcRating } from 'react-icons/fc';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import { toast } from 'react-toastify';
import Sectionreview from '../Sectionreview/Sectionreview';

const SeassionDetails = () => {
  const [session, setSession] = useState(null);
  const { id } = useParams();
  const currentDate = new Date();
  const { user, userRole } = useContext(Authcontext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Study.json")
      .then(res => res.json())
      .then(data => {
        const match = data.find(item => item._id === id);
        setSession(match);
      });
  }, [id]);

  const isOngoing = () => {
    if (!session) return false; 
    const start = new Date(session.registrationStart).getTime();
    const end = new Date(session.registrationEnd).getTime();
    return currentDate.getTime() >= start && currentDate.getTime() <= end;
  };

  const handleBooking = async () => {
    const bookingInfo = {
      sessionId: session._id,
      studentEmail: user?.email,
      tutorEmail: session.tutorEmail || "unknown",
      tutorName: session.tutorName || "unknown",
      sessionTitle: session.title,
      registrationFee: session.registrationFee,
      status: 'pending',
      timestamp: new Date()
    };
    if (session.registrationFee === 0) {
      const res = await fetch('http://localhost:5000/bookedSession', {
        method: "post",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingInfo)
      });
      const result = await res.json();
      if (result.insertedId) {
        toast.success('🎉 Session Booked for Free!');
      }
    } else {
      navigate(`/dashboard/payment/${session._id}`);
    }
  };

  const isDisabled = !isOngoing() || userRole === "admin" || userRole === "tutor";

  if (!session) {
    return (
      <div className='text-center mt-10'>
        <img src={loader} alt="Loading..." className="mx-auto w-12 h-12" />
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg mt-6'>
      <h2 className='text-2xl sm:text-3xl font-bold text-blue-600 mb-4 text-center sm:text-left'>
        {session.title}
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <img
            src={session.image}
            alt={session.title}
            className='w-full rounded-lg object-cover max-h-[400px]'
          />
        </div>
        <div className='space-y-3 text-gray-700 text-sm sm:text-base'>
          <p><strong>Description:</strong> {session.description}</p>
          <p><strong>Category:</strong> {session.category}</p>
          <p><strong>Tutor Name:</strong> {session.tutorName || 'N/A'}</p>
          <p className='flex items-center gap-2'>
            <strong>Rating:</strong>
            <FcRating /><FcRating /><FcRating /><FcRating /> {session.rating}
          </p>
          <p><strong>Registration Period:</strong> {session.registrationStart} ➝ {session.registrationEnd}</p>
          <p><strong>Class Period:</strong> {session.classStartDate || 'N/A'} ➝ {session.classEndDate || 'N/A'}</p>
          <p><strong>Duration:</strong> {session.duration || 'N/A'}</p>
          <p>
            <strong>Registration Fee:</strong>
            {session.registrationFee === 0 ? (
              <span className='text-green-600 font-bold ml-1'>Free</span>
            ) : (
              <span className='ml-1'>${session.registrationFee}</span>
            )}
          </p>
        </div>
      </div>

      <div className='mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0'>
        <p className={`text-sm font-semibold px-4 py-2 rounded-full 
          ${isOngoing() ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {isOngoing() ? 'Registration Ongoing' : 'Registration Closed'}
        </p>

        <button
          onClick={handleBooking}
          disabled={isDisabled}
          className={`btn btn-primary w-full sm:w-auto px-6 py-2 rounded-md text-white font-semibold 
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 transition'}`}
        >
          {isDisabled ? 'Registration Closed' : 'Book Now'}
        </button>
      </div>

      <Sectionreview />
    </div>
  );
};

export default SeassionDetails;
