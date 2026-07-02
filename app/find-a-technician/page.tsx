import Image from "next/image";
import Link from "next/link";
import {
 Phone,
 ArrowRight,
 ArrowUpRight,
 CheckCircle2,
 ShieldCheck,
 Clock,
 MapPin,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import FindLocalTechnician from "@/components/FindLocalTechnician";
import FaqAccordion from "@/components/FaqAccordion";
import { NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const TRADE_TILES = [
 {
 slug: "plumbing",
 label: "Plumbing",
 body: "Licensed plumbers. Leaks, water heaters, fixtures, repipes, drain work, sewer scope.",
 img: { src: IMAGES.brandTechPlumbing, alt: IMAGES.brandTechPlumbingAlt },
 },
 {
 slug: "electrical",
 label: "Electrical",
 body: "Licensed electricians. Panel work, EV chargers, lighting, commercial relamping.",
 img: { src: IMAGES.serviceElectrical, alt: IMAGES.serviceElectricalAlt },
 },
 {
 slug: "hvac",
 label: "HVAC",
 body: "Licensed HVAC trades. Furnace, AC, heat pump, rooftop service, indoor air quality.",
 img: { src: IMAGES.serviceHvac, alt: IMAGES.serviceHvacAlt },
 },
 {
 slug: "general-repairs",
 label: "General repairs",
 body: "Multi-trade handymen for the punch list that drags a turnover across the deadline.",
 img: { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt },
 },
];

const COVERAGE_METROS = [
 { name: "Toronto", href: "/locations/ontario/toronto", country: "CA" },
 { name: "Vaughan", href: "/locations/ontario/vaughan", country: "CA" },
 { name: "Mississauga", href: "/locations/ontario/mississauga", country: "CA" },
 { name: "Hamilton", href: "/locations/ontario/hamilton", country: "CA" },
 { name: "New York City", href: "/locations/new-york/new-york-city", country: "US" },
 { name: "Miami", href: "/locations/florida/miami", country: "US" },
 { name: "Phoenix", href: "/locations/arizona/phoenix", country: "US" },
 { name: "Houston", href: "/locations/texas/houston", country: "US" },
 { name: "Los Angeles", href: "/locations/california/los-angeles", country: "US" },
 { name: "Atlanta", href: "/locations/georgia/atlanta", country: "US" },
 { name: "Chicago", href: "/locations/illinois/chicago", country: "US" },
 { name: "Charlotte", href: "/locations/north-carolina/charlotte", country: "US" },
];

const FINDTECH_FAQ = [
 {
 q: "How do you decide which technician comes to my address?",
 a: "Dispatch routes by trade line, license requirement, and proximity. A leaky water heater in a Mississauga residential basement routes to the nearest licensed plumber on a stocked truck. A rooftop condenser in Atlanta routes to a licensed HVAC tech in your zone. Same desk, different routing rules.",
 },
 {
 q: "What if no Bridgepoint technician is in my zone?",
 a: "In a handful of metros we route to a vetted trade partner network instead of a Bridgepoint truck. The dispatch flow, the license check, and the photo documented work order are the same. If you want to know who's running the call, ask the dispatcher.",
 },
 {
 q: "How quickly will a technician be on site?",
 a: "Same day in covered metros for standard service requests. Inside sixty minutes target for emergency dispatch in core metros. Dispatch writes the ETA on the work order before the truck rolls so there's no callback guessing.",
 },
 {
 q: "Can I request the same technician on a recurring contract?",
 a: "Yes. On portfolio maintenance contracts we assign a primary tech and a backup so you get continuity on the recurring work. Tell dispatch and we will route accordingly.",
 },
 {
 q: "Do I need to be on site for the work?",
 a: "Not for most scheduled work. We coordinate access through the property manager or lockbox and email the closeout photo log to whoever scoped the call. Emergency work and quote-on-site jobs do need a contact on site.",
 },
];

export const metadata = {
 title:
 "Find a Local Bridgepoint Technician | Property Maintenance Dispatch",
 description:
 "Drop in your city or postal/zip code. Bridgepoint routes plumbing, electrical, HVAC, and general maintenance to a local technician across Canada and the US.",
};

const TRUST = [
 {
 Icon: MapPin,
 title: "Local technician, local truck.",
 body: "Tickets route to the closest licensed Bridgepoint trade truck in your zone, not a call center subcontractor an hour out.",
 },
 {
 Icon: Clock,
 title: "Live ETA on the first call.",
 body: "Dispatch runs around the clock. You get an on-site window in the first call, not a callback queue.",
 },
 {
 Icon: ShieldCheck,
 title: "Licensed and documented.",
 body: "Plumbing, electrical, and HVAC trades carry the right state or provincial licenses. Work orders are documented every visit.",
 },
];

const HOW_IT_WORKS = [
 {
 n: "01",
 title: "Drop in your city or postal code.",
 body: "We confirm coverage and route the ticket to the nearest Bridgepoint dispatch zone.",
 },
 {
 n: "02",
 title: "Pick the trade and the urgency.",
 body: "Plumbing, electrical, HVAC, or general maintenance. Mark it emergency for live 24/7 dispatch.",
 },
 {
 n: "03",
 title: "Local technician confirms ETA.",
 body: "Your local Bridgepoint technician calls or texts to confirm the on-site window.",
 },
 {
 n: "04",
 title: "Quote on-site, repair on-visit.",
 body: "Flat-rate quote before the wrench moves. Most repairs scoped, quoted, and completed same visit.",
 },
];

export default function FindTechnicianPage() {
 return (
 <>
 <PageHero
 eyebrow="Find a local technician"
 title="Routed to your local Bridgepoint technician."
 description="Bridgepoint dispatches local trades trucks across Canada and the US. Drop in a city or postal/zip code below and we will confirm the closest dispatch zone."
 crumbs={[{ name: "Home", href: "/" }, { name: "Find a Technician" }]}
 image={IMAGES.edFindTechHero}
 imageAlt={IMAGES.edFindTechHeroAlt}
 variant="editorial"
 >
 <div className="flex flex-col gap-3 sm:flex-row">
 <a href={NAP.phoneTel} className="btn-accent">
 <Phone className="h-4 w-4" />
 {NAP.phone}
 </a>
 <Link href="/contact" className="btn-ghost-light">
 Talk to dispatch
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </PageHero>

 <section className="bg-white section">
 <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
 <div className="lg:col-span-5">
 <SectionHeading
 eyebrow="Local trades dispatch"
 title="Real technicians. Real trucks. Real streets."
 description="Bridgepoint dispatches across Canada and the US across Canada and the US and our US trade partner network. Tickets route to a local trade truck in your zone, not a generic 1-800 routing layer."
 />
 <ul className="mt-8 space-y-4">
 {TRUST.map(({ Icon, title, body }) => (
 <li key={title} className="flex items-start gap-3">
 <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
 <Icon className="h-5 w-5" />
 </span>
 <div>
 <p className="font-display text-base font-semibold text-navy-700">
 {title}
 </p>
 <p className="mt-1 text-sm text-steel-700 leading-relaxed">
 {body}
 </p>
 </div>
 </li>
 ))}
 </ul>

 <div className="mt-8 rounded-2xl border border-steel-100 bg-steel-50 p-5">
 <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800 mb-1.5">
 <CheckCircle2 className="inline h-3 w-3 mr-1" />
 Operating across
 </p>
 <p className="text-sm text-steel-700 leading-relaxed">
 North American service desk. Greater Toronto Area. Golden Horseshoe.
 Ottawa Valley. Niagara, Halton, Peel, York, Durham,
 Waterloo Region. Plus London, Windsor, Hamilton, and
 Sudbury.
 </p>
 </div>
 </div>

 <div className="lg:col-span-7">
 <FindLocalTechnician />
 </div>
 </div>
 </section>

 <section className="bg-steel-50 section">
 <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
 <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden rounded-3xl shadow-elevated">
 <Image
 src={IMAGES.localPlumbing}
 alt={IMAGES.localPlumbingAlt}
 fill
 sizes="(min-width: 1024px) 50vw, 100vw"
 className="object-cover"
 />
 </div>
 <div className="lg:col-span-6">
 <SectionHeading
 eyebrow="How it works"
 title="From city lookup to on-site fix."
 description="Four steps. No callback queue. No vendor mystery box. Just a local Bridgepoint trade truck on the way."
 />
 <ol className="mt-8 divide-y divide-steel-100 border-y border-steel-100">
 {HOW_IT_WORKS.map((s) => (
 <li
 key={s.n}
 className="grid grid-cols-12 gap-4 py-6 transition-colors hover:bg-cream-100/40"
 >
 <span className="col-span-2 font-display text-3xl font-extrabold text-cyan-700 tabular-nums leading-none mt-0.5">
 {s.n}
 </span>
 <div className="col-span-10">
 <p className="font-display text-base font-semibold text-navy-700">
 {s.title}
 </p>
 <p className="mt-1.5 text-sm text-steel-700 leading-relaxed">
 {s.body}
 </p>
 </div>
 </li>
 ))}
 </ol>
 </div>
 </div>
 </section>

 {/* TRADES WE DISPATCH — image tiles per trade line */}
 <section className="bg-white section">
 <div className="container-bp">
 <SectionHeading
 eyebrow="Trades we dispatch"
 title="Pick a trade line. Dispatch routes the right truck."
 description="Four core trade lines, twelve service lines underneath. The dispatcher matches the call to the license and the truck closest to your address."
 className="mb-12"
 />
 <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
 {TRADE_TILES.map((t) => (
 <Link
 key={t.slug}
 href={`/services/${t.slug}`}
 className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-steel-100 transition hover:ring-cyan-300 hover:shadow-elevated"
 >
 <div className="relative aspect-[4/3] overflow-hidden">
 <Image
 src={t.img.src}
 alt={t.img.alt}
 fill
 sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
 className="object-cover transition duration-500 group-hover:scale-[1.04]"
 />
 <div
 aria-hidden
 className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent"
 />
 </div>
 <div className="flex flex-1 flex-col gap-2 p-6">
 <h3 className="font-display text-lg font-semibold text-navy">
 {t.label}
 </h3>
 <p className="text-sm text-steel-600 leading-relaxed">{t.body}</p>
 <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-cyan-700">
 See {t.label.toLowerCase()} services
 <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
 </span>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </section>

 {/* CASE STUDY BAND — dark band proving the dispatch model */}
 <section className="relative overflow-hidden bg-navy-900 text-white">
 <Image
 src={IMAGES.editorialHero}
 alt={IMAGES.editorialHeroAlt}
 fill
 sizes="100vw"
 className="object-cover opacity-45"
 />
 <div
 aria-hidden
 className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/55 to-navy-900/25"
 />
 <div className="container-bp relative section grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
 <div className="lg:col-span-7">
 <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300 mb-4">
 How dispatch beats vendor mystery
 </p>
 <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
 One ticket. One truck. One closeout photo log.
 </h2>
 <p className="mt-5 max-w-2xl text-base text-white/85 leading-relaxed">
 The reason a property manager calls Bridgepoint instead of cycling through subcontractors is the routing layer. You don't know the licensed plumber in every metro. We do. You drop the address and the issue. We route to the closest licensed trade with the right license, the right stock on the truck, and a photo-documented closeout work order in your inbox the same week.
 </p>
 </div>
 <div className="lg:col-span-5">
 <div className="grid grid-cols-2 gap-3">
 {[
 { k: "12+", v: "Trade lines" },
 { k: "< 60 min", v: "Emergency target" },
 { k: "100%", v: "Photo closeout" },
 { k: "1", v: "Dispatch desk" },
 ].map(({ k, v }) => (
 <div
 key={k}
 className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur"
 >
 <div className="font-display text-2xl font-bold leading-none text-white">
 {k}
 </div>
 <div className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">
 {v}
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* COVERAGE METROS — quick grid of where we dispatch */}
 <section className="bg-steel-50/40 section">
 <div className="container-bp">
 <SectionHeading
 eyebrow="Where we dispatch"
 title="Toronto, the Golden Horseshoe, and a North American metro footprint."
 description="Densest coverage in the Greater Toronto Area. Active dispatch in the metros below plus a vetted trade partner network outside the core radius."
 className="mb-10"
 />
 <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
 {COVERAGE_METROS.map((m) => (
 <li key={m.href}>
 <Link
 href={m.href}
 className="group flex items-center justify-between gap-3 rounded-xl border border-steel-100 bg-white px-4 py-3 text-sm font-semibold text-navy transition hover:border-cyan-400 hover:bg-white"
 >
 <span className="flex items-center gap-2">
 <MapPin className="h-3.5 w-3.5 text-cyan-700" />
 {m.name}
 <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-steel-300">
 {m.country}
 </span>
 </span>
 <ArrowUpRight className="h-3.5 w-3.5 text-steel-300 transition group-hover:text-cyan-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
 </Link>
 </li>
 ))}
 </ul>
 <div className="mt-8">
 <Link href="/locations" className="link-arrow inline-flex">
 View all service areas
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </div>
 </section>

 {/* FIND-A-TECH FAQ */}
 <section className="bg-white section">
 <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
 <div className="lg:col-span-5">
 <SectionHeading
 eyebrow="Dispatch FAQ"
 title="What to expect from the lookup and the call."
 description="If your question isn't here, talk to a Bridgepoint dispatcher. We answer live."
 />
 <div className="mt-6 flex flex-col gap-3 sm:flex-row">
 <a href={NAP.phoneTel} className="btn-primary">
 <Phone className="h-4 w-4" />
 Call dispatch
 </a>
 <Link href="/contact" className="btn-secondary">
 Request service
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </div>
 <div className="lg:col-span-7">
 <FaqAccordion items={FINDTECH_FAQ} />
 </div>
 </div>
 </section>

 <CTASection
 title="Need a technician on-site today?"
 body="Bridgepoint dispatch runs 24/7. Talk to a live dispatcher or drop your address into the lookup above and we will confirm coverage and ETA."
 />
 </>
 );
}
