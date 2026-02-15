"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

type Timeframe = "daily" | "weekly" | "monthly";

/** Mock series (illustrative only). 12 points each, values 1–10. */
const SERIES: Record<Timeframe, number[]> = {
  daily: [5, 5, 6, 5, 7, 6, 7, 8, 7, 8, 9, 10],
  weekly: [5, 6, 6, 7, 7, 8, 8, 8, 9, 9, 9, 10],
  monthly: [5, 6, 6, 7, 7, 8, 7, 8, 9, 8, 9, 10],
};

const X_LABELS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const Y_TICKS = [10, 8, 6, 4, 2];

const CHART_WIDTH = 520;
const CHART_HEIGHT = 240;
const PAD_LEFT = 40;
const PAD_RIGHT = 20;
const PAD_TOP = 20;
const PAD_BOTTOM = 30;
const PLOT_W = CHART_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_H = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;

/** Tooltip label for a point (mock date from index). */
function pointLabel(index: number, score: number): string {
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const year = index >= 9 ? 2023 : 2022;
  const day = index === 11 ? 23 : 15;
  return `${months[index]} ${day}, ${year} — SF Score: ${score}`;
}

function HistoricalChart({
  data,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  data: number[];
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  onLeave: () => void;
}) {
  const minY = 1;
  const maxY = 10;
  const n = data.length;
  const stepX = n > 1 ? PLOT_W / (n - 1) : PLOT_W;

  const toX = (i: number) => PAD_LEFT + i * stepX;
  const toY = (v: number) => PAD_TOP + PLOT_H - ((v - minY) / (maxY - minY)) * PLOT_H;

  const pathD = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`)
    .join(" ");

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="w-full h-auto"
        aria-hidden
        onMouseLeave={onLeave}
      >
        {/* Horizontal grid */}
        {Y_TICKS.map((y) => (
          <line
            key={y}
            x1={PAD_LEFT}
            y1={toY(y)}
            x2={PAD_LEFT + PLOT_W}
            y2={toY(y)}
            stroke="rgb(226 232 240)"
            strokeWidth="1"
          />
        ))}
        {/* Y axis labels */}
        {Y_TICKS.map((y) => (
          <text
            key={y}
            x={PAD_LEFT - 8}
            y={toY(y) + 4}
            textAnchor="end"
            className="fill-slate-400 text-[10px] font-medium"
          >
            {y}
          </text>
        ))}
        {/* X axis labels */}
        {X_LABELS.map((label, i) => (
          <text
            key={i}
            x={toX(i)}
            y={CHART_HEIGHT - 8}
            textAnchor="middle"
            className="fill-slate-400 text-[10px] font-medium"
          >
            {label}
          </text>
        ))}
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="rgb(2 132 199)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Points */}
        {data.map((v, i) => (
          <circle
            key={i}
            cx={toX(i)}
            cy={toY(v)}
            r={hoveredIndex === i ? 6 : 4}
            fill="white"
            stroke="rgb(2 132 199)"
            strokeWidth="2"
            onMouseEnter={() => onHover(i)}
            onMouseLeave={onLeave}
          />
        ))}
      </svg>
      {/* Tooltip overlay (positioned over chart) */}
      {hoveredIndex !== null && hoveredIndex >= 0 && hoveredIndex < data.length && (
        <div
          className="pointer-events-none absolute z-10"
          style={{
            left: `${(toX(hoveredIndex) / CHART_WIDTH) * 100}%`,
            top: `${(toY(data[hoveredIndex]) / CHART_HEIGHT) * 100}%`,
            transform: "translate(-50%, calc(-100% - 10px))",
          }}
        >
          <div className="relative rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-white shadow-lg">
            {pointLabel(hoveredIndex, data[hoveredIndex])}
            <div
              className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-800"
              aria-hidden
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function HistoricalScoresBlock() {
  const [timeframe, setTimeframe] = useState<Timeframe>("weekly");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = SERIES[timeframe];

  return (
    <section className="bg-white py-14 md:py-20" aria-labelledby="historical-scores-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-sky-600 font-extrabold tracking-tight text-sm">Historical Scores</p>
            <h2 id="historical-scores-heading" className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              See how scores evolve over time.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-xl">
              Track trend changes and consistency for any ticker, and understand when its signal profile shifts.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed max-w-xl">
              Switch between daily, weekly, and monthly views to reduce noise and focus on the bigger picture.
            </p>
            {/* TODO: add /stocks/TSLA/history page when available */}
            <Link
              href="/stocks/TSLA/history"
              className="mt-6 inline-flex items-center gap-2 text-sky-700 font-semibold hover:text-sky-600 transition"
            >
              View TSLA historical scores
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Right: card with chart */}
          <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">
            <div className="px-5 md:px-6 pt-5 md:pt-6">
              <h3 className="text-sm font-extrabold text-slate-800">AI-Powered Historical Scores</h3>
              <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-[12px] text-slate-500 font-semibold">
                  <span className="inline-block h-0.5 w-6 rounded-full bg-sky-500" aria-hidden />
                  SF Score
                </div>
                <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
                  {(["daily", "weekly", "monthly"] as const).map((tf) => (
                    <button
                      key={tf}
                      type="button"
                      onClick={() => setTimeframe(tf)}
                      className={`px-3 py-1.5 text-[12px] font-bold rounded-lg transition capitalize ${
                        timeframe === tf ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-3 sm:px-4 md:px-6 pb-4 md:pb-6 pt-3">
              <HistoricalChart
                data={data}
                hoveredIndex={hoveredIndex}
                onHover={setHoveredIndex}
                onLeave={() => setHoveredIndex(null)}
              />
            </div>
            <p className="px-5 md:px-6 pb-4 text-[11px] text-slate-400 leading-snug">
              Illustrative example only. Not investment advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
