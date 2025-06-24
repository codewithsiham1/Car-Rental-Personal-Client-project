import React, { useContext } from 'react';
import { FaBookOpen, FaCalendarAlt, FaCalendarCheck, FaHome, FaPlusCircle, FaShoppingCart, FaStickyNote, FaUpload, FaUserAlt } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { PiBriefcaseMetalThin } from 'react-icons/pi';
import { SiSession } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import UseAdmin from '../../Hooks/UseAdmin/UseAdmin';



const Dashboard = () => {
  const {userRole}=useContext(Authcontext)
 

    return (
        <div className='flex my-10'>
            {/* dashboard sidebar */}
            <div className='w-64 min-h-full bg-orange-400'>
             <ul className='menu p-4'>
           {userRole === 'admin'  ? (
            <>
              <li>
                <NavLink to="/dashboard/admin/home">
                  <FaHome /><span> Admin Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/users">
                  <FaUserAlt /><span> View all users</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/sessions">
                  <FaCalendarAlt /><span> View all study sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/materials">
                  <FaBookOpen /><span> View all materials</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymenthistory">
                  <FaBookOpen /><span>Payment History</span>
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
                  <	FaCalendarCheck/><span> My Sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tutor/materials/upload">
                  <FaUpload /><span> Upload materials</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/tutor/materials">
                  <	FaBookOpen /><span> View all materials</span>
                </NavLink>
              </li>
            </>
          ) : (
            
            <>
              <li>
                <NavLink to="/dashboard/student/home">
                   <FaHome /><span> Student Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student/booked-sessions">
                   <FaCalendarCheck /><span> My Booked Sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student/create-note">
                   <FaPlusCircle /><span> Create note</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student/notes">
                  <FaStickyNote /><span> My Notes</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/student/materials">
                  <FaBookOpen /><span> My Materials</span>
                </NavLink>
              </li>
            </>
          )} 

          <div className="divider before:bg-white after:bg-white"></div>

         
          <li>
            <NavLink to="/">
              <IoHomeSharp /><span> Home</span>
            </NavLink>
          </li>
        </ul>
            </div>
            
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;
