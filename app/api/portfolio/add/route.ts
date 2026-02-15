import { NextRequest, NextResponse } from "next/server";

/**
 * Stub: accepts add-to-portfolio requests. Actual storage is client-side (localStorage).
 * Replace with real DB when needed.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ticker = body?.ticker;
    if (typeof ticker !== "string" || !ticker.trim()) {
      return NextResponse.json(
        { error: "ticker is required" },
        { status: 400 }
      );
    }
    return NextResponse.json({ ok: true, ticker: ticker.trim().toUpperCase() });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
