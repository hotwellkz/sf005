"use client";

import { FlagIcon as FlagIconImpl } from "@/components/FlagIcon";

type FlagIconProps = {
  code: string;
  className?: string;
  size?: number;
};

/**
 * Re-export for backward compatibility. Prefer importing from @/components/FlagIcon.
 */
export function FlagIcon({ code, className = "", size = 18 }: FlagIconProps) {
  return (
    <FlagIconImpl
      countryCode={code}
      size={size}
      className={className}
    />
  );
}
