import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Useauth from '../../Hooks/Useauth/Useauth';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UseAxiosSecure from '../../Hooks/UseaxiosSecure/UseAxiosSecure';
import Usecart from '../../Hooks/Usecart/Usecart';


const AllTutors = () => {
    const [tutors,setTuros]=useState([]);
    const [loading,setLoading]=useState([]);
    const {user}=Useauth()
    const navigate=useNavigate()
    const axiosSecure=UseAxiosSecure()
    const [,refetch]=Usecart()
    useEffect(()=>{
        fetch('./Tutor.json')
        .then(res=>res.json())
        .then(data=>{
            setTuros(data)
            setLoading(false)
        })
    },[])
      const handleAddToCart = (tutor) => {
        console.log("Clicked!", tutor);
        if(user && user.email){
             console.log("User logged in:", user.email);
        //   send cart item to the database
        const cartItem = {
      tutorId: tutor._id,
      email: user.email,
      name: tutor.tutorName,
      image: tutor.tutorImage,
      price: tutor.registrationFee
    };
    axiosSecure.post('/cart',cartItem)
    .then((res)=>{
        console.log(res.data)
        if(res.data.insertedId){
            Swal.fire({
  position: "top-end",
  icon: "success",
  title:`${name} added to your cart`,
  showConfirmButton: false,
  timer: 1500
});
// refetch
refetch()
        }
    })
        }
        else{       
Swal.fire({
  title: "You Are Not Loged In?",
  text: "Please login ad to the cart!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, login!"
}).then((result) => {
  if (result.isConfirmed) {
    // send tho the user to the login page
    navigate('/login')
   
  }
});
        }
    };
    return (
   <>
   <Helmet>
  <title>All Tutors | Smart StudyHub</title>
  <meta name="description" content="Study smarter with our collaborative platform." />
</Helmet>

     <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-center">All Tutors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                    <div
                        key={tutor._id}
                        className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
                    >
                        <img
                            src={tutor.tutorImage}
                            alt={tutor.tutorName}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{tutor.tutorName}</h2>
                            <p className="text-gray-600 mb-1 text-sm">{tutor.tutorEmail}</p>
                            <p className="text-lg font-medium mb-2">{tutor.sessionTitle}</p>
                            <p className="text-sm text-gray-700 mb-3">
                                {tutor.sessionDescription}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Fee:</span>{' '}
                                {tutor.registrationFee === 0 ? 'Free' : `${tutor.registrationFee}$`}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Duration:</span>{' '}
                                {tutor.sessionDuration}
                            </p>
                            <p className="text-sm">
                                <span className="font-semibold">Status:</span>{' '}
                                <span
                                    className={`${
                                        tutor.status === 'approved' ? 'text-green-600' : 'text-red-600'
                                    } font-semibold`}
                                >
                                    {tutor.status}
                                </span>
                            </p>
                                   <button
                                    onClick={() => handleAddToCart(tutor)}
                                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                                    disabled={tutor.status !== 'approved'}
                                >
                                    {tutor.status === 'approved' ? 'Add to Cart' : 'Not Available'}
                                </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
   </>
    );
};

export default AllTutors;