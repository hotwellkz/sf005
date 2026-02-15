"use client";

import Link from "next/link";
import { ScoreRing } from "@/components/score-ring";

const VIEWBOX = 600;

/** Concentric circle radii (percent of max) */
const RINGS = [0.2, 0.35, 0.5, 0.65, 0.85];
/** Number of dots per ring */
const DOTS_PER_RING = 24;

/** Pill label with position (percent of radar size) and color */
const PILLS = [
  { label: "RSI (30d) — Bin 1/10", top: 18, left: 22, color: "bg-red-500/90 text-white" },
  { label: "Earnings Quality — Bin 9/10", top: 12, left: 72, color: "bg-emerald-500/90 text-white" },
  { label: "Momentum (60d) — Bin 8/10", top: 62, left: 78, color: "bg-lime-400/90 text-slate-900" },
  { label: "Revenue Trend — Bin 7/10", top: 72, left: 28, color: "bg-sky-400/90 text-slate-900" },
  { label: "News Sentiment — Bin 6/10", top: 38, left: 8, color: "bg-slate-400/90 text-white" },
];

function RadarSVG({ className }: { className?: string }) {
  const cx = VIEWBOX / 2;
  const cy = VIEWBOX / 2;
  const maxR = VIEWBOX / 2 - 20;

  const circles = RINGS.map((r) => (
    <circle
      key={r}
      cx={cx}
      cy={cy}
      r={r * maxR}
      fill="none"
      stroke="rgba(148,163,184,0.25)"
      strokeWidth="1"
    />
  ));

  const dots: React.ReactNode[] = [];
  RINGS.forEach((ringRatio) => {
    const r = ringRatio * maxR;
    for (let i = 0; i < DOTS_PER_RING; i++) {
      const angle = (i / DOTS_PER_RING) * 2 * Math.PI - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      dots.push(
        <circle
          key={`${ringRatio}-${i}`}
          cx={x}
          cy={y}
          r="2"
          fill="rgba(148,163,184,0.4)"
        />
      );
    }
  });

  const axes = [0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    const x2 = cx + maxR * Math.cos(rad);
    const y2 = cy + maxR * Math.sin(rad);
    return (
      <line
        key={deg}
        x1={cx}
        y1={cy}
        x2={x2}
        y2={y2}
        stroke="rgba(148,163,184,0.15)"
        strokeWidth="1"
      />
    );
  });

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className={className}
      aria-hidden
    >
      {axes}
      {circles}
      {dots}
    </svg>
  );
}

export function AIScoreDataBlock() {
  return (
    <section
      id="ai-score-data"
      className="overflow-hidden bg-slate-900 py-14 text-white md:py-20"
      aria-label="What powers the AI Score"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left: title, metrics, body, button, score card */}
          <div className="flex flex-col md:flex-row md:items-start md:gap-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
                What Powers the StockForge AI Score
              </h2>
              <div className="mt-6 grid grid-cols-3 gap-4 md:gap-6">
                <div>
                  <p className="text-2xl font-extrabold text-sky-400 md:text-3xl">
                    800+
                  </p>
                  <p className="mt-1 text-xs text-slate-300 md:text-sm">
                    tracked per stock
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-sky-400 md:text-3xl">
                    6,000+
                  </p>
                  <p className="mt-1 text-xs text-slate-300 md:text-sm">
                    processed by our models
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-sky-400 md:text-3xl">
                    Millions
                  </p>
                  <p className="mt-1 text-xs text-slate-300 md:text-sm">
                    to learn patterns over time
                  </p>
                </div>
              </div>
              <p className="mt-6 max-w-xl leading-relaxed text-slate-200">
                StockForge AI blends technical, fundamental, and sentiment
                signals into a single 1–10 score to help you compare
                opportunities quickly — with transparent factor examples.
              </p>
              {/* TODO: implement /how-it-works page */}
              <Link
                href="/how-it-works"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold transition hover:bg-sky-500"
              >
                How it works
              </Link>
              <div className="mt-8 flex md:mt-10 md:justify-start">
                <div className="w-[150px] rounded-2xl border border-slate-700/60 bg-slate-900/40 px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur">
                  <p className="text-sm font-semibold text-slate-300">
                    AI Score
                  </p>
                  <div className="mt-3 flex justify-center">
                    <ScoreRing
                      score={7}
                      size={80}
                      strokeWidth={8}
                      showLabel={true}
                      className="[&>span]:text-xl [&>span]:font-extrabold [&>span]:text-white"
                    />
                  </div>
                  <p className="mt-3 text-center text-sm font-semibold text-slate-200">
                    Buy
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: radar + pills */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative h-[360px] w-[360px] md:h-[560px] md:w-[560px]">
              <RadarSVG className="h-full w-full text-slate-400" />
              {PILLS.map((pill, i) => (
                <span
                  key={i}
                  className={`absolute rounded-xl px-3 py-2 text-xs font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.35)] ${pill.color}`}
                  style={{
                    top: `${pill.top}%`,
                    left: `${pill.left}%`,
                  }}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Examples shown for illustration. Not investment advice.
        </p>
      </div>
    </section>
  );
}
