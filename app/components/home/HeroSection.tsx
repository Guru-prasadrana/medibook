"use client";

import {
  Search,
  MapPin,
  Stethoscope,
  Star,
  MapPinIcon,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchDoctors } from "@/app/store/slices/doctorSlice";
import { Doctor } from "@/app/types/doctor";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Hero = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { doctors, loading, error } = useSelector(
    (state: RootState) => state.doctor,
  );

  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setSearched(true);
    await dispatch(fetchDoctors(specialization || undefined));
  };

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value;
    setSpecialization(val);
    if (!val.trim() && !location.trim()) setSearched(false);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocation(val);
    if (!val.trim() && !specialization.trim()) setSearched(false);
  };

  const filteredDoctors = location.trim()
    ? doctors.filter((doctor: Doctor) =>
        doctor.location?.toLowerCase().includes(location.trim().toLowerCase()),
      )
    : doctors;

  return (
    <>
      <section className="relative w-full py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200 opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-200 opacity-30 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur shadow-sm text-sm text-gray-600 mb-8">
            ✨ AI-Powered Appointment Booking
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Book Smarter,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Not Harder
            </span>
          </h1>

          <p className="mt-6 text-gray-600 text-2xl max-w-2xl mx-auto leading-relaxed">
            Find the perfect doctor, book instantly, and manage your health
            journey — all in one seamless platform.
          </p>

          <div className="mt-10 bg-white/90 backdrop-blur shadow-xl rounded-full p-2 flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto border border-gray-100">
            <div className="flex items-center gap-3 px-5 py-3 w-full">
              <Stethoscope className="text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Enter specialization..."
                className="w-full outline-none text-sm bg-transparent"
                value={specialization}
                onChange={handleSpecializationChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <div className="hidden md:block h-6 w-px bg-gray-200" />

            <div className="flex items-center gap-3 px-5 py-3 w-full">
              <MapPin className="text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-sm bg-transparent"
                value={location}
                onChange={handleLocationChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 disabled:opacity-60 text-white px-7 py-3 rounded-full text-sm font-medium transition shadow-md"
            >
              <Search size={18} />
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          <div className="mt-14 flex flex-col md:flex-row justify-center gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">2,500+</h2>
              <p className="text-gray-500 text-sm">Expert Doctors</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">50K+</h2>
              <p className="text-gray-500 text-sm">Happy Patients</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">98%</h2>
              <p className="text-gray-500 text-sm">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {searched && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && <p className="text-center text-red-500 py-8">{error}</p>}

          {!loading && !error && filteredDoctors.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              No doctors found. Try a different specialization or location.
            </p>
          )}

          {!loading && filteredDoctors.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {filteredDoctors.length} Doctor
                {filteredDoctors.length !== 1 ? "s" : ""} Found
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor: Doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
};

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const router = useRouter();
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0">
          {doctor.name?.charAt(0) ?? "D"}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {doctor.name}
          </h3>
          <p className="text-blue-600 text-xs mt-0.5">
            {doctor.specialization}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 text-xs text-gray-500">
        {doctor.location && (
          <span className="flex items-center gap-1.5">
            <MapPinIcon size={13} className="text-gray-400" />
            {doctor.location}
          </span>
        )}
        {doctor.experience && (
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-gray-400" />
            {doctor.experience} yrs experience
          </span>
        )}
        {doctor.rating && (
          <span className="flex items-center gap-1.5">
            <Star size={13} className="text-yellow-400 fill-yellow-400" />
            {doctor.rating} / 5
          </span>
        )}
      </div>

      <Button
        onClick={() => router.push(`/find-doctors/${doctor.id}`)}
        className="w-full py-3 rounded-xl text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white transition-opacity"
      >
        Book Appointment
      </Button>
    </div>
  );
};

export default Hero;
