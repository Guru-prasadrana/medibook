"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DoctorSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-md">
      {/* Icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      {/* Input */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search doctors or specialties..."
        className="pl-9 h-11 rounded-xl"
      />
    </div>
  );
}
