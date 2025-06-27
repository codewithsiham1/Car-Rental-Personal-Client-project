import React from 'react';
import { Helmet } from 'react-helmet-async';
import Useauth from '../../../Hooks/Useauth/Useauth';

const TutorHome = () => {
  const { user } = Useauth();

  return (
    <>
      <Helmet>
        <title>Tutor Home Dashboard | Smart StudyHub</title>
      </Helmet>
      <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-xl w-full text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-500">
            Hi, Welcome <span className="text-indigo-600">{user?.displayName ?? 'Back'}</span>
          </h1>
          <p className="mt-4 text-gray-700 text-base sm:text-lg">
            Manage users, view reports, and control the system here.
          </p>
        </div>
      </div>
    </>
  );
};

export default TutorHome;
