"use client";

import { Search, MapPin, Stethoscope } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Blur Background */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200 opacity-30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200 opacity-30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur shadow-sm text-sm text-gray-600 mb-8">
          ✨ AI-Powered Appointment Booking
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Book Smarter,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Not Harder
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-gray-600 text-2xl max-w-2xl mx-auto leading-relaxed">
          Find the perfect doctor, book instantly, and manage your health
          journey — all in one seamless platform.
        </p>

        {/* Search Box */}
        <div className="mt-10 bg-white/90 backdrop-blur shadow-xl rounded-full p-2 flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto border border-gray-100">
          {/* Doctor */}
          <div className="flex items-center gap-3 px-5 py-3 w-full">
            <Stethoscope className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Doctor, specialization..."
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block h-6 w-px bg-gray-200" />

          {/* Location */}
          <div className="flex items-center gap-3 px-5 py-3 w-full">
            <MapPin className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Location"
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* Button */}
          <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white px-7 py-3 rounded-full text-sm font-medium transition shadow-md">
            <Search size={18} />
            Search
          </button>
        </div>

        {/* Stats */}
        <div className="mt-14 flex flex-col md:flex-row justify-center gap-12">
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
