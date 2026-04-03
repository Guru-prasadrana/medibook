"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, X, Loader2 } from "lucide-react";
import { analyzeSymptomsApi } from "@/lib/services/ai.api";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  fee: number;
}

interface AnalyzeResponse {
  specialization: string;
  confidence: string;
  matched_keywords: string[];
  doctors: Doctor[];
  user_id: number;
  message: string;
}

const Recommendation = () => {
  const [symptoms, setSymptoms] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Top doctor from API result (shown in the right card)
  const topDoctor: Doctor | null = result?.doctors?.[0] ?? null;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const handleSubmit = async () => {
    if (!symptoms.trim()) return;

    setIsModalOpen(true);
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await analyzeSymptomsApi(symptoms.trim(), 1);
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
    // Keep result so the card stays updated
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm inline-block mb-4">
              ✨ AI Recommendation
            </div>

            <h2 className="text-3xl font-bold mb-4">Not sure who to see?</h2>

            <p className="text-white/90 max-w-md mb-5">
              Our AI analyzes your symptoms and medical history to recommend the
              best specialists for your needs.
            </p>

            <div className="bg-white/15 border border-white/30 rounded-xl p-3 mb-4">
              <textarea
                placeholder="What are you feeling today? e.g. chest pain, headache, fatigue..."
                value={symptoms}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setSymptoms(e.target.value)
                }
                className="w-full bg-transparent border-none outline-none text-white placeholder:text-white/60 resize-none min-h-[70px] text-sm font-[inherit]"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!symptoms.trim() || isLoading}
              className="bg-white text-blue-600 hover:bg-gray-100 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={14} />
                  Analyzing...
                </span>
              ) : (
                "Get Recommendations →"
              )}
            </Button>
          </div>

          {/* Right Card — dynamic after API call, static placeholder before */}
          <Card className="bg-white/90 backdrop-blur-md rounded-2xl w-full md:w-80">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 mb-2">Recommended for you</p>

              {topDoctor ? (
                // ✅ Show top doctor from API response
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">
                      {getInitials(topDoctor.name)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {topDoctor.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {topDoctor.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
                    <Star
                      className="text-yellow-500 fill-yellow-500"
                      size={16}
                    />
                    <span>{topDoctor.rating}</span>
                    <span>• {topDoctor.experience} yrs exp</span>
                    <span>• ${topDoctor.fee}</span>
                  </div>
                </>
              ) : (
                // ❌ Placeholder content before API response
                <div className="text-center py-10">
                  <p className="text-gray-400">
                    Your recommended specialist will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal — shows all doctors */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {isLoading && (
              <div className="flex flex-col items-center py-10 gap-4">
                <Loader2 className="animate-spin text-blue-600" size={40} />
                <p className="text-gray-500">Analyzing your symptoms…</p>
              </div>
            )}

            {error && (
              <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
                <Button onClick={closeModal} className="mt-4">
                  Close
                </Button>
              </div>
            )}

            {result && !isLoading && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Recommended Specialists
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  Based on:{" "}
                  <em className="text-gray-700">&quot;{symptoms}&quot;</em>
                </p>

                <div className="space-y-3">
                  {result.doctors.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {getInitials(doc.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doc.specialization}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                          <Star
                            className="text-yellow-500 fill-yellow-500"
                            size={12}
                          />
                          <span>{doc.rating}</span>
                          <span>• {doc.experience} yrs exp</span>
                          <span>• ${doc.fee}</span>
                        </div>
                      </div>
                      <Button size="sm" className="shrink-0">
                        Book
                      </Button>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400 mt-5 text-center">
                  ⚠️ {result.message}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Recommendation;
