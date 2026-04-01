"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Smile,
  Brain,
  Eye,
  Baby,
  Bone,
  Pill,
  Stethoscope,
} from "lucide-react";

const specialties = [
  { name: "Cardiology", icon: Heart, color: "text-red-500" },
  { name: "Dentistry", icon: Smile, color: "text-blue-500" },
  { name: "Neurology", icon: Brain, color: "text-cyan-500" },
  { name: "Ophthalmology", icon: Eye, color: "text-green-500" },
  { name: "Pediatrics", icon: Baby, color: "text-yellow-500" },
  { name: "Orthopedics", icon: Bone, color: "text-blue-600" },
  { name: "Dermatology", icon: Pill, color: "text-cyan-600" },
  { name: "General", icon: Stethoscope, color: "text-gray-600" },
];

const Specialties = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Browse by Specialty
        </h2>
        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Find the right specialist for your needs from our wide range of
          medical categories.
        </p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {specialties.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <CardContent className="flex flex-col items-center justify-center py-8">
                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gray-100 mb-4">
                    <Icon className={`${item.color}`} />
                  </div>

                  {/* Title */}
                  <p className="text-gray-700 font-medium">{item.name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Specialties;
