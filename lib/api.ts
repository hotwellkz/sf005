function getApiBase(): string {
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

function getDateParam(date?: string): string {
  if (date) return date;
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export async function getTopStocks(date?: string, asset: "stock" | "etf" = "stock") {
  const dateStr = getDateParam(date);
  const params = new URLSearchParams({ date: dateStr, asset });
  const res = await fetch(`${getApiBase()}/api/ranking?${params}`);
  if (!res.ok) throw new Error("Failed to fetch ranking");
  const data: RankingApiResponse = await res.json();
  return data;
}

export async function getStockDetails(ticker: string, date?: string) {
  const params = new URLSearchParams({ ticker });
  if (date) params.set("date", date);
  const res = await fetch(`${getApiBase()}/api/ranking?${params}`);
  if (!res.ok) throw new Error("Failed to fetch stock details");
  return res.json();
}

export async function getTradeIdeas(date?: string) {
  const dateStr = getDateParam(date);
  const params = new URLSearchParams({ date: dateStr, buy_track_record: "1" });
  const res = await fetch(`${getApiBase()}/api/ranking?${params}`);
  if (!res.ok) throw new Error("Failed to fetch trade ideas");
  const data: RankingApiResponse = await res.json();
  return data;
}

export async function getSectors() {
  const res = await fetch(`${getApiBase()}/api/sectors`);
  if (!res.ok) throw new Error("Failed to fetch sectors");
  return res.json() as Promise<{ sector: string }[]>;
}

export async function getSectorScores(slug: string) {
  const res = await fetch(`${getApiBase()}/api/sectors/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error("Failed to fetch sector scores");
  return res.json();
}

export async function getIndustries() {
  const res = await fetch(`${getApiBase()}/api/industries`);
  if (!res.ok) throw new Error("Failed to fetch industries");
  return res.json() as Promise<{ industry: string }[]>;
}

export async function getIndustryScores(slug: string) {
  const res = await fetch(`${getApiBase()}/api/industries/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error("Failed to fetch industry scores");
  return res.json();
}

export type { RankingApiResponse } from "./types";
