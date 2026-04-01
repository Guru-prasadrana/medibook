type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DoctorSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-md">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search doctors or specialties..."
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
      />
    </div>
  );
}
