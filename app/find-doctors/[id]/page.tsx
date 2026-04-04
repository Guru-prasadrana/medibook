"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchDoctorById } from "@/app/store/slices/doctorSlice";
import { fetchSlotsByDoctorId } from "@/app/store/slices/slotSlice";
import { Slot } from "@/app/lib/slot";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { bookAppointment } from "@/lib/services/appointment.api";
import {
  ArrowLeft,
  Star,
  Clock,
  DollarSign,
  CalendarDays,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

const reviews = [
  {
    initial: "A",
    name: "Alice R.",
    rating: 5,
    text: "Absolutely fantastic experience. Very thorough and caring.",
  },
  {
    initial: "J",
    name: "John D.",
    rating: 5,
    text: "Explained everything clearly. Highly recommend!",
  },
  {
    initial: "M",
    name: "Maria S.",
    rating: 4,
    text: "Great doctor, wait time was a bit long but worth it.",
  },
];

function getInitials(name: string): string {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatTime(time: string): string {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 || 12;
  return `${h}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function DoctorDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const {
    selectedDoctor: doctor,
    loadingById,
    error,
  } = useSelector((state: RootState) => state.doctor);
  const { slots, loading: slotsLoading } = useSelector(
    (state: RootState) => state.slot,
  );

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [manualDate, setManualDate] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const id = Number(params.id);
    if (id) {
      dispatch(fetchDoctorById(id));
      dispatch(fetchSlotsByDoctorId(id));
    }
  }, [dispatch, params.id]);

  // Group slots by date
  const slotsByDate = slots.reduce<Record<string, Slot[]>>((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  const dates = Object.keys(slotsByDate).sort();

  // Derive selected date — use manual pick or fall back to first available
  const selectedDate = manualDate ?? dates[0] ?? null;
  const visibleSlots = selectedDate ? (slotsByDate[selectedDate] ?? []) : [];
  const handleConfirmBooking = async () => {
    if (!selectedSlot || !doctor) return;

    try {
      setBookingLoading(true);

      const res = await bookAppointment({
        user_id: 2, // 🔥 replace with logged user later
        doctor_id: doctor.id,
        slot_id: selectedSlot.id,
      });

      toast.success(res.message); // 🔥 simple success (later toast)
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loadingById || (!doctor && !error)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400 text-sm">Doctor not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-5 hover:text-gray-700 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to doctors
        </button>

        <div className="grid md:grid-cols-3 gap-5">
          {/* ── LEFT COLUMN ── */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {/* Doctor Info */}
            <Card className="shadow-sm border border-gray-100 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div
                    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #42b8f5, #1a8fe3)",
                    }}
                  >
                    {getInitials(doctor.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {doctor.name}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {doctor.specialization}
                        </p>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600 border border-green-200 bg-green-50 rounded-full px-3 py-1 shrink-0">
                        <CheckCircle2 size={13} className="text-green-500" />
                        Verified
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Star
                          size={14}
                          className="text-yellow-400 fill-yellow-400"
                        />
                        <span className="font-semibold text-gray-800">
                          {doctor.rating}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        {doctor.experience} years exp
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} className="text-gray-400" />$
                        {doctor.consultation_fee} / session
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-gray-400" />
                        {doctor.location}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3"
                      >
                        🏅 Board Certified
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3"
                      >
                        🏆 Top Rated
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card className="shadow-sm border border-gray-100 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Specialist in {doctor.specialization} with {doctor.experience}{" "}
                  years of experience. Based in {doctor.location}, committed to
                  delivering high-quality patient care and evidence-based
                  treatment.
                </p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="shadow-sm border border-gray-100 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Patient Reviews
                </h3>
                <div className="flex flex-col divide-y divide-gray-100">
                  {reviews.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
                    >
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600 shrink-0">
                        {r.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-800">
                            {r.name}
                          </p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, s) => (
                              <Star
                                key={s}
                                size={13}
                                className={
                                  s < r.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-200 fill-gray-200"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {r.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── RIGHT COLUMN (BOOKING) ── */}
          <div>
            <Card className="shadow-sm border border-gray-100 rounded-2xl sticky top-24">
              <CardContent className="p-6 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <CalendarDays size={20} className="text-blue-500" />
                  <h3 className="font-bold text-gray-900 text-lg">
                    Book Appointment
                  </h3>
                </div>

                {slotsLoading ? (
                  <div className="flex justify-center py-6">
                    <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : dates.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">
                    No available slots.
                  </p>
                ) : (
                  <>
                    {/* Date Tabs */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Select Date
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {dates.map((date) => (
                          <button
                            key={date}
                            onClick={() => {
                              setManualDate(date);
                              setSelectedSlot(null);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                              selectedDate === date
                                ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                          >
                            {formatDateLabel(date)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Available Slots
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {visibleSlots.map((slot) => (
                          <button
                            key={slot.id}
                            disabled={slot.is_booked}
                            onClick={() => setSelectedSlot(slot)}
                            className={`h-[44px] rounded-xl text-sm font-medium transition-all border ${
                              slot.is_booked
                                ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through"
                                : selectedSlot?.id === slot.id
                                  ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-100"
                                  : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                            }`}
                          >
                            {formatTime(slot.time)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Fee */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm text-gray-600">
                    Consultation Fee
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ${doctor.consultation_fee}
                  </span>
                </div>

                {/* Book Button */}
                <button
                  disabled={!selectedSlot}
                  onClick={() => setShowModal(true)} // 🔥 open modal
                  className={`w-full h-[52px] rounded-2xl text-sm font-semibold text-white transition-all ${
                    selectedSlot
                      ? "bg-gradient-to-r from-[#42b8f5] to-[#1a8fe3] hover:opacity-90 shadow-md shadow-blue-200 cursor-pointer"
                      : "bg-gradient-to-r from-[#a8d8f5] to-[#7bbde8] cursor-not-allowed"
                  }`}
                >
                  {selectedSlot
                    ? `Book for ${formatTime(selectedSlot.time)}`
                    : "Select a time slot"}
                </button>
                <p className="text-xs text-center text-muted-foreground -mt-2">
                  Free cancellation up to 24 hours before
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Confirm Booking
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to book this appointment at{" "}
              <span className="font-semibold">
                {selectedSlot && formatTime(selectedSlot.time)}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              {/* Cancel */}
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                onClick={handleConfirmBooking}
                disabled={bookingLoading}
                className="px-4 py-2 rounded-lg text-sm text-white bg-blue-600 hover:opacity-90"
              >
                {bookingLoading ? "Booking..." : "Yes, Book"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
