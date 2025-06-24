import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../../Providers/Authprovider/Authprovider';
import UseAxiosPublic from '../../../Hooks/UseAxiosPublic/UseAxiosPublic';
import MyPaments from '../MyPaments/MyPaments';

const MyBookedSessions = () => {
    const {user}=useContext(Authcontext);
    const [sessions,setSessions]=useState([])
    const [loading,setLoading]=useState(true)
    const axiospublic=UseAxiosPublic()
    useEffect(()=>{
        const fetcheddata=async()=>{
    if(user?.email){
            const responsh=await axiospublic.get(`/bookedSession?email=${user.email}`)
            setSessions(responsh.data)
            setLoading(false)
        }else{
            setLoading(false)
        }
        }
    fetcheddata()
    },[user?.email,axiospublic])
    return (
     <div className='grid grid-cols-3 gap-3'>
        {sessions.map((session) => (
  <div key={session._id} className="border p-4 rounded shadow bg-white mb-4">
    <h3 className="text-xl font-semibold text-blue-700">{session.sessionTitle}</h3>
    <p><strong>Tutor:</strong> {session.tutorName || session.tutorEmail || 'Unknown'}</p>
    <p><strong>Status:</strong> {session.status}</p>
    <p><strong>Fee:</strong> {session.registrationFee === 0 ? 'Free' : `$${session.registrationFee}`}</p>
   <p className="text-sm text-gray-500">
  Booked on: {
    session.timestamp && !isNaN(new Date(session.timestamp))
      ? new Date(session.timestamp).toLocaleDateString()
      : 'N/A'
  }
</p>
  </div>
))}
<MyPaments></MyPaments>
     </div>
    );
};

export default MyBookedSessions;