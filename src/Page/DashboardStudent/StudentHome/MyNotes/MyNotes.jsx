import React from 'react';
import Useauth from '../../../../Hooks/Useauth/Useauth';
import UseAxiosSecure from '../../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyNotes = () => {
  const { user } = Useauth();
  const navigate = useNavigate();
  const axiossecure = UseAxiosSecure();

  const { data: notes = [], isLoading, refetch } = useQuery({
    queryKey: ['notes', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiossecure.get(`/notes?email=${user.email}`);
      return res.data;
    },
  });

  const handledelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiossecure.delete(`/notes/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              toast.success('Note deleted successfully');
              refetch();
            }
          })
          .catch((error) => {
            toast.error('Error deleting note');
            console.error(error);
          });
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading notes...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">My Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {notes.map((note) => (
          <div key={note._id} className="p-5 border rounded shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
              <p className="text-gray-700 text-sm">{note.description}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
              <button
                className="btn btn-sm btn-error text-white flex items-center gap-2 px-3 py-1"
                onClick={() => handledelete(note._id)}
              >
                <FaTrashAlt /> Delete
              </button>
              <button
                className="btn btn-sm btn-outline flex items-center gap-2 px-3 py-1"
                onClick={() => navigate(`/dashboard/student/update-note/${note._id}`)}
              >
                <FaEdit /> Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNotes;
