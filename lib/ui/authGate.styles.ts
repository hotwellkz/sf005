/**
 * Single source of truth for AuthGateModal Tailwind classes.
 */
export const authGateStyles = {
  overlay:
    "fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px] flex items-center justify-center p-4",
  modal:
    "relative w-full max-w-[1040px] rounded-2xl bg-white shadow-2xl overflow-hidden",
  closeBtn:
    "absolute right-4 top-4 z-10 h-10 w-10 rounded-full hover:bg-black/5 flex items-center justify-center transition",
  grid: "grid grid-cols-1 md:grid-cols-2",
  left: "bg-[#0B79C5] text-white p-8 md:p-10 relative",
  leftTitle: "text-xl md:text-2xl font-semibold",
  leftSub: "mt-3 text-sm md:text-base text-white/90 leading-relaxed",
  chartWrap:
    "mt-6 rounded-xl bg-white/10 border border-white/15 p-4 md:p-5",
  chartTitle: "text-base font-semibold",
  chartNote: "mt-2 text-xs text-white/85 leading-relaxed",
  legend: "mt-4 flex items-center gap-3 text-xs text-white/85",
  dotA: "h-2.5 w-2.5 rounded-full bg-emerald-300 shrink-0",
  dotB: "h-2.5 w-2.5 rounded-full bg-white/70 shrink-0",
  right: "p-8 md:p-10",
  h1: "text-2xl md:text-3xl font-semibold text-slate-900",
  h2: "mt-2 text-sm md:text-base text-slate-600",
  fieldLabel: "mt-6 text-sm font-medium text-slate-700",
  input:
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B79C5]/30 focus:border-[#0B79C5]/40",
  pwWrap: "relative",
  pwToggle:
    "absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500",
  hint: "mt-2 text-xs text-slate-500",
  primaryBtn:
    "mt-6 w-full rounded-xl bg-[#0B79C5] py-3.5 text-white font-semibold hover:brightness-95 active:brightness-90 transition",
  dividerRow: "mt-6 flex items-center gap-3",
  dividerLine: "h-px flex-1 bg-slate-200",
  dividerText: "text-xs text-slate-500",
  googleBtn:
    "mt-6 w-full rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-800 hover:bg-slate-50 transition flex items-center justify-center gap-3",
  googleIcon: "h-5 w-5",
  footer: "mt-6 text-xs text-slate-500 leading-relaxed",
  footerLink:
    "text-slate-700 underline underline-offset-2 hover:text-slate-900",
} as const;
