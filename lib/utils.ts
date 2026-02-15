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
