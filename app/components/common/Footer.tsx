"use client";

import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white">
              <Calendar size={18} />
            </div>
            <h3 className="text-lg font-semibold">MediBook</h3>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed">
            Your trusted platform for booking medical appointments with
            top-rated specialists.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">Find Doctors</li>
            <li className="hover:text-blue-600 cursor-pointer">Services</li>
            <li className="hover:text-blue-600 cursor-pointer">About Us</li>
            <li className="hover:text-blue-600 cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li className="hover:text-blue-600 cursor-pointer">
              Privacy Policy
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              Terms of Service
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              Cookie Policy
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-4">Contact Us</h4>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> hello@medibook.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> San Francisco, CA
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
