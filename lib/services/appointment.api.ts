import { api } from "@/lib/axios";

// 🔹 Types (optional but recommended)
export interface BookAppointmentPayload {
  user_id: number;
  doctor_id: number;
  slot_id: number;
}

export interface BookAppointmentResponse {
  message: string;
  appointment_id: number;
}

// 🔥 POST API → Book Appointment
export const bookAppointment = async (
  payload: BookAppointmentPayload,
): Promise<BookAppointmentResponse> => {
  const { user_id, doctor_id, slot_id } = payload;

  const res = await api.post<BookAppointmentResponse>(
    `/appointments/`,
    null, // ⚠️ body empty
    {
      params: {
        user_id,
        doctor_id,
        slot_id,
      },
    },
  );

  return res.data;
};
