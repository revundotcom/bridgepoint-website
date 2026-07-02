"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Sparkles,
  Star,
  ArrowUpRight,
  Wrench,
} from "lucide-react";
import { NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const TRADES = ["Plumbing", "Electrical", "HVAC", "General / multi-trade"];

const TRUST_STRIP = [
  "BBB A+",
  "Master Plumber",
  "TSSA",
  "ESA",
  "WSIB",
  "24/7 Live",
];

export default function EmergencyHero() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-white">
      {/* Full-bleed editorial documentary photography (May 2026 elevation) */}
      <Image
        src={IMAGES.editorialHero}
        alt={IMAGES.editorialHeroAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-65"
      />
      {/* Cleaner navy overlay — left-weighted for headline column legibility,
          replaces the muddy four-stop gradient that flattened the photograph */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/55 to-navy-900/25"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-navy-900/20"
      />

      <div className="container-bp relative grid grid-cols-1 gap-8 py-12 md:py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        {/* LEFT: Display headline + premium phone CTA */}
        <div className="lg:col-span-7">
          {/* Live-status row */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-200 backdrop-blur-sm">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 animate-ring-expand" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300 animate-live-dot" />
              </span>
              Dispatch desk live
            </span>
            <p className="hidden sm:inline-flex eyebrow-light !mb-0">
              Live answer 24/7. On-site target inside 60 minutes.
            </p>
          </div>

          {/* H1 — brand-led, service-led, scannable for SERP + sitelinks */}
          <h1 className="font-display font-extrabold text-white text-display-1">
            Emergency repair?
            <br />
            <span className="text-cyan-300">Bridgepoint dispatches now.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-white/85 text-pretty">
            Plumbing, electrical, HVAC, and building emergencies. Answered by a
            live dispatcher and routed to a licensed technician. One number.
            Every trade.
          </p>

          {/* Phone CTA — solid cyan, no glow, no animated pulse. Editorial restraint. */}
          <a
            href={NAP.phoneTel}
            className="group relative mt-7 inline-flex flex-col sm:flex-row items-stretch overflow-hidden rounded-md bg-cyan-700 transition-colors duration-200 hover:bg-cyan-800 active:scale-[0.99]"
          >
            <span className="flex items-center justify-center gap-3 px-6 py-4 sm:px-8 sm:py-6 bg-cyan-800 text-white">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/95">
                Tap to call
              </span>
            </span>
            <span className="flex items-center justify-center px-6 py-4 sm:px-10 sm:py-6 bg-cyan-700">
              <span className="font-display font-extrabold tabular-nums text-white text-3xl sm:text-5xl lg:text-[3.25rem] tracking-tight leading-none">
                {NAP.phone}
              </span>
            </span>
            <span className="flex items-center justify-center gap-2 bg-cyan-800 px-5 py-3 sm:px-7 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-colors duration-200 group-hover:bg-navy-800">
              Live dispatch
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </a>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-navy-700 transition active:scale-[0.98]"
            >
              Book non-emergency online
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-cyan-300 hover:text-white transition"
            >
              See every trade
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Trust strip — inline with thin cyan separators */}
          <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
            {TRUST_STRIP.map((t, i) => (
              <li key={t} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="h-3 w-px bg-cyan-400/50" />
                )}
                <span>{t}</span>
              </li>
            ))}
          </ul>

          {/* Bullet reassurances */}
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5 max-w-xl">
            {[
              { Icon: ShieldCheck, label: "Licensed trades" },
              { Icon: Clock, label: "Live dispatcher 24/7" },
              { Icon: CheckCircle2, label: "ESA + TSSA compliant" },
              { Icon: Sparkles, label: "$0 dispatch credit on repair" },
            ].map(({ Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-sm text-white/90"
              >
                <Icon className="h-4 w-4 flex-none text-cyan-300" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: estimate widget — editorial slab card, sharper corners, no glow */}
        <aside className="lg:col-span-5 lg:pl-2 relative">
          <div className="relative rounded-md border border-white/10 bg-cream-100 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-700 text-white">
                <Wrench className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-800">
                  Get a free estimate
                </p>
                <h2 className="font-display text-2xl font-extrabold text-navy-700 leading-tight tracking-tight">
                  Same-day quote, no run-around.
                </h2>
              </div>
            </div>

            <form
              className="mt-6 space-y-3.5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label
                  htmlFor="hero-trade"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-steel-700"
                >
                  Trade
                </label>
                <select
                  id="hero-trade"
                  required
                  className="mt-1.5 w-full rounded-md border border-steel-200 bg-white px-4 py-3.5 text-sm text-navy-700 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                >
                  <option value="">Choose your trade</option>
                  {TRADES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="hero-postal"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-steel-700"
                >
                  Service address or postal code
                </label>
                <input
                  id="hero-postal"
                  type="text"
                  required
                  placeholder="Your address or city"
                  className="mt-1.5 w-full rounded-md border border-steel-200 bg-white px-4 py-3.5 text-sm text-navy-700 placeholder:text-steel-500 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>
              <div>
                <label
                  htmlFor="hero-phone"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-steel-700"
                >
                  Best phone for the dispatcher
                </label>
                <input
                  id="hero-phone"
                  type="tel"
                  required
                  placeholder="(416) 555-0142"
                  className="mt-1.5 w-full rounded-md border border-steel-200 bg-white px-4 py-3.5 text-sm text-navy-700 placeholder:text-steel-500 tabular-nums transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-cyan-700 px-6 py-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-cyan-800 active:scale-[0.99]"
              >
                Book a service today
                <ArrowRight className="h-4 w-4" />
              </button>

              {submitted && (
                <p
                  className="text-xs font-semibold text-cyan-800"
                  role="status"
                  aria-live="polite"
                >
                  Thanks. A Bridgepoint dispatcher will call you shortly. For
                  immediate emergencies, dial {NAP.phone}.
                </p>
              )}

              <p className="text-[11px] text-steel-600 leading-relaxed">
                Or call{" "}
                <a
                  href={NAP.phoneTel}
                  className="font-bold text-navy-700 underline-offset-2 hover:underline"
                >
                  {NAP.phone}
                </a>{" "}
                for live 24/7 dispatch.
              </p>
            </form>

            <div className="mt-6 flex items-center gap-3 border-t border-steel-100 pt-5">
              <ul className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-cyan-500 text-cyan-500"
                  />
                ))}
              </ul>
              <p className="text-xs font-semibold text-navy-700">
                Trusted by homeowners and property managers across Canada and the US
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
