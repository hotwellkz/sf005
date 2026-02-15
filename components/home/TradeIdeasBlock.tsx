"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Mock price series (illustrative only). */
const PRICE_DATA = [22, 24, 23, 26, 25, 28, 30];
/** Indices where to draw signal markers. */
const SIGNAL_INDICES = [1, 3, 5];
const X_LABELS = ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Jan"];

const CHART_WIDTH = 400;
const CHART_HEIGHT = 200;
const PAD_LEFT = 40;
const PAD_RIGHT = 56;
const PAD_TOP = 28;
const PAD_BOTTOM = 48;
const PLOT_W = CHART_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_H = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;
const FORECAST_EXTRA = 36;

function TradeIdeasChart() {
  const minP = Math.min(...PRICE_DATA);
  const maxP = Math.max(...PRICE_DATA);
  const range = maxP - minP || 1;
  const n = PRICE_DATA.length;
  const stepX = PLOT_W / (n - 1);

  const toX = (i: number) => PAD_LEFT + i * stepX;
  const toY = (v: number) => PAD_TOP + PLOT_H - ((v - minP) / range) * PLOT_H;

  const pathD = PRICE_DATA.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");

  const lastX = toX(n - 1);
  const lastY = toY(PRICE_DATA[n - 1]);
  const bandUpperY = lastY - 14;
  const bandLowerY = lastY + 10;
  const bandEndX = lastX + FORECAST_EXTRA;
  const forecastPath = `M ${lastX} ${lastY} L ${bandEndX} ${bandUpperY} L ${bandEndX} ${bandLowerY} Z`;

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="mt-4 w-full"
      aria-hidden
    >
      {/* Forecast band (illustrative) */}
      <path
        d={forecastPath}
        fill="#10b981"
        fillOpacity="0.12"
        stroke="none"
      />
      {/* Price line */}
      <path
        d={pathD}
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Signal markers */}
      {SIGNAL_INDICES.map((i) => (
        <circle
          key={i}
          cx={toX(i)}
          cy={toY(PRICE_DATA[i])}
          r="4"
          fill="#10b981"
          stroke="#fff"
          strokeWidth="1.5"
        />
      ))}
      {/* Scenario labels (no % or $) */}
      <text
        x={bandEndX + 6}
        y={bandUpperY + 3}
        className="fill-slate-500 text-[9px] font-semibold"
      >
        Scenario A
      </text>
      <text
        x={bandEndX + 6}
        y={lastY + 3}
        className="fill-slate-500 text-[9px] font-semibold"
      >
        Scenario B
      </text>
      <text
        x={bandEndX + 6}
        y={bandLowerY + 3}
        className="fill-slate-500 text-[9px] font-semibold"
      >
        Scenario C
      </text>
      {/* X-axis labels */}
      {X_LABELS.map((label, i) => (
        <text
          key={i}
          x={toX(i)}
          y={CHART_HEIGHT - 22}
          textAnchor="middle"
          className="fill-slate-500 text-[10px] font-medium"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

export function TradeIdeasBlock() {
  return (
    <section
      id="trade-ideas"
      className="bg-white py-14 text-slate-900 md:py-20"
      aria-label="Trade ideas"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-extrabold tracking-tight text-sky-600">
              Trade Ideas
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Signal-based ideas with transparent context.
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              Explore trade ideas generated from StockForge AI scoring, filters,
              and risk tags. Each idea comes with clear rationale and the
              signals that influenced it.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              Visualize historical signal markers on a price curve and preview an
              illustrative scenario band. Use it to compare setups — not as a
              guarantee of results.
            </p>
            {/* TODO: implement /trade-ideas page if needed */}
            <Link
              href="/trade-ideas"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-700 transition hover:text-sky-600"
            >
              Browse Trade Ideas
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-6">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              Signal markers
            </div>
            <TradeIdeasChart />
            <div className="mt-4 flex flex-wrap items-center gap-6">
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-0.5 w-4 rounded bg-emerald-500"
                  aria-hidden
                />
                <span className="text-xs font-semibold text-slate-700">
                  Price (illustrative)
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full bg-emerald-500"
                  aria-hidden
                />
                <span className="text-xs font-semibold text-slate-700">
                  Signals
                </span>
              </span>
            </div>
            <p className="mt-4 leading-snug text-[11px] text-slate-400">
              Illustrative example only. Not investment advice. Past performance
              is not indicative of future results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
