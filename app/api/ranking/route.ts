import { NextRequest, NextResponse } from "next/server";

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

  return NextResponse.json(
    { error: "No ranking data available for the requested period" },
    { status: 404 }
  );
}
