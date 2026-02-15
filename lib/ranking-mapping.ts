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

/** Industry from Finnhub profile. Key from API. */
const INDUSTRY_KEYS = ["industry", "finnhubIndustry"] as const;

/** Country from API (ISO2 code and optional name). No default to US. */
const COUNTRY_CODE_KEYS = ["countryCode", "country"] as const;
const COUNTRY_NAME_KEYS = ["countryName"] as const;

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
    const first = entries[0][1];
    const keys = first && typeof first === "object" ? Object.keys(first) : [];
    const sampleCountries = entries.slice(0, 5).map(([t, r]) => ({
      ticker: t,
      countryCode: (r as RawTickerValue).countryCode ?? (r as RawTickerValue).country,
    }));
    // eslint-disable-next-line no-console -- dev: verify country mapping (SAN->ES, BCS->GB, etc.)
    console.log("[ranking] API keys:", keys, "sample country:", sampleCountries);
  }

  return entries.map(([ticker, raw], index) => {
    const companyName = pickString(raw, [...COMPANY_NAME_KEYS]);
    const changeRaw = pickNumber(raw, [...AI_SCORE_DELTA_KEYS]);
    const change = changeRaw != null ? Math.round(changeRaw) : null;
    const volume = pickNumber(raw, [...VOLUME_KEYS]);
    const industry = pickString(raw, [...INDUSTRY_KEYS]);
    const countryCode = pickString(raw, [...COUNTRY_CODE_KEYS]);
    const countryName = pickString(raw, [...COUNTRY_NAME_KEYS]);
    const buyTrackRecord = raw.buy_track_record === true || raw.buy_track_record === 1;
    const sellTrackRecord = raw.sell_track_record === true || raw.sell_track_record === 1;

    return {
      ticker,
      rank: index + 1,
      companyName: companyName ?? null,
      country: countryName ?? countryCode ?? null,
      countryCode: countryCode ?? null,
      aiscore: Number(raw.aiscore) || 0,
      fundamental: Number(raw.fundamental) || 0,
      technical: Number(raw.technical) || 0,
      sentiment: Number(raw.sentiment) || 0,
      low_risk: Number(raw.low_risk) || 0,
      change,
      volume: volume ?? null,
      industry: industry ?? null,
      buyTrackRecord: buyTrackRecord || undefined,
      sellTrackRecord: sellTrackRecord || undefined,
    };
  });
}
