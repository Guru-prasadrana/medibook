"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Doctor } from "@/app/types/doctor";

type Props = {
  doctor: Doctor;
  onBook?: (doctor: Doctor) => void;
};

export default function DoctorCard({ doctor, onBook }: Props) {
  const initials = doctor.name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("");

  const router = useRouter();

  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
      <CardContent className="p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
              {initials}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                {doctor.name}
              </p>
              <p className="text-gray-500 text-xs">{doctor.specialization}</p>
            </div>
          </div>

          {/* No `available` field in API — show location badge instead */}
          <span className="text-xs px-2.5 py-1 rounded-full font-medium border text-blue-700 border-blue-200 bg-blue-50">
            {doctor.location}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-700 font-medium">{doctor.rating}</span>
          </span>

          <span className="flex items-center gap-1">
            🕐 {doctor.experience} yrs
          </span>

          <span className="flex items-center gap-1">
            ${doctor.consultation_fee}
          </span>
        </div>

        {/* Book Button */}
        <Button
          onClick={() => router.push(`/find-doctors/${doctor.id}`)}
          className="w-full py-3 rounded-xl text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white transition-opacity"
        >
          Book Appointment
        </Button>
      </CardContent>
    </Card>
  );
}
