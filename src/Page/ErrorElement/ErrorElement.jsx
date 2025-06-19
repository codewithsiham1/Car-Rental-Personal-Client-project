import React, { useState } from 'react';
import logo from"../../assets/image/404.gif"
const ErrorElement = () => {
    const {error,setError}=useState('')
    return (
        <div>
            <h1 className='text-4xl font-bold text-red-600 mb-2'>Oops</h1>
            <p className='text-xl text-gray-700 mb-4'>Sorry, an unexpected error has occurred.</p>
            <img src={logo} alt="" />
        </div>
    );
};

export default ErrorElement;