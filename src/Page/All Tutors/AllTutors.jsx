import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const AllTutors = () => {
    const [tutors,setTuros]=useState([]);
    const [loading,setLoading]=useState([]);
    useEffect(()=>{
        fetch('./Tutor.json')
        .then(res=>res.json())
        .then(data=>{
            setTuros(data)
            setLoading(false)
        })
    },[])
      const handleAddToCart = (tutor) => {
        // এখানে তুমি localStorage বা context বা database-এ যুক্ত করতে পারো।
        const cart = JSON.parse(localStorage.getItem("studyCart")) || [];
        const alreadyAdded = cart.find(item => item._id === tutor._id);

        if (alreadyAdded) {
            toast.warning("Already added to cart!");
            return;
        }

        cart.push(tutor);
        localStorage.setItem("studyCart", JSON.stringify(cart));
        toast.success("Added to cart!");
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