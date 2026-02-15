"use client";

import { CheckCircle } from "lucide-react";

type SectionHeaderProps = {
  title: string;
  dateText: string;
};

export function SectionHeader({ title, dateText }: SectionHeaderProps) {
  return (
    <header className="text-center">
      <h2
        className="text-[34px] font-extrabold leading-[42px] tracking-tight"
        style={{ color: "#1D74C6" }}
      >
        {title}
      </h2>
      <p className="mt-2 flex items-center justify-center gap-2 text-sm text-gray-600">
        <CheckCircle className="h-4 w-4 shrink-0" style={{ color: "#22C55E" }} aria-hidden />
        <span>{dateText}</span>
      </p>
    </header>
  );
}
