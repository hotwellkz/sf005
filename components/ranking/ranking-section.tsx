"use client";

import { useState, useEffect } from "react";
import { getTopStocks, getTradeIdeas, getSectors, getIndustries } from "@/lib/api";
import type { RankingApiResponse, RankingRow } from "@/lib/types";
import { RankingTable } from "./ranking-table";
import { RankingTabs } from "./ranking-tabs";
import { CountryChips } from "../country-chips";

type TabId = "stocks" | "etfs" | "trade-ideas" | "sectors" | "industries";

function rankingResponseToRows(data: RankingApiResponse): RankingRow[] {
  const dateKey = Object.keys(data)[0];
  if (!dateKey) return [];
  const byTicker = data[dateKey];
  return Object.entries(byTicker).map(([ticker, scores], index) => ({
    ticker,
    rank: index + 1,
    companyName: ticker,
    country: "USA",
    countryCode: "US",
    aiscore: Number(scores.aiscore) || 0,
    fundamental: Number(scores.fundamental) || 0,
    technical: Number(scores.technical) || 0,
    sentiment: Number(scores.sentiment) || 0,
    low_risk: Number(scores.low_risk) || 0,
    change: undefined,
    volume: undefined,
  }));
}

function formatRankingDate(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function RankingSection() {
  const [tab, setTab] = useState<TabId>("stocks");
  const [rows, setRows] = useState<RankingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateLabel] = useState(formatRankingDate());

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const date = new Date().toISOString().slice(0, 10);

    if (tab === "stocks") {
      getTopStocks(date, "stock")
        .then((data) => {
          if (!cancelled) setRows(rankingResponseToRows(data));
        })
        .catch((e) => {
          if (!cancelled) setError(e.message || "Failed to load");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else if (tab === "etfs") {
      getTopStocks(date, "etf")
        .then((data) => {
          if (!cancelled) setRows(rankingResponseToRows(data));
        })
        .catch((e) => {
          if (!cancelled) setError(e.message || "Failed to load");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else if (tab === "trade-ideas") {
      getTradeIdeas(date)
        .then((data) => {
          if (!cancelled) setRows(rankingResponseToRows(data));
        })
        .catch((e) => {
          if (!cancelled) setError(e.message || "Failed to load");
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    } else {
      setRows([]);
      setLoading(false);
    }
  }, [tab]);

  return (
    <section id="ranking" className="bg-white px-6 py-14">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-[34px] font-extrabold tracking-tight text-primary">
          Best Stocks and ETFs Picked by AI
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {dateLabel}. For a 3-month investment horizon.
        </p>

        <RankingTabs value={tab} onValueChange={(v) => setTab(v as TabId)} />

        <div className="mt-6">
          <CountryChips />
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-sm">
          <p className="mb-4 text-sm text-gray-600">
            US-listed stocks are ranked according to the AI Score, which rates
            the probability of beating the market in the next 3 months.
          </p>
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {loading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <RankingTable data={rows} />
          )}
          <div className="mt-4 text-center">
            <a
              href="#full-ranking"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              See the full US Popular Stocks ranking
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
