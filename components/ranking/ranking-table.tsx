"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { ScoreRing } from "@/components/score-ring";
import { FlagIcon } from "@/components/FlagIcon";
import { Tooltip } from "@/components/ui/Tooltip";
import type { RankingRow } from "@/lib/types";
import { cn, formatCompactNumber } from "@/lib/utils";
import { ArrowUp, ArrowDown, ArrowRight, ChevronDown, Plus } from "lucide-react";
import { InfoIcon } from "@/components/ui/InfoIcon";

const AI_SCORE_HIGHLIGHT = "#EAF4FF";
const HEADER_BG = "#3A3F45";

/** Map: column id / accessorKey -> tooltip content. Only for header tooltips. */
const HEADER_TOOLTIPS: Record<string, string> = {
  rank: "Ranking based on AI Score, the lower the ranking, the better",
  ticker: "Company name",
  company: "Company name",
  country: "Country where the headquarters are located",
  aiscore: "StockForge AI global score based on all data available (1–10)",
  change: "Change in AI Score vs the previous day",
  fundamental: "StockForge AI subscore only based on company fundamental indicators (1–10)",
  technical: "StockForge AI subscore only based on technical indicators produced by price & volume (1–10)",
  sentiment: "StockForge AI subscore only based on sentiment indicators (1–10)",
  low_risk:
    "Risk subscore based on the negative price fluctuations (semi-deviation) latest 500 market days. The higher the score, the lower the downside risk.",
  volume: "Total number of shares traded during the last trading session",
  industry: "Industry GICS (Global Industry Classification Standard)",
};

/** Change column = AI Score delta (integer). No percent sign. */
function ChangeCell({ value }: { value: number | null | undefined }) {
  if (value == null) return <span className="text-gray-400">—</span>;
  if (value > 0)
    return (
      <span className="inline-flex items-center justify-center gap-0.5 text-[#22C55E]">
        <ArrowUp className="h-4 w-4 shrink-0" /> +{value}
      </span>
    );
  if (value < 0)
    return (
      <span className="inline-flex items-center justify-center gap-0.5 text-[#EF4444]">
        <ArrowDown className="h-4 w-4 shrink-0" /> {value}
      </span>
    );
  return (
    <span className="inline-flex items-center justify-center gap-0.5 text-[#F59E0B]">
      <ArrowRight className="h-4 w-4 shrink-0" /> 0
    </span>
  );
}

type RankingTableProps = {
  data: RankingRow[];
  maxRows?: number;
  onAddToPortfolio?: (ticker: string) => void;
};

export function RankingTable({ data, maxRows, onAddToPortfolio }: RankingTableProps) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "rank", desc: false }]);
  const displayData = useMemo(() => {
    if (maxRows != null && maxRows > 0) return data.slice(0, maxRows);
    return data;
  }, [data, maxRows]);

  const columns = useMemo<ColumnDef<RankingRow>[]>(
    () => [
      {
        accessorKey: "rank",
        header: "Rank",
        enableSorting: true,
        cell: ({ getValue }) => (
          <span className="font-medium text-gray-700">{getValue() as number}</span>
        ),
        size: 70,
        meta: { align: "center" as const },
      },
      {
        accessorKey: "ticker",
        header: "Company",
        cell: ({ row }) => (
          <div className="flex flex-col gap-0.5">
            <a
              href={`/rankings?tab=stocks&ticker=${row.original.ticker}`}
              className="font-semibold text-[#1D74C6] hover:underline"
            >
              {row.original.ticker}
            </a>
            {row.original.companyName ? (
              <span className="text-xs text-gray-500">
                {row.original.companyName}
              </span>
            ) : null}
          </div>
        ),
        size: 320,
        meta: { align: "left" as const },
      },
      {
        accessorKey: "country",
        header: "Country",
        cell: ({ row }) => {
          const countryCode = row.original.countryCode ?? null;
          const title = row.original.country ?? undefined;
          return (
            <span className="flex justify-center" title={title}>
              <FlagIcon
                countryCode={countryCode}
                size={18}
                className="shrink-0 rounded-sm border border-black/5"
              />
            </span>
          );
        },
        size: 110,
        meta: { align: "center" as const },
      },
      {
        accessorKey: "aiscore",
        header: () => (
          <span className="inline-flex items-center gap-0">
            AI Score
            <span aria-label="About AI Score">
              <InfoIcon />
            </span>
          </span>
        ),
        enableSorting: true,
        cell: ({ getValue }) => (
          <span className="flex justify-center">
            <ScoreRing score={Number(getValue())} size={44} strokeWidth={5} />
          </span>
        ),
        size: 130,
        meta: { highlightColumn: true, align: "center" as const },
      },
      {
        accessorKey: "change",
        header: "Change",
        cell: ({ getValue }) => <ChangeCell value={getValue() as number | null} />,
        size: 110,
        meta: { align: "center" as const },
      },
      {
        accessorKey: "fundamental",
        header: "Fundamental",
        cell: ({ getValue }) => (
          <span className="flex justify-center">
            <ScoreRing score={Number(getValue())} size={36} strokeWidth={4} />
          </span>
        ),
        size: 120,
        meta: { align: "center" as const },
      },
      {
        accessorKey: "technical",
        header: "Technical",
        cell: ({ getValue }) => (
          <span className="flex justify-center">
            <ScoreRing score={Number(getValue())} size={36} strokeWidth={4} />
          </span>
        ),
        size: 120,
        meta: { align: "center" as const },
      },
      {
        accessorKey: "sentiment",
        header: "Sentiment",
        cell: ({ getValue }) => (
          <span className="flex justify-center">
            <ScoreRing score={Number(getValue())} size={36} strokeWidth={4} />
          </span>
        ),
        size: 120,
        meta: { align: "center" as const },
      },
      {
        accessorKey: "low_risk",
        header: "Low Risk",
        cell: ({ getValue }) => (
          <span className="flex justify-center">
            <ScoreRing score={Number(getValue())} size={36} strokeWidth={4} />
          </span>
        ),
        size: 120,
        meta: { align: "center" as const },
      },
      {
        accessorKey: "volume",
        header: "Volume",
        cell: ({ getValue }) => (
          <span className="block text-right text-gray-700 tabular-nums">
            {formatCompactNumber(getValue() as number | null)}
          </span>
        ),
        size: 110,
        meta: { align: "right" as const },
      },
      {
        accessorKey: "industry",
        header: "Industry",
        cell: ({ getValue }) => (
          <span className="text-sm text-[#1D74C6]">
            {(getValue() as string | null) ?? "—"}
          </span>
        ),
        size: 140,
        meta: { align: "left" as const },
      },
      {
        id: "add",
        header: "",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => onAddToPortfolio?.(row.original.ticker)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-gray-600 transition-colors hover:border-[#1D74C6] hover:bg-[#EAF4FF] hover:text-[#1D74C6]"
              aria-label="Add to portfolio"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ),
        size: 70,
        meta: { align: "center" as const },
      },
    ],
    [onAddToPortfolio]
  );

  const table = useReactTable({
    data: displayData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-[#E5E7EB]">
      <table className="w-full min-w-[1000px] border-collapse">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h, idx) => {
                const isAiScore = (h.column.columnDef.meta as { highlightColumn?: boolean })?.highlightColumn;
                const isLast = idx === hg.headers.length - 1;
                const isAddColumn = (h.column.columnDef as { id?: string }).id === "add";
                const align = (h.column.columnDef.meta as { align?: "left" | "center" | "right" })?.align ?? "left";
                const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
                const columnId =
                  (h.column.columnDef as { id?: string }).id ??
                  h.column.id ??
                  (h.column.columnDef as { accessorKey?: string }).accessorKey;
                const tooltipText =
                  typeof columnId === "string" ? HEADER_TOOLTIPS[columnId] : undefined;

                const headerContent = (
                  <div className={cn("flex items-center gap-1", isLast && !isAddColumn && "justify-between")}>
                    {h.column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={() => h.column.toggleSorting()}
                        className="flex items-center gap-1 hover:opacity-90"
                      >
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </button>
                    ) : (
                      flexRender(h.column.columnDef.header, h.getContext())
                    )}
                    {isLast && !isAddColumn && (
                      <button
                        type="button"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#E5E7EB] bg-white text-gray-600 hover:bg-gray-50"
                        aria-label="Expand options"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                );

                return (
                  <th
                    key={h.id}
                    className={cn("border-b border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white", alignClass)}
                    style={{
                      width: h.getSize(),
                      backgroundColor: isAiScore ? AI_SCORE_HIGHLIGHT : HEADER_BG,
                      color: isAiScore ? "#111827" : "#fff",
                      borderRight: !isLast
                        ? isAiScore
                          ? "1px solid #E5E7EB"
                          : "1px solid rgba(255,255,255,0.12)"
                        : undefined,
                    }}
                  >
                    {tooltipText ? (
                      <Tooltip content={tooltipText} placement="top">
                        {headerContent}
                      </Tooltip>
                    ) : (
                      headerContent
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[#E5E7EB] transition-colors hover:bg-[#F6F8FB]"
              style={{ minHeight: 56 }}
            >
              {row.getVisibleCells().map((cell, idx) => {
                const isAiScore = (cell.column.columnDef.meta as { highlightColumn?: boolean })?.highlightColumn;
                return (
                  <td
                    key={cell.id}
                    className="px-4 py-3 align-middle"
                    style={{
                      height: 56,
                      backgroundColor: isAiScore ? AI_SCORE_HIGHLIGHT : undefined,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
