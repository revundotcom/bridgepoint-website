import {
  CalendarClock,
  Wrench,
  ArrowRight,
  Phone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { NAP } from "@/lib/constants";

const TRADES = [
  "Plumbing",
  "Electrical",
  "HVAC / heating",
  "HVAC / cooling",
  "General maintenance",
  "Other",
];

const URGENCY = [
  { id: "today", label: "Today / emergency", emergency: true },
  { id: "soon", label: "Within 48 hours" },
  { id: "scheduled", label: "Scheduled / quote first" },
];

export default function BookingWidget() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-steel-100 bg-white shadow-elevated">
      <div
        aria-hidden
        className="absolute -top-32 -right-24 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
      />
      <div className="relative grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 bg-navy-900 text-white p-8 lg:p-10 relative">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06] grid-bg pointer-events-none"
          />
          <div className="relative">
            <p className="eyebrow-light mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Book online
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight text-balance mb-4">
              Schedule a Bridgepoint visit in 60 seconds.
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Pick a trade, a window, and your address. We'll confirm via SMS
              within minutes during business hours and dispatch immediately for
              emergencies.
            </p>
            <a
              href={NAP.phoneTel}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-cyan-600 transition"
            >
              <Phone className="h-4 w-4" />
              Or call {NAP.phone}
            </a>

            <ul className="mt-8 space-y-3 text-sm text-white/85">
              {[
                "Live dispatch acknowledgment",
                "Trade-routed scheduling",
                "Transparent dispatch fee quote",
                "SMS + email confirmation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form className="lg:col-span-7 p-8 lg:p-10 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-500">
                Full name
              </span>
              <input
                type="text"
                className="mt-1.5 w-full rounded-xl border border-steel-100 px-4 py-3 text-sm text-navy placeholder:text-steel-500 focus:border-cyan-500 focus:outline-none"
                placeholder="Your name"
                required
              />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-500">
                Phone
              </span>
              <input
                type="tel"
                className="mt-1.5 w-full rounded-xl border border-steel-100 px-4 py-3 text-sm text-navy placeholder:text-steel-500 focus:border-cyan-500 focus:outline-none"
                placeholder="(416) 555-0100"
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-500">
              Service address
            </span>
            <input
              type="text"
              className="mt-1.5 w-full rounded-xl border border-steel-100 px-4 py-3 text-sm text-navy placeholder:text-steel-500 focus:border-cyan-500 focus:outline-none"
              placeholder="Street, city, postal code"
              required
            />
          </label>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-500">
              Trade
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {TRADES.map((t) => (
                <label
                  key={t}
                  className="inline-flex items-center gap-2 cursor-pointer rounded-full border border-steel-100 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy hover:border-cyan-500 hover:bg-accent/5 transition has-[:checked]:border-cyan-700 has-[:checked]:bg-cyan-700 has-[:checked]:text-white"
                >
                  <input
                    type="radio"
                    name="trade"
                    value={t}
                    className="sr-only"
                  />
                  <Wrench className="h-3.5 w-3.5 opacity-70" />
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-steel-500">
              Urgency
            </span>
            <ul className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {URGENCY.map((u) => (
                <li key={u.id}>
                  <label className="block cursor-pointer rounded-xl border border-steel-100 bg-white p-3 text-sm font-semibold text-navy hover:border-cyan-500 hover:bg-accent/5 transition has-[:checked]:border-cyan-700 has-[:checked]:bg-accent/10">
                    <input
                      type="radio"
                      name="urgency"
                      value={u.id}
                      className="sr-only"
                    />
                    <span className="flex items-center gap-2">
                      <CalendarClock
                        className={`h-4 w-4 ${
                          u.emergency ? "text-cyan-700" : "text-steel-500"
                        }`}
                      />
                      {u.label}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-700 px-6 py-3.5 text-base font-bold text-white shadow-soft hover:bg-cyan-600 transition"
          >
            Request service
            <ArrowRight className="h-4 w-4" />
          </button>
          <p className="text-xs text-steel-500 text-center">
            Prefer to talk?{" "}
            <Link href="/contact" className="font-semibold text-cyan-700">
              Use the full contact form →
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
