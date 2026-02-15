"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Mock signal rows (illustrative only). */
const MOCK_SIGNALS: Array<{
  type: "Technical" | "Fundamental" | "Sentiment";
  signal: string;
  valueLabel: string;
  bin: string;
  impact: number;
  relevance: number;
}> = [
  { type: "Technical", signal: "Momentum (60d)", valueLabel: "High", bin: "Bin 7/10", impact: 72, relevance: 78 },
  { type: "Fundamental", signal: "Earnings revision", valueLabel: "Neutral", bin: "Bin 5/10", impact: 45, relevance: 62 },
  { type: "Sentiment", signal: "News sentiment", valueLabel: "Rising", bin: "Bin 6/10", impact: 58, relevance: 71 },
  { type: "Fundamental", signal: "Valuation (relative)", valueLabel: "Stable", bin: "Bin 6/10", impact: 50, relevance: 55 },
];

function ScoreBadge({ score, label }: { score: number; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
      <span className="text-[11px] font-bold text-slate-500">SF Score</span>
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-extrabold text-white"
        aria-hidden
      >
        {score}
      </span>
      <span className="text-xs font-semibold text-slate-700">{label}</span>
    </div>
  );
}

export function ExplainableSignalsBlock() {
  return (
    <section className="bg-white py-14 md:py-20" aria-labelledby="explainable-signals-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-sky-600 font-extrabold tracking-tight text-sm">Explainable AI</p>
            <h2 id="explainable-signals-heading" className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Understand the signals behind every score.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-xl">
              StockForge AI uses explainable signals — not a black box. We show what inputs influenced the score, how strong each signal is, and how relevant it is for the current market regime.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed max-w-xl">
              Use this to learn what&apos;s driving a setup and to compare stocks on a like-for-like basis.
            </p>
            {/* TODO: add /stocks/AAPL page when available */}
            <Link
              href="/stocks/AAPL"
              className="mt-6 inline-flex items-center gap-2 text-sky-700 font-semibold hover:text-sky-600 transition"
            >
              See an example analysis
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Right: card with table */}
          <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">
            <div className="px-5 md:px-6 py-4 border-b border-slate-200 text-center text-sm font-extrabold text-slate-700">
              AI-Powered Signal Breakdown
            </div>
            <div className="px-5 md:px-6 py-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left">
                <thead>
                  <tr className="border-t border-slate-100">
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-3">Type</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-3">Signal</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-3">Current value</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-3">Bucket</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-3">Impact</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pl-2">Relevance</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_SIGNALS.map((row, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="py-2.5 pr-3 text-sm text-slate-700">
                        <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-600 bg-white">
                          {row.type}
                        </span>
                      </td>
                      <td className="py-2.5 pr-3 text-sm text-slate-700">{row.signal}</td>
                      <td className="py-2.5 pr-3 text-sm text-slate-700">{row.valueLabel}</td>
                      <td className="py-2.5 pr-3 text-sm text-slate-700">{row.bin}</td>
                      <td className="py-2.5 pr-3">
                        <div className="h-2 w-24 rounded-full bg-slate-100 overflow-hidden" aria-hidden>
                          <div
                            className="h-full rounded-full bg-emerald-500/70"
                            style={{ width: `${Math.min(100, Math.max(0, row.impact))}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-2.5 pl-2 text-sm text-slate-700">{row.relevance}/100</td>
                    </tr>
                  ))}
                  {/* Summary rows */}
                  <tr className="border-t border-slate-200 bg-slate-50/60">
                    <td colSpan={2} className="py-2.5 pr-3 text-sm font-semibold text-slate-700">
                      Overall signal alignment
                    </td>
                    <td className="py-2.5 pr-3 text-sm text-slate-700" colSpan={3}>
                      Positive
                    </td>
                  </tr>
                  <tr className="border-t border-slate-100 bg-slate-50/60">
                    <td colSpan={2} className="py-2.5 pr-3 text-sm font-semibold text-slate-700">
                      Universe baseline
                    </td>
                    <td className="py-2.5 pr-3 text-sm text-slate-700" colSpan={3}>
                      Neutral
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-5 md:px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-4">
              <span aria-hidden />
              <ScoreBadge score={8} label="Buy" />
            </div>
            <p className="px-5 md:px-6 pb-4 mt-0 text-[11px] text-slate-400 leading-snug">
              Illustrative example only. Not investment advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
