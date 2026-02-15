"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getTopStocks, getTradeIdeas } from "@/lib/api";
import type { RankingRow } from "@/lib/types";
import { rankingResponseToRows } from "@/lib/ranking-mapping";
import { Navbar } from "@/components/navbar";
import { SectionHeader } from "@/components/ui/section-header";
import { SegmentTabs } from "@/components/ui/segment-tabs";
import { CountryChips } from "@/components/country-chips";
import { RankingTable } from "@/components/ranking/ranking-table";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 20;
type TabId = "stocks" | "etfs" | "trade-ideas" | "sectors" | "industries";

function formatRankingDate(): string {
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function RankingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = (searchParams.get("tab") || "stocks") as TabId;
  const marketParam = searchParams.get("market") || "usa";

  const [tab, setTab] = useState<TabId>(tabParam);
  const [market, setMarket] = useState(marketParam);

  const updateUrl = useCallback(
    (newTab: TabId, newMarket: string) => {
      const params = new URLSearchParams();
      params.set("tab", newTab);
      params.set("market", newMarket);
      router.replace(`/rankings?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  const handleTabChange = useCallback(
    (v: string) => {
      const t = v as TabId;
      setTab(t);
      setPage(0);
      updateUrl(t, market);
    },
    [market, updateUrl]
  );

  const handleMarketChange = useCallback(
    (id: string) => {
      setMarket(id);
      updateUrl(tab, id);
    },
    [tab, updateUrl]
  );
  const [rows, setRows] = useState<RankingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateLabel] = useState(formatRankingDate());
  const [page, setPage] = useState(0);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    const date = new Date().toISOString().slice(0, 10);

    if (tab === "stocks") {
      getTopStocks(date, "stock")
        .then((data) => setRows(rankingResponseToRows(data)))
        .catch((e) => setError(e.message || "Failed to load"))
        .finally(() => setLoading(false));
    } else if (tab === "etfs") {
      getTopStocks(date, "etf")
        .then((data) => setRows(rankingResponseToRows(data)))
        .catch((e) => setError(e.message || "Failed to load"))
        .finally(() => setLoading(false));
    } else if (tab === "trade-ideas") {
      getTradeIdeas(date)
        .then((data) => setRows(rankingResponseToRows(data)))
        .catch((e) => setError(e.message || "Failed to load"))
        .finally(() => setLoading(false));
    } else {
      setRows([]);
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    setTab(tabParam);
    setMarket(marketParam);
  }, [tabParam, marketParam]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.ceil(rows.length / PAGE_SIZE) || 1;
  const currentPage = Math.min(page, totalPages - 1);
  const paginatedRows = rows.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-14">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#1D74C6] hover:underline"
              >
                <ChevronLeft className="h-4 w-4" /> Back to home
              </Link>
            </div>

            <SectionHeader
              title="Best Stocks and ETFs Picked by AI"
              dateText={`${dateLabel}. For a 3-month investment horizon.`}
            />

            <div className="mt-8">
              <SegmentTabs value={tab} onValueChange={handleTabChange} />
            </div>

            <div className="mt-6">
              <CountryChips
                label="Top Stocks in:"
                value={market}
                onValueChange={handleMarketChange}
              />
            </div>

            <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_8px_24px_rgba(16,24,40,0.08)]">
              <h3 className="text-lg font-bold text-gray-900">
                Popular Stocks Ranked by Danelfin AI
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                US-listed stocks are ranked according to the AI Score, which rates
                the probability of beating the market in the next 3 months.
              </p>

              {error && (
                <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="mt-6 flex min-h-[400px] items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1D74C6] border-t-transparent" />
                </div>
              ) : (
                <>
                  <div className="mt-6">
                    <RankingTable data={paginatedRows} />
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-5 flex items-center justify-center gap-4">
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        disabled={currentPage === 0}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" /> Previous
                      </button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage + 1} of {totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                        disabled={currentPage >= totalPages - 1}
                        className="inline-flex items-center gap-1 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
