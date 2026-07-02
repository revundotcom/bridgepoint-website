import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import FaqAccordion from "@/components/FaqAccordion";
import { NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const QUOTE_STEPS = [
  {
    n: "01",
    t: "Tell us the property and the work",
    b: "Fill the form. We need the address, the property type, and a one-paragraph description of the work. Photos help.",
  },
  {
    n: "02",
    t: "Dispatch confirms coverage",
    b: "A Bridgepoint dispatcher confirms coverage in your market and routes to the right trade line within one business day.",
  },
  {
    n: "03",
    t: "Site walk or remote scope",
    b: "For most work we walk the property and write the quote on site. For straight-forward work we can scope remote from photos.",
  },
  {
    n: "04",
    t: "Flat-rate quote in writing",
    b: "You get a written flat-rate quote with the trade scope, the licensed tech, the schedule window, and the line-item price.",
  },
];

const QUOTE_FAQ = [
  {
    q: "How long does a quote take?",
    a: "Most quotes scope inside one to two business days. Site-walk work runs longer when we need to coordinate access. Emergency work skips the quote step — call dispatch and the truck rolls.",
  },
  {
    q: "Is the quote free?",
    a: "Yes. Standard scope work is quoted free. Diagnostic work that requires a technician to spend more than thirty minutes on the property carries a published diagnostic fee that credits back against the work if you proceed.",
  },
  {
    q: "Do you charge hourly or flat rate?",
    a: "Flat rate by the job whenever the scope is clear. Hourly with a quoted ceiling when the scope is open-ended. Either way the price you sign off on is the price on the invoice.",
  },
  {
    q: "Do you take recurring property maintenance contracts?",
    a: "Yes. Monthly, quarterly, and seasonal preventative maintenance contracts across plumbing, electrical, HVAC, and general repairs. Master account billing on Net 30.",
  },
  {
    q: "What if the work involves multiple trades?",
    a: "Bridgepoint coordinates internally. One dispatch number, one work order, one invoice. Plumbing plus electrical plus drywall on the same job routes through the same desk.",
  },
  {
    q: "Can you bill the property owner directly?",
    a: "Yes. Property manager scoped, owner billed is a standard Bridgepoint flow. Tell us in the form who scopes and who pays and we will set the billing routing accordingly.",
  },
];

export const metadata = {
  title: "Request a Free Quote | Bridgepoint Maintenance",
  description:
    "Request a free quote for plumbing, electrical, HVAC, or building maintenance from Bridgepoint Maintenance. Across Canada and the US.",
};

// Coverage map URL for the continental Canada and US (no specific HQ pin).
const MAP_OPEN_URL = "https://www.google.com/maps/@46,-96,3z";

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Request a quote"
        title="Free quote, transparent dispatch."
        description={`Fill in the form below for a quote on routine, scheduled, or preventative maintenance. For active emergencies, call ${NAP.phone}.`}
        crumbs={[{ name: "Home", href: "/" }, { name: "Quote" }]}
        image={IMAGES.edQuoteHero}
        imageAlt={IMAGES.edQuoteHeroAlt}
        size="compact"
        variant="editorial"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={NAP.phoneTel} className="btn-accent">
            <Phone className="h-4 w-4" />
            {NAP.phone}
          </a>
          <a href={`mailto:${NAP.email}`} className="btn-ghost-light">
            <Mail className="h-4 w-4" />
            {NAP.email}
          </a>
        </div>
      </PageHero>

      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Quote request"
              title="Tell us about the property and the work."
              description="A Bridgepoint dispatcher will follow up to scope the work, confirm coverage, and provide a transparent quote. typically within 1-2 business days."
              className="mb-8"
            />
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-accent/30 bg-accent/[0.04] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-2">
                Active emergency?
              </p>
              <p className="font-display text-2xl font-bold text-navy mb-1">
                {NAP.phone}
              </p>
              <p className="text-sm text-steel-500 mb-5 leading-relaxed">
                Skip the form. call dispatch directly for fastest trade-routed
                response across Canada and the US.
              </p>
              <a href={NAP.phoneTel} className="btn-accent w-full">
                <Phone className="h-4 w-4" />
                Call dispatch
              </a>
            </div>

            <div className="card">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-4">
                Contact
              </h3>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                  <a
                    href={`mailto:${NAP.email}`}
                    className="text-navy hover:text-cyan-700 break-all"
                  >
                    {NAP.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                  <address className="not-italic text-steel-700 leading-6">
                    North American dispatch
                    <br />
                    Continental Canada and US
                  </address>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                  <span className="text-steel-700">{NAP.hours.summary}</span>
                </li>
              </ul>
              <a
                href={MAP_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-cyan-700"
              >
                Open coverage map
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* QUOTE PROCESS — what happens after the form */}
      <section className="bg-steel-50/40 section">
        <div className="container-bp grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How quoting works"
              title="From form submission to signed quote."
              description="Bridgepoint writes flat-rate quotes against a documented scope. No hidden trip charges, no after-the-fact surprises."
            />
            <div className="mt-7 hidden lg:flex flex-col gap-3 sm:flex-row">
              <a href={NAP.phoneTel} className="btn-accent">
                <Phone className="h-4 w-4" />
                {NAP.phone}
              </a>
              <Link href="/services" className="btn-secondary">
                Browse services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ol className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {QUOTE_STEPS.map((s) => (
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

      {/* DARK STAT BAND — what the quote actually contains */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src={IMAGES.editorialBasement}
          alt={IMAGES.editorialBasementAlt}
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/60 to-navy-900/35"
        />
        <div className="container-bp relative section grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300 mb-4">
              What's on the quote
            </p>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Flat rate, line itemized, license number on every line.
            </h2>
            <p className="mt-5 max-w-2xl text-base text-white/85 leading-relaxed">
              Every Bridgepoint quote names the licensed trade, the scope, the schedule window, and the flat rate. No moving target on price, no second invoice for trip charges. If the scope changes once the tech is on site, we write a change order and you sign before the work proceeds.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "Flat", v: "Rate in writing" },
                { k: "1-2", v: "Business day reply" },
                { k: "Free", v: "Standard scope quote" },
                { k: "Net 30", v: "Master billing" },
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

      {/* QUOTE FAQ */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Quote FAQ"
              title="Common questions before you submit the form."
              description="If your question isn't here, email or call dispatch and we will get you a same-day answer."
            />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={NAP.phoneTel} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call dispatch
              </a>
              <a href={`mailto:${NAP.email}`} className="btn-secondary">
                <Mail className="h-4 w-4" />
                Email us
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={QUOTE_FAQ} />
          </div>
        </div>
      </section>

      <CTASection
        title="Faster than a form? Call dispatch."
        body="Quote requests are scoped within one to two business days. For active emergencies and same day work, the phone line is faster."
      />
    </>
  );
}
