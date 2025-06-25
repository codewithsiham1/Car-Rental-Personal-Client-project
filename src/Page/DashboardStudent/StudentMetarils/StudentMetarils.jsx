import React, { useState } from 'react';
import Useauth from '../../../Hooks/Useauth/Useauth';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const StudentMaterials = () => {
  const { user } = Useauth();
  const axiosSecure = UseAxiosSecure();
  const [selectedSessionId, setSelectedSessionId] = useState('');

  // ✅ Fetch Booked Sessions using TanStack Query
  const { data: bookedSessions = [], isLoading: loadingSessions } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSession?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Fetch Materials based on selected session
  const {
    data: materials = [],
    isLoading: loadingMaterials,
  } = useQuery({
    queryKey: ['materials', selectedSessionId],
    enabled: !!selectedSessionId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials?sessionId=${selectedSessionId}`);
      return res.data;
    },
  });

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Booked Sessions</h2>

      {loadingSessions ? (
        <p>Loading sessions...</p>
      ) : (
        <ul className="mb-6">
          {bookedSessions.map((session) => (
           <li
           key={session._id}
           className={`cursor-pointer p-3 mb-2 rounded border ${
             selectedSessionId === session.sessionId ? 'bg-blue-200' : 'bg-white'
           }`}
           onClick={() => setSelectedSessionId(session.sessionId)}
         >
           {session.sessionTitle}
         </li>
          ))}
        </ul>
      )}

      {selectedSessionId && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Study Materials</h3>

          {loadingMaterials ? (
            <p>Loading materials...</p>
          ) : materials.length === 0 ? (
            <p>No materials found for this session.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {materials.map((material) => (
                <div
                  key={material._id}
                  className="border rounded p-3 shadow-sm"
                >
                  <h4 className="font-medium mb-2">{material.title || 'Material'}</h4>
                  <img
                    src={material.imageUrl}
                    alt={material.title}
                    className="mb-2 w-full h-auto rounded"
                  />
                  <a
                    href={material.imageUrl}
                    download
                    className="inline-block mb-2 text-blue-600 underline"
                  >
                    Download Image
                  </a>
                  <br />
                  {material.link && (
                    <a
                      href={material.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      View Google Drive Link
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentMaterials;
