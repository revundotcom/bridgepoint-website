import Link from "next/link";
import { Phone, ArrowRight, MapPin, ArrowUpRight } from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import FindLocalTechnician from "@/components/FindLocalTechnician";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { CANADA_PROVINCES, US_STATES } from "@/lib/locations-data";

export const metadata = {
 title: "Service Areas | Bridgepoint Maintenance",
 description:
 "Bridgepoint Maintenance service areas across Canada and the US. Browse by province or state for plumbing, electrical, HVAC, drain and sewer, and general building services.",
};

export default function LocationsIndexPage() {
 return (
 <>
 <SchemaJsonLd
 id="ld-breadcrumb-locations"
 data={breadcrumbSchema([
 { name: "Home", url: BRAND.url },
 { name: "Service Areas", url: `${BRAND.url}/locations` },
 ])}
 />

 <PageHero
 eyebrow="Service Areas"
 title="Trades coverage across Canada and the US."
 description="Bridgepoint dispatches plumbing, electrical, HVAC, and building services across Canada and the US across Canadian provinces and US states with 24/7 emergency response."
 crumbs={[{ name: "Home", href: "/" }, { name: "Service Areas" }]}
 image={IMAGES.edLocationsHero}
 imageAlt={IMAGES.edLocationsHeroAlt}
 variant="editorial"
 >
 <div className="flex flex-col gap-3 sm:flex-row">
 <a href={NAP.phoneTel} className="btn-accent">
 <Phone className="h-4 w-4" />
 {NAP.phone}
 </a>
 <Link href="/contact" className="btn-ghost-light">
 Check coverage
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </PageHero>

 <section className="bg-cream-100 section">
 <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
 <div className="lg:col-span-5">
 <SectionHeading
 eyebrow="Coverage check"
 title="Check service in your area."
 description="Drop in your city or postal/zip code and we will confirm coverage and the closest dispatch zone."
 />
 </div>
 <div className="lg:col-span-7">
 <FindLocalTechnician />
 </div>
 </div>
 </section>

 {/* Real Google Maps embed of North American coverage. */}
 <section className="bg-white section-tight">
 <div className="container-bp">
 <SectionHeading
 eyebrow="Coverage map"
 title="Where Bridgepoint trucks dispatch."
 description="Active dispatch across Canadian provinces and US states. Drill into a region for the local city list."
 align="center"
 className="mb-8"
 />
 <div className="overflow-hidden rounded-3xl border border-steel-100 shadow-soft">
 <iframe
 src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d34762815.27!2d-100.0!3d44.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1700000000000"
 width="100%"
 height="420"
 style={{ border: 0 }}
 allowFullScreen={false}
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title="Bridgepoint Maintenance North American coverage map"
 />
 </div>
 </div>
 </section>

 {/* Country split: Canada provinces + US states */}
 <section className="bg-white section">
 <div className="container-bp space-y-14">
 <SectionHeading
 eyebrow="Browse coverage"
 title="Pick a province or state."
 description="Bridgepoint dispatches local trades trucks across Canadian provinces and US states. Drill into any region for the full city list."
 />

 <div>
 <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-steel-100 pb-3">
 <h3 className="font-display text-2xl font-bold text-navy">
 Canada
 </h3>
 <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
 {CANADA_PROVINCES.length} provinces
 </span>
 </div>
 <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
 {CANADA_PROVINCES.map((p) => (
 <li key={p.slug}>
 <Link
 href={`/locations/${p.slug}`}
 className="group flex h-full flex-col gap-1.5 rounded-xl border border-steel-100 bg-white p-4 transition hover:border-cyan-500 hover:bg-accent/5"
 >
 <span className="flex items-center justify-between gap-2 text-sm font-bold text-navy">
 <span className="flex items-center gap-2 truncate">
 <MapPin className="h-3.5 w-3.5 flex-none text-cyan-700" />
 <span className="truncate">{p.name}</span>
 </span>
 <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
 </span>
 <span className="text-xs text-steel-500">
 {p.cities.length} cities
 </span>
 </Link>
 </li>
 ))}
 </ul>
 </div>

 <div>
 <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-steel-100 pb-3">
 <h3 className="font-display text-2xl font-bold text-navy">
 United States
 </h3>
 <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
 {US_STATES.length} states
 </span>
 </div>
 <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
 {US_STATES.map((p) => (
 <li key={p.slug}>
 <Link
 href={`/locations/${p.slug}`}
 className="group flex h-full flex-col gap-1.5 rounded-xl border border-steel-100 bg-white p-4 transition hover:border-cyan-500 hover:bg-accent/5"
 >
 <span className="flex items-center justify-between gap-2 text-sm font-bold text-navy">
 <span className="flex items-center gap-2 truncate">
 <MapPin className="h-3.5 w-3.5 flex-none text-cyan-700" />
 <span className="truncate">{p.name}</span>
 </span>
 <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
 </span>
 <span className="text-xs text-steel-500">
 {p.cities.length} cities
 </span>
 </Link>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </section>

 <section className="relative overflow-hidden bg-navy-900 text-white section">
 <div
 aria-hidden
 className="pointer-events-none absolute inset-0 opacity-[0.08] pattern-cross-navy"
 />
 <div
 aria-hidden
 className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-500/12 blur-3xl"
 />
 <div className="container-bp relative">
 <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 md:p-12 backdrop-blur-sm flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
 <div className="max-w-xl">
 <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300 mb-3">
 Don't see your city?
 </p>
 <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white text-balance mb-3">
 We dispatch across Canada and the US.
 </h2>
 <p className="text-base text-white/80 leading-relaxed">
 Bridgepoint coverage extends well beyond the cities listed across both countries. Call to confirm coverage and an ETA. We will route the right trade for your address.
 </p>
 </div>
 <div className="flex flex-col gap-3 sm:flex-row">
 <a href={NAP.phoneTel} className="btn-accent">
 <Phone className="h-4 w-4" />
 {NAP.phone}
 </a>
 <Link
 href="/contact"
 className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white hover:bg-white hover:text-navy-700 transition"
 >
 Check coverage
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </div>
 </div>
 </section>

 <CTASection />
 </>
 );
}
