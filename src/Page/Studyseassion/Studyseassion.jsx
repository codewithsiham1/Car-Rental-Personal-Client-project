import React, { useContext, useEffect, useState } from 'react';
import Sectiontitle from '../Sectiontitle/Sectiontitle';
import { FcRating } from 'react-icons/fc';
import { IoTimeOutline } from 'react-icons/io5';
import { IoMdBookmarks } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';

const StudySession = () => {
    const [study, setStudy] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const currentDate = new Date();
      const navigate=useNavigate();
      const {user}=useContext(Authcontext)
    useEffect(() => {
        fetch("Study.json")
            .then(res => res.json())
            .then(data => {
                const approvedCourses = data.filter(item => item.status === "approved");
                setStudy(approvedCourses);
            });
    }, []);

    const isOngoing = (start, end) => {
        const now = currentDate.getTime();
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        return now >= startTime && now <= endTime;
    };

    const categories = ["All", ...new Set(study.map(item => item.category))];

    const filteredCourses = selectedCategory === "All"
        ? study
        : study.filter(item => item.category === selectedCategory);
// read more button
const handleReadmore=(sessionId)=>{
    if(!user){
        navigate('/login')
    }else{
        navigate(`/session/${sessionId}`)
    }
}
    return (
        <>
            <Sectiontitle
                heading="Most Popular Courses"
                subHeading="Choose from hundreds of courses from specialist organizations"
                headingColor="text-black"
                subHeadingColor="text-black"
            />

            {/* 🔘 Stylish Category Buttons */}
            <div className='flex flex-wrap gap-3 justify-center mb-6 px-4'>
                {categories.map((cat, idx) => (
                    <button
                        key={idx}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1 rounded-full text-sm font-medium shadow-md transition-all duration-300 ease-in-out
                            ${selectedCategory === cat
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white scale-105'
                                : 'bg-gray-100 text-gray-800 hover:bg-blue-200 hover:text-black'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* 🟦 Glowing Course Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8'>
                {filteredCourses.map(session => (
                    <div
                        key={session._id}
                        className='bg-white rounded-xl shadow-md p-4 border hover:shadow-xl hover:border-blue-500 transition duration-300 hover:scale-[1.02]'
                    >
                        <img className='w-full h-48 object-cover rounded-md mb-3' src={session.image} alt={session.title} />
                        <h3 className='text-xl font-semibold mb-1'>{session.title}</h3>
                        <p className='text-sm text-gray-600 mb-2'>{session.description}</p>
                        <div className='flex flex-wrap justify-between items-center text-sm text-gray-700 mb-1'>
                            <p className='flex gap-2 items-center'>
                                <span className='flex gap-0.5'>
                                    <FcRating /><FcRating /><FcRating /><FcRating /><FcRating />
                                </span>
                                {session.rating}
                            </p>
                            <p className='bg-blue-100 text-blue-700 py-0.5 px-2 rounded-full text-xs font-semibold'>{session.category}</p>
                        </div>
                        <div className='flex justify-between items-center text-sm text-gray-600'>
                            <p className='flex items-center gap-1'><IoTimeOutline /> {session.videoTime}</p>
                            <p className='flex items-center gap-1'><IoMdBookmarks /> {session.lectures} lectures</p>
                        </div>
                        <div className='flex justify-between items-center mt-3'>
                            <p className={`text-xs font-semibold px-3 py-1 rounded-full 
                                ${isOngoing(session.registrationStart, session.registrationEnd)
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'}`}>
                                {isOngoing(session.registrationStart, session.registrationEnd) ? 'Ongoing' : "Closed"}
                            </p>
                            <button onClick={()=>handleReadmore(session._id)} className='btn btn-outline btn-sm rounded-full hover:scale-105 transition'>Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default StudySession;
