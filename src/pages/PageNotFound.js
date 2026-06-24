import React from "react";
import { Link } from "react-router-dom";
import download from "../assets/download.png";
const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br pb-10 text-black flex flex-col lg:flex-row items-center justify-center gap-10">
    
      {/* Left Section - Image */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <img
          src={download}
          alt="404 Not Found"
          className="w-full max-w-lg rounded-3xl shadow-2xl"
        />
      </div>

      {/* Right Section - Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h1 className="text-8xl md:text-9xl font-extrabold text-red-600">
          404
        </h1>

        <h2 className="mt-2 text-3xl md:text-5xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-4 text-lg text-gray-500 max-w-xl">
          Oops! The page you're looking for doesn't exist, has been moved,
          or is temporarily unavailable.
        </p>

        <p className="mt-2 text-gray-400">
          Let's get you back to exploring amazing movies.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-xl font-semibold text-lg shadow-lg hover:scale-105"
        >
           Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;