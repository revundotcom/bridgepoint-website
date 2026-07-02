"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
  decimals?: number;
  className?: string;
  /** Override numeric formatting (e.g. for "24/7") */
  rawText?: string;
};

/**
 * Lightweight scroll-triggered counter for inline stats.
 * If rawText is provided, it short-circuits the counter and just
 * fades in (used for non-numeric values like "24/7").
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  durationMs = 1400,
  decimals = 0,
  className,
  rawText,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  // Init to value so SSR + first paint show the correct number, not "0".
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || rawText || hasAnimated.current) return;
    hasAnimated.current = true;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, durationMs, rawText]);

  const formatted = decimals
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {rawText
        ? inView
          ? rawText
          : " "
        : `${prefix}${formatted}${suffix}`}
    </span>
  );
}
