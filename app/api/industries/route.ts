import { NextResponse } from "next/server";

const DANELFIN_BASE = "https://apirest.danelfin.com";

export async function GET() {
  const key = process.env.DANELFIN_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }
  const res = await fetch(`${DANELFIN_BASE}/industries`, {
    headers: { "x-api-key": key },
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: await res.text() || res.statusText },
      { status: res.status }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
