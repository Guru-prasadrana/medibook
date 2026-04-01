"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
            <Calendar size={18} />
          </div>
          <span className="text-lg font-semibold text-gray-900">MediBook</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-base text-black font-bold">
          <Link href="/find-doctors" className="hover:text-blue-600 transition">
            Find Doctors
          </Link>

          {/* Scroll sections */}
          <a href="#services" className="hover:text-blue-600 transition">
            Services
          </a>

          <a href="#about" className="hover:text-blue-600 transition">
            About
          </a>

          <a href="#contact" className="hover:text-blue-600 transition">
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-600 hover:text-blue-600">
            Sign In
          </button>

          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full px-5">
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
