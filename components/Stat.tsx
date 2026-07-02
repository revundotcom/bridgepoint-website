"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  durationMs?: number;
  decimals?: number;
  light?: boolean;
  big?: boolean;
  className?: string;
};

export default function Stat({
  value,
  suffix = "",
  prefix = "",
  label,
  sublabel,
  durationMs = 1600,
  decimals = 0,
  light = false,
  big = false,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
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
  }, [inView, value, durationMs]);

  const formatted = decimals
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex flex-col", className)}
    >
      <div
        className={cn(
          "font-display font-extrabold tracking-tight tabular-nums leading-none",
          big ? "text-stat-lg" : "text-4xl md:text-5xl",
          light ? "text-white" : "text-navy"
        )}
      >
        {prefix}
        {formatted}
        {suffix}
      </div>
      <div
        className={cn(
          big ? "mt-3" : "mt-2",
          "text-sm font-bold uppercase tracking-[0.18em]",
          light ? "text-cyan-300" : "text-cyan-800"
        )}
      >
        {label}
      </div>
      {sublabel && (
        <div
          className={cn(
            "mt-1.5 text-sm leading-snug",
            light ? "text-white/75" : "text-steel-500"
          )}
        >
          {sublabel}
        </div>
      )}
    </motion.div>
  );
}
