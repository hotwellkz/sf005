import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): string {
  if (score >= 9) return "#22C55E";
  if (score >= 7) return "#84CC16";
  if (score >= 4) return "#F59E0B";
  return "#EF4444";
}

/** Format volume with compact notation (e.g. 11.16M, 2.3B). maxFractionDigits 2. */
export function formatCompactNumber(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  try {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
    return String(Math.round(value));
  }
}
