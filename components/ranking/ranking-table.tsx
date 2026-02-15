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
import type { RankingRow } from "@/lib/types";
import { cn, formatCompactNumber } from "@/lib/utils";
import { ArrowUp, ArrowDown, ArrowRight, Info, ChevronDown, Plus } from "lucide-react";

const AI_SCORE_HIGHLIGHT = "#EAF4FF";
const HEADER_BG = "#3A3F45";

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
};

export function RankingTable({ data, maxRows }: RankingTableProps) {
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
          <div className="flex items-start gap-2">
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
            <button
              type="button"
              className="mt-0.5 shrink-0 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Add to watchlist"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        ),
        size: 360,
        meta: { align: "left" as const },
      },
      {
        accessorKey: "country",
        header: "Country",
        cell: ({ row }) => {
          const countryCode =
            row.original.countryCode ?? row.original.country ?? "US";
          return (
            <span className="flex justify-center">
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
          <span className="inline-flex items-center gap-1.5">
            AI Score
            <button
              type="button"
              className="rounded p-0.5 text-white/80 hover:bg-white/10 hover:text-white"
              aria-label="About AI Score"
            >
              <Info className="h-3.5 w-3.5" />
            </button>
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
        size: 130,
        meta: { align: "right" as const },
      },
    ],
    []
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
                const align = (h.column.columnDef.meta as { align?: "left" | "center" | "right" })?.align ?? "left";
                const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
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
                    <div className={cn("flex items-center gap-1", isLast && "justify-between")}>
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
                      {isLast && (
                        <button
                          type="button"
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#E5E7EB] bg-white text-gray-600 hover:bg-gray-50"
                          aria-label="Expand options"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      )}
                    </div>
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
