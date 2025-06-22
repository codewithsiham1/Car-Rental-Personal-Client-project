import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { axiosSecure } from '../UseaxiosSecure/UseAxiosSecure';
import Useauth from '../Useauth/Useauth';
import { Authcontext } from '../../Providers/Authprovider/Authprovider';

const Usecart = () => {
  const {loading}=useContext(Authcontext)
    const {user}=Useauth()
  const {refetch,data:cart=[]}=useQuery({
   queryKey:['cart',user?.email],
   enabled: !loading && !!user?.email,
   queryFn:async()=>{
    const res=await axiosSecure.get(`/cart?email=${user.email}`)
    return res.data;
   }
  })
  return [cart,refetch]
};

export default Usecart;