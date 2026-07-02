import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  ArrowRight,
  Wrench,
  Zap,
  Wind,
  Hammer,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import FaqAccordion from "@/components/FaqAccordion";
import { NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { fetchRolesLocal } from "@/lib/careers";
import { CareersFilterProvider } from "./careers-filter-context";
import JobFilterControls from "./job-filter-controls";
import JobFilterList from "./job-filter-list";

const HIRE_PROCESS = [
  {
    n: "01",
    t: "Send your trade docs",
    b: "Email your resume plus current trade license and a copy of your liability cover. We confirm receipt the same business day.",
  },
  {
    n: "02",
    t: "Coverage and rate call",
    b: "Twenty-minute call with Bridgepoint ops. We walk your covered metros, on-call windows, and the published flat-rate schedule.",
  },
  {
    n: "03",
    t: "First dispatch ride-along",
    b: "Your first three calls run with a Bridgepoint ops lead on the line. We walk the work order, the photo log, and the closeout flow together.",
  },
  {
    n: "04",
    t: "Steady dispatched work",
    b: "Once you're cleared, dispatch routes work through the same desk. Net 30 master billing means predictable, single-source payment cycles.",
  },
];

const CAREERS_GALLERY = [
  { src: IMAGES.brandTechToolbox, alt: IMAGES.brandTechToolboxAlt, caption: "On the truck, ready to roll" },
  { src: IMAGES.brandTechPlumbing, alt: IMAGES.brandTechPlumbingAlt, caption: "Copper work, residential basement" },
  { src: IMAGES.brandTechRooftop, alt: IMAGES.brandTechRooftopAlt, caption: "Rooftop HVAC service" },
  { src: IMAGES.brandFleetRow, alt: IMAGES.brandFleetRowAlt, caption: "Fleet, lined up at HQ" },
];

const CAREERS_FAQ = [
  {
    q: "Do I have to be a Bridgepoint employee, or can I run my own trade business?",
    a: "Both. We hire trades directly into Bridgepoint dispatch, and we run a subcontractor network for established trade businesses who want predictable dispatched volume. The on-boarding paperwork is different but the dispatch flow is identical.",
  },
  {
    q: "Which licenses and certifications do I need to apply?",
    a: "We hire for plumbing, electrical, HVAC, and general trades roles. The license requirement is whatever the state or province you intend to dispatch in legally requires. We will not put you on a call you are not licensed to run.",
  },
  {
    q: "Where does Bridgepoint currently dispatch?",
    a: "Greater Toronto Area is our densest coverage. We are actively hiring across North America with deepest current coverage in Toronto, the Golden Horseshoe, New York, Miami, Phoenix, Houston, Atlanta, Charlotte, Dallas, and Austin.",
  },
  {
    q: "How does pay work on a dispatched job?",
    a: "Bridgepoint pays the trade against a published flat-rate schedule. We invoice the property and you invoice Bridgepoint on Net 30. No chasing client AR.",
  },
  {
    q: "Is on-call required?",
    a: "Some lines pay an on-call premium for emergency dispatch. On-call is opt-in. You can run scheduled work only if that fits your operation.",
  },
  {
    q: "What does the first month look like?",
    a: "Three ride-along calls with a Bridgepoint ops lead, then standalone dispatch. Most new trades close their first month inside seventy-five to one-twenty calls depending on metro density and trade line.",
  },
];

export const metadata = {
  title: "Careers at Bridgepoint Maintenance | Trades Jobs Across Canada and the US",
  description:
    "Careers at Bridgepoint Maintenance. plumbing, electrical, HVAC, and general trades roles across Canada and the US. Apply today.",
};

const TRADES = [
  {
    title: "Plumbing",
    Icon: Wrench,
    blurb:
      "Licensed plumbers across Canada and the US. emergency response, commercial service, multifamily portfolios.",
  },
  {
    title: "Electrical",
    Icon: Zap,
    blurb:
      "ESA-licensed electricians. panel work, EV chargers, commercial service, emergency dispatch.",
  },
  {
    title: "HVAC",
    Icon: Wind,
    blurb:
      "TSSA-licensed HVAC technicians. furnace, AC, heat-pump installs and emergency service.",
  },
  {
    title: "General trades",
    Icon: Hammer,
    blurb:
      "Carpenters, handypersons, multi-trade technicians. preventative and reactive property work.",
  },
];

const PERKS = [
  "Steady dispatched work across US and Canadian property portfolios",
  "Coordinated job intake. less time chasing leads",
  "Single billing partner. predictable payment cycles",
  "Compliance and licensing support",
  "Growth opportunities as Bridgepoint scales province-wide",
];

export default async function CareersPage() {
  const allRoles = await fetchRolesLocal();
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join the Bridgepoint trades network."
        description="Bridgepoint hires licensed trades. plumbing, electrical, HVAC, and general. to service property managers, commercial owners, and multifamily operators across Canada and the US."
        crumbs={[{ name: "Home", href: "/" }, { name: "Careers" }]}
        image={IMAGES.workCrew}
        imageAlt={IMAGES.workCrewAlt}
        size="compact"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#positions" className="btn-accent">
            View open positions
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${NAP.careersEmail}`}
            className="btn-ghost-light"
          >
            <Mail className="h-4 w-4" />
            {NAP.careersEmail}
          </a>
        </div>
      </PageHero>

      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="Trades we're hiring"
            title="Licensed trades, dispatched across Canada and the US."
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {TRADES.map(({ title, Icon, blurb }) => (
              <div
                key={title}
                className="rounded-2xl border border-steel-100 bg-white p-7 shadow-soft"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-cyan-700 mb-5">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl font-semibold text-navy mb-2">
                  {title}
                </h3>
                <p className="text-sm text-steel-500 leading-relaxed mb-5">
                  {blurb}
                </p>
                <a
                  href="#positions"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-cyan-700"
                >
                  View open positions
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-steel-50 section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="What we offer"
              title="Predictable work, predictable pay."
            />
            <ul className="mt-8 space-y-4">
              {PERKS.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-sm text-steel-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="How to apply" title="One email or one call." />
            <p className="mt-4 text-base text-steel-500 leading-relaxed">
              Send your resume and trade-license documentation to{" "}
              <a
                href={`mailto:${NAP.careersEmail}`}
                className="font-semibold text-navy hover:text-cyan-700"
              >
                {NAP.careersEmail}
              </a>
            . or call{" "}
              <a
                href={NAP.phoneTel}
                className="font-semibold text-navy hover:text-cyan-700"
              >
                {NAP.phone}
              </a>
              .
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#positions" className="btn-primary">
                Open positions
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${NAP.careersEmail}`}
                className="btn-secondary"
              >
                <Mail className="h-4 w-4" />
                Email recruiting
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HIRE PROCESS — what it looks like to join Bridgepoint */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="From application to first dispatch"
              title="Four steps. Then steady work."
              description="The Bridgepoint hiring flow is built to put a licensed trade on a paying call inside two weeks. Most new dispatch trades close their first ten work orders inside the first month."
            />
          </div>
          <ol className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {HIRE_PROCESS.map((s) => (
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

      {/* STAT BAND — what the trade roster looks like */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06] pattern-cross-navy"
        />
        <div className="container-bp relative grid grid-cols-2 divide-x divide-white/10 py-9 md:grid-cols-4">
          {[
            { k: "12", v: "Trade lines" },
            { k: "Net 30", v: "Master billing" },
            { k: "24 / 7", v: "Dispatch coverage" },
            { k: "Same", v: "Day on-boarding reply" },
          ].map(({ k, v }) => (
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

      {/* GALLERY — what the work actually looks like */}
      <section className="bg-white section">
        <div className="container-bp">
          <SectionHeading
            eyebrow="The work"
            title="Documentary photography from real Bridgepoint trucks."
            description="Every call closes with a photo log and a line-item invoice. Here is what the work looks like on the truck."
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAREERS_GALLERY.map((g, i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-2xl shadow-soft ring-1 ring-steel-100"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="absolute bottom-3 left-3 right-3 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-steel-50 section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Hiring FAQ"
              title="What new trades ask before signing on."
              description="If your question isn't here, email recruiting and we will get you a same-day answer."
            />
            <div className="mt-6">
              <a
                href={`mailto:${NAP.careersEmail}`}
                className="btn-primary inline-flex"
              >
                <Mail className="h-4 w-4" />
                Email recruiting
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={CAREERS_FAQ} />
          </div>
        </div>
      </section>

      <section id="positions" className="bg-steel-50 section">
        <div className="container-bp">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 mb-2">Open positions</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy text-balance">
              We are actively hiring.
            </h2>
            <p className="mt-3 text-base text-steel-500 max-w-xl">
              Active openings across our GTA operations and Florida expansion. Click a role to view the full description and apply.
            </p>
          </div>

          <CareersFilterProvider allRoles={allRoles}>
            <div className="mb-10">
              <JobFilterControls />
            </div>
            <JobFilterList />
          </CareersFilterProvider>
        </div>
      </section>

      <CTASection
        title="Want to talk dispatch?"
        body="Whether you're a tradesperson looking for steady work or a subcontracting trade business interested in joining the Bridgepoint network. we're a single call away."
      />
    </>
  );
}
