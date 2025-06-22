import React from 'react';
import Useauth from '../Hooks/Useauth/Useauth';
import UseAdmin from '../Hooks/UseAdmin/UseAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = (children) => {
    const {user,loading}=Useauth()
    
    const {isAdmin,isAdminloading}=UseAdmin()
    const location=useLocation()
    if(loading || isAdminloading){
        return  <div className="flex justify-center items-center h-screen">
           <img  className="w-24 h-24" src={loader} alt="" />
        </div>
    }
    if(user && isAdmin){
        return children;
    }
return <Navigate to="/login" state={{from:location}} replace/>
};

export default AdminRoute;