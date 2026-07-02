import Link from "next/link";
import { ArrowRight, BadgePercent, ShieldCheck, Calendar } from "lucide-react";

export default function FinancingBanner() {
  return (
    <section className="relative bg-navy-900 text-white overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] grid-bg pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -top-1/2 -right-1/3 h-[140%] w-[60%] rotate-12 rounded-full bg-gradient-to-br from-accent/30 to-accent-700/0 blur-3xl"
      />
      <div className="container-bp relative grid grid-cols-1 gap-10 py-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <p className="eyebrow-light mb-4">
            <BadgePercent className="h-3.5 w-3.5" />
            Financing available
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-balance text-white">
            0% APR financing on installs over $1,000.{" "}
            <span className="text-cyan-300">
              Spread the cost over 12 months.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Furnace, boiler, AC, water-heater, panel-upgrade, and EV-charger
            installs eligible. Subject to credit approval through our financing
            partner. Promotional terms vary by program.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-700 px-6 py-3 text-base font-bold text-white shadow-soft hover:bg-cyan-600 transition"
            >
              Apply for financing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-navy transition"
            >
              See eligible services
            </Link>
          </div>
        </div>
        <ul className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
          {[
            {
              Icon: ShieldCheck,
              k: "0% APR",
              v: "Promotional financing",
            },
            {
              Icon: Calendar,
              k: "12 months",
              v: "Equal monthly payments",
            },
            {
              Icon: BadgePercent,
              k: "Apply online",
              v: "Soft credit check",
            },
          ].map(({ Icon, k, v }) => (
            <li
              key={k}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur"
            >
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-accent/15 text-cyan-300">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-display text-base font-bold leading-none mb-1 text-white">
                  {k}
                </div>
                <div className="text-xs text-white/80 leading-snug">{v}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
