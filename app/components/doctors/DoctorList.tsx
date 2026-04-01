"use client";

import { useState, useMemo } from "react";
import DoctorCard from "./DoctorCard";
import DoctorSearch from "./DoctorSearch";
import DoctorFilters from "./Filters";

type Doctor = {
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  experience: number;
  fee: number;
  slots: string[];
  available: boolean;
};

const DOCTORS: Doctor[] = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 234,
    experience: 15,
    fee: 120,
    slots: ["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"],
    available: true,
  },
  {
    name: "Dr. James Wilson",
    specialty: "Neurology",
    rating: 4.8,
    reviews: 189,
    experience: 12,
    fee: 150,
    slots: ["8:00 AM", "11:00 AM", "1:00 PM"],
    available: true,
  },
  {
    name: "Dr. Priya Patel",
    specialty: "Dermatology",
    rating: 4.9,
    reviews: 312,
    experience: 8,
    fee: 100,
    slots: ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"],
    available: true,
  },
  {
    name: "Dr. Michael Brown",
    specialty: "Orthopedics",
    rating: 4.7,
    reviews: 156,
    experience: 20,
    fee: 180,
    slots: ["9:30 AM", "2:30 PM"],
    available: true,
  },
  {
    name: "Dr. Lisa Wang",
    specialty: "Pediatrics",
    rating: 5,
    reviews: 421,
    experience: 10,
    fee: 90,
    slots: ["8:30 AM", "10:00 AM", "1:30 PM", "3:00 PM", "4:30 PM"],
    available: true,
  },
  {
    name: "Dr. Robert Kim",
    specialty: "Dentistry",
    rating: 4.8,
    reviews: 267,
    experience: 14,
    fee: 110,
    slots: [],
    available: false,
  },
  {
    name: "Dr. Anna Martinez",
    specialty: "Ophthalmology",
    rating: 4.9,
    reviews: 198,
    experience: 16,
    fee: 140,
    slots: ["9:00 AM", "11:30 AM", "3:00 PM"],
    available: true,
  },
  {
    name: "Dr. David Lee",
    specialty: "Cardiology",
    rating: 4.6,
    reviews: 345,
    experience: 22,
    fee: 200,
    slots: ["10:00 AM", "2:00 PM"],
    available: true,
  },
];

const SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Orthopedics",
  "Pediatrics",
  "Dentistry",
  "Ophthalmology",
];

export default function FindDoctorPage() {
  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const filtered = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "All" || doc.specialty === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [search, selectedSpecialty]);

  const handleBook = (doctor: Doctor) => {
    alert(`Booking appointment with ${doctor.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Browse our network of top-rated specialists
          </p>
        </div>

        {/* Search */}
        <DoctorSearch value={search} onChange={setSearch} />

        {/* Filters */}
        <DoctorFilters
          specialties={SPECIALTIES}
          selected={selectedSpecialty}
          onSelect={setSelectedSpecialty}
        />

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm">No doctors found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((doc) => (
              <DoctorCard key={doc.name} doctor={doc} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
