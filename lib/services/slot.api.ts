import { api } from "@/lib/axios";
import { Slot } from "@/app/lib/slot";

// 🔹 Get slots by doctor ID
export const getSlotsByDoctorId = async (doctorId: number) => {
  const res = await api.get<Slot[]>(`/slots/${doctorId}`);
  return res.data;
};
