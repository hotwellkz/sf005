import { cn } from "@/lib/utils";

export function InfoIcon({ className = "" }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-[16px] h-[16px] ml-[4px] rounded-full text-[11px] font-semibold text-gray-500 border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-help",
        className
      )}
    >
      i
    </span>
  );
}
