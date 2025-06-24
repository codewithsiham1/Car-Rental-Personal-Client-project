import React from 'react';
import { Helmet } from 'react-helmet-async';
import Useauth from '../../../Hooks/Useauth/Useauth';

const StudentHome = () => {
    const {user}=Useauth()
    return (
             <>
                <Helmet>
              <title>Admin Home Dashboard | Smart StudyHub</title>
            </Helmet>
             <div className='flex flex-col justify-center items-center'>
               <h1 className='text-2xl font-bold text-blue-400'>Hi ,Welcome <span>{user?.displayName ? user.displayName : 'Back'}</span></h1>
                <p className="mt-4">Manage users, view reports, and control the system here.</p>
             </div>
             </>
    );
};

export default StudentHome;