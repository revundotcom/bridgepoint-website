"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import {
  SERVICE_OPTIONS,
  CITY_OPTIONS,
  estimate,
  serviceLabel,
  type ServiceKey,
  type CityKey,
} from "@/lib/pricing-ranges";

export default function CostEstimator() {
  const [service, setService] = useState<ServiceKey | "">("");
  const [city, setCity] = useState<CityKey | "">("");

  const range = useMemo(() => {
    if (!service || !city) return null;
    return estimate(service, city);
  }, [service, city]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="rounded-3xl border border-steel-100 bg-white p-7 shadow-soft">
      <div className="flex items-center gap-3 mb-5">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700">
          <Calculator className="h-5 w-5" />
        </span>
        <div>
          <p className="eyebrow text-cyan-800 mb-0.5">
            Cost estimator
          </p>
          <h3 className="font-display text-xl font-bold text-navy leading-tight">
            See typical pricing in your city.
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="ce-service"
            className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-steel-700"
          >
            Service
          </label>
          <select
            id="ce-service"
            value={service}
            onChange={(e) => setService(e.target.value as ServiceKey)}
            className="mt-1.5 w-full rounded-xl border border-steel-200 bg-white px-4 py-3 text-sm text-navy focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          >
            <option value="">Choose a service</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="ce-city"
            className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-steel-700"
          >
            City
          </label>
          <select
            id="ce-city"
            value={city}
            onChange={(e) => setCity(e.target.value as CityKey)}
            className="mt-1.5 w-full rounded-xl border border-steel-200 bg-white px-4 py-3 text-sm text-navy focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          >
            <option value="">Choose a city</option>
            {CITY_OPTIONS.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-50 p-5">
        {range && service ? (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-800 mb-2">
              Typical range for {serviceLabel(service as ServiceKey)}
            </p>
            <p className="font-display text-4xl font-bold text-navy tabular-nums">
              {fmt(range.low)} – {fmt(range.high)}
            </p>
            <p className="mt-2 text-xs text-steel-600 leading-snug">
              Estimate based on common residential scopes. Final pricing is
              quoted on-site after diagnosis. Dispatch fee credited toward the work.
            </p>
          </>
        ) : (
          <p className="text-sm text-steel-600">
            Pick a service and city to see Bridgepoint&apos;s typical price range.
          </p>
        )}
      </div>

      <Link
        href="/contact"
        className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-cyan-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-cyan-800 transition"
      >
        Get a written flat-rate quote
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
