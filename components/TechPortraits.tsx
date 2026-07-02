import {
  PhoneCall,
  ClipboardCheck,
  Wrench,
  FileText,
} from "lucide-react";

/**
 * "How we work" block on the About page.
 * Replaces named team / faculty portraits. NO fictional staff names,
 * NO AI portrait images, NO placeholder frames. Two blocks combined:
 *   Block A — Four-step process on light navy cards
 *   Block B — By-the-numbers stats on a dark navy slab
 */

const PROCESS = [
  {
    Icon: PhoneCall,
    step: "01",
    title: "Dispatch",
    body: "24/7 live dispatch routes your request to the closest available trade.",
  },
  {
    Icon: ClipboardCheck,
    step: "02",
    title: "Diagnose",
    body: "Licensed technician arrives, documents the issue, and quotes before work begins.",
  },
  {
    Icon: Wrench,
    step: "03",
    title: "Repair",
    body: "Repair completed on site, with photos and timestamps logged for your records.",
  },
  {
    Icon: FileText,
    step: "04",
    title: "Document",
    body: "Full work record delivered to your portal, including warranty and follow up scheduling.",
  },
];

const STATS = [
  {
    value: "24/7",
    label: "Live dispatch every hour of every day",
  },
  {
    value: "US + Canada",
    label: "Service desks in both countries",
  },
  {
    value: "10+",
    label: "Licensed trades on one dispatch line",
  },
  {
    value: "Photo documented",
    label: "Every job logged with proof of work",
  },
];

export default function TechPortraits() {
  return (
    <div className="space-y-12">
      {/* Block A — Four step process on navy cards with cyan icons */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map(({ Icon, step, title, body }) => (
          <article
            key={step}
            className="group relative overflow-hidden rounded-2xl bg-navy-900 p-7 shadow-elevated ring-1 ring-white/10 transition-colors hover:ring-cyan-400/40"
          >
            <span
              aria-hidden
              className="absolute right-5 top-5 font-display text-6xl font-extrabold leading-none text-cyan-400/15 tabular-nums"
            >
              {step}
            </span>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/30">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              {body}
            </p>
          </article>
        ))}
      </div>

      {/* Block B — By the numbers on dark navy slab */}
      <div className="relative overflow-hidden rounded-3xl bg-navy-900 text-white ring-1 ring-white/10 shadow-elevated">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] pattern-cross-navy"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-500/12 blur-3xl"
        />
        <div className="relative grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="bg-navy-900 p-7 sm:p-8 transition-colors hover:bg-navy-700"
            >
              <p className="font-display text-3xl sm:text-4xl font-extrabold text-cyan-300 leading-none tracking-tight">
                {s.value}
              </p>
              <p className="mt-3 text-sm text-white/85 leading-snug">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
