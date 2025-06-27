import React, { useContext, useState } from 'react';
import { FaBookOpen, FaCalendarAlt, FaCalendarCheck, FaHome, FaPlusCircle, FaStickyNote, FaUpload, FaUserAlt } from 'react-icons/fa';
import { IoHomeSharp } from 'react-icons/io5';
import { MdAddCircleOutline } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router-dom';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';

const Dashboard = () => {
  const { userRole } = useContext(Authcontext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Top Navbar for toggle */}
      <div className="md:hidden bg-orange-400 p-4 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-2xl focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          &#9776;
        </button>
        <h2 className="text-white font-bold text-lg">Dashboard</h2>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          bg-orange-400 text-white
          fixed top-0 left-0 h-full z-40
          w-64
          transform md:transform-none
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        <ul className="menu p-4 space-y-2">
          {userRole === 'admin' ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/admin/home"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaHome /> <span>Admin Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/users"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUserAlt /> <span>View all users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/sessions"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaCalendarAlt /> <span>View all study sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/admin/materials"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaBookOpen /> <span>View all materials</span>
                </NavLink>
              </li>
            </>
          ) : userRole === 'tutor' ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/tutor/home"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaHome /> <span>Tutor Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/tutor/create-session"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <MdAddCircleOutline /> <span>Create Study Sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/tutor/sessions"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaCalendarCheck /> <span>My Study Sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/tutor/materials/upload"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaUpload /> <span>Upload Materials</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/tutor/materials"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaBookOpen /> <span>View All Materials</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/student/home"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaHome /> <span>Student Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/student/booked-sessions"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaCalendarCheck /> <span>My Booked Sessions</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/student/create-note"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaPlusCircle /> <span>Create Note</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/student/notes"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaStickyNote /> <span>My Notes</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/student/materials"
                  className={({ isActive }) =>
                    `flex items-center gap-2 p-2 rounded hover:bg-orange-500 ${
                      isActive ? 'bg-orange-600 font-semibold' : ''
                    }`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaBookOpen /> <span>My Materials</span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider border-t border-white my-4"></div>

          <li>
            <NavLink
              to="/"
              className="flex items-center gap-2 p-2 rounded hover:bg-orange-500"
              onClick={() => setSidebarOpen(false)}
            >
              <IoHomeSharp /> <span>Home</span>
            </NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 bg-gray-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
