"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Recommendation = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm inline-block mb-4">
              ✨ AI Recommendation
            </div>

            <h2 className="text-3xl font-bold mb-4">Not sure who to see?</h2>

            <p className="text-white/90 max-w-md mb-6">
              Our AI analyzes your symptoms and medical history to recommend the
              best specialists for your needs.
            </p>

            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Get Recommendations →
            </Button>
          </div>

          {/* Right Card */}
          <Card className="bg-white/90 backdrop-blur-md rounded-2xl w-full md:w-80">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 mb-2">Recommended for you</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                  DS
                </div>

                <div>
                  <p className="font-semibold text-gray-800">Dr. Sarah Chen</p>
                  <p className="text-sm text-gray-500">Cardiologist</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                <Star className="text-yellow-500" size={16} />
                <span>4.9</span>
                <span>• 15 yrs exp</span>
                <span>• $120</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
