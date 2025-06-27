import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import loader from "../../../assets/image/loader3.gif";

const ViewAllSessions = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [amount, setAmount] = useState(0);

  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/sessions');
      return res.json();
    },
  });

  const openModal = (session) => {
    setSelectedSession(session);
    setIsPaid(false);
    setAmount(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSession(null);
    setIsModalOpen(false);
  };

  const handleApprove = async () => {
    if (isPaid && amount <= 0) {
      toast.error('Please enter a valid amount for paid session');
      return;
    }

    const registrationFee = isPaid ? amount : 0;

    try {
      const res = await fetch(`http://localhost:5000/sessions/${selectedSession._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved', registrationFee }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success('Session approved successfully');
        queryClient.invalidateQueries(['sessions']);
        closeModal();
      } else {
        toast.error(result.message || 'Failed to approve');
      }
    } catch (error) {
      toast.error('Error approving session');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/sessions/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        toast.success('Session rejected successfully');
        queryClient.invalidateQueries(['sessions']);
      } else {
        toast.error('Failed to reject');
      }
    } catch (error) {
      toast.error('Error rejecting session');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">Admin - Manage Study Sessions</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <img src={loader} alt="Loading..." className="w-12 h-12" />
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="w-full text-sm sm:text-base border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Tutor</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Fee</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions
                .filter((s) => s.status === 'pending')
                .map((session) => (
                  <tr key={session._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{session.sessionTitle}</td>
                    <td className="p-2 border">{session.tutorName}</td>
                    <td className="p-2 border capitalize">{session.status}</td>
                    <td className="p-2 border">${session.registrationFee || 0}</td>
                    <td className="p-2 border space-x-2">
                      <button onClick={() => openModal(session)} className="btn btn-sm btn-success">
                        Approve
                      </button>
                      <button onClick={() => handleReject(session._id)} className="btn btn-sm btn-error">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto shadow-md">
            <h3 className="text-lg font-semibold mb-4">Approve Session</h3>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Is the session paid?</label>
              <select
                className="input input-bordered w-full"
                value={isPaid ? 'paid' : 'free'}
                onChange={(e) => setIsPaid(e.target.value === 'paid')}
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {isPaid && (
              <div className="mb-3">
                <label className="block mb-1 font-medium">Amount ($)</label>
                <input
                  type="number"
                  min="1"
                  className="input input-bordered w-full"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-4">
              <button onClick={handleApprove} className="btn btn-primary">
                Confirm
              </button>
              <button onClick={closeModal} className="btn btn-outline">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllSessions;
