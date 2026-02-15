/**
 * Fetch previous trading day's AI score for a ticker from Danelfin.
 * Used to compute AI Score delta (Change column). Cached 5 min. Concurrency limited.
 */

const DANELFIN_BASE = "https://apirest.danelfin.com";
const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { aiscore: number | null; ts: number }>();
const CONCURRENCY = 5;

let inFlight = 0;
const queue: Array<() => void> = [];

function waitTurn(): Promise<void> {
  if (inFlight < CONCURRENCY) return Promise.resolve();
  return new Promise<void>((resolve) => {
    queue.push(resolve);
  });
}

function release(): void {
  inFlight--;
  const next = queue.shift();
  if (next) {
    inFlight++;
    next();
  }
}

function previousDays(fromDate: string, count: number): string[] {
  const dates: string[] = [];
  const d = new Date(fromDate + "T12:00:00Z");
  for (let i = 0; i < count; i++) {
    d.setUTCDate(d.getUTCDate() - 1);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

/**
 * Fetch aiscore for one (ticker, date). Returns null if no data.
 */
async function fetchAiscoreForDate(
  ticker: string,
  dateKey: string,
  apiKey: string
): Promise<number | null> {
  await waitTurn();
  inFlight++;
  try {
    const url = `${DANELFIN_BASE}/ranking?ticker=${encodeURIComponent(ticker)}&date=${dateKey}`;
    const res = await fetch(url, {
      headers: { "x-api-key": apiKey },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as Record<string, Record<string, unknown>>;
    const firstDate = Object.keys(data)[0];
    if (!firstDate) return null;
    const block = data[firstDate] as Record<string, unknown>;
    const score = block?.aiscore ?? (block?.[ticker] as Record<string, unknown>|undefined)?.aiscore;
    if (score == null) return null;
    const n = Number(score);
    return Number.isNaN(n) ? null : n;
  } finally {
    release();
  }
}

/**
 * Get previous available day's AI score for ticker before dateKey. Tries up to 7 days back.
 */
export async function getPrevAiScore(
  ticker: string,
  dateKey: string,
  apiKey: string
): Promise<number | null> {
  const prevDates = previousDays(dateKey, 7);
  for (const d of prevDates) {
    const cacheKey = `${ticker}:${d}`;
    const now = Date.now();
    const hit = cache.get(cacheKey);
    if (hit && now - hit.ts < CACHE_TTL_MS) {
      if (hit.aiscore != null) return hit.aiscore;
      continue;
    }
    const aiscore = await fetchAiscoreForDate(ticker, d, apiKey);
    cache.set(cacheKey, { aiscore, ts: now });
    if (aiscore != null) return aiscore;
  }
  return null;
}
