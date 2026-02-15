/**
 * Finnhub API integration: profile (company name), quote (fallback volume), candles (daily volume).
 * Server-side only. No price change exposed to UI.
 */

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const enrichCache = new Map<string, { data: { companyName: string | null }; ts: number }>();
const dailyVolumeCache = new Map<string, { data: number | null; ts: number }>();

export type FinnhubQuote = {
  c?: number;
  d?: number;
  dp?: number;
  v?: number;
  [key: string]: unknown;
};

export type FinnhubProfile = {
  name?: string;
  ticker?: string;
  [key: string]: unknown;
};

export type FinnhubCandle = {
  o?: number[];
  h?: number[];
  l?: number[];
  c?: number[];
  v?: number[];
  t?: number[];
  s?: string;
};

function getApiKey(): string | undefined {
  return process.env.FINNHUB_API_KEY;
}

export async function getFinnhubQuote(symbol: string): Promise<FinnhubQuote> {
  const key = getApiKey();
  if (!key) return {};
  const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${key}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) return {};
  return res.json();
}

export async function getFinnhubProfile(symbol: string): Promise<FinnhubProfile> {
  const key = getApiKey();
  if (!key) return {};
  const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${key}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) return {};
  return res.json();
}

/**
 * Get daily trading volume for symbol on dateKey (YYYY-MM-DD).
 * Uses candles endpoint; fallback to quote.v. Cached 5 min per (symbol, dateKey).
 */
export async function getFinnhubDailyVolume(
  symbol: string,
  dateKey: string
): Promise<number | null> {
  const cacheKey = `${symbol.toUpperCase()}:${dateKey}`;
  const now = Date.now();
  const hit = dailyVolumeCache.get(cacheKey);
  if (hit && now - hit.ts < CACHE_TTL_MS) return hit.data;

  const apiKey = getApiKey();
  if (!apiKey) {
    dailyVolumeCache.set(cacheKey, { data: null, ts: now });
    return null;
  }

  const date = new Date(dateKey + "T12:00:00Z");
  const fromSec = Math.floor((date.getTime() - 2 * 86400 * 1000) / 1000);
  const toSec = Math.floor((date.getTime() + 3 * 86400 * 1000) / 1000);
  const url = `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(symbol)}&resolution=D&from=${fromSec}&to=${toSec}&token=${apiKey}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    const quote = await getFinnhubQuote(symbol);
    const v = quote?.v != null && !Number.isNaN(Number(quote.v)) ? Number(quote.v) : null;
    dailyVolumeCache.set(cacheKey, { data: v, ts: now });
    return v;
  }
  const candle = (await res.json()) as FinnhubCandle;
  const t = candle?.t;
  const v = candle?.v;
  if (!Array.isArray(t) || !Array.isArray(v) || t.length === 0) {
    const quote = await getFinnhubQuote(symbol);
    const fallback = quote?.v != null && !Number.isNaN(Number(quote.v)) ? Number(quote.v) : null;
    dailyVolumeCache.set(cacheKey, { data: fallback, ts: now });
    return fallback;
  }
  const targetDay = dateKey;
  let volume: number | null = null;
  for (let i = 0; i < t.length; i++) {
    const day = new Date(t[i] * 1000).toISOString().slice(0, 10);
    if (day === targetDay) {
      volume = v[i] != null && !Number.isNaN(Number(v[i])) ? Number(v[i]) : null;
      break;
    }
  }
  if (volume == null) {
    const quote = await getFinnhubQuote(symbol);
    volume = quote?.v != null && !Number.isNaN(Number(quote.v)) ? Number(quote.v) : null;
  }
  dailyVolumeCache.set(cacheKey, { data: volume, ts: now });
  return volume;
}

/**
 * Company name only (for ranking enrichment). No price/change.
 */
export async function getEnrichedData(symbol: string): Promise<{ companyName: string | null }> {
  const cacheKey = symbol.toUpperCase();
  const now = Date.now();
  const hit = enrichCache.get(cacheKey);
  if (hit && now - hit.ts < CACHE_TTL_MS) return hit.data;

  const profile = await getFinnhubProfile(symbol);
  const companyName =
    profile?.name != null && String(profile.name).trim() !== ""
      ? String(profile.name).trim()
      : null;

  const data = { companyName };
  enrichCache.set(cacheKey, { data, ts: now });
  return data;
}
