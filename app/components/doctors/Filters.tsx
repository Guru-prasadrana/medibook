type Props = {
  specialties: string[];
  selected: string;
  onSelect: (specialty: string) => void;
};

export default function DoctorFilters({
  specialties,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-gray-400">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </span>

      {["All", ...specialties].map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === s
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
