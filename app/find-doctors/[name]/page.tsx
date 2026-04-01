"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function DoctorDetailsPage() {
  const router = useRouter();
  const params = useParams();

  // 🔥 Mock Data (later replace with API / global state)
  const doctor = {
    name: params.name?.toString().replace(/-/g, " ") || "Dr. James Wilson",
    specialty: "Neurology",
    rating: 4.8,
    reviews: 189,
    experience: 12,
    fee: 150,
    slots: ["8:00 AM", "11:00 AM", "1:00 PM"],
  };

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState("Mon 7");

  const days = ["Mon 7", "Tue 8", "Wed 9", "Thu 10", "Fri 11"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
      {/* LEFT SIDE */}
      <div className="md:col-span-2 flex flex-col gap-6">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to doctors
        </button>

        {/* Doctor Info */}
        <Card>
          <CardContent className="p-6 flex gap-4 items-start">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
              JW
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold">{doctor.name}</h2>
              <p className="text-muted-foreground">{doctor.specialty}</p>

              <div className="flex gap-4 text-sm mt-2">
                ⭐ {doctor.rating} ({doctor.reviews}) ⏱ {doctor.experience} yrs
                💲 {doctor.fee}
              </div>

              <div className="flex gap-2 mt-3">
                <Badge variant="secondary">Board Certified</Badge>
                <Badge variant="secondary">Top Rated</Badge>
              </div>
            </div>

            <Badge className="bg-green-100 text-green-700">Verified</Badge>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-sm text-muted-foreground">
              Specializes in neurological disorders including migraines,
              epilepsy, and movement disorders.
            </p>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Patient Reviews</h3>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                A
              </div>
              <div>
                <p className="font-medium">Alice R.</p>
                <p className="text-sm text-muted-foreground">
                  Absolutely fantastic experience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT SIDE (BOOKING) */}
      <Card>
        <CardContent className="p-6 flex flex-col gap-4">
          <h3 className="font-semibold">Book Appointment</h3>

          {/* Days */}
          <div className="flex gap-2">
            {days.map((d) => (
              <Button
                key={d}
                variant={selectedDay === d ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(d)}
              >
                {d}
              </Button>
            ))}
          </div>

          {/* Slots */}
          <div className="flex flex-col gap-2">
            {doctor.slots.map((slot) => (
              <Button
                key={slot}
                variant={selectedSlot === slot ? "default" : "outline"}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span>Consultation Fee</span>
            <span className="font-semibold">${doctor.fee}</span>
          </div>

          <Button disabled={!selectedSlot}>
            {selectedSlot ? `Book for ${selectedSlot}` : "Select a time slot"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
