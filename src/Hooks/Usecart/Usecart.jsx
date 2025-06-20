import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { axiosSecure } from '../UseaxiosSecure/UseAxiosSecure';
import Useauth from '../Useauth/Useauth';

const Usecart = () => {
    const {user}=Useauth()
  const {refetch,data:cart=[]}=useQuery({
   queryKey:['cart',user?.email],
   queryFn:async()=>{
    const res=await axiosSecure.get(`/cart?email=${user.email}`)
    return res.data;
   }
  })
  return [cart,refetch]
};

export default Usecart;