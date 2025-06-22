import React from 'react';
import Useauth from '../Useauth/Useauth';
import UseAxiosSecure from '../UseaxiosSecure/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseAdmin = () => {
    const {user}=Useauth();
    const axiossecure=UseAxiosSecure();
   const {data:isAdmin,isPending:isAdminloading}=useQuery({
    queryKey:[user?.email,'isAdmin'],
    queryFn:async()=>{
const res=await axiossecure.get(`/user/admin/${user.email}`)
console.log(res.data)
return res.data?.admin;
    }
   })
    return  [isAdmin,isAdminloading]
};

export default UseAdmin;