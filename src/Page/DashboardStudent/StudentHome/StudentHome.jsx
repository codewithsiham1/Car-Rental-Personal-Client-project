import React from 'react';
import { Helmet } from 'react-helmet-async';
import Useauth from '../../../Hooks/Useauth/Useauth';

const StudentHome = () => {
  const { user } = Useauth();
  return (
    <>
      <Helmet>
        <title>Student Home Dashboard | Smart StudyHub</title>
      </Helmet>

      <div className="flex flex-col justify-center items-center min-h-[60vh] px-4 text-center sm:px-6 md:px-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400">
          Hi, Welcome{' '}
          <span className="text-indigo-600">
            {user?.displayName ? user.displayName : 'Back'}
          </span>
        </h1>

        <p className="mt-4 text-gray-700 text-base sm:text-lg md:text-xl max-w-xl">
          Manage users, view reports, and control the system here.
        </p>
      </div>
    </>
  );
};

export default StudentHome;
