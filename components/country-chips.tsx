"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { FlagIcon } from "@/components/FlagIcon";

const CHIPS: { id: string; label: string; code: string }[] = [
  { id: "usa", label: "USA", code: "US" },
  { id: "europe", label: "Europe", code: "EU" },
  { id: "austria", label: "Austria", code: "AT" },
  { id: "belgium", label: "Belgium", code: "BE" },
  { id: "canada", label: "Canada", code: "CA" },
  { id: "denmark", label: "Denmark", code: "DK" },
  { id: "finland", label: "Finland", code: "FI" },
  { id: "france", label: "France", code: "FR" },
];

type CountryChipsProps = {
  label?: string;
  value?: string;
  onValueChange?: (id: string) => void;
};

export function CountryChips({
  label = "Top Stocks in:",
  value,
  onValueChange,
}: CountryChipsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E5E7EB] bg-white p-3">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex flex-1 flex-wrap items-center justify-end gap-2 min-w-0">
        <div className="flex gap-2 overflow-x-auto scrollbar-thin">
          {CHIPS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => onValueChange?.(chip.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                "border-[#E5E7EB] bg-[#F1F3F6] text-gray-900",
                "hover:border-[#1D74C6]/30 hover:bg-[#E8F2FF]",
                "focus:outline-none focus:ring-2 focus:ring-[#1D74C6]/30",
                value === chip.id && "border-[#1D74C6] bg-[#E8F2FF]"
              )}
            >
              <FlagIcon countryCode={chip.code} size={16} className="shrink-0" />
              <span>{chip.label}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#E5E7EB] bg-white text-gray-500 hover:bg-gray-50"
          aria-label="Expand filters"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
