"use client";

import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  fetchDoctors,
  fetchDoctorsByName,
} from "@/app/store/slices/doctorSlice";
import { Doctor } from "@/app/types/doctor";
import DoctorCard from "./DoctorCard";
import DoctorSearch from "./DoctorSearch";
import DoctorFilters from "./Filters";
import { useCallback } from "react";

const SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Orthopedics",
  "Pediatrics",
  "Dentistry",
  "Ophthalmology",
];

// Debounce helper
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function FindDoctorPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { doctors, loading, error } = useSelector(
    (state: RootState) => state.doctor,
  );

  const [search, setSearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const debouncedSearch = useDebounce(search, 400);

  // Fetch all doctors on mount
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  // When search changes — detect if it looks like a name or a specialty
  useEffect(() => {
    if (!debouncedSearch.trim()) {
      // Reset: re-fetch based on current specialty filter
      dispatch(
        fetchDoctors(
          selectedSpecialty === "All" ? undefined : selectedSpecialty,
        ),
      );
      return;
    }

    const isSpecialty = SPECIALTIES.some((s) =>
      s.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    if (isSpecialty) {
      // Search by specialization via fetchDoctors
      dispatch(fetchDoctors(debouncedSearch));
    } else {
      // Search by doctor name
      dispatch(fetchDoctorsByName(debouncedSearch));
    }
  }, [debouncedSearch, dispatch]);

  // Specialty filter click
  const handleSpecialtySelect = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSearch(""); // clear search when filter is clicked
    dispatch(fetchDoctors(specialty === "All" ? undefined : specialty));
  };

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
          onSelect={handleSpecialtySelect}
        />

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Error */}
        {!loading && error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Empty */}
        {!loading && !error && doctors.length === 0 && (
          <p className="text-gray-400 text-sm">No doctors found.</p>
        )}

        {/* Grid */}
        {!loading && doctors.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doc: Doctor) => (
              <DoctorCard key={doc.id} doctor={doc} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
