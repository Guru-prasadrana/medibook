"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    text: "MediBook made finding a specialist so easy. I booked a cardiologist in under 2 minutes!",
    name: "Emily Johnson",
    initials: "EJ",
  },
  {
    text: "The AI recommendation was spot on. It suggested exactly the right doctor for my symptoms.",
    name: "Michael Torres",
    initials: "MT",
  },
  {
    text: "Clean interface, fast booking, great follow-up reminders. Best healthcare app I've used.",
    name: "Sarah Williams",
    initials: "SW",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Loved by Patients
        </h2>
        <p className="mt-3 text-gray-500">See what our users have to say</p>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <Card
              key={index}
              className="rounded-2xl shadow-sm hover:shadow-md transition text-left"
            >
              <CardContent className="p-6">
                {/* Quote */}
                <p className="text-4xl text-blue-200 mb-4">“</p>

                {/* Text */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.text}
                </p>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>

                {/* User */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
                    {item.initials}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
