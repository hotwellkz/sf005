"use client";

import { ScoreRing } from "@/components/score-ring";

const SCORES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/** Vertical offset (px) for ladder: score 1 lowest, 10 highest */
const Y_OFFSETS = [42, 34, 28, 22, 16, 10, 6, 2, 0, -6];

function getActionLabel(score: number): string {
  if (score <= 1) return "Strong Sell";
  if (score <= 3) return "Sell";
  if (score <= 6) return "Hold";
  if (score <= 9) return "Buy";
  return "Strong Buy";
}

export function AIScoreLadder() {
  return (
    <section
      id="ai-score-ladder"
      className="bg-white py-14 md:py-20"
      aria-label="AI Score scale explanation"
    >
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-sky-600 md:text-5xl">
          Smart Investing, Made Clear
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          StockForge AI analyzes thousands of signals and summarizes each stock
          with an AI Score — so you can compare ideas faster and stay consistent.
        </p>

        <div className="relative mt-10 md:mt-12">
          <div className="overflow-x-auto pb-4 md:overflow-visible md:pb-0">
            <div className="relative mx-auto w-max md:w-full">
              <div className="flex items-end justify-center gap-4 px-2 md:px-0">
                {SCORES.map((score, i) => (
                  <div
                    key={score}
                    className="flex w-[120px] shrink-0 flex-col items-center rounded-2xl border border-slate-100 bg-white px-6 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-transform md:w-[130px]"
                    style={{
                      transform: `translateY(${Y_OFFSETS[i]}px)`,
                    }}
                  >
                    <span className="text-sm font-semibold text-slate-700">
                      AI Score
                    </span>
                    <div className="mt-3 flex justify-center">
                      <ScoreRing
                        score={score}
                        size={72}
                        strokeWidth={8}
                        showLabel={true}
                        className="[&>span]:text-2xl [&>span]:font-extrabold [&>span]:text-slate-800"
                      />
                    </div>
                    <span className="mt-3 text-sm font-semibold text-slate-700">
                      {getActionLabel(score)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative curved arrow */}
          <svg
            className="absolute left-1/2 top-full hidden h-24 w-64 -translate-x-1/2 -translate-y-2 text-slate-300 md:block"
            viewBox="0 0 256 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M8 80 Q 80 80 120 50 Q 160 20 248 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M240 4 L248 8 L244 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="mt-10 md:mt-14">
          <div className="flex items-center justify-between px-2 font-semibold text-slate-600 md:px-6">
            <span>Low</span>
            <span>Average</span>
            <span>High</span>
          </div>
          <p className="mt-6 font-semibold text-slate-700">
            Probability of Beating the Market in 3 Months
          </p>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          StockForge AI provides research tools, not investment advice.
        </p>
      </div>
    </section>
  );
}
