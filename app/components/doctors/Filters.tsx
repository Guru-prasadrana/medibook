"use client";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

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
      {/* Icon */}
      <Filter className="h-4 w-4 text-muted-foreground" />

      {/* Filters */}
      {["All", ...specialties].map((s) => (
        <Button
          key={s}
          variant={selected === s ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(s)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === s
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
          }`}
        >
          {s}
        </Button>
      ))}
    </div>
  );
}
