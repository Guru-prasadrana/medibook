"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  Star,
  Clock,
  DollarSign,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";

const slots = ["9:00 AM", "10:30 AM", "2:00 PM", "4:00 PM"];

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

// Format date as "April 16th, 2026"
function formatDate(date: Date): string {
  const day = date.getDate();
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 <= 3 && Math.floor(day / 10) !== 1 ? day % 10 : 0
  ];
  return format(date, `MMMM d'${suffix}', yyyy`);
}

export default function DoctorDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const doctor = {
    name: params.name?.toString().replace(/-/g, " ") || "Dr. Sarah Chen",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 234,
    experience: 15,
    fee: 120,
    initials: "SC",
    about:
      "Board-certified cardiologist with expertise in preventive cardiology and heart failure management. Published researcher with 50+ papers in leading journals.",
  };

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back */}
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
            {/* Doctor Info Card */}
            <Card className="shadow-sm border border-gray-100 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div
                    className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #42b8f5, #1a8fe3)",
                    }}
                  >
                    {doctor.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {doctor.name}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {doctor.specialty}
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
                        <span className="text-muted-foreground">
                          ({doctor.reviews} reviews)
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} className="text-gray-400" />
                        {doctor.experience} years exp
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} className="text-gray-400" />$
                        {doctor.fee} / session
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

            {/* About Card */}
            <Card className="shadow-sm border border-gray-100 rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">About</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {doctor.about}
                </p>
              </CardContent>
            </Card>

            {/* Reviews Card */}
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
                {/* Header */}
                <div className="flex items-center gap-2">
                  <CalendarDays size={20} className="text-blue-500" />
                  <h3 className="font-bold text-gray-900 text-lg">
                    Book Appointment
                  </h3>
                </div>

                {/* Select Date — shadcn Popover + Calendar */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Select Date
                  </p>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-white transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, #42b8f5, #1a8fe3)",
                        }}
                      >
                        <CalendarDays
                          size={15}
                          className="text-white/80 shrink-0"
                        />
                        {formatDate(selectedDate)}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 border border-gray-100 shadow-xl rounded-2xl overflow-hidden"
                      align="start"
                      sideOffset={8}
                    >
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date) {
                            setSelectedDate(date);
                            setCalendarOpen(false);
                          }
                        }}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                        classNames={{
                          months: "p-3",
                          caption:
                            "flex justify-center items-center relative mb-2",
                          caption_label: "text-sm font-semibold text-gray-800",
                          nav: "flex items-center gap-1",
                          nav_button:
                            "h-7 w-7 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors",
                          nav_button_previous: "absolute left-1",
                          nav_button_next: "absolute right-1",
                          table: "w-full border-collapse",
                          head_row: "flex mb-1",
                          head_cell:
                            "text-muted-foreground text-xs font-medium w-9 text-center",
                          row: "flex mt-1",
                          cell: "p-0",
                          day: "h-9 w-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center",
                          day_selected:
                            "bg-blue-500 text-white hover:bg-blue-500 hover:text-white rounded-xl font-semibold",
                          day_today:
                            "bg-cyan-100 text-cyan-600 font-semibold rounded-xl",
                          day_outside: "text-gray-300",
                          day_disabled:
                            "text-gray-200 cursor-not-allowed hover:bg-transparent hover:text-gray-200",
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Available Slots */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Available Slots
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`
                          h-[44px] rounded-xl text-sm font-medium transition-all border
                          ${
                            selectedSlot === slot
                              ? "bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-100"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                          }
                        `}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fee */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm text-gray-600">
                    Consultation Fee
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ${doctor.fee}
                  </span>
                </div>

                {/* Book button */}
                <button
                  disabled={!selectedSlot}
                  className={`
                    w-full h-[52px] rounded-2xl text-sm font-semibold text-white transition-all
                    ${
                      selectedSlot
                        ? "bg-gradient-to-r from-[#42b8f5] to-[#1a8fe3] hover:opacity-90 shadow-md shadow-blue-200 cursor-pointer"
                        : "bg-gradient-to-r from-[#a8d8f5] to-[#7bbde8] cursor-not-allowed"
                    }
                  `}
                >
                  {selectedSlot
                    ? `Book for ${selectedSlot}`
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
    </div>
  );
}
