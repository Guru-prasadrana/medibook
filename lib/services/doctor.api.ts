import { api } from "@/lib/axios";
import { Doctor } from "@/app/types/doctor";

// 🔹 Get all doctors (with specialization filter)
export const getDoctors = async (specialization?: string) => {
  const res = await api.get<Doctor[]>("/doctors", {
    params: { specialization },
  });
  return res.data;
};

// 🔹 Search by name
export const searchDoctorByName = async (name: string) => {
  const res = await api.get<Doctor[]>("/doctors/search/by-name", {
    params: { name },
  });
  return res.data;
};

// 🔹 Search by location
export const searchDoctorByLocation = async (location: string) => {
  const res = await api.get<Doctor[]>("/doctors/search/by-location", {
    params: { location },
  });
  return res.data;
};

// 🔹 Get doctor by ID
export const getDoctorById = async (id: number) => {
  const res = await api.get<Doctor>(`/doctors/${id}`);
  return res.data;
};
