import {
  Clock4,
  Wrench,
  ScrollText,
  Phone,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

type Problem = {
  icon: LucideIcon;
  problem: string;
  problemBody: string;
  fix: string;
  fixBody: string;
};

const PROBLEMS: Problem[] = [
  {
    icon: Phone,
    problem: "Vendor sprawl burns property managers.",
    problemBody:
      "Three plumbers, two electricians, an HVAC sub, and a handyman: each with a different invoice, a different intake number, a different SLA. When something breaks at 2am, nobody knows who to call first.",
    fix: "One dispatch line. Every trade. One bill.",
    fixBody:
      "Bridgepoint dispatches plumbing, electrical, HVAC, and general trades from a single North American service desk. One number, one ticket, one consolidated invoice on portfolio contracts. Property managers stop chasing vendors and start running buildings.",
  },
  {
    icon: Clock4,
    problem: "Slow response times turn small repairs into claims.",
    problemBody:
      "A leaking valve at 6pm becomes a flooded unit by midnight. The hourly cost of waiting on a vendor callback shows up later as drywall, flooring, and a tenant credit, and that is before the insurance deductible.",
    fix: "24/7 dispatch with a real ETA, not a callback queue.",
    fixBody:
      "Calls hit a live dispatcher around the clock. Trades are routed by zone, with tickets time-stamped from intake to on-site to fix. You get a written ETA on the first call, not a promise to circle back tomorrow.",
  },
  {
    icon: Wrench,
    problem: "Surprise pricing erodes trust on every invoice.",
    problemBody:
      "Time-and-materials estimates that triple at the close-out, dispatch fees that stack on top of labor, and parts marked up without a quote are how trades lose accounts and property managers lose their owners' confidence.",
    fix: "Flat-rate quotes before the wrench moves.",
    fixBody:
      "Diagnosis on-site, written flat-rate quote before work starts, and a dispatch credit applied when you proceed. No T&M roulette. Property owners see the number before the invoice, and the invoice matches the quote.",
  },
  {
    icon: ScrollText,
    problem: "Compliance risk lives in your vendor's filing cabinet.",
    problemBody:
      "ESA permits, TSSA records, COIs, WSIB certs, license numbers: most reactive vendors cannot produce them on demand. When a building gets audited or a claim hits, the paperwork gap becomes the property manager's problem.",
    fix: "Documented trades, documented work.",
    fixBody:
      "State and provincial licensed plumbing, electrical, and gas/HVAC trades on every dispatch. License numbers on each work order. COI and workers compensation on file before the first ticket. Audit ready paperwork as a default, not a fire drill.",
  },
];

type Props = {
  variant?: "light" | "dark";
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
};

export default function ProblemsWeSolve({
  variant = "light",
  eyebrow = "What's broken in maintenance",
  title = "The problems we solve.",
  description = "Property managers and owners do not call a maintenance company because everything is fine. Here is what is actually broken in the trades market, and how Bridgepoint built around it.",
  align = "center",
}: Props) {
  const isDark = variant === "dark";

  return (
    <section
      className={[
        "section",
        isDark ? "bg-navy-700 text-white" : "bg-cream-100",
      ].join(" ")}
    >
      <div className="container-bp">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={align}
          light={isDark}
          className="mb-12"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROBLEMS.map(({ icon: Icon, problem, problemBody, fix, fixBody }) => (
            <article
              key={problem}
              className={[
                "rounded-2xl border p-6 sm:p-7 transition",
                isDark
                  ? "border-white/10 bg-navy-800/60 hover:border-cyan-400"
                  : "border-steel-100 bg-white shadow-soft hover:shadow-card hover:border-cyan-500/40",
              ].join(" ")}
            >
              <div className="flex items-start gap-4">
                <span
                  className={[
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    isDark
                      ? "bg-cyan-500/15 text-cyan-300"
                      : "bg-cyan-50 text-cyan-700",
                  ].join(" ")}
                  aria-hidden
                >
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p
                    className={[
                      "text-[11px] font-bold uppercase tracking-[0.22em]",
                      isDark ? "text-white/70" : "text-steel-500",
                    ].join(" ")}
                  >
                    The problem
                  </p>
                  <h3
                    className={[
                      "mt-1 font-display text-lg sm:text-xl font-bold leading-tight tracking-tight",
                      isDark ? "text-white" : "text-navy-700",
                    ].join(" ")}
                  >
                    {problem}
                  </h3>
                </div>
              </div>
              <p
                className={[
                  "mt-3 text-sm leading-relaxed",
                  isDark ? "text-white/80" : "text-steel-700",
                ].join(" ")}
              >
                {problemBody}
              </p>

              <div
                className={[
                  "mt-5 rounded-xl border p-4 sm:p-5",
                  isDark
                    ? "border-cyan-400/30 bg-cyan-500/10"
                    : "border-cyan-500/30 bg-cyan-50",
                ].join(" ")}
              >
                <p
                  className={[
                    "text-[11px] font-bold uppercase tracking-[0.22em]",
                    isDark ? "text-cyan-300" : "text-cyan-800",
                  ].join(" ")}
                >
                  Here is how we solve it
                </p>
                <p
                  className={[
                    "mt-1.5 font-display text-base sm:text-lg font-bold leading-tight tracking-tight",
                    isDark ? "text-white" : "text-navy-700",
                  ].join(" ")}
                >
                  {fix}
                </p>
                <p
                  className={[
                    "mt-2 text-sm leading-relaxed",
                    isDark ? "text-white/85" : "text-steel-700",
                  ].join(" ")}
                >
                  {fixBody}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
