import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
 Phone,
 ArrowRight,
 MapPin,
 Clock,
 ShieldCheck,
 CheckCircle2,
 ArrowUpRight,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { CITIES, getCity } from "@/lib/cities";
import { SERVICES } from "@/lib/services";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES, cityHero, serviceImage } from "@/lib/images";
import {
 PROVINCES,
 citySlug,
 getProvinceBySlug,
 getProvinceCityBySlug,
 sisterProvinces,
} from "@/lib/locations-data";

type Params = { params: { slug: string[] } };

// generateStaticParams emits ALL three patterns the catch-all handles:
// /locations/[city] legacy GTA-only city pages
// /locations/[province] new province / state hub pages
// /locations/[province]/[city] new province-nested city pages
export function generateStaticParams() {
 const out: { slug: string[] }[] = [];

 // Legacy single-segment city pages.
 for (const c of CITIES) out.push({ slug: [c.slug] });

 // New province pages.
 for (const p of PROVINCES) out.push({ slug: [p.slug] });

 // New province-nested city pages.
 for (const p of PROVINCES) {
 for (const c of p.cities) {
 out.push({ slug: [p.slug, citySlug(c)] });
 }
 }
 return out;
}

export function generateMetadata({ params }: Params) {
 const segs = params.slug ?? [];
 if (segs.length === 1) {
 const onlySeg = segs[0];
 const legacy = getCity(onlySeg);
 if (legacy) {
 return {
 title: `Maintenance Services in ${legacy.name}, Ontario`,
 description: `Bridgepoint Maintenance delivers licensed plumbing, electrical, HVAC, and building services across ${legacy.name}, Ontario. 24/7 emergency response.`,
 };
 }
 const province = getProvinceBySlug(onlySeg);
 if (province) {
 return {
 title: `Maintenance Services in ${province.name}`,
 description: `Bridgepoint Maintenance provides plumbing, electrical, HVAC, and building services across ${province.name}. 24/7 emergency dispatch.`,
 };
 }
 } else if (segs.length === 2) {
 const match = getProvinceCityBySlug(segs[0], segs[1]);
 if (match) {
 return {
 title: `Maintenance Services in ${match.cityName}, ${match.province.abbr}`,
 description: `Bridgepoint Maintenance dispatches plumbing, electrical, HVAC, and building services across ${match.cityName}, ${match.province.name}. 24/7 emergency response.`,
 };
 }
 }
 return {};
}

export default function LocationsCatchAllPage({ params }: Params) {
 const segs = params.slug ?? [];

 if (segs.length === 1) {
 const legacy = getCity(segs[0]);
 if (legacy) return <LegacyCityView slug={legacy.slug} />;

 const province = getProvinceBySlug(segs[0]);
 if (province) return <ProvinceView slug={province.slug} />;

 notFound();
 }

 if (segs.length === 2) {
 const match = getProvinceCityBySlug(segs[0], segs[1]);
 if (match) return <ProvinceCityView province={segs[0]} city={segs[1]} />;
 notFound();
 }

 notFound();
}

// =====================================================================
// LEGACY CITY VIEW. preserved verbatim from original [city]/page.tsx
// =====================================================================
function LegacyCityView({ slug }: { slug: string }) {
 const city = getCity(slug);
 if (!city) notFound();

 const url = `${BRAND.url}/locations/${city.slug}`;
 const localBusinessForCity = {
 "@context": "https://schema.org",
 "@type": "LocalBusiness",
 name: `${BRAND.name}. ${city.name}`,
 url,
 telephone: NAP.phoneE164,
 address: {
 "@type": "PostalAddress",
 streetAddress: NAP.address.streetNumber,
 addressLocality: NAP.address.city,
 addressRegion: NAP.address.region,
 postalCode: NAP.address.postalCode,
 addressCountry: NAP.address.countryCode,
 },
 areaServed: {
 "@type": "City",
 name: city.name,
 containedInPlace: { "@type": "AdministrativeArea", name: "Ontario" },
 },
 parentOrganization: { "@id": `${BRAND.url}/#organization` },
 };

 return (
 <>
 <SchemaJsonLd
 id={`ld-localbusiness-${city.slug}`}
 data={localBusinessForCity}
 />
 <SchemaJsonLd
 id={`ld-breadcrumb-${city.slug}`}
 data={breadcrumbSchema([
 { name: "Home", url: BRAND.url },
 { name: "Service Areas", url: `${BRAND.url}/locations` },
 { name: city.name, url },
 ])}
 />

 <PageHero
 eyebrow={`${city.region} . Ontario`}
 title={`Maintenance services in ${city.name}.`}
 description={city.blurb}
 crumbs={[
 { name: "Home", href: "/" },
 { name: "Service Areas", href: "/locations" },
 { name: city.name },
 ]}
 image={cityHero(city.slug)}
 imageAlt={`${city.name}, Ontario`}
 size="compact"
 >
 <div className="flex flex-col gap-3 sm:flex-row">
 <a href={NAP.phoneTel} className="btn-accent">
 <Phone className="h-4 w-4" />
 24/7 Dispatch . {NAP.phone}
 </a>
 <Link href="/contact" className="btn-ghost-light">
 Request service
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </PageHero>

 <section className="bg-navy-800 text-white">
 <div className="container-bp grid grid-cols-2 divide-x divide-white/10 py-8 md:grid-cols-4">
 {[
 { Icon: MapPin, k: city.region, v: "Service region" },
 { Icon: Clock, k: "24 / 7", v: "Emergency dispatch" },
 { Icon: ShieldCheck, k: "Licensed", v: "State and provincial trades" },
 { Icon: CheckCircle2, k: "Single", v: "Accountability line" },
 ].map(({ Icon, k, v }) => (
 <div key={k} className="flex items-center gap-3 px-4 md:px-8">
 <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/5 text-cyan-300">
 <Icon className="h-4 w-4" />
 </span>
 <div>
 <div className="font-display text-base font-bold text-white leading-none mb-0.5">
 {k}
 </div>
 <div className="text-xs text-white/80">{v}</div>
 </div>
 </div>
 ))}
 </div>
 </section>

 <section className="bg-white section">
 <div className="container-bp">
 <SectionHeading
 eyebrow={`Bridgepoint in ${city.name}`}
 title={`The full trades catalog, dispatched in ${city.name}.`}
 description={city.responseNote}
 className="mb-12"
 />
 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
 {SERVICES.map((s) => {
 const ri = serviceImage(s.slug);
 return (
 <Link
 key={s.slug}
 href={`/services/${s.slug}`}
 className="group relative overflow-hidden rounded-md border border-steel-100 bg-white shadow-soft transition-colors hover:border-cyan-500"
 >
 <div className="relative aspect-[16/10] overflow-hidden">
 <Image
 src={ri.src}
 alt={ri.alt}
 fill
 sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
 className="object-cover transition duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-navy-900/75 via-navy-900/15 to-transparent" />
 {s.emergency && (
 <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-cyan-700 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
 24/7
 </span>
 )}
 </div>
 <div className="p-6">
 <h3 className="font-display text-lg font-semibold text-navy mb-1.5">
 {s.shortName} in {city.name}
 </h3>
 <p className="text-sm text-steel-500 line-clamp-2 mb-4">
 {s.tagline}
 </p>
 <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-cyan-700">
 Explore
 <ArrowUpRight className="h-4 w-4" />
 </span>
 </div>
 </Link>
 );
 })}
 </div>
 </div>
 </section>

 <section className="bg-steel-50 section">
 <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12">
 <div className="lg:col-span-7">
 <SectionHeading
 eyebrow="Coverage detail"
 title={`Neighborhoods we cover in ${city.name}.`}
 description={`Bridgepoint dispatches across ${city.name} from our North American service desk. ${city.responseNote}`}
 />
 <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
 {city.neighborhoods.map((n) => (
 <li
 key={n}
 className="flex items-center gap-3 rounded-xl border border-steel-100 bg-white p-4"
 >
 <MapPin className="h-4 w-4 text-cyan-700" />
 <span className="text-sm font-medium text-navy">{n}</span>
 </li>
 ))}
 </ul>
 <div className="prose-bp mt-12">
 <h2>Local licensing</h2>
 <p>
 Trades dispatched in {city.name} hold the appropriate Ontario
 licensing for the work performed. ESA for electrical, TSSA for
 gas/HVAC, and provincial plumbing certifications. License
 numbers appear on each work order and are available on request.
 </p>
 </div>
 </div>

 <aside className="lg:col-span-5 space-y-5">
 <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-7">
 <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-2">
 {city.name} dispatch
 </p>
 <p className="font-display text-2xl font-bold text-navy mb-1">
 {NAP.phone}
 </p>
 <p className="text-sm text-steel-500 mb-5 leading-relaxed">
 Dispatched from our North American service desk. {city.responseNote}
 </p>
 <div className="flex flex-col gap-3">
 <a href={NAP.phoneTel} className="btn-accent w-full">
 <Phone className="h-4 w-4" />
 Call dispatch
 </a>
 <Link href="/contact" className="btn-secondary w-full">
 Request service online
 </Link>
 </div>
 </div>

 <div className="card">
 <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-4">
 Nearby cities we serve
 </h3>
 <ul className="space-y-2 text-sm">
 {city.nearbyCities
 .map((slug) => CITIES.find((c) => c.slug === slug))
 .filter(Boolean)
 .map((c) => (
 <li key={c!.slug}>
 <Link
 href={`/locations/${c!.slug}`}
 className="flex items-center justify-between text-navy hover:text-cyan-700"
 >
 <span className="flex items-center gap-2">
 <MapPin className="h-3.5 w-3.5 text-cyan-700" />
 {c!.name}
 </span>
 <ArrowUpRight className="h-3.5 w-3.5" />
 </Link>
 </li>
 ))}
 <li>
 <Link
 href="/locations"
 className="inline-flex items-center gap-1 font-semibold text-cyan-700 hover:text-cyan-700"
 >
 View all areas
 <ArrowRight className="h-3.5 w-3.5" />
 </Link>
 </li>
 </ul>
 </div>
 </aside>
 </div>
 </section>

 <CTASection
 title={`Active emergency in ${city.name}?`}
 body="Call Bridgepoint's 24/7 dispatch for immediate trade-routed response."
 variant="emergency"
 />
 </>
 );
}

// =====================================================================
// PROVINCE VIEW. /locations/[province]
// =====================================================================
function ProvinceView({ slug }: { slug: string }) {
 const province = getProvinceBySlug(slug);
 if (!province) notFound();

 const url = `${BRAND.url}/locations/${province.slug}`;
 const localBusinessForProvince = {
 "@context": "https://schema.org",
 "@type": "LocalBusiness",
 name: `${BRAND.name}. ${province.name}`,
 url,
 telephone: NAP.phoneE164,
 address: {
 "@type": "PostalAddress",
 streetAddress: NAP.address.streetNumber,
 addressLocality: NAP.address.city,
 addressRegion: NAP.address.region,
 postalCode: NAP.address.postalCode,
 addressCountry: NAP.address.countryCode,
 },
 areaServed: {
 "@type": "AdministrativeArea",
 name: `${province.name}, ${province.countryName}`,
 },
 parentOrganization: { "@id": `${BRAND.url}/#organization` },
 };

 const sisters = sisterProvinces(province.slug);

 return (
 <>
 <SchemaJsonLd
 id={`ld-localbusiness-prov-${province.slug}`}
 data={localBusinessForProvince}
 />
 <SchemaJsonLd
 id={`ld-breadcrumb-prov-${province.slug}`}
 data={breadcrumbSchema([
 { name: "Home", url: BRAND.url },
 { name: "Service Areas", url: `${BRAND.url}/locations` },
 { name: province.name, url },
 ])}
 />

 <PageHero
 eyebrow={`${province.countryName} . ${province.abbr}`}
 title={`Bridgepoint Maintenance services across ${province.name}.`}
 description={province.blurb}
 crumbs={[
 { name: "Home", href: "/" },
 { name: "Service Areas", href: "/locations" },
 { name: province.name },
 ]}
 image={IMAGES.edLocationsHero}
 imageAlt={IMAGES.edLocationsHeroAlt}
 size="compact"
 variant="editorial"
 >
 <div className="flex flex-col gap-3 sm:flex-row">
 <a href={NAP.phoneTel} className="btn-accent">
 <Phone className="h-4 w-4" />
 24/7 Dispatch . {NAP.phone}
 </a>
 <Link href="/contact" className="btn-ghost-light">
 Request service
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </PageHero>

 <section className="bg-white section">
 <div className="container-bp">
 <SectionHeading
 eyebrow={`${province.name} cities`}
 title={`Bridgepoint dispatch in ${province.name}.`}
 description={`Trade response routed to a local Bridgepoint truck across ${province.cities.length} ${province.name} cities.`}
 className="mb-10"
 />
 <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
 {province.cities.map((city) => {
 const cs = citySlug(city);
 return (
 <li key={cs}>
 <Link
 href={`/locations/${province.slug}/${cs}`}
 className="group flex items-center justify-between gap-2 rounded-xl border border-steel-100 bg-white px-3.5 py-3 text-sm font-semibold text-navy hover:border-cyan-500 hover:bg-accent/5 transition"
 >
 <span className="flex items-center gap-2 truncate">
 <MapPin className="h-3.5 w-3.5 text-cyan-700 flex-none" />
 <span className="truncate">{city}</span>
 </span>
 <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
 </Link>
 </li>
 );
 })}
 </ul>

 {/* Real Google Maps embed centered on the province/state */}
 <div className="mt-12 overflow-hidden rounded-3xl border border-steel-100 shadow-soft">
 <iframe
 src={`https://www.google.com/maps?q=${encodeURIComponent(
 `${province.name}, ${province.countryName}`
 )}&output=embed`}
 width="100%"
 height="420"
 style={{ border: 0 }}
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title={`Map of Bridgepoint Maintenance service area in ${province.name}, ${province.countryName}`}
 />
 </div>
 </div>
 </section>

 <section className="bg-cream-100 section">
 <div className="container-bp">
 <SectionHeading
 eyebrow="Services"
 title={`Services we offer in ${province.name}.`}
 description="Plumbing, electrical, HVAC, emergency repairs, general maintenance, and building services on one accountability line."
 className="mb-10"
 />
 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {SERVICES.map((s) => (
 <Link
 key={s.slug}
 href={`/services/${s.slug}`}
 className="group rounded-md border border-steel-100 bg-white p-6 transition-colors hover:border-cyan-500"
 >
 <h3 className="font-display text-lg font-semibold text-navy mb-1.5">
 {s.shortName}
 </h3>
 <p className="text-sm text-steel-500 line-clamp-2 mb-4">
 {s.tagline}
 </p>
 <span className="inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-cyan-700">
 Learn more
 <ArrowRight className="h-4 w-4" />
 </span>
 </Link>
 ))}
 </div>
 </div>
 </section>

 <section className="bg-white section">
 <div className="container-bp">
 <SectionHeading
 eyebrow="Other coverage areas"
 title="Other Bridgepoint coverage areas."
 className="mb-10"
 />
 <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
 {sisters.map((p) => (
 <li key={p.slug}>
 <Link
 href={`/locations/${p.slug}`}
 className="group flex items-center justify-between gap-2 rounded-xl border border-steel-100 bg-white px-4 py-3 text-sm font-semibold text-navy hover:border-cyan-500 hover:bg-accent/5 transition"
 >
 <span className="truncate">{p.name}</span>
 <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
 </Link>
 </li>
 ))}
 </ul>
 </div>
 </section>

 <CTASection />
 </>
 );
}

// =====================================================================
// PROVINCE-NESTED CITY VIEW. /locations/[province]/[city]
// =====================================================================
function ProvinceCityView({
 province,
 city,
}: {
 province: string;
 city: string;
}) {
 const match = getProvinceCityBySlug(province, city);
 if (!match) notFound();
 const { cityName, province: prov } = match;

 const url = `${BRAND.url}/locations/${prov.slug}/${citySlug(cityName)}`;

 const localBusinessForCity = {
 "@context": "https://schema.org",
 "@type": "LocalBusiness",
 name: `${BRAND.name}. ${cityName}`,
 url,
 telephone: NAP.phoneE164,
 address: {
 "@type": "PostalAddress",
 streetAddress: NAP.address.streetNumber,
 addressLocality: NAP.address.city,
 addressRegion: NAP.address.region,
 postalCode: NAP.address.postalCode,
 addressCountry: NAP.address.countryCode,
 },
 areaServed: {
 "@type": "City",
 name: cityName,
 containedInPlace: {
 "@type": "AdministrativeArea",
 name: prov.name,
 },
 },
 parentOrganization: { "@id": `${BRAND.url}/#organization` },
 };

 const sisters = prov.cities.filter((c) => c !== cityName).slice(0, 11);

 return (
 <>
 <SchemaJsonLd
 id={`ld-localbusiness-${prov.slug}-${citySlug(cityName)}`}
 data={localBusinessForCity}
 />
 <SchemaJsonLd
 id={`ld-breadcrumb-${prov.slug}-${citySlug(cityName)}`}
 data={breadcrumbSchema([
 { name: "Home", url: BRAND.url },
 { name: "Service Areas", url: `${BRAND.url}/locations` },
 { name: prov.name, url: `${BRAND.url}/locations/${prov.slug}` },
 { name: cityName, url },
 ])}
 />

 <PageHero
 eyebrow={`${prov.name} . ${prov.abbr}`}
 title={`Maintenance services in ${cityName}.`}
 description={`Bridgepoint Maintenance coordinates licensed plumbing, electrical, HVAC, emergency, and general maintenance trades across ${cityName}, ${prov.name}. One number, every trade, single accountability line.`}
 crumbs={[
 { name: "Home", href: "/" },
 { name: "Service Areas", href: "/locations" },
 { name: prov.name, href: `/locations/${prov.slug}` },
 { name: cityName },
 ]}
 image={IMAGES.edLocationsHero}
 imageAlt={IMAGES.edLocationsHeroAlt}
 size="compact"
 variant="editorial"
 >
 <div className="flex flex-col gap-3 sm:flex-row">
 <a href={NAP.phoneTel} className="btn-accent">
 <Phone className="h-4 w-4" />
 24/7 Dispatch . {NAP.phone}
 </a>
 <Link href="/contact" className="btn-ghost-light">
 Request service
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </PageHero>

 <section className="bg-navy-800 text-white">
 <div className="container-bp grid grid-cols-2 divide-x divide-white/10 py-8 md:grid-cols-4">
 {[
 { Icon: MapPin, k: prov.abbr, v: "Service region" },
 { Icon: Clock, k: "24 / 7", v: "Emergency dispatch" },
 { Icon: ShieldCheck, k: "Licensed", v: "Local trades" },
 { Icon: CheckCircle2, k: "Single", v: "Accountability line" },
 ].map(({ Icon, k, v }) => (
 <div key={k} className="flex items-center gap-3 px-4 md:px-8">
 <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/5 text-cyan-300">
 <Icon className="h-4 w-4" />
 </span>
 <div>
 <div className="font-display text-base font-bold text-white leading-none mb-0.5">
 {k}
 </div>
 <div className="text-xs text-white/80">{v}</div>
 </div>
 </div>
 ))}
 </div>
 </section>

 <section className="bg-white section">
 <div className="container-bp">
 <SectionHeading
 eyebrow={`Bridgepoint in ${cityName}`}
 title={`Services available in ${cityName}.`}
 description={`The full Bridgepoint trades catalog, dispatched in ${cityName}.`}
 className="mb-10"
 />
 <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
 {SERVICES.map((s) => (
 <li key={s.slug}>
 <Link
 href={`/services/${s.slug}`}
 className="group flex h-full flex-col rounded-md border border-steel-100 bg-white p-6 transition-colors hover:border-cyan-500"
 >
 <h3 className="font-display text-lg font-semibold text-navy mb-1.5">
 {s.shortName} in {cityName}
 </h3>
 <p className="text-sm text-steel-500 line-clamp-2 mb-4">
 {s.tagline}
 </p>
 <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:text-cyan-700">
 Learn more
 <ArrowRight className="h-4 w-4" />
 </span>
 </Link>
 </li>
 ))}
 </ul>

 {/* Real Google Maps embed centered on the city */}
 <div className="mt-12 overflow-hidden rounded-3xl border border-steel-100 shadow-soft">
 <iframe
 src={`https://www.google.com/maps?q=${encodeURIComponent(
 `${cityName}, ${prov.name}`
 )}&output=embed`}
 width="100%"
 height="420"
 style={{ border: 0 }}
 loading="lazy"
 referrerPolicy="no-referrer-when-downgrade"
 title={`Map of Bridgepoint Maintenance service area in ${cityName}, ${prov.name}`}
 />
 </div>
 </div>
 </section>

 {sisters.length > 0 && (
 <section className="bg-cream-100 section">
 <div className="container-bp">
 <SectionHeading
 eyebrow={`Across ${prov.name}`}
 title={`Other ${prov.name} cities we serve.`}
 className="mb-10"
 />
 <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
 {sisters.map((c) => (
 <li key={c}>
 <Link
 href={`/locations/${prov.slug}/${citySlug(c)}`}
 className="group flex items-center justify-between gap-2 rounded-xl border border-steel-100 bg-white px-3.5 py-3 text-sm font-semibold text-navy hover:border-cyan-500 hover:bg-accent/5 transition"
 >
 <span className="flex items-center gap-2 truncate">
 <MapPin className="h-3.5 w-3.5 text-cyan-700 flex-none" />
 <span className="truncate">{c}</span>
 </span>
 <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
 </Link>
 </li>
 ))}
 <li>
 <Link
 href={`/locations/${prov.slug}`}
 className="inline-flex items-center gap-1.5 px-3.5 py-3 text-sm font-bold text-cyan-700 hover:underline"
 >
 All {prov.name} cities
 <ArrowRight className="h-3.5 w-3.5" />
 </Link>
 </li>
 </ul>
 </div>
 </section>
 )}

 <CTASection
 title={`Active emergency in ${cityName}?`}
 body="Call Bridgepoint's 24/7 dispatch for immediate trade-routed response."
 variant="emergency"
 />
 </>
 );
}
