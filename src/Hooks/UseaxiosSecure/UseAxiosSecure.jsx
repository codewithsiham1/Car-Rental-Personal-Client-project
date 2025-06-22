import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Useauth from"../Useauth/Useauth"
export const axiosSecure=axios.create({
    baseURL:'http://localhost:5000'
})
const UseAxiosSecure = () => {
  const navigate=useNavigate()
  const {logOut}=Useauth()
  axiosSecure.interceptors.request.use(function(config){
    const token=localStorage.getItem('access-token')
    console.log('request stoped by interseptor',token)
    config.headers.authorization=`Bearer ${token}`
    return config
  }),function(error){
    return Promise.reject(error)
  }
  axiosSecure.interceptors.response.use(function(response){
    return response
  },async(error)=>{
    const status=error.response.status
    console.log('status error in the interceptor',status)
    if(status===401 || status===403){
      await logOut();
      navigate('/login')
    }
 return Promise.reject(error )
  })
  return axiosSecure
};

export default UseAxiosSecure;