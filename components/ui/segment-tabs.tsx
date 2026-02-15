"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, BarChart2, Lightbulb, LayoutGrid, Factory } from "lucide-react";

const TABS: { id: string; label: string; icon?: React.ComponentType<{ className?: string }> }[] = [
  { id: "stocks", label: "Top Stocks", icon: TrendingUp },
  { id: "etfs", label: "ETFs", icon: BarChart2 },
  { id: "trade-ideas", label: "Trade Ideas", icon: Lightbulb },
  { id: "sectors", label: "Groups", icon: LayoutGrid },
  { id: "industries", label: "Portfolios", icon: Factory },
];

type SegmentTabsProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function SegmentTabs({ value, onValueChange }: SegmentTabsProps) {
  return (
    <div
      className="flex flex-wrap gap-0 rounded-xl border border-[#E5E7EB] bg-white p-1 shadow-sm"
      role="tablist"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onValueChange(tab.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-[#EAF4FF] text-gray-900 shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span className={cn(isActive && "border-b-2 border-[#1D74C6] pb-0.5")}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
