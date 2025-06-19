import React, { useContext } from 'react';
import { Authcontext } from '../Providers/Authprovider/Authprovider';
import { Navigate, replace, useLocation } from 'react-router-dom';
import loader from"../../src/assets/image/loader3.gif"
const Privateroute = ({children}) => {
    const {user,loading}=useContext(Authcontext)
    const location=useLocation()
    if(loading){
        return  <div className="flex justify-center items-center h-screen">
           <img  className="w-24 h-24" src={loader} alt="" />
        </div>
    }
    if(user){
        return children;
    }
return <Navigate to="/login" state={{from:location}} replace/>
};

export default Privateroute;