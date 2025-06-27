import React, { useContext, useState } from 'react';
import logo from "../../assets/image/logo.jpg.png";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, logOut, userRole } = useContext(Authcontext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('access-token');
        toast.success("Logout successful!");
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <img className="w-14 h-14 object-cover rounded-full" src={logo} alt="logo" />
          <h1 className='text-xl font-semibold text-blue-800'>SmartStudy Hub</h1>
        </div>

        {/* Hamburger button for mobile */}
        <button
          onClick={toggleMenu}
          className='md:hidden text-gray-700 focus:outline-none'
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>

        {/* Menu Links */}
        <div className={`flex-col md:flex-row md:flex items-center gap-4 font-semibold text-gray-700
          absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent
          transition-all duration-300 ease-in-out
          ${menuOpen ? 'flex' : 'hidden md:flex'}
          px-4 py-5 md:p-0
        `}>
          <Link to="/" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/all-tutor" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>All Tutors</Link>

          {user && userRole && (
            <>
              {userRole === 'student' && <NavLink to="/dashboard/student/home" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>}
              {userRole === 'tutor' && <NavLink to="/dashboard/tutor/home" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>}
              {userRole === 'admin' && <NavLink to="/dashboard/admin/home" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>}
            </>
          )}

          <Link to="/annousment" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Announcements</Link>
          <Link to="/contact" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          {user ? (
            <>
              <img
                src={user.photoURL}
                alt={user.displayName || "User Photo"}
                className='w-8 h-8 rounded-full object-cover'
                title={user.displayName}
              />
              <span className='mx-2 font-medium text-gray-900'>{user.displayName || "user"}</span>
              <button onClick={handleLogout} className="btn btn-accent" type="button">LogOut</button>
            </>
          ) : (
            <Link to="/login" className="hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
