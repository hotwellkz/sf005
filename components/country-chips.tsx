"use client";

import { cn } from "@/lib/utils";

const CHIPS = [
  { id: "usa", label: "USA", flag: "🇺🇸" },
  { id: "europe", label: "Europe", flag: "🇪🇺" },
  { id: "austria", label: "Austria", flag: "🇦🇹" },
  { id: "belgium", label: "Belgium", flag: "🇧🇪" },
  { id: "canada", label: "Canada", flag: "🇨🇦" },
  { id: "denmark", label: "Denmark", flag: "🇩🇰" },
  { id: "finland", label: "Finland", flag: "🇫🇮" },
  { id: "france", label: "France", flag: "🇫🇷" },
];

export function CountryChips() {
  return (
    <div className="flex overflow-x-auto rounded-xl border border-border bg-white p-3 scrollbar-thin">
      <div className="flex gap-2">
        {CHIPS.map((chip) => (
          <button
            key={chip.id}
            type="button"
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              "border-border bg-chip-bg text-gray-900",
              "hover:border-primary/30 hover:bg-primary/5",
              "focus:outline-none focus:ring-2 focus:ring-primary/30"
            )}
          >
            <span className="text-lg" aria-hidden>
              {chip.flag}
            </span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
