import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Useauth from '../../Hooks/Useauth/Useauth';
import { useNavigate } from 'react-router-dom';

const AllTutors = () => {
    const [tutors, setTutors] = useState([]);
    const { user } = Useauth();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('./Tutor.json')
            .then(res => res.json())
            .then(data => {
                setTutors(data);
            });
    }, []);

    return (
        <>
            <Helmet>
                <title>All Tutors | Smart StudyHub</title>
                <meta name="description" content="Study smarter with our collaborative platform." />
            </Helmet>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-purple-700">
                    Meet Our Tutors
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutors.map((tutor) => (
                        <div
                            key={tutor._id}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
                        >
                            <img
                                src={tutor.tutorImage}
                                alt={tutor.tutorName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5 space-y-3">
                                <h2 className="text-xl font-bold text-gray-800">{tutor.tutorName}</h2>
                                <p className="text-sm text-gray-500">{tutor.tutorEmail}</p>
                                <p className="text-lg font-semibold text-purple-700">{tutor.sessionTitle}</p>
                                <p className="text-sm text-gray-600">{tutor.sessionDescription}</p>

                                <div className="text-sm text-gray-700 space-y-1">
                                    <p>
                                        <span className="font-semibold">Fee:</span>{' '}
                                        {tutor.registrationFee === 0 ? 'Free' : `$${tutor.registrationFee}`}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Duration:</span>{' '}
                                        {tutor.sessionDuration}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Status:</span>{' '}
                                        <span
                                            className={`${
                                                tutor.status === 'approved'
                                                    ? 'text-green-600'
                                                    : 'text-red-500'
                                            } font-semibold capitalize`}
                                        >
                                            {tutor.status}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllTutors;
