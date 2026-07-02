"use client";

import { motion } from "framer-motion";
import {
  PhoneCall,
  ClipboardList,
  Receipt,
  Wrench,
  CheckCircle2,
} from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "Call dispatch",
    body: "1-855-910-9090. 24/7. Trade-routed intake confirms your address, scope, and urgency in under three minutes.",
    Icon: PhoneCall,
  },
  {
    n: "02",
    title: "Diagnose on-site",
    body: "Licensed technician arrives within the dispatch window, scopes the issue, and identifies what's actually broken.",
    Icon: ClipboardList,
  },
  {
    n: "03",
    title: "Transparent quote",
    body: "Flat-rate quote presented before any work begins. repair, replacement, and warranty options laid out clearly.",
    Icon: Receipt,
  },
  {
    n: "04",
    title: "Repair on the spot",
    body: "Most repairs completed same visit. Trucks stocked with high-runner parts to minimize return trips.",
    Icon: Wrench,
  },
  {
    n: "05",
    title: "Follow-up & warranty",
    body: "Photos, work-order documentation, warranty registration. We follow up within 7 days on every job.",
    Icon: CheckCircle2,
  },
];

export default function ProcessTimeline() {
  return (
    <ol className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
      {STEPS.map(({ n, title, body, Icon }, i) => (
        <motion.li
          key={n}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col"
        >
          <div className="relative flex items-center mb-5">
            <span className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-cyan-700 text-white shadow-soft">
              <Icon className="h-5 w-5" />
            </span>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className="hidden lg:block flex-1 h-0.5 ml-3 bg-gradient-to-r from-accent/60 to-accent/0"
              />
            )}
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300 mb-2">
            Step {n}
          </p>
          <h3 className="font-display text-lg font-bold text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-white/70 leading-relaxed">{body}</p>
        </motion.li>
      ))}
    </ol>
  );
}
