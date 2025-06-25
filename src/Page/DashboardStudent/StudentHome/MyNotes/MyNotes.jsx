import React from 'react';
import Useauth from '../../../../Hooks/Useauth/Useauth';
import UseAxiosSecure from '../../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyNotes = () => {
    const {user}=Useauth();
    const navigate=useNavigate()
    const axiossecure=UseAxiosSecure();
    // tanstackquery
    const {data:notes=[],isLoading,refetch }=useQuery({
        queryKey:['notes',user?.email],
         enabled: !!user?.email,
        queryFn:async()=>{
            const res=await axiossecure.get(`/notes?email=${user.email}`)
            return res.data
        }
    })
    // delete
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

    return (
        <div className='max-w-4xl mx-auto px-4 py-8 gap-4'>
            <h1 className='text-2xl font-bold'>My notes</h1>
            <div  className="grid grid-cols-1 md:grid-cols-2 gap-5">
             {
  notes.map((note) => (
    <div key={note._id} className='p-4 border rounded shadow-md'>
      <h3 className="text-lg font-semibold">{note.title}</h3>
       <p className="text-sm text-gray-700">{note.description}</p>
       <div className='mt-2 flex gap-3'>
  <button
                  className="btn btn-sm btn-error text-white"
                  onClick={() =>handledelete(note._id)}
                >
                  <FaTrashAlt /> Delete
                </button>
                <button
                  className="btn btn-sm btn-outline"
                  // implement update later
                  onClick={() =>navigate(`/dashboard/student/update-note/${note._id}`)}
                >
                  <FaEdit/> Update
                </button>
       </div>
    </div>
  ))
}
            </div>
        </div>
    );
};

export default MyNotes;