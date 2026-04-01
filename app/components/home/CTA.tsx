"use client";

import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-white text-center border-t">
      <div className="max-w-3xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Ready to take control of your health?
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-gray-500 text-lg">
          Join thousands of patients who book smarter with MediBook.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 px-6 py-3 text-white rounded-full text-base">
            Get Started →
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
