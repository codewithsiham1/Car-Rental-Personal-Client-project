import React from 'react';

const Middlecard = () => {
  return (
    <div className="flex items-center justify-center py-16 px-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl shadow-2xl my-12 mx-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold leading-tight">Become an Instructor!</h1>
        <p className="text-lg text-white/90">
          Share your knowledge with thousands of learners! Empower others by teaching what you love.
          Whether you're an expert or passionate learner, start your teaching journey today.
        </p>
        <button className="mt-4 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:bg-purple-100 transition duration-300">
          Start Teaching Today
        </button>
      </div>
    </div>
  );
};

export default Middlecard;
