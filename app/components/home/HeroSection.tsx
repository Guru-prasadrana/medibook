"use client";

import { Search, MapPin, Stethoscope } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Background Blur Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-200 opacity-30 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white shadow text-sm text-gray-600 mb-6">
          ✨ AI-Powered Appointment Booking
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
          Book Smarter, <span className="text-blue-600">Not Harder</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
          Find the perfect doctor, book instantly, and manage your health
          journey — all in one seamless platform.
        </p>

        {/* Search Box */}
        <div className="mt-10 bg-white shadow-lg rounded-full p-2 flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto">
          {/* Doctor Input */}
          <div className="flex items-center gap-2 px-4 py-2 w-full">
            <Stethoscope className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Doctor, specialization..."
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-gray-200" />

          {/* Location Input */}
          <div className="flex items-center gap-2 px-4 py-2 w-full">
            <MapPin className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none text-sm"
            />
          </div>

          {/* Button */}
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium transition">
            <Search size={18} />
            Search
          </button>
        </div>

        {/* Stats */}
        <div className="mt-14 flex flex-col md:flex-row justify-center gap-10 text-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">2,500+</h2>
            <p className="text-gray-500 text-sm">Expert Doctors</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">50K+</h2>
            <p className="text-gray-500 text-sm">Happy Patients</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">98%</h2>
            <p className="text-gray-500 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
