import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { FaUserFriends } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Viewalluser = () => {
    const axiosSecure=UseAxiosSecure()
    const {data:user=[],refetch}=useQuery({
        queryKey:['user'],
        queryFn:async()=>{
          const token = localStorage.getItem('access-token');
          console.log('Access Token:', token); 
          const res=await axiosSecure.get('/user');
          return res.data
        }
    })
    const handleDeleteUser=(user)=>{
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
                     axiosSecure.delete(`/user/${user._id}`)
                      .then((res)=>{
                         if(res.data.deletedCount>0){
                             refetch()
                             toast.success('Your File Has Been Deleted')
                         }
                      })
                 
                 }
               });
    }
    const handleMakeAdmin=(user)=>{
        axiosSecure.patch(`/user/admin/${user._id}`)
        .then((res)=>{
            console.log(res.data)
            if(res.data.modifiedCount>0){
                refetch()
                toast.success(`${user.name}is an admin Now`)
            }
        })
    }
    return (
        <div>
         <div className='flex justify-evenly my-4'>
            <h2 className="text-2xl font-bold">All User</h2>
            <h2 className="text-2xl font-bold">Total User:{user.length}</h2>
         </div>
         <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>Number</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Role Setup</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        user.map((user,index)=> <tr key={user._id}>
        <th>{index+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
           { user.role==='admin'?"Admin":  <button onClick={()=>handleMakeAdmin(user)} className="btn btn-ghost btn-lg"> <span><FaUserFriends /></span></button>}
        </td>
        <td>
            <button onClick={()=>handleDeleteUser(user)} className="btn btn-ghost btn-lg"> <span><MdDelete /></span></button>
        </td>
      </tr>
)
      }

   
    </tbody>
  </table>
</div>
         </div>
        </div>
    );
};

export default Viewalluser;