import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAxiosSecure from '../../../Hooks/UseaxiosSecure/UseAxiosSecure';
import { FaUserFriends } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Viewalluser = () => {
    const axiosSecure = UseAxiosSecure();
    const { data: user = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const token = localStorage.getItem('access-token');
            console.log('Access Token:', token);
            const res = await axiosSecure.get('/user');
            return res.data;
        }
    });

    const handleDeleteUser = (user) => {
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
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            toast.success('User deleted successfully');
                        }
                    });
            }
        });
    };

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/user/admin/${user._id}`)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success(`${user.name} is now an admin`);
                }
            });
    };

    return (
        <div className="p-4">
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6'>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">All Users</h2>
                <h2 className="text-lg sm:text-2xl font-bold">Total Users: {user.length}</h2>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="table table-zebra w-full text-sm sm:text-base">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Role Setup</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td>{index + 1}</td>
                                    <td className="whitespace-nowrap">{user.name}</td>
                                    <td className="whitespace-nowrap">{user.email}</td>
                                    <td className="capitalize">{user.role}</td>
                                    <td>
                                        {
                                            user.role === 'admin' ?
                                                <span className="font-medium text-green-600">Admin</span> :
                                                <button onClick={() => handleMakeAdmin(user)} className="btn btn-outline btn-sm">
                                                    <FaUserFriends />
                                                </button>
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-outline btn-sm btn-error">
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Viewalluser;
