"use client";

import { authTokens } from "@/lib/auth/tokens";

const accent = authTokens.brand.accent;

export function StockForgeLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="8" y="4" width="4" height="24" rx="1" fill={accent} />
      <rect x="8" y="12" width="12" height="2" rx="1" fill={accent} />
      <rect x="8" y="18" width="10" height="2" rx="1" fill={accent} />
      <path
        d="M28 8l-2 2v12l2 2 2-2V8l-2-2zm0 12.5V11.5L27 12v8l1 .5z"
        fill={accent}
      />
      <text
        x="44"
        y="22"
        fontFamily="system-ui, sans-serif"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
      >
        StockForge AI
      </text>
    </svg>
  );
}
