"use client";

import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { toCountryCode, isEuCode } from "@/lib/country";
import { cn } from "@/lib/utils";

type FlagIconProps = {
  countryCode: string;
  size?: number;
  className?: string;
};

const flagStyle = (size: number) => ({
  width: size,
  height: size,
  borderRadius: 2,
  border: "1px solid rgba(0,0,0,0.06)",
  objectFit: "cover" as const,
  display: "block",
});

export function FlagIcon({
  countryCode,
  size = 18,
  className,
}: FlagIconProps) {
  const [imgError, setImgError] = useState(false);
  const code = toCountryCode(countryCode);
  const normalized = code.toUpperCase();

  if (isEuCode(normalized)) {
    return (
      <span
        className={cn("inline-flex items-center justify-center", className)}
        style={{
          width: size,
          height: size,
          borderRadius: 2,
          border: "1px solid rgba(0,0,0,0.06)",
          fontSize: size * 0.85,
          lineHeight: 1,
        }}
        role="img"
        aria-label="EU"
      >
        🇪🇺
      </span>
    );
  }

  if (normalized.length < 2 || imgError) {
    return (
      <span
        className={cn("inline-block flex-shrink-0 bg-gray-300", className)}
        style={{
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          borderRadius: 2,
          border: "1px solid rgba(0,0,0,0.06)",
        }}
        role="img"
        aria-label={code || "Unknown"}
      />
    );
  }

  return (
    <span
      className={cn("inline-flex items-center justify-center overflow-hidden flex-shrink-0", className)}
      style={{
        width: size,
        height: size,
        borderRadius: 2,
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.06)",
      }}
    >
      <ReactCountryFlag
        countryCode={normalized}
        svg
        style={flagStyle(size)}
        aria-label={normalized}
        title={normalized}
        onError={() => setImgError(true)}
      />
    </span>
  );
}
