import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ViewAllMaterials = () => {
  const queryClient = useQueryClient();
  const axiosSecure = UseAxiosSecure();

  // use tanstack query
  const { data: materials = [], refetch } = useQuery({
    queryKey: ['adminAllMaterials'],
    queryFn: async () => {
      const res = await axiosSecure.get('/materials');
      return res.data;
    },
  });

  // delete function
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/materials/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            toast.success('Your File Has Been Deleted');
          }
        });
      }
    });
  };

  return (
    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {materials.map((item) => (
        <div
          key={item._id}
          className="border p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <img
            src={item.image}
            alt="Material"
            className="h-40 w-full object-cover rounded-md mb-3"
          />
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-gray-600">Session ID: {item.sessionId}</p>
          <p className="text-sm text-gray-600">Tutor Email: {item.tutorEmail}</p>
          <a
            href={item.resourceLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline text-sm block mt-1"
          >
            Open Google Drive Resource
          </a>
          <button
            onClick={() => handleDelete(item._id)}
            className="mt-4 btn btn-sm bg-red-600 hover:bg-red-700 text-white w-full"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewAllMaterials;
