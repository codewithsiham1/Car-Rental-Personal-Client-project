import axios from 'axios';
import React from 'react';
export const axiosSecure=axios.create({
    baseURL:'http://localhost:5000'
})
const UseAxiosSecure = () => {
  return axiosSecure
};

export default UseAxiosSecure;