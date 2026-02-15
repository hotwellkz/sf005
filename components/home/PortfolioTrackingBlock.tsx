"use client";

import Link from "next/link";
import { ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

/** Mock portfolio holdings (illustrative only). */
const MOCK_HOLDINGS: Array<{
  rank: number;
  ticker: string;
  company: string;
  score: number;
  delta: number;
  fundamentals: number;
  technical: number;
  sentiment: number;
  lowRisk: number;
}> = [
  { rank: 1, ticker: "KO", company: "Coca-Cola", score: 8, delta: 1, fundamentals: 7, technical: 8, sentiment: 7, lowRisk: 9 },
  { rank: 2, ticker: "NKE", company: "Nike", score: 7, delta: -1, fundamentals: 7, technical: 6, sentiment: 8, lowRisk: 7 },
  { rank: 3, ticker: "MSFT", company: "Microsoft", score: 9, delta: 0, fundamentals: 9, technical: 8, sentiment: 8, lowRisk: 8 },
  { rank: 4, ticker: "TSLA", company: "Tesla", score: 6, delta: 2, fundamentals: 5, technical: 7, sentiment: 6, lowRisk: 4 },
  { rank: 5, ticker: "AMZN", company: "Amazon", score: 8, delta: -1, fundamentals: 8, technical: 8, sentiment: 7, lowRisk: 7 },
];

const PORTFOLIO_METRICS = {
  avgScore: 7,
  fundamentals: 7,
  technical: 7,
  sentiment: 7,
  diversity: 7,
  lowRisk: 7,
};

function scoreBorderClass(score: number): string {
  if (score >= 8) return "border-emerald-500 text-emerald-700 bg-emerald-50";
  if (score >= 5) return "border-amber-400 text-amber-800 bg-amber-50";
  return "border-orange-400 text-orange-700 bg-orange-50";
}

function ScoreDot({ value, size = "md" }: { value: number; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "h-6 w-6 text-[10px]" : "h-7 w-7 text-xs";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border-2 font-extrabold ${sizeClass} ${scoreBorderClass(value)}`}
      aria-label={`Score ${value}`}
    >
      {value}
    </span>
  );
}

function ChangeCell({ delta }: { delta: number }) {
  if (delta > 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-emerald-600 font-medium">
        <TrendingUp className="h-3.5 w-3.5" aria-hidden /> +{delta}
      </span>
    );
  if (delta < 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-rose-600 font-medium">
        <TrendingDown className="h-3.5 w-3.5" aria-hidden /> {delta}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 text-slate-500 font-medium">
      <Minus className="h-3.5 w-3.5" aria-hidden /> 0
    </span>
  );
}

export function PortfolioTrackingBlock() {
  return (
    <section className="bg-white py-14 md:py-20" aria-labelledby="portfolio-tracking-heading">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-sky-600 font-extrabold tracking-tight text-sm">Portfolios</p>
            <h2 id="portfolio-tracking-heading" className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Track score changes across your portfolio.
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed max-w-xl">
              Monitor daily score movements, keep a clear view of diversification, and spot risk concentration early.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed max-w-xl">
              Get lightweight alerts when a holding&apos;s signal profile shifts — so you can review before it becomes noise.
            </p>
            {/* TODO: add /portfolios/new page when available */}
            <Link
              href="/portfolios/new"
              className="mt-6 inline-flex items-center gap-2 text-sky-700 font-semibold hover:text-sky-600 transition"
            >
              Create your first portfolio
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Right: preview card */}
          <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] overflow-hidden">
            <div className="px-5 md:px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h3 className="text-sm font-extrabold text-slate-800">My Portfolio</h3>
                <p className="mt-1 text-xs text-slate-500">24 stocks</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 min-w-0">
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600 flex items-center justify-between gap-2">
                  <span>Avg SF Score</span>
                  <ScoreDot value={PORTFOLIO_METRICS.avgScore} size="sm" />
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600 flex items-center justify-between gap-2">
                  <span>Fundamentals</span>
                  <span className="font-bold text-slate-800">{PORTFOLIO_METRICS.fundamentals}</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600 flex items-center justify-between gap-2">
                  <span>Technical</span>
                  <span className="font-bold text-slate-800">{PORTFOLIO_METRICS.technical}</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600 flex items-center justify-between gap-2">
                  <span>Sentiment</span>
                  <span className="font-bold text-slate-800">{PORTFOLIO_METRICS.sentiment}</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600 flex items-center justify-between gap-2">
                  <span>Diversity</span>
                  <span className="font-bold text-slate-800">{PORTFOLIO_METRICS.diversity}</span>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] text-slate-600 flex items-center justify-between gap-2">
                  <span>Low Risk</span>
                  <span className="font-bold text-slate-800">{PORTFOLIO_METRICS.lowRisk}</span>
                </div>
              </div>
            </div>
            <div className="px-5 md:px-6 py-4 overflow-x-auto">
              <table className="w-full min-w-[580px] text-left">
                <thead>
                  <tr className="border-t border-slate-100">
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-2 whitespace-nowrap">Rank</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-2 whitespace-nowrap">Company</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-2 whitespace-nowrap">SF Score</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-2 whitespace-nowrap">Change</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-2 whitespace-nowrap">Fund.</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-2 whitespace-nowrap">Tech.</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pr-2 whitespace-nowrap">Sent.</th>
                    <th className="text-[11px] uppercase tracking-wide text-slate-500 font-bold py-2 pl-2 whitespace-nowrap">Low Risk</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_HOLDINGS.map((row) => (
                    <tr key={row.ticker} className="border-t border-slate-100">
                      <td className="py-2.5 pr-2 text-sm text-slate-700 whitespace-nowrap">{row.rank}</td>
                      <td className="py-2.5 pr-2 text-sm text-slate-700 whitespace-nowrap">
                        <span className="font-semibold">{row.ticker}</span>
                        <span className="text-slate-500 ml-1">{row.company}</span>
                      </td>
                      <td className="py-2.5 pr-2 whitespace-nowrap">
                        <ScoreDot value={row.score} size="sm" />
                      </td>
                      <td className="py-2.5 pr-2 whitespace-nowrap">
                        <ChangeCell delta={row.delta} />
                      </td>
                      <td className="py-2.5 pr-2 whitespace-nowrap">
                        <ScoreDot value={row.fundamentals} size="sm" />
                      </td>
                      <td className="py-2.5 pr-2 whitespace-nowrap">
                        <ScoreDot value={row.technical} size="sm" />
                      </td>
                      <td className="py-2.5 pr-2 whitespace-nowrap">
                        <ScoreDot value={row.sentiment} size="sm" />
                      </td>
                      <td className="py-2.5 pl-2 whitespace-nowrap">
                        <ScoreDot value={row.lowRisk} size="sm" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
