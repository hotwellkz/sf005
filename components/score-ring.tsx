"use client";

import { cn, getScoreColor } from "@/lib/utils";

type ScoreRingProps = {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
};

const DEFAULT_SIZE = 44;
const DEFAULT_STROKE = 5;

export function ScoreRing({
  score,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE,
  showLabel = true,
  className,
}: ScoreRingProps) {
  const normalized = Math.min(10, Math.max(0, Number(score)));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (normalized / 10) * circumference;
  const color = getScoreColor(normalized);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Score ${normalized} out of 10`}
    >
      <svg
        width={size}
        height={size}
        className=" -rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showLabel && (
        <span
          className="absolute text-sm font-semibold text-gray-900"
          style={{ fontSize: size * 0.32 }}
        >
          {Math.round(normalized)}
        </span>
      )}
    </div>
  );
}
