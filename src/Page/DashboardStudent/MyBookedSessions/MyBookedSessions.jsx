import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../../Providers/Authprovider/Authprovider';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic/UseAxiosPublic';
import MyPaments from '../MyPaments/MyPaments';

const MyBookedSessions = () => {
  const { user } = useContext(Authcontext);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiospublic = UseAxiosPublic();

  useEffect(() => {
    const fetcheddata = async () => {
      if (user?.email) {
        const responsh = await axiospublic.get(`/bookedSession?email=${user.email}`);
        setSessions(responsh.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetcheddata();
  }, [user?.email, axiospublic]);

  return (
    <div className='px-4 py-6'>
      <h2 className="text-xl font-bold text-center mb-6">📚 My Booked Study Sessions</h2>

      {/* Responsive Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {sessions.map((session) => (
          <div key={session._id} className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-blue-700 mb-1">{session.sessionTitle}</h3>
            <p><span className="font-medium">Tutor:</span> {session.tutorName || session.tutorEmail || 'Unknown'}</p>
            <p><span className="font-medium">Status:</span> {session.status}</p>
            <p><span className="font-medium">Fee:</span> {session.registrationFee === 0 ? 'Free' : `$${session.registrationFee}`}</p>
            <p className="text-sm text-gray-500 mt-1">
              Booked on: {
                session.timestamp && !isNaN(new Date(session.timestamp))
                  ? new Date(session.timestamp).toLocaleDateString()
                  : 'N/A'
              }
            </p>
          </div>
        ))}
      </div>

      {/* Payments Section */}
      <div className="mt-8">
        <MyPaments />
      </div>
    </div>
  );
};

export default MyBookedSessions;
