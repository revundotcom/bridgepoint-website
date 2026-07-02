"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Sticky scroll-tracked progress indicator.
 * Renders a thin cyan bar at the very top of the viewport that fills as
 * the visitor scrolls the page. Homepage-only by convention.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-cyan-300 via-cyan-500 to-cyan-700 shadow-cyan-glow"
    />
  );
}
