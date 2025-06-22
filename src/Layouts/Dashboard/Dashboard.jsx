import React, { useContext } from 'react';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { PiBriefcaseMetalThin } from 'react-icons/pi';
import { SiSession } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';

const Dashboard = () => {
  const {userRole}=useContext(Authcontext)

    return (
        <div className='flex my-10'>
            {/* dashboard sidebar */}
            <div className='w-64 min-h-full bg-orange-400'>
             <ul className='menu p-4'>
          {userRole === 'admin' ? (
            <>
              <li>
                <NavLink to="/dashboard/admin/home">
                  <FaShoppingCart /><span> Admin Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/users">
                  <FaUserAlt /><span> View all users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/sessions">
                  <SiSession /><span> View all study sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/materials">
                  <PiBriefcaseMetalThin /><span> View all materials</span>
                </NavLink>
              </li>
            </>
          ) : userRole === 'tutor' ? (
            <>
              <li>
                <NavLink to="/dashboard/tutor/home">
                  <FaShoppingCart /><span> Tutor Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tutor/sessions">
                  <SiSession /><span> My Sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tutor/materials/upload">
                  <PiBriefcaseMetalThin /><span> Upload materials</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tutor/materials">
                  <PiBriefcaseMetalThin /><span> View all materials</span>
                </NavLink>
              </li>
            </>
          ) : (
            /* student */
            <>
              <li>
                <NavLink to="/dashboard/student/home">
                  <FaShoppingCart /><span> Student Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student/booked-sessions">
                  <SiSession /><span> My Booked Sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student/notes">
                  <FaUserAlt /><span> My Notes</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student/materials">
                  <PiBriefcaseMetalThin /><span> My Materials</span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider before:bg-white after:bg-white"></div>

          {/* common Home link */}
          <li>
            <NavLink to="/">
              <IoHomeSharp /><span> Home</span>
            </NavLink>
          </li>
        </ul>
            </div>
            {/* dashboard content */}
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;