import React from "react";
import banner1 from "../../assets/project/banner image 04.png";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineVideoLibrary } from "react-icons/md";

const Banner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-center px-6 py-16 relative">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* ===== Left Side ===== */}
       <div className="flex flex-col items-end text-right space-y-8 max-w-xl w-full">
  {/* Heading */}
  <div>
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
      Limitless Learning at <br />
      <span className="text-indigo-600 block mt-2">Your Fingertips</span>
    </h1>
  </div>

  {/* Description */}
  <p className="text-gray-600 text-lg max-w-md">
    Online learning and teaching marketplace with{" "}
    <span className="text-indigo-700 font-semibold">5K+ courses</span> &{" "}
    <span className="text-indigo-700 font-semibold">10M students</span>. Taught by experts to help you acquire new skills.
  </p>

  {/* Feature List */}
  <div className="w-full bg-white p-4 rounded-xl shadow border">
    <h3 className="text-lg font-bold text-gray-800 mb-2">Why Choose Us?</h3>
    <div className="space-y-3">
      {["Get certificate", "Get membership"].map((item, i) => (
        <div 
          key={i} 
          className="flex justify-end items-center gap-3 text-gray-700 hover:text-indigo-600 transition"
        >
          <span>{item}</span>
          <IoIosCheckmarkCircle className="text-indigo-500 text-xl" />
        </div>
      ))}
    </div>
  </div>

  {/* Buttons */}
  <div className="flex items-center justify-end gap-5 mt-4 flex-wrap">
    <button className="text-indigo-600 font-semibold hover:underline text-sm">
      Buy now
    </button>
    <button className="bg-indigo-600 text-white px-8 py-3.5 rounded-lg hover:bg-indigo-700 transition shadow-md font-semibold">
      Get Started
    </button>
    <div className="flex items-center gap-2 text-indigo-600 font-medium hover:underline cursor-pointer">
      <div className="bg-indigo-100 p-2 rounded-full">
        <MdOutlineVideoLibrary className="text-xl" />
      </div>
      <span>Watch Video</span>
    </div>
  </div>
</div>


        {/* ===== Right Side: Image and Badges ===== */}
        <div className="relative mt-10 md:mt-0">
          {/* Image */}
          <div className="relative z-0">
            <img
              src={banner1}
              alt="Banner"
              className="w-80 h-80 rounded-3xl shadow-xl object-cover border-8 border-white"
            />
          </div>

          {/* Stats Card - Bottom Left */}
          <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl shadow-lg border border-gray-100 w-60 z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800 text-sm">Our daily new students</h3>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded">1%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>

          {/* Congratulations Badge - Top Right */}
         
        </div>
      </div>

    
      
    </div>
  );
};

export default Banner;