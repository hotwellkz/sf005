import type { RankingRow, RankingApiResponse } from "./types";

/** Keys to try for company name in raw API ticker object */
const COMPANY_NAME_KEYS = [
  "companyName",
  "name",
  "company",
  "company_name",
  "shortName",
  "longName",
] as const;

/** Change column = AI Score delta (integer). Key from API. */
const AI_SCORE_DELTA_KEYS = ["aiScoreDelta", "change"] as const;

/** Volume column = daily trading volume. Key from API. */
const VOLUME_KEYS = ["dailyVolume", "volume", "avgVolume", "averageVolume"] as const;

type RawTickerValue = Record<string, unknown>;

function pickNumber(obj: RawTickerValue, keys: readonly string[]): number | null {
  for (const k of keys) {
    const v = obj[k];
    if (v === null || v === undefined) continue;
    const n = typeof v === "number" ? v : Number(v);
    if (!Number.isNaN(n)) return n;
  }
  return null;
}

function pickString(obj: RawTickerValue, keys: readonly string[]): string | null {
  for (const k of keys) {
    const v = obj[k];
    if (v === null || v === undefined) continue;
    const s = String(v).trim();
    if (s) return s;
  }
  return null;
}

/**
 * Map raw ranking API response to RankingRow[].
 * change = AI Score delta (aiScoreDelta from API). volume = daily volume (dailyVolume from API).
 */
export function rankingResponseToRows(data: RankingApiResponse): RankingRow[] {
  const dateKey = Object.keys(data)[0];
  if (!dateKey) return [];
  const byTicker = data[dateKey] as Record<string, RawTickerValue>;
  const entries = Object.entries(byTicker);

  if (typeof window !== "undefined" && process.env.NODE_ENV === "development" && entries.length > 0) {
    const firstValue = entries[0][1];
    const keys = firstValue && typeof firstValue === "object" ? Object.keys(firstValue) : [];
    // eslint-disable-next-line no-console -- dev only: remove after mapping confirmed
    console.log("[ranking] First row keys from API:", keys);
  }

  return entries.map(([ticker, raw], index) => {
    const companyName = pickString(raw, [...COMPANY_NAME_KEYS]);
    const changeRaw = pickNumber(raw, [...AI_SCORE_DELTA_KEYS]);
    const change = changeRaw != null ? Math.round(changeRaw) : null;
    const volume = pickNumber(raw, [...VOLUME_KEYS]);

    return {
      ticker,
      rank: index + 1,
      companyName: companyName ?? null,
      country: "USA",
      countryCode: "US",
      aiscore: Number(raw.aiscore) || 0,
      fundamental: Number(raw.fundamental) || 0,
      technical: Number(raw.technical) || 0,
      sentiment: Number(raw.sentiment) || 0,
      low_risk: Number(raw.low_risk) || 0,
      change,
      volume: volume ?? null,
    };
  });
}
