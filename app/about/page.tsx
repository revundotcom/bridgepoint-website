import Link from "next/link";
import Image from "next/image";
import {
 ShieldCheck,
 Building2,
 Users,
 Compass,
 Phone,
 ArrowRight,
 TrendingUp,
 MapPin,
} from "lucide-react";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import ProblemsWeSolve from "@/components/ProblemsWeSolve";
import PullQuote from "@/components/PullQuote";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionDivider from "@/components/SectionDivider";
import TechPortraits from "@/components/TechPortraits";
import TrustBadgesRow from "@/components/TrustBadgesRow";
import AboutCoverageMap from "@/components/AboutCoverageMap";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata = {
 title: "About Bridgepoint Maintenance | Property Maintenance Across Canada and the US",
 description:
 "Bridgepoint Maintenance is a full-service property maintenance and general contracting company operating across Canada and the US. Operating across Canada and the US, with 24/7 dispatch and a US trade partner network.",
};

const VALUES = [
 {
 Icon: ShieldCheck,
 title: "Licensed and accountable",
 body: "State and provincial trades licensing on every dispatch. Every work order documented, every job audit-ready.",
 },
 {
 Icon: Compass,
 title: "Trade-routed dispatch",
 body: "One number routes to the right trade: plumbing, electrical, HVAC, or general. Coordinated from a single ops layer.",
 },
 {
 Icon: Users,
 title: "Single accountability",
 body: "Property managers and owners use Bridgepoint as one point of contact across their entire North American portfolio.",
 },
 {
 Icon: Building2,
 title: "Built for portfolios",
 body: "Multifamily, commercial, institutional, and mixed-use. Scaled trades coverage with consolidated reporting.",
 },
];

const PERSONAS = [
 {
 title: "Property managers",
 body: "Single dispatch and consolidated billing across residential and commercial portfolios.",
 },
 {
 title: "Multifamily operators",
 body: "In-unit emergency response, common-area maintenance, and scheduled inspections.",
 },
 {
 title: "Commercial owners",
 body: "Office, retail, industrial. Code-compliance and mechanical-system service.",
 },
 {
 title: "Institutional clients",
 body: "Schools, healthcare, government. Documented work, licensed trades, audit-ready records.",
 },
];

const COVERAGE_STATS: Array<{
 value?: number;
 suffix?: string;
 rawText?: string;
 label: string;
 sub: string;
}> = [
 { value: 12, label: "Trade lines covered", sub: "Plumbing, HVAC, electrical, general" },
 {
 rawText: "24/7",
 label: "Live dispatch line",
 sub: "Real dispatcher, not voicemail",
 },
 {
 value: 4,
 label: "Core trades",
 sub: "Plumbing. Electrical. HVAC. General.",
 },
 {
 value: 73,
 suffix: "%",
 label: "Of property managers report vendor sprawl",
 sub: "As their top operational pain",
 },
];

// Canonical metro list aligned with the AboutCoverageMap pins.
// Each slug maps to a real `/locations/{province-or-state}/{city}` page.
const CANADIAN_METROS = [
 { name: "Toronto, ON", slug: "ontario/toronto" },
 { name: "Ottawa, ON", slug: "ontario/ottawa" },
 { name: "Montreal, QC", slug: "quebec/montreal" },
 { name: "Vancouver, BC", slug: "british-columbia/vancouver" },
 { name: "Calgary, AB", slug: "alberta/calgary" },
];

const US_METROS = [
 { name: "New York City, NY", slug: "new-york/new-york-city" },
 { name: "Los Angeles, CA", slug: "california/los-angeles" },
 { name: "Chicago, IL", slug: "illinois/chicago" },
 { name: "Houston, TX", slug: "texas/houston" },
 { name: "Miami, FL", slug: "florida/miami" },
 { name: "Boston, MA", slug: null as string | null },
 { name: "Seattle, WA", slug: null as string | null },
];

export default function AboutPage() {
 return (
 <>
 <PageHero
 eyebrow="About Bridgepoint"
 title="Licensed property maintenance and trade services across Canada and the US."
 description="Bridgepoint Maintenance is a single-line property maintenance and general contracting company operating across Canada and the US. Operating across Canada and the US with 24/7 dispatch and a vetted US trade partner network."
 crumbs={[{ name: "Home", href: "/" }, { name: "About" }]}
 image={IMAGES.edAboutHero}
 imageAlt={IMAGES.edAboutHeroAlt}
 variant="editorial"
 >
 <div className="flex flex-col gap-3 sm:flex-row">
 <a href={NAP.phoneTel} className="btn-accent">
 <Phone className="h-4 w-4" />
 {NAP.phone}
 </a>
 <Link href="/contact" className="btn-ghost-light">
 Talk to a dispatcher
 <ArrowRight className="h-4 w-4" />
 </Link>
 </div>
 </PageHero>

 {/* MISSION / STORY */}
 <section className="bg-white section">
 <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
 <div className="lg:col-span-7">
 <SectionHeading
 eyebrow="Operating thesis"
 title="Property maintenance is a documentation business that happens to involve trucks."
 description="Bridgepoint was built around a simple operating thesis: the property maintenance market across Canada and the US is fragmented, slow, and undocumented, and portfolio owners pay for it twice. Once in vendor sprawl, and once in claims when small repairs become big ones."
 />
 <div className="prose-bp mt-8">
 <p>
 Bridgepoint Maintenance is a property maintenance and general
 contracting company built for the North American property
 management market. We dispatch licensed plumbing, electrical,
 HVAC, drain and sewer, restoration, and general building
 services across Canada and the US across the
 Greater Toronto Area and broader Canada, and through our US
 trade partner network across New York, Miami, Phoenix,
 Houston, Atlanta, Charlotte, Dallas, and Austin.
 </p>
 <p>
 The fundamental problem we exist to solve is fragmentation.
 Property managers typically coordinate dozens of
 independent trades, each with its own intake process,
 scheduling system, and invoice format. Multiply that across a
 hundred-unit portfolio over twelve months, and the operational
 drag is enormous. Vendor turnover is constant. Documentation is
 inconsistent. Accountability fractures across phone calls, text
 threads, and paper invoices.
 </p>
 <p>
 Bridgepoint is built to be the single accountable counterparty
 for every maintenance need across that portfolio. One
 toll-free dispatch line. One ticket per request, tracked from
 intake to closeout. One technician credentialed, insured, and
 on time. Standardized response times. Predictable invoicing. A
 clear paper trail every regulator, auditor, and asset committee
 can read.
 </p>
 </div>

 <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
 {COVERAGE_STATS.map((s) => (
 <div
 key={s.label}
 className="rounded-2xl border border-steel-100 bg-steel-50/60 p-5"
 >
 <p className="font-display text-3xl font-bold text-navy-700 tabular-nums">
 {s.rawText ? (
 <AnimatedCounter
 value={0}
 rawText={s.rawText}
 />
 ) : (
 <AnimatedCounter
 value={s.value ?? 0}
 suffix={s.suffix ?? ""}
 />
 )}
 </p>
 <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-800">
 {s.label}
 </p>
 <p className="mt-1 text-xs text-steel-500 leading-snug">
 {s.sub}
 </p>
 </div>
 ))}
 </div>
 </div>

 <aside className="lg:col-span-5 lg:sticky lg:top-32 space-y-4">
 <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated">
 <Image
 src={IMAGES.localFleet}
 alt={IMAGES.localFleetAlt}
 fill
 sizes="(min-width: 1024px) 40vw, 100vw"
 className="object-cover"
 />
 </div>
 <div className="card">
 <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-2">
 North American dispatch
 </p>
 <p className="font-display text-lg font-semibold text-navy">
 Continental coverage
 </p>
 <p className="text-sm text-steel-500 mt-1 leading-relaxed">
 24/7 live dispatch routes every call to the closest licensed trade across Canada and the US.
 </p>
 </div>
 </aside>
 </div>
 </section>

 {/* Editorial pull-quote */}
 <section className="bg-white pb-8">
 <div className="container-bp max-w-4xl">
 <PullQuote
 quote="Vendor sprawl is not a procurement problem. It is a documentation problem dressed up as a procurement problem."
 attribution="Bridgepoint operating principle"
 role="From the field guide"
 />
 </div>
 </section>

 <SectionDivider variant="diagonal" from="white" to="navy" />

 {/* MARKET PROBLEM CALLOUT */}
 <section className="bg-navy-900 text-white section relative overflow-hidden">
 <Image
 src={IMAGES.industrialPipes}
 alt={IMAGES.industrialPipesAlt}
 fill
 sizes="100vw"
 className="object-cover opacity-15"
 />
 <div
 aria-hidden
 className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-900/95 to-navy-700/85"
 />
 <div className="container-bp relative grid grid-cols-1 gap-12 lg:grid-cols-12">
 <div className="lg:col-span-7">
 <SectionHeading
 eyebrow="The market problem"
 title="Vendor sprawl is the top operational pain."
 description="73% of property managers report vendor fragmentation as their top operational pain. Slow response times, undocumented work, and multi-vendor invoice hell are the reason a leaking valve at 6pm becomes a flooded unit by midnight."
 light
 />
 <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
 {[
 {
 value: 73,
 suffix: "%",
 v: "of property managers cite vendor sprawl as their top pain.",
 },
 {
 value: 4.2,
 decimals: 1,
 suffix: "x",
 v: "average vendors per property before consolidation.",
 },
 {
 value: 62,
 suffix: "%",
 v: "of after-hours emergencies wait on a callback queue.",
 },
 {
 value: 3400,
 prefix: "$",
 v: "average claim cost when a small repair waits overnight.",
 },
 ].map((s, i) => (
 <li
 key={i}
 className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
 >
 <p className="font-display text-2xl font-bold text-cyan-300 tabular-nums">
 <AnimatedCounter
 value={s.value}
 suffix={s.suffix}
 prefix={s.prefix}
 decimals={s.decimals ?? 0}
 />
 </p>
 <p className="mt-1 text-sm text-white/85 leading-snug">
 {s.v}
 </p>
 </li>
 ))}
 </ul>
 </div>

 <div className="lg:col-span-5">
 <div className="rounded-3xl border border-cyan-400/30 bg-cyan-500/10 p-7">
 <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
 How Bridgepoint solves it
 </p>
 <h3 className="mt-2 font-display text-2xl font-bold text-white leading-tight">
 Single dispatch. Documented work. Consolidated billing.
 </h3>
 <ul className="mt-5 space-y-3 text-sm text-white/85">
 {[
 "One number routes plumbing, electrical, HVAC, and general trades.",
 "Live dispatcher 24/7, written ETA on the first call, not a callback queue.",
 "Work orders, license numbers, COI, and WSIB on file before the first ticket.",
 "Consolidated portfolio invoicing with line-item transparency.",
 "Quarterly preventative maintenance plans with documented inspections.",
 ].map((s) => (
 <li key={s} className="flex items-start gap-3">
 <ShieldCheck className="mt-0.5 h-4 w-4 flex-none text-cyan-300" />
 {s}
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 </section>

 {/* WHERE WE OPERATE. North American coverage map + linked metros */}
 <section className="bg-white section">
 <div className="container-bp">
 <SectionHeading
 eyebrow="Where we operate"
 title="North American coverage. Canada and US."
 description="Bridgepoint Maintenance dispatches across both countries. Major Canadian metros include Toronto, Vancouver, Montreal, Calgary, and Ottawa. Major US metros include New York, Los Angeles, Chicago, Houston, Miami, Seattle, and Boston."
 align="center"
 className="mb-12"
 />

 <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
 <div className="lg:col-span-7">
 <AboutCoverageMap caption="Bridgepoint dispatch across Canada and the US." />
 </div>

 <div className="lg:col-span-5 grid grid-cols-1 gap-4">
 <div className="rounded-2xl border border-cyan-500/30 bg-cyan-50 p-6">
 <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-3">
 <TrendingUp className="h-3.5 w-3.5" />
 Canada
 </p>
 <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
 {CANADIAN_METROS.map((c) => (
 <li key={c.name}>
 <Link
 href={`/locations/${c.slug}`}
 className="text-navy-700 hover:text-cyan-700 font-semibold"
 >
 {c.name}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 <div className="rounded-2xl border border-steel-100 bg-white p-6 shadow-soft">
 <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-3">
 <MapPin className="h-3.5 w-3.5" />
 United States
 </p>
 <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
 {US_METROS.map((c) =>
 c.slug ? (
 <li key={c.name}>
 <Link
 href={`/locations/${c.slug}`}
 className="text-steel-700 hover:text-cyan-700 font-semibold"
 >
 {c.name}
 </Link>
 </li>
 ) : (
 <li key={c.name} className="text-steel-700 font-semibold">
 {c.name}
 </li>
 )
 )}
 </ul>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* TRUST BADGES — between sections */}
 <section className="bg-white section-tight">
 <div className="container-bp">
 <TrustBadgesRow />
 </div>
 </section>

 {/* HOW WE WORK — four step process + credentials strip */}
 <section className="bg-steel-50 section">
 <div className="container-bp">
 <SectionHeading
 eyebrow="How we work"
 title="Four steps from your call to a closed work order."
 description="Every Bridgepoint dispatch follows the same playbook. Live dispatcher, licensed trade, stocked truck, documented closeout. The process is identical whether the call is a leaking faucet or a portfolio wide preventative maintenance contract."
 align="center"
 className="mb-12"
 />
 <TechPortraits />
 </div>
 </section>

 {/* PROBLEMS WE SOLVE */}
 <ProblemsWeSolve
 eyebrow="Why Bridgepoint exists"
 title="What is broken in the trades market."
 description="If you have managed property in the US or Canada, you have lived through this list. Here is what is broken in the trades market, and the way Bridgepoint built around it."
 />

 {/* VALUES — editorial slab, monumental numerals + restrained icon column */}
 <section className="bg-white section">
 <div className="container-bp">
 <SectionHeading
 eyebrow="What we stand for"
 title="Four operating principles."
 description="Trade-services accountability is built on documentation, response speed, and a single line of contact. These are how Bridgepoint shows up."
 className="mb-14 max-w-2xl"
 />
 <ol className="divide-y divide-steel-100 border-y border-steel-100">
 {VALUES.map(({ Icon, title, body }, idx) => (
 <li
 key={title}
 className="grid grid-cols-12 gap-6 py-10 md:py-12 transition-colors hover:bg-steel-50/40"
 >
 <div className="col-span-12 md:col-span-2 flex md:block items-baseline gap-4">
 <span className="font-display text-5xl md:text-6xl font-extrabold text-cyan-700 tabular-nums leading-none">
 {String(idx + 1).padStart(2, "0")}
 </span>
 <span className="md:hidden text-xs font-bold uppercase tracking-[0.22em] text-cyan-800">
 Principle
 </span>
 </div>
 <div className="col-span-12 md:col-span-2 hidden md:flex">
 <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700">
 <Icon className="h-5 w-5" aria-hidden />
 </span>
 </div>
 <div className="col-span-12 md:col-span-8">
 <h3 className="font-display text-2xl md:text-3xl font-bold text-navy leading-tight tracking-tight">
 {title}
 </h3>
 <p className="mt-3 text-base text-steel-700 leading-relaxed max-w-2xl">
 {body}
 </p>
 </div>
 </li>
 ))}
 </ol>
 </div>
 </section>

 {/* WHO WE SERVE — sharp-cornered slabs with left cyan rule */}
 <section className="bg-steel-50 section">
 <div className="container-bp">
 <SectionHeading
 eyebrow="Who we serve"
 title="Property portfolios across our coverage area."
 description="Bridgepoint dispatches across multifamily, commercial, institutional, and mixed-use properties. Coordinating trades for the operators who manage them."
 className="mb-12"
 />
 <div className="grid grid-cols-1 gap-px bg-steel-100 md:grid-cols-2 lg:grid-cols-4">
 {PERSONAS.map((p) => (
 <div
 key={p.title}
 className="group relative bg-white p-7 transition-colors hover:bg-cream-100"
 >
 <span
 aria-hidden
 className="absolute left-0 top-7 bottom-7 w-[3px] bg-cyan-500 opacity-0 transition-opacity group-hover:opacity-100"
 />
 <h3 className="font-display text-base font-semibold text-navy mb-2">
 {p.title}
 </h3>
 <p className="text-sm text-steel-500 leading-relaxed">
 {p.body}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 <CTASection
 title={`Talk to ${BRAND.shortName} dispatch.`}
 body="Whether it is an emergency, a scheduled service request, or a portfolio onboarding conversation, we are a single call away."
 />
 </>
 );
}
