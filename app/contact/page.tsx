import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ExternalLink, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import FindLocalTechnician from "@/components/FindLocalTechnician";
import FaqAccordion from "@/components/FaqAccordion";
import CTASection from "@/components/CTASection";
import { breadcrumbSchema } from "@/lib/schema";
import { BRAND, NAP } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

const CONTACT_FAQ = [
  {
    q: "What's the fastest way to reach Bridgepoint?",
    a: "Call dispatch. The phone line is live around the clock and a real dispatcher answers, not an automated queue. Email and the form are reserved for non-emergency work that doesn't need a same-day response.",
  },
  {
    q: "Where does Bridgepoint operate?",
    a: "Bridgepoint dispatches across Canada and the US. Canadian metros include Toronto, Vancouver, Montreal, Calgary, and Ottawa. US metros include New York, Miami, Phoenix, Houston, Atlanta, Charlotte, Dallas, and Austin. The contact desk routes any North American call.",
  },
  {
    q: "How quickly will dispatch reply to a form submission?",
    a: "Same business day during office hours for standard service requests. One to two business days for quote-scoped work. For active emergencies, skip the form and call dispatch.",
  },
  {
    q: "Can you send a technician without an intake call?",
    a: "Yes for emergencies. Dispatch routes the truck while a separate dispatcher captures the property details. For scheduled work, we run a five-minute intake to confirm scope and access before the truck rolls.",
  },
  {
    q: "Do you onboard portfolios on the contact form?",
    a: "We onboard portfolios on a thirty-minute intake call, not the form. Tell us in the form that you're a property manager or owner with multiple buildings and we will set up the call.",
  },
];

export const metadata = {
  title: "Contact Bridgepoint Maintenance | Canada and US Service Dispatch",
  description:
    "Contact Bridgepoint Maintenance across Canada and the US. 24/7 emergency dispatch. Request routine or scheduled service.",
};

// Map centered on continental North America (no specific marker pin).
const MAP_EMBED_SRC =
  "https://www.google.com/maps?q=&t=&z=3&ie=UTF8&iwloc=&ll=46,-96&output=embed";
const MAP_OPEN_URL =
  "https://www.google.com/maps/@46,-96,3z";

export default function ContactPage() {
  return (
    <>
      <SchemaJsonLd
        id="ld-breadcrumb-contact"
        data={breadcrumbSchema([
          { name: "Home", url: BRAND.url },
          { name: "Contact", url: `${BRAND.url}/contact` },
        ])}
      />

      <PageHero
        eyebrow="Contact"
        title={`Talk to ${BRAND.shortName} dispatch.`}
        description={`24/7 emergency dispatch. call ${NAP.phone}. For non-emergency requests, send the form below and a Bridgepoint dispatcher will respond.`}
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        image={IMAGES.edContactHero}
        imageAlt={IMAGES.edContactHeroAlt}
        size="compact"
        variant="editorial"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={NAP.phoneTel} className="btn-accent">
            <Phone className="h-4 w-4" />
            {NAP.phone}
          </a>
          <a
            href={`mailto:${NAP.email}`}
            className="btn-ghost-light"
          >
            <Mail className="h-4 w-4" />
            {NAP.email}
          </a>
        </div>
      </PageHero>

      {/* CONTACT METHOD STRIP */}
      <section className="bg-white">
        <div className="container-bp -mt-12 relative z-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 rounded-2xl border border-steel-100 bg-white p-6 shadow-elevated">
            {[
              {
                Icon: Phone,
                label: "24/7 Emergency",
                value: NAP.phone,
                href: NAP.phoneTel,
                accent: true,
              },
              {
                Icon: Mail,
                label: "Service inquiries",
                value: NAP.email,
                href: `mailto:${NAP.email}`,
              },
              {
                Icon: Clock,
                label: "Hours",
                value: NAP.hours.summary,
                sub: NAP.hours.office,
              },
            ].map(({ Icon, label, value, href, accent, sub }) => (
              <div key={label} className="flex items-start gap-4 p-3">
                <span
                  className={
                    accent
                      ? "inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-cyan-700 text-white"
                      : "inline-flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-navy-50 text-navy"
                  }
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-steel-500 mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-display text-base font-semibold text-navy hover:text-cyan-700 break-all"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-display text-base font-semibold text-navy">
                      {value}
                    </p>
                  )}
                  {sub && (
                    <p className="text-xs text-steel-500 mt-0.5">{sub}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIND LOCAL TECHNICIAN */}
      <section className="bg-cream-100 section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Coverage check"
              title="Find a local Bridgepoint technician."
              description="Drop in your city or postal/zip code and we will confirm coverage and route you to the closest dispatch zone. Service available across Canada and the US."
            />
          </div>
          <div className="lg:col-span-7">
            <FindLocalTechnician />
          </div>
        </div>
      </section>

      {/* FORM + DETAILS */}
      <section className="bg-white section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Request service"
              title="Tell us what's happening."
              description="Send the form and a Bridgepoint dispatcher will respond. For active emergencies, call the dispatch line directly. fastest response."
              className="mb-8"
            />
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-5">
            <div className="overflow-hidden rounded-2xl border border-steel-100 bg-white shadow-soft">
              <div className="p-6 border-b border-steel-100">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-2">
                  Service desk
                </p>
                <p className="font-display text-lg font-semibold text-navy">
                  North American dispatch
                </p>
                <address className="not-italic text-sm text-steel-500 mt-2 leading-6">
                  Continental Canada and US coverage. 24/7 live dispatcher routes every call to the closest licensed trade.
                </address>
                <a
                  href={MAP_OPEN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-cyan-700"
                >
                  Open coverage map
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="aspect-[4/3] w-full bg-steel-100">
                <iframe
                  title="Bridgepoint Maintenance coverage. Continental Canada and US"
                  src={MAP_EMBED_SRC}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                />
              </div>
            </div>

            <div className="card">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-800 mb-4">
                Response expectations
              </h3>
              <ul className="space-y-3 text-sm text-steel-700">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                  <span>
                    Emergency dispatch. 24/7. Call directly for fastest
                    response.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                  <span>
                    Non-emergency requests. same-business-day response during
                    office hours.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                  <span>Quote requests. typically 1-2 business days.</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 flex-none text-cyan-700" />
                  <span>
                    Portfolio onboarding. requires intake call to scope
                    service.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* WHAT TO EXPECT — dark editorial band */}
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <Image
          src={IMAGES.editorialDoor}
          alt={IMAGES.editorialDoorAlt}
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
              From first call to closeout
            </p>
            <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Live dispatcher answers. Trade rolls. Photo log lands in your inbox.
            </h2>
            <p className="mt-5 max-w-2xl text-base text-white/85 leading-relaxed">
              Every call routes through the same desk. The dispatcher captures the address, the issue, and the property type, then writes the work order against the right trade line. The licensed trade rolls with the work order on the truck, scopes on site, and closes out with photos and a line-item invoice.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {[
                { k: "24 / 7", v: "Live dispatch line" },
                { k: "Same", v: "Day standard reply" },
                { k: "Licensed", v: "Trade on every visit" },
                { k: "100%", v: "Photo closeout" },
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

      {/* CONTACT FAQ */}
      <section className="bg-steel-50/40 section">
        <div className="container-bp grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Contact FAQ"
              title="Common questions before you call."
              description="If your question isn't here, talk to a Bridgepoint dispatcher. We answer live."
            />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={NAP.phoneTel} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call dispatch
              </a>
              <Link href="/quote" className="btn-secondary">
                Request a quote
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            <FaqAccordion items={CONTACT_FAQ} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
