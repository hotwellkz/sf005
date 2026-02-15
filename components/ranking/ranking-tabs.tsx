"use client";

import { cn } from "@/lib/utils";

const TABS: { id: string; label: string }[] = [
  { id: "stocks", label: "Top Stocks" },
  { id: "etfs", label: "ETFs" },
  { id: "trade-ideas", label: "Trade Ideas" },
  { id: "sectors", label: "Sectors" },
  { id: "industries", label: "Industries" },
];

type Props = {
  value: string;
  onValueChange: (value: string) => void;
};

export function RankingTabs({ value, onValueChange }: Props) {
  return (
    <div
      className="mt-6 flex flex-wrap gap-0 rounded-xl border border-border bg-white p-1"
      role="tablist"
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={value === tab.id}
          onClick={() => onValueChange(tab.id)}
          className={cn(
            "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
            value === tab.id
              ? "bg-primary/10 text-gray-900 underline decoration-primary decoration-2 underline-offset-4"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
