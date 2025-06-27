import React from 'react';
import { Helmet } from 'react-helmet-async';
import Useauth from '../../../Hooks/Useauth/Useauth';

const AdminHome = () => {
  const { user } = Useauth();

  return (
    <>
      <Helmet>
        <title>Admin Home Dashboard | Smart StudyHub</title>
      </Helmet>

      <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-4 sm:px-6 md:px-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500 text-center">
          Hi, Welcome <span>{user?.displayName || 'Back'}</span>
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-center text-gray-700 max-w-md">
          Manage users, view reports, and control the system here.
        </p>
      </div>
    </>
  );
};

export default AdminHome;
