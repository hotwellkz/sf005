"use client";

import { authTokens } from "@/lib/auth/tokens";

const { layout } = authTokens.page;

type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`w-full bg-white ${className}`}
      style={{
        maxWidth: layout.maxWidth,
        borderRadius: layout.cardRadius,
        boxShadow: layout.cardShadow,
      }}
    >
      {children}
    </div>
  );
}
