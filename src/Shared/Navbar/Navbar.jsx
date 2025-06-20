import React, { useContext } from 'react';
import logo from "../../assets/image/logo.jpg.png";
import { Link } from 'react-router-dom';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';
import { FaCartPlus } from 'react-icons/fa';
import Usecart from '../../Hooks/Usecart/Usecart';

const Navbar = () => {
    const {user,logOut,updateprofile}=useContext(Authcontext)
    const [cart]=Usecart()
    const handleLogout=()=>{
      logOut()
      .then(()=>{})
      .catch((error)=>{
        console.log(error)
      })
    }
    return (
        <div className='fixed top-0 left-0 w-full z-50 bg-white shadow-md'>
            <div className='max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between'>
                {/* Logo */}
                <div className='flex items-center gap-3'>
                    <img className="w-14 h-14 object-cover rounded-full" src={logo} alt="logo" />
                    <h1 className='text-xl font-semibold text-blue-800'>SmartStudy Hub</h1>
                </div>

                {/* Menu Links */}
                <div className='flex flex-row gap-4 text-lg font-semibold text-gray-700'>
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/all-tutor" className="hover:text-blue-600 transition">All Tutors</Link>
                    <Link to="/annousment" className="hover:text-blue-600 transition">Announcements</Link>
                    <Link to="/contact" className="hover:text-blue-600 transition">Contact Us</Link>
                    <Link to="/dashboard/cart">
                    <button className="btn">
                     <FaCartPlus />
                  <div className="badge badge-secondary">+{cart.length}</div>
                  </button>
                    </Link>
                    {
                        user ?<>
                        <img src={user.photoURL} alt={user.displayName||"User Photo" } className='w-8 h-8 rounded-full object-cover'  title={user.displayName}/>
                        <span className='self-center mx-2 font-medium text-gray-900'>  {user.displayName||"user"}</span>
                        <button onClick={handleLogout} className="btn btn-accent">LogOut</button> </>
                        :<> <Link to="/login" className="hover:text-blue-600 transition">Login</Link></>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;
