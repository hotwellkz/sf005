"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { RankingRow } from "@/lib/types";
import { RankingTable } from "./ranking-table";

const CARD_TITLE = "Popular Stocks Ranked by Danelfin AI";
const CARD_DESCRIPTION =
  "US-listed stocks are ranked according to the AI Score, which rates the probability of beating the market in the next 3 months.";

type RankingCardProps = {
  data: RankingRow[];
  loading: boolean;
  error: string | null;
  maxRows?: number;
  showFooterLink?: boolean;
  footerLinkHref?: string;
  footerLinkText?: string;
};

export function RankingCard({
  data,
  loading,
  error,
  maxRows = 5,
  showFooterLink = true,
  footerLinkHref = "/rankings?tab=stocks&market=US",
  footerLinkText = "See the full US Popular Stocks ranking",
}: RankingCardProps) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-[0_8px_24px_rgba(16,24,40,0.08)]">
      <h3 className="text-lg font-bold text-gray-900">{CARD_TITLE}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{CARD_DESCRIPTION}</p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-6 flex min-h-[280px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1D74C6] border-t-transparent" />
        </div>
      ) : (
        <div className="mt-6">
          <RankingTable data={data} maxRows={maxRows} />
        </div>
      )}

      {showFooterLink && !loading && (
        <div className="mt-5 flex justify-center">
          <Link
            href={footerLinkHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1D74C6] hover:underline"
          >
            {footerLinkText}
            <ChevronRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
