"use client";

/**
 * Mock chart for AuthGate left panel — two lines + legend. Not real data.
 */
export function ChartMock() {
  const w = 320;
  const h = 160;
  const pad = { left: 40, right: 24, top: 20, bottom: 28 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const line1 = [
    [0, 0.85],
    [0.2, 0.82],
    [0.4, 0.88],
    [0.6, 0.92],
    [0.8, 0.95],
    [1, 1],
  ];
  const line2 = [
    [0, 0.5],
    [0.2, 0.52],
    [0.4, 0.55],
    [0.6, 0.58],
    [0.8, 0.62],
    [1, 0.65],
  ];

  const toX = (t: number) => pad.left + t * plotW;
  const toY = (v: number) => pad.top + plotH - v * plotH;

  const path1 = line1.map(([t, v], i) => `${i === 0 ? "M" : "L"} ${toX(t)} ${toY(v)}`).join(" ");
  const path2 = line2.map(([t, v], i) => `${i === 0 ? "M" : "L"} ${toX(t)} ${toY(v)}`).join(" ");

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" aria-hidden>
        <path
          d={path1}
          fill="none"
          stroke="rgb(110 231 183)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={path2}
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={toX(0.92)}
          y={toY(1)}
          className="fill-emerald-300 text-[10px] font-bold"
        >
          +18%
        </text>
        <text
          x={toX(0.92)}
          y={toY(0.65)}
          className="fill-white/80 text-[10px] font-bold"
        >
          +8%
        </text>
      </svg>
    </div>
  );
}
