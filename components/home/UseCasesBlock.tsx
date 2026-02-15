"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BarDatum = {
  label: string;
  value: number;
  kind: "neg" | "zero" | "pos";
};

const CHART_DATA: BarDatum[] = [
  { label: "1–2", value: -8, kind: "neg" },
  { label: "3–4", value: -4, kind: "neg" },
  { label: "5–6", value: -1, kind: "neg" },
  { label: "Market", value: 0, kind: "zero" },
  { label: "7–8", value: 3, kind: "pos" },
  { label: "9–10", value: 6, kind: "pos" },
];

const CHART_WIDTH = 360;
const CHART_HEIGHT = 200;
const PAD_LEFT = 50;
const PAD_RIGHT = 20;
const PAD_TOP = 28;
const PAD_BOTTOM = 44;
const CHART_W = CHART_WIDTH - PAD_LEFT - PAD_RIGHT;
const CHART_H = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;
const BASELINE_Y = PAD_TOP + CHART_H / 2;
const MAX_ABS = 8;
const SCALE = (CHART_H / 2) / MAX_ABS;
const BAR_GAP = 6;
const BAR_WIDTH = (CHART_W - (CHART_DATA.length - 1) * BAR_GAP) / CHART_DATA.length;

function BarChart() {
  const barCenters = CHART_DATA.map((_, i) =>
    PAD_LEFT + BAR_WIDTH / 2 + i * (BAR_WIDTH + BAR_GAP)
  );

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="mt-5 w-full"
      aria-hidden
    >
      {/* Y-axis label */}
      <text
        x={14}
        y={PAD_TOP + CHART_H / 2}
        textAnchor="middle"
        className="fill-slate-500 text-[10px] font-medium"
        transform={`rotate(-90, 14, ${PAD_TOP + CHART_H / 2})`}
      >
        Score index (illustrative)
      </text>
      {/* Baseline */}
      <line
        x1={PAD_LEFT}
        y1={BASELINE_Y}
        x2={PAD_LEFT + CHART_W}
        y2={BASELINE_Y}
        stroke="#94a3b8"
        strokeWidth="1"
        strokeDasharray="4 2"
      />
      {/* Bars + value labels + category labels */}
      {CHART_DATA.map((d, i) => {
        const cx = barCenters[i];
        const isNeg = d.value < 0;
        const isZero = d.value === 0;
        const barH = Math.abs(d.value) * SCALE;
        const x = cx - BAR_WIDTH / 2;
        const barY = isNeg ? BASELINE_Y : BASELINE_Y - barH;
        const barHeight = isZero ? 2 : barH;
        const fillClass =
          d.kind === "neg"
            ? "fill-red-400"
            : d.kind === "pos"
              ? "fill-emerald-500"
              : "fill-slate-400";

        return (
          <g key={d.label}>
            <rect
              x={x}
              y={isZero ? BASELINE_Y - 1 : barY}
              width={BAR_WIDTH}
              height={barHeight}
              rx={2}
              className={fillClass}
            />
            {/* Value above/below bar */}
            <text
              x={cx}
              y={isNeg ? BASELINE_Y + barH + 14 : BASELINE_Y - barH - 6}
              textAnchor="middle"
              className="fill-slate-700 text-[11px] font-semibold"
            >
              {d.value > 0 ? `+${d.value}` : d.value}
            </text>
            {/* Category label */}
            <text
              x={cx}
              y={CHART_HEIGHT - 18}
              textAnchor="middle"
              className="fill-slate-500 text-[10px] font-medium"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function UseCasesBlock() {
  return (
    <section
      id="use-cases"
      className="bg-white py-14 text-slate-900 md:py-20"
      aria-label="Use cases"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-xl font-extrabold tracking-tight text-sky-600 md:text-2xl">
          Use Cases
        </h2>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-sky-700 md:text-3xl">
              Spot strong setups. Filter out noisy picks.
            </h3>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              Use the StockForge AI Score to quickly compare stocks on a
              consistent 1–10 scale. Combine it with sector context and risk
              indicators to build watchlists faster and stay focused on
              higher-quality signals.
            </p>
            {/* TODO: implement /top-stocks page if needed */}
            <Link
              href="/top-stocks"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-700 transition hover:text-sky-600"
            >
              Explore today&apos;s top signals
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-6">
            <p className="text-sm font-extrabold text-slate-900 md:text-base">
              AI Score buckets vs. broad market (illustration)
            </p>
            <p className="mt-1 text-xs text-slate-500 md:text-sm">
              Example distribution over a 3-month window
            </p>
            <BarChart />
            <p className="mt-4 text-[11px] text-slate-400">
              Illustrative example. Not investment advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
