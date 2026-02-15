"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

const TOOLTIP_STYLE = {
  bg: "#1f1f1f",
  textColor: "#ffffff",
  fontSizePx: 12,
  lineHeight: 1.25,
  padding: "8px 10px",
  borderRadiusPx: 4,
  maxWidthPx: 280,
  shadow: "0 8px 20px rgba(0,0,0,0.25)",
  zIndex: 50,
  offsetPx: 10,
  durationMs: 120,
  caretSizePx: 8,
} as const;

type TooltipProps = {
  content: string | ReactNode;
  children: ReactNode;
  placement?: "top" | "bottom";
};

export function Tooltip({
  content,
  children,
  placement = "top",
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    if (placement === "top") {
      setPosition({
        left: centerX,
        top: rect.top - TOOLTIP_STYLE.offsetPx,
      });
    } else {
      setPosition({
        left: centerX,
        top: rect.bottom + TOOLTIP_STYLE.offsetPx,
      });
    }
  }, [placement]);

  useEffect(() => {
    if (open && triggerRef.current) {
      updatePosition();
    }
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLSpanElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  }, []);

  const tooltipContent =
    typeof content === "string" ? (
      <span style={{ lineHeight: TOOLTIP_STYLE.lineHeight }}>{content}</span>
    ) : (
      content
    );

  return (
    <>
      <span
        ref={triggerRef}
        className="inline-flex cursor-default"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocusCapture={() => setOpen(true)}
        onBlurCapture={handleBlur}
      >
        {children}
      </span>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="tooltip"
            style={{
              position: "fixed",
              left: position.left,
              top: position.top,
              transform:
                placement === "top"
                  ? "translate(-50%, calc(-100% - 10px))"
                  : "translate(-50%, 10px)",
              zIndex: TOOLTIP_STYLE.zIndex,
            }}
          >
            <div
              className="tooltip-animate-in"
              style={{
                backgroundColor: TOOLTIP_STYLE.bg,
                color: TOOLTIP_STYLE.textColor,
                fontSize: TOOLTIP_STYLE.fontSizePx,
                lineHeight: TOOLTIP_STYLE.lineHeight,
                padding: TOOLTIP_STYLE.padding,
                borderRadius: TOOLTIP_STYLE.borderRadiusPx,
                maxWidth: TOOLTIP_STYLE.maxWidthPx,
                boxShadow: TOOLTIP_STYLE.shadow,
              }}
            >
              {tooltipContent}
            </div>
            {/* Caret: bottom-center, pointing down */}
            {placement === "top" && (
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: -TOOLTIP_STYLE.caretSizePx / 2,
                  transform: "translateX(-50%) rotate(45deg)",
                  width: TOOLTIP_STYLE.caretSizePx,
                  height: TOOLTIP_STYLE.caretSizePx,
                  backgroundColor: TOOLTIP_STYLE.bg,
                  boxShadow: "2px 2px 2px rgba(0,0,0,0.1)",
                }}
                aria-hidden
              />
            )}
            {placement === "bottom" && (
              <span
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -TOOLTIP_STYLE.caretSizePx / 2,
                  transform: "translateX(-50%) rotate(45deg)",
                  width: TOOLTIP_STYLE.caretSizePx,
                  height: TOOLTIP_STYLE.caretSizePx,
                  backgroundColor: TOOLTIP_STYLE.bg,
                  boxShadow: "-2px -2px 2px rgba(0,0,0,0.1)",
                }}
                aria-hidden
              />
            )}
          </div>,
          document.body
        )}
    </>
  );
}
