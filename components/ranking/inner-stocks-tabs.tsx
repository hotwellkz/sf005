"use client";

import { cn } from "@/lib/utils";

const INNER_TABS: { id: string; label: string }[] = [
  { id: "top-popular", label: "Top Popular" },
  { id: "top-low-risk", label: "Top Low-Risk" },
  { id: "top-dividend", label: "Top Dividend" },
  { id: "top-high-dividend", label: "Top High Dividend" },
  { id: "top-growth", label: "Top Growth" },
  { id: "top-nasdaq100", label: "Top Nasdaq 100" },
  { id: "top-sp500", label: "Top S&P 500" },
  { id: "top-penny", label: "Top Penny" },
];

type InnerStocksTabsProps = {
  value: string;
  onValueChange?: (value: string) => void;
};

export function InnerStocksTabs({ value, onValueChange }: InnerStocksTabsProps) {
  return (
    <div className="flex flex-wrap gap-1 rounded-xl border border-[#E5E7EB] bg-white p-1 shadow-sm">
      {INNER_TABS.map((tab) => {
        const isActive = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onValueChange?.(tab.id)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-[#EAF4FF] text-[#1D74C6]"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
