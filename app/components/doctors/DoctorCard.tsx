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

  const visibleSlots = doctor.slots.slice(0, 3);
  const extraSlots = doctor.slots.length - 3;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{doctor.name}</p>
            <p className="text-gray-500 text-xs">{doctor.specialty}</p>
          </div>
        </div>
        <span
          className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
            doctor.available
              ? "text-green-700 border-green-300 bg-green-50"
              : "text-gray-500 border-gray-200 bg-gray-50"
          }`}
        >
          {doctor.available ? "Available" : "Unavailable"}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="text-yellow-400">★</span>
          <span className="text-gray-700 font-medium">{doctor.rating}</span>
          <span>({doctor.reviews})</span>
        </span>
        <span className="flex items-center gap-1">
          <span>🕐</span>
          {doctor.experience} yrs
        </span>
        <span className="flex items-center gap-1">
          <span>$</span>${doctor.fee}
        </span>
      </div>

      {/* Time Slots */}
      <div className="flex flex-wrap gap-2">
        {visibleSlots.map((slot) => (
          <span
            key={slot}
            className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-lg"
          >
            {slot}
          </span>
        ))}
        {extraSlots > 0 && (
          <span className="text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-lg">
            +{extraSlots} more
          </span>
        )}
      </div>

      {/* Book Button */}
      <button
        onClick={() => onBook?.(doctor)}
        disabled={!doctor.available}
        className={`w-full py-3 rounded-xl text-sm font-medium transition-opacity ${
          doctor.available
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-blue-200 text-white cursor-not-allowed opacity-60"
        }`}
      >
        Book Appointment
      </button>
    </div>
  );
}
