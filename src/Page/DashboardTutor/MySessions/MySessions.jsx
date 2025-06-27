import React from 'react';
import Useauth from '../../../Hooks/Useauth/Useauth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosSecure } from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { toast } from 'react-toastify';

const MySessions = () => {
  const { user } = Useauth();
  const queryClient = useQueryClient();

  // Fetch tutor sessions (approved or rejected)
  const { data: sessions = [], isLoading, error } = useQuery({
    queryKey: ['tutorSessions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions?tutorEmail=${user.email}`);
      return res.data.filter(
        (session) => session.status === 'approved' || session.status === 'rejected'
      );
    },
  });

  // Mutation to update session status to 'pending' (resend approval request)
  const mutation = useMutation({
    mutationFn: async (sessionId) => {
      const res = await axiosSecure.patch(`/sessions/${sessionId}`, {
        status: 'pending',
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Approval request resent successfully.');
      queryClient.invalidateQueries(['tutorSessions', user?.email]);
    },
    onError: () => {
      toast.error('Failed to resend approval request.');
    },
  });

  const handleResendRequest = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) return <p className="text-center mt-6">Loading sessions...</p>;
  if (error) return <p className="text-center mt-6 text-red-600">Error loading sessions.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">My Study Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-center">No approved or rejected sessions found.</p>
      ) : (
        // Responsive wrapper for horizontal scroll on small screens
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 min-w-[600px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">Title</th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
                <th className="border border-gray-300 p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{session.sessionTitle}</td>
                  <td className="border border-gray-300 p-2 capitalize">{session.status}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    {session.status === 'rejected' ? (
                      <button
                        disabled={mutation.isLoading}
                        onClick={() => handleResendRequest(session._id)}
                        className="btn btn-sm btn-primary"
                      >
                        {mutation.isLoading ? 'Sending...' : 'Resend Approval Request'}
                      </button>
                    ) : (
                      <span className="text-gray-500">No action needed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MySessions;
