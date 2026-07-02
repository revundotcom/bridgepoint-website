import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { CITIES } from "@/lib/cities";
import RealCoverageMap from "@/components/RealCoverageMap";

export default function ServiceAreaMap() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
      <div className="lg:col-span-7 relative">
        <RealCoverageMap />
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur px-4 py-2 text-xs font-semibold text-navy shadow-soft">
          <span className="inline-block h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
          North American dispatch
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col">
        <div className="rounded-3xl border border-steel-100 bg-white p-7 shadow-soft flex-1">
          <p className="eyebrow mb-4">
            <MapPin className="h-3.5 w-3.5" />
            Dispatch coverage
          </p>
          <h3 className="font-display text-2xl font-bold text-navy mb-4 text-balance">
            One dispatch desk. Markets across Canada and the US.
          </h3>
          <p className="text-sm text-steel-500 leading-relaxed mb-6">
            Bridgepoint runs a single dispatch desk across Canada and the US.
            Each city below has dedicated coverage, neighborhood level dispatch,
            and trade routed on call rotation.
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {CITIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/locations/${c.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-steel-100 px-3 py-2.5 text-xs font-semibold text-navy hover:border-cyan-500 hover:bg-accent/5 transition"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <MapPin className="h-3 w-3 text-cyan-700 flex-none" />
                    {c.name}
                  </span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
