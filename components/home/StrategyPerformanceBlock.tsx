"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Mock index values (illustrative only). One value per year 2019–2025. */
const MODEL_SERIES = [100, 108, 125, 118, 132, 145, 160];
const BENCHMARK_SERIES = [100, 105, 115, 108, 118, 128, 138];
const YEARS = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];

const CHART_WIDTH = 400;
const CHART_HEIGHT = 220;
const PAD_LEFT = 48;
const PAD_RIGHT = 24;
const PAD_TOP = 24;
const PAD_BOTTOM = 48;
const PLOT_W = CHART_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_H = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;

function LineChart() {
  const allValues = [...MODEL_SERIES, ...BENCHMARK_SERIES];
  const minV = Math.min(...allValues);
  const maxV = Math.max(...allValues);
  const range = maxV - minV || 1;
  const n = MODEL_SERIES.length;
  const stepX = PLOT_W / (n - 1);

  const toX = (i: number) => PAD_LEFT + i * stepX;
  const toY = (v: number) =>
    PAD_TOP + PLOT_H - ((v - minV) / range) * PLOT_H;

  const modelPath = MODEL_SERIES.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");
  const benchmarkPath = BENCHMARK_SERIES.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");

  const gridLines = [0.25, 0.5, 0.75].map((t) => (
    <line
      key={t}
      x1={PAD_LEFT}
      y1={PAD_TOP + (1 - t) * PLOT_H}
      x2={PAD_LEFT + PLOT_W}
      y2={PAD_TOP + (1 - t) * PLOT_H}
      stroke="#e2e8f0"
      strokeWidth="1"
    />
  ));

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="mt-5 w-full"
      aria-hidden
    >
      {gridLines}
      <path
        d={benchmarkPath}
        fill="none"
        stroke="#64748b"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={modelPath}
        fill="none"
        stroke="#10b981"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* X-axis labels */}
      {YEARS.map((year, i) => (
        <text
          key={year}
          x={toX(i)}
          y={CHART_HEIGHT - 22}
          textAnchor="middle"
          className="fill-slate-500 text-[10px] font-medium"
        >
          {year}
        </text>
      ))}
      {/* Y-axis label */}
      <text
        x={16}
        y={PAD_TOP + PLOT_H / 2}
        textAnchor="middle"
        className="fill-slate-500 text-[10px] font-medium"
        transform={`rotate(-90, 16, ${PAD_TOP + PLOT_H / 2})`}
      >
        Index value (illustrative)
      </text>
    </svg>
  );
}

export function StrategyPerformanceBlock() {
  return (
    <section
      id="strategy-performance"
      className="bg-white py-14 text-slate-900 md:py-20"
      aria-label="Strategy and research"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-extrabold tracking-tight text-sky-600">
              Strategy
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Backtest-ready research, not hype.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              StockForge AI helps you research signal-driven watchlists and
              compare them against a broad benchmark. Use consistent scoring,
              risk tags, and filters to evaluate ideas with more structure.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              Below is an illustrative example chart showing how two equity
              curves might diverge over time when applying different selection
              rules. This is a mock visualization for UI purposes.
            </p>
            {/* TODO: implement /strategy page if needed */}
            <Link
              href="/strategy"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-700 transition hover:text-sky-600"
            >
              See how the strategy is built
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-6">
            <p className="text-sm font-extrabold text-slate-900 md:text-base">
              Example equity curve (illustration)
            </p>
            <p className="mt-1 text-xs text-slate-500 md:text-sm">
              Model portfolio vs. broad market benchmark
            </p>
            <LineChart />
            <div className="mt-4 flex flex-wrap items-center gap-6">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden />
                <span className="text-xs font-semibold text-slate-700">Model Portfolio</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-500" aria-hidden />
                <span className="text-xs font-semibold text-slate-700">Market Benchmark</span>
              </span>
            </div>
            <p className="mt-4 leading-snug text-[11px] text-slate-400">
              Illustrative example. Past performance is not indicative of future
              results. Not investment advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
