import React from 'react';
import { FaBookOpen, FaChalkboardTeacher, FaUserGraduate, FaCertificate } from 'react-icons/fa';

const Card = () => {
  return (
    <div className='my-10 flex flex-col md:flex-row justify-between items-center gap-6 px-4'>

      {/* Card 1 */}
      <div className='bg-indigo-100 max-w-72 w-full flex flex-row items-center gap-4 p-4 shadow-md rounded-xl hover:shadow-xl transition'>
        <div className='w-12 h-12 bg-white text-indigo-600 flex items-center justify-center rounded-full text-xl'>
          <FaBookOpen />
        </div>
        <div>
          <p className='text-xl font-bold text-gray-800'>10k+</p>
          <span className='text-sm text-gray-600'>Online Courses</span>
        </div>
      </div>

      {/* Card 2 */}
      <div className='bg-green-100 max-w-72 w-full flex flex-row items-center gap-4 p-4 shadow-md rounded-xl hover:shadow-xl transition'>
        <div className='w-12 h-12 bg-white text-green-600 flex items-center justify-center rounded-full text-xl'>
          <FaChalkboardTeacher />
        </div>
        <div>
          <p className='text-xl font-bold text-gray-800'>200+</p>
          <span className='text-sm text-gray-600'>Expert Tutors</span>
        </div>
      </div>

      {/* Card 3 */}
      <div className='bg-yellow-100 max-w-72 w-full flex flex-row items-center gap-4 p-4 shadow-md rounded-xl hover:shadow-xl transition'>
        <div className='w-12 h-12 bg-white text-yellow-600 flex items-center justify-center rounded-full text-xl'>
          <FaUserGraduate />
        </div>
        <div>
          <p className='text-xl font-bold text-gray-800'>60k+</p>
          <span className='text-sm text-gray-600'>Online Students</span>
        </div>
      </div>

      {/* Card 4 */}
      <div className='bg-pink-100 max-w-72 w-full flex flex-row items-center gap-4 p-4 shadow-md rounded-xl hover:shadow-xl transition'>
        <div className='w-12 h-12 bg-white text-pink-600 flex items-center justify-center rounded-full text-xl'>
          <FaCertificate />
        </div>
        <div>
          <p className='text-xl font-bold text-gray-800'>6K+</p>
          <span className='text-sm text-gray-600'>Certified Courses</span>
        </div>
      </div>

    </div>
  );
};

export default Card;
