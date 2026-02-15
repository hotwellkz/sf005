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
import type { RankingRow } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

const countryFlags: Record<string, string> = {
  US: "🇺🇸",
  USA: "🇺🇸",
  EU: "🇪🇺",
  Europe: "🇪🇺",
  AT: "🇦🇹",
  Austria: "🇦🇹",
  BE: "🇧🇪",
  Belgium: "🇧🇪",
  CA: "🇨🇦",
  Canada: "🇨🇦",
  DK: "🇩🇰",
  Denmark: "🇩🇰",
  FI: "🇫🇮",
  Finland: "🇫🇮",
  FR: "🇫🇷",
  France: "🇫🇷",
};

function formatVolume(v: number | undefined): string {
  if (v == null) return "—";
  if (v >= 1e9) return `${(v / 1e9).toFixed(2)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(2)}K`;
  return String(v);
}

function ChangeCell({ value }: { value?: number }) {
  if (value == null) return <span className="text-gray-400">—</span>;
  if (value > 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-green-600">
        <ArrowUp className="h-4 w-4" /> +{value}%
      </span>
    );
  if (value < 0)
    return (
      <span className="inline-flex items-center gap-0.5 text-red-600">
        <ArrowDown className="h-4 w-4" /> {value}%
      </span>
    );
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-600">
      <Minus className="h-4 w-4" /> 0%
    </span>
  );
}

export function RankingTable({ data }: { data: RankingRow[] }) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "rank", desc: false },
  ]);

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
      },
      {
        accessorKey: "ticker",
        header: "Company",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <a
              href={`#stock-${row.original.ticker}`}
              className="font-bold text-primary hover:underline"
            >
              {row.original.ticker}
            </a>
            <span className="text-sm text-gray-600">
              {row.original.companyName || row.original.ticker}
            </span>
          </div>
        ),
        size: 320,
      },
      {
        accessorKey: "country",
        header: "Country",
        cell: ({ row }) => {
          const code = row.original.countryCode || row.original.country || "US";
          const flag = countryFlags[code] ?? "🇺🇸";
          return <span className="text-xl" title={String(row.original.country || "USA")}>{flag}</span>;
        },
        size: 110,
      },
      {
        accessorKey: "aiscore",
        header: "AI Score",
        enableSorting: true,
        cell: ({ getValue }) => (
          <ScoreRing score={Number(getValue())} size={44} strokeWidth={5} />
        ),
        size: 120,
      },
      {
        accessorKey: "change",
        header: "Change",
        cell: ({ getValue }) => <ChangeCell value={getValue() as number | undefined} />,
        size: 90,
      },
      {
        accessorKey: "fundamental",
        header: "Fundamental",
        cell: ({ getValue }) => (
          <ScoreRing score={Number(getValue())} size={36} strokeWidth={4} />
        ),
        size: 120,
      },
      {
        accessorKey: "technical",
        header: "Technical",
        cell: ({ getValue }) => (
          <ScoreRing score={Number(getValue())} size={36} strokeWidth={4} />
        ),
        size: 120,
      },
      {
        accessorKey: "sentiment",
        header: "Sentiment",
        cell: ({ getValue }) => (
          <ScoreRing score={Number(getValue())} size={36} strokeWidth={4} />
        ),
        size: 120,
      },
      {
        accessorKey: "low_risk",
        header: "Low Risk",
        cell: ({ getValue }) => (
          <ScoreRing score={Number(getValue())} size={36} strokeWidth={4} />
        ),
        size: 120,
      },
      {
        accessorKey: "volume",
        header: "Volume",
        cell: ({ getValue }) => (
          <span className="text-right text-gray-700">
            {formatVolume(getValue() as number | undefined)}
          </span>
        ),
        size: 120,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[1000px] border-collapse">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white"
                  style={{
                    width: h.getSize(),
                    backgroundColor: "#3A3F45",
                  }}
                >
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
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={cn(
                "border-b border-border transition-colors hover:bg-section-alt"
              )}
              style={{ minHeight: 56 }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 align-middle"
                  style={{ height: 56 }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
