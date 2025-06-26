import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure, { axiosSecure } from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ViewAllMaterials = () => {
     const queryClient = useQueryClient();
     const axiosSecure=UseAxiosSecure()
    //  use tanstackquery
    const {data:materials=[],refetch}=useQuery({
        queryKey:['adminAllMaterials'],
        queryFn:async()=>{
            const res=await axiosSecure.get('/materials');
            return res.data;
        }
    })
    // delete
    const handleDelete=async(id)=>{
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
      axiosSecure.delete(`/materials/${id}`)
          .then((res)=>{
              if(res.data.deletedCount>0){
                refetch()
             toast.success('Your File Has Been Deleted')
                                     }
          })
  }
});
    }
    return (
        <div className='p-6 grid grid-cols-2 gap-4'>
           {
            materials.map((item)=>(
                 <div key={item._id} className="border p-4 rounded shadow-md">
              <img src={item.image} alt="Material" className="h-32 w-full object-cover rounded mb-2" />
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600">Session ID: {item.sessionId}</p>
              <p className="text-sm text-gray-600">Tutor Email: {item.tutorEmail}</p>
              <a
                href={item.resourceLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline text-sm"
              >
                Open Google Drive Resource
              </a>
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-3 btn btn-sm bg-red-600 text-white w-full"
              >
                Delete
              </button>
            </div>
            ))
           }
        </div>
    );
};

export default ViewAllMaterials;