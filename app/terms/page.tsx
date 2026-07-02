import { BRAND, NAP } from "@/lib/constants";

export const metadata = {
  title: "Terms of Service | Bridgepoint Maintenance",
  description:
    "Terms of service for Bridgepoint Maintenance. service terms, dispatch terms, limitation of liability, and Ontario governing law.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <section className="bg-white">
      <div className="container-bp py-16 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emergency mb-3">
          Legal
        </p>
        <h1 className="text-4xl font-bold text-navy mb-4">Terms of Service</h1>

        <div className="prose-bp">
          <h2>Acceptance of terms</h2>
          <p>
            By using {BRAND.name}'s website or services, you agree to these
            Terms of Service. If you do not agree, do not use our website or
            services.
          </p>

          <h2>Services</h2>
          <p>
            {BRAND.name} provides general contracting and emergency maintenance
            services through a coordinated trades network across Ontario. All
            services are subject to a separate service agreement, work order,
            or scope-of-work confirmation.
          </p>

          <h2>Emergency dispatch</h2>
          <p>
            Our 24/7 emergency dispatch line at{" "}
            <a href={NAP.phoneTel} className="text-navy hover:underline">
              {NAP.phone}
            </a>{" "}
            connects you with our coordination team. Response times depend on
            location, traffic, current call volume, and trade availability.
            Estimated arrival times are confirmed at intake; we do not
            guarantee specific arrival times.
          </p>

          <h2>Estimates and pricing</h2>
          <p>
            Free estimates are provided for non-emergency work. Emergency
            dispatch fees may apply for urgent after-hours service and will be
            quoted before service begins. Final pricing is subject to scope
            confirmation on site.
          </p>

          <h2>Licensing and compliance</h2>
          <p>
            Bridgepoint dispatches licensed Ontario trades. Specific license
            numbers (ESA, TSSA, plumbing) are documented on applicable work
            orders and available on request.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {BRAND.name}'s liability is
            limited as set out in the applicable service agreement or work
            order. We are not liable for indirect, incidental, special, or
            consequential damages.
          </p>

          <h2>Website use</h2>
          <p>
            Website content is provided for general information only. We make
            reasonable efforts to keep information accurate but make no
            warranties about completeness or accuracy. Maintenance, repair, and
            code-compliance information on this site is general and not a
            substitute for professional consultation.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All content on this website. including text, graphics, logos, and
            images. is the property of {BRAND.name} or its licensors and is
            protected under Canadian and international copyright and trademark
            laws.
          </p>

          <h2>Governing law</h2>
          <p>
            These Terms are governed by the laws of the Province of Ontario and
            the federal laws of Canada applicable in Ontario. Any disputes are
            subject to the exclusive jurisdiction of the courts of Ontario.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these Terms from time to time. Updates will be
            reflected by a revised "last updated" date below.
          </p>

          <h2>Contact</h2>
          <p>
            {BRAND.name}
            <br />
            {NAP.address.full}
            <br />
            <a href={`mailto:${NAP.email}`} className="text-navy hover:underline">
              {NAP.email}
            </a>
          </p>

          <p className="text-xs text-steel-600 mt-10">
            Last updated: 2026.
          </p>
        </div>
      </div>
    </section>
  );
}
