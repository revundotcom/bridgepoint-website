import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import type { SiloPage } from "@/lib/silo-services";

const HUB_INDUSTRY_TRIPTYCH: { slug: string; label: string; tagline: string; img: { src: string; alt: string } }[] = [
  {
    slug: "property-managers",
    label: "Property managers",
    tagline: "Single dispatch, consolidated billing, portfolio reporting across the buildings you run.",
    img: { src: IMAGES.edPropertyManagersHero, alt: IMAGES.edPropertyManagersHeroAlt },
  },
  {
    slug: "multi-family-buildings",
    label: "Multi family operators",
    tagline: "In-unit emergency response and recurring common-area service on one work order line.",
    img: { src: IMAGES.brandVanCondo, alt: IMAGES.brandVanCondoAlt },
  },
  {
    slug: "commercial-property-owners",
    label: "Commercial owners",
    tagline: "Office, retail, and industrial. Code-compliance, mechanical, and trade work on a single billing account.",
    img: { src: IMAGES.serviceBuilding, alt: IMAGES.serviceBuildingAlt },
  },
];

type Props = {
  pages: SiloPage[];
  siloRoot: string;
  siloLabel: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  introTitle: string;
  introDescription: string;
  emergency?: boolean;
};

export default function SiloHub({
  pages,
  siloRoot,
  siloLabel,
  eyebrow,
  heroTitle,
  heroDescription,
  heroImage,
  introTitle,
  introDescription,
  emergency,
}: Props) {
  return (
    <>
      <SchemaJsonLd
        id={`ld-hub-${siloRoot.replace(/\//g, "")}`}
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: siloLabel, url: `${BRAND.url}${siloRoot}` },
        ])}
      />
      <PageHero
        eyebrow={eyebrow}
        title={heroTitle}
        description={heroDescription}
        crumbs={[{ name: "Home", href: "/" }, { name: siloLabel }]}
        image={heroImage}
        imageAlt={heroTitle}
        variant="editorial"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={NAP.phoneTel} className="btn-accent">
            <Phone className="h-4 w-4" />
            {emergency ? `24/7 · ${NAP.phone}` : NAP.phone}
          </a>
          <Link href="/contact" className="btn-ghost-light">
            Request service
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      {/* Editorial stat row — large numerals, no icons. Page-type specific
          pillars (emergency response on /emergency, service pillars on hubs). */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] pattern-cross-navy"
        />
        <div className="container-bp relative grid grid-cols-2 divide-x divide-white/10 py-7 md:grid-cols-4 md:py-9">
          {(emergency
            ? [
                { k: "24 / 7", v: "Live dispatch line" },
                { k: "60 min", v: "On-site target" },
                { k: "Published", v: "After hours rates" },
                { k: "Photo", v: "Documented closeout" },
              ]
            : [
                { k: "12", v: "Trade lines" },
                { k: "Licensed", v: "Trades on every visit" },
                { k: "One", v: "Dispatch number" },
                { k: "Photo", v: "Documented closeout" },
              ]
          ).map(({ k, v }) => (
            <div key={k} className="flex flex-col gap-1 px-4 md:px-8">
              <div className="font-display text-2xl font-bold leading-none text-white md:text-3xl">
                {k}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300 md:text-xs">
                {v}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow={siloLabel}
            title={introTitle}
            description={introDescription}
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`${siloRoot}/${page.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-steel-100 bg-white p-6 shadow-soft transition-all hover:border-cyan-500 hover:shadow-cyan-glow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
                      {page.eyebrow}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-semibold text-navy">
                      {page.name}
                    </h3>
                    <p className="mt-2 text-sm text-steel-600 leading-snug">
                      {page.tagline}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-steel-50 text-cyan-700 transition group-hover:bg-cyan-500 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL 4-STEP PROCESS — large numerals. Mirrors MSR's
          5-step process narrative but tuned to dispatch + trade workflow. */}
      <section className="bg-steel-50/40 section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How dispatch works"
              title={
                emergency
                  ? "From the first ring to the closeout photo."
                  : "From the first call to the closeout photo."
              }
              description={
                emergency
                  ? "Bridgepoint runs a live emergency desk. The flow below is the same every time, in every market we cover."
                  : "Every Bridgepoint work order moves through the same four-step flow. Documented at every step so property managers and asset owners can audit any visit."
              }
            />
            <div className="mt-7 hidden lg:flex flex-col gap-3 sm:flex-row">
              <a href={NAP.phoneTel} className="btn-accent">
                <Phone className="h-4 w-4" />
                {NAP.phone}
              </a>
              <Link href="/contact" className="btn-secondary">
                Start a request
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ol className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                n: "01",
                t: "Live dispatcher answers",
                b: emergency
                  ? "A real person picks up around the clock. They capture the address, the issue, and any safety steps you can take while the truck rolls."
                  : "A dispatcher captures the address, the issue, and the property type, then writes the work order against the right trade line.",
              },
              {
                n: "02",
                t: "Licensed trade is routed",
                b: emergency
                  ? "The right trade routes to the nearest stocked truck. ETA writes to the work order and emails before the truck rolls."
                  : "The matching trade is routed to the nearest licensed truck. ETA is written to the work order and emailed before the visit.",
              },
              {
                n: "03",
                t: "Scoped and quoted on site",
                b: "The tech walks the issue, photographs the condition, and quotes a flat rate before any tools come out. Approve in person or forward the quote to the property manager.",
              },
              {
                n: "04",
                t: "Photo documented closeout",
                b: "Photos, license number, and a line-item invoice land in your inbox within seven days. Every job audit ready if an insurance claim or property transfer follows.",
              },
            ].map((s) => (
              <li
                key={s.n}
                className="relative overflow-hidden rounded-2xl border border-steel-100 bg-white p-7 shadow-soft transition hover:border-cyan-300 hover:shadow-cyan-glow"
              >
                <span className="font-display text-5xl font-extrabold tabular-nums text-cyan-700 leading-none">
                  {s.n}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm text-steel-600 leading-relaxed">
                  {s.b}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CASE STUDY BAND — single full-width editorial image + outcome stats. */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src={emergency ? IMAGES.editorialDoor : IMAGES.editorialBasement}
          alt={emergency ? IMAGES.editorialDoorAlt : IMAGES.editorialBasementAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/60 to-navy-900/35"
        />
        <div className="container-bp relative section grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300 mb-4">
              Case file
            </p>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
              {emergency
                ? "Live dispatch. Trucks rolling. Photo documented closeout."
                : "Twelve trade lines on one accountable dispatch desk."}
            </h2>
            <p className="mt-5 max-w-2xl text-base text-white/85 leading-relaxed">
              {emergency
                ? "A property manager called in an active emergency on a multi-unit residential building. Dispatch routed the nearest stocked Bridgepoint truck. Licensed trade was on site inside 60 minutes, scoped the work, photographed the condition, and closed the job out the same visit. Closeout work order with photos and license number was emailed to the manager that night."
                : "A Greater Toronto Area residential portfolio handed twelve trade lines to Bridgepoint on a single dispatch number. Master account billing. Photo documented work orders on every visit. The asset manager now runs one report at month end instead of chasing six different vendors for invoices."}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {(emergency
                ? [
                    { k: "< 60 min", v: "On site target" },
                    { k: "1", v: "Visit closeout" },
                    { k: "100%", v: "Photo documented" },
                    { k: "24 / 7", v: "Live dispatcher" },
                  ]
                : [
                    { k: "1", v: "Dispatch number" },
                    { k: "12", v: "Trade lines" },
                    { k: "Net 30", v: "Master billing" },
                    { k: "100%", v: "Photo closeout" },
                  ]
              ).map(({ k, v }) => (
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

      {/* INDUSTRY TRIPTYCH — three audience cards routing into /industries. */}
      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Built for"
            title="The owners and operators we run service for."
            description="Bridgepoint runs dedicated programs for the audiences that own and operate buildings. Pick the program that matches your asset class for the full dispatch model."
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {HUB_INDUSTRY_TRIPTYCH.map((card) => (
              <Link
                key={card.slug}
                href={`/industries/${card.slug}`}
                className="group relative block overflow-hidden rounded-2xl shadow-soft ring-1 ring-steel-100 transition hover:ring-cyan-300 hover:shadow-elevated"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={card.img.src}
                    alt={card.img.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/35 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                      Program
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold leading-tight text-white">
                      {card.label}
                    </h3>
                    <p className="mt-2 text-sm text-white/85 leading-snug">
                      {card.tagline}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-cyan-300">
                      See the program
                      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heavy dark band — second dark beat before the CTA. Anchors the page weight. */}
      <section className="relative overflow-hidden bg-navy-700 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] pattern-cross-navy"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-cyan-500/12 blur-3xl"
        />
        <div className="container-bp relative section grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300 mb-3">
              {emergency ? "When the call cannot wait" : "One dispatch line"}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight max-w-2xl">
              {emergency
                ? "Live dispatcher 24/7. A real person picks up, not a callback queue."
                : "Twelve trade lines on one accountable dispatch desk."}
            </h2>
            <p className="mt-5 text-base text-white/85 leading-relaxed max-w-xl">
              {emergency
                ? "Bridgepoint runs a live emergency desk every hour of every day. Active leaks, no heat, no power, sewer backups, storm damage. The line answers, the trade rolls, the work order documents."
                : "Plumbing, electrical, HVAC, carpentry, drywall and paint, general repairs, preventative maintenance, unit turnovers, commercial contracting, tenant fit outs, facility maintenance, and building upkeep. One number routes them."}
            </p>
          </div>
          <div className="lg:col-span-5">
            <ul className="grid grid-cols-1 gap-3">
              {[
                emergency
                  ? { Icon: AlertTriangle, k: "Live answer", v: "No voicemail. A dispatcher picks up." }
                  : { Icon: Clock, k: "Same day", v: "Standard requests scheduled inside one business day." },
                { Icon: ShieldCheck, k: "Licensed trades", v: "License numbers print on every work order." },
                { Icon: CheckCircle2, k: "Quote first", v: "Flat rate scoped on site before tools come out." },
                { Icon: CheckCircle2, k: "Documented", v: "Photos, line item invoicing, audit ready records." },
              ].map(({ Icon, k, v }) => (
                <li
                  key={k}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/30">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-white leading-tight">
                      {k}
                    </p>
                    <p className="mt-0.5 text-sm text-white/80 leading-snug">
                      {v}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection variant={emergency ? "emergency" : "default"} />
    </>
  );
}
