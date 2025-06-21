import React from 'react';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { PiBriefcaseMetalThin } from 'react-icons/pi';
import { SiSession } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
  // get is admin value in the database
  const isAdmin=true;
    return (
        <div className='flex'>
            {/* dashboard sidebar */}
            <div className='w-64 min-h-full bg-orange-400'>
             <ul className='menu p-4'>
          {
            isAdmin ?<>
       <li>
             
                <NavLink to="/dashboard/adminhome"> <span> <FaShoppingCart /></span> Admin Home</NavLink>
                </li>
              <li>
             
                <NavLink to="/dashboard/cart"> <span><FaUserAlt /></span>View all users</NavLink>
                </li>
              <li>
             
                <NavLink to="/dashboard/cart"> <span><SiSession /></span> View all study session </NavLink>
                </li>
              <li>
             
                <NavLink to="/dashboard/cart"> <span><PiBriefcaseMetalThin /></span> View all materials   </NavLink>
                </li>
            </>:
            <>
       <li>
             
                <NavLink to="/dashboard/cart"> <span> <FaShoppingCart /></span> My Cart</NavLink>
                </li>
              <li>
             
                <NavLink to="/dashboard/cart"> <span><FaUserAlt /></span>View all users</NavLink>
                </li>
              <li>
             
                <NavLink to="/dashboard/cart"> <span><SiSession /></span> View all study session </NavLink>
                </li>
              <li>
             
                <NavLink to="/dashboard/cart"> <span><PiBriefcaseMetalThin /></span> View all materials   </NavLink>
                </li>
            </>
          }
                <div className="divider before:bg-white after:bg-white"></div>
                {/* onno components */}
                <li>
             <NavLink to="/"> <span><IoHomeSharp /></span>Home</NavLink>
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