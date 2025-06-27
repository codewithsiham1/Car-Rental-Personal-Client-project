import React from 'react';
import logo from "../../assets/image/404.gif";

const ErrorElement = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-gray-50">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-red-600 mb-4">Oops</h1>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 text-center max-w-md">
        Sorry, an unexpected error has occurred.
      </p>
      <img
        src={logo}
        alt="Error Illustration"
        className="w-48 sm:w-64 md:w-96 object-contain"
      />
    </div>
  );
};

export default ErrorElement;
