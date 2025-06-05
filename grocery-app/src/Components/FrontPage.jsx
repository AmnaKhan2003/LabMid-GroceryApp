import React from 'react';

export default function FrontPage() {
  return (
    <div className="min-h-screen bg-green-100 py-20 ">
      <div className="flex flex-col md:flex-row items-center   w-full">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl ml-10 md:text-5xl font-extrabold text-green-700 mb-10">
            Welcome to GroceryApp
          </h1>
          <p className="text-lg text-gray-700  ml-10">
            Your one-stop shop for fresh groceries, delivered right to your doorstep.
            Enjoy convenience, quality, and savings—all in one place.
          </p>
        </div>

        <div className="flex-1 flex justify-center ">
          <img
            src="./grocery.jpg"
            alt="Grocery"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-2xl object-cover"
          />
        </div>

      </div>
    </div>
  );
}
