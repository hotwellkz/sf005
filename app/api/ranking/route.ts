import { NextRequest, NextResponse } from "next/server";
import { getEnrichedData, getFinnhubDailyVolume } from "@/lib/finnhub";
import { getPrevAiScore } from "@/lib/danelfin-prev";

const DANELFIN_BASE = "https://apirest.danelfin.com";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function previousDays(fromDate: string, count: number): string[] {
  const dates: string[] = [];
  const d = new Date(fromDate + "T12:00:00Z");
  for (let i = 0; i < count; i++) {
    d.setUTCDate(d.getUTCDate() - 1);
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export async function GET(request: NextRequest) {
  const key = process.env.DANELFIN_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");
  const dateParam = searchParams.get("date");
  if (!ticker && !dateParam) {
    return NextResponse.json(
      { error: "Either ticker or date is required" },
      { status: 400 }
    );
  }

  const params = new URLSearchParams();
  if (ticker) params.set("ticker", ticker);
  const asset = searchParams.get("asset");
  if (asset) params.set("asset", asset);
  const sector = searchParams.get("sector");
  if (sector) params.set("sector", sector);
  const industry = searchParams.get("industry");
  if (industry) params.set("industry", industry);
  const buy_track_record = searchParams.get("buy_track_record");
  if (buy_track_record) params.set("buy_track_record", buy_track_record);
  const sell_track_record = searchParams.get("sell_track_record");
  if (sell_track_record) params.set("sell_track_record", sell_track_record);

  const datesToTry = dateParam
    ? [dateParam, ...previousDays(dateParam, 10)]
    : [new Date().toISOString().slice(0, 10)];

  for (const date of datesToTry) {
    const q = new URLSearchParams(params);
    q.set("date", date);
    const url = `${DANELFIN_BASE}/ranking?${q.toString()}`;
    const res = await fetch(url, {
      headers: { "x-api-key": key },
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const dateKey = Object.keys(data)[0];
      if (!dateKey) return NextResponse.json(data);

      const byTicker = data[dateKey] as Record<string, Record<string, unknown>>;
      const tickers = Object.keys(byTicker);

      const deltas = await Promise.all(
        tickers.map(async (t) => {
          const currentAiscore = Number(byTicker[t]?.aiscore);
          const prevAiscore = Number.isNaN(currentAiscore)
            ? null
            : await getPrevAiScore(t, dateKey, key);
          const aiScoreDelta =
            prevAiscore != null && !Number.isNaN(currentAiscore)
              ? Math.round(currentAiscore - prevAiscore)
              : null;
          return { ticker: t, aiScoreDelta };
        })
      );
      for (const { ticker: t, aiScoreDelta } of deltas) {
        byTicker[t].aiScoreDelta = aiScoreDelta;
      }

      if (process.env.FINNHUB_API_KEY) {
        const enriched = await Promise.all(
          tickers.map(async (t) => {
            const [profile, dailyVolume] = await Promise.all([
              getEnrichedData(t),
              getFinnhubDailyVolume(t, dateKey),
            ]);
            return {
              ticker: t,
              companyName: profile.companyName ?? undefined,
              industry: profile.industry ?? undefined,
              countryCode: profile.countryCode ?? undefined,
              countryName: profile.countryName ?? undefined,
              dailyVolume: dailyVolume ?? undefined,
            };
          })
        );
        for (const { ticker: t, companyName, industry, countryCode, countryName, dailyVolume } of enriched) {
          if (!byTicker[t]) continue;
          if (companyName != null) byTicker[t].companyName = companyName;
          if (industry != null) byTicker[t].industry = industry;
          if (countryCode != null) byTicker[t].countryCode = countryCode;
          if (countryName != null) byTicker[t].countryName = countryName;
          if (dailyVolume != null) byTicker[t].dailyVolume = dailyVolume;
        }
      }
      for (const t of tickers) {
        const raw = byTicker[t];
        if (raw?.buy_track_record != null) byTicker[t].buyTrackRecord = raw.buy_track_record;
        if (raw?.sell_track_record != null) byTicker[t].sellTrackRecord = raw.sell_track_record;
      }

      return NextResponse.json(data);
    }
    if (res.status === 400 || res.status === 403) {
      const text = await res.text();
      return NextResponse.json(
        { error: text || res.statusText },
        { status: res.status }
      );
    }
  }

  // No data for any date: return 200 with empty ranking so UI can show empty table
  const fallbackDate = dateParam || new Date().toISOString().slice(0, 10);
  return NextResponse.json({ [fallbackDate]: {} });
}
