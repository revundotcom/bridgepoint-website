import { BRAND, NAP, COMPLIANCE } from "@/lib/constants";

export const metadata = {
  title: "Accessibility (AODA) | Bridgepoint Maintenance",
  description:
    "Bridgepoint Maintenance's accessibility statement under the Accessibility for Ontarians with Disabilities Act (AODA).",
};

export default function AccessibilityPage() {
  return (
    <section className="bg-white">
      <div className="container-bp py-16 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emergency mb-3">
          Compliance
        </p>
        <h1 className="text-4xl font-bold text-navy mb-4">
          Accessibility (AODA)
        </h1>

        <div className="prose-bp">
          <p>{COMPLIANCE.aoda}</p>

          <h2>Our commitment</h2>
          <p>
            {BRAND.name} is committed to meeting the accessibility needs of
            people with disabilities in a timely manner, in accordance with the
            Accessibility for Ontarians with Disabilities Act, 2005 (AODA) and
            the Integrated Accessibility Standards Regulation (IASR).
          </p>

          <h2>Website accessibility</h2>
          <p>
            We aim to conform to WCAG 2.0 Level AA on this website and strive
            to provide content that is perceivable, operable, understandable,
            and robust for all users.
          </p>

          <h2>Service accessibility</h2>
          <p>
            Customers who require accessible communication formats or
            accessible service can contact us by phone or email. We will work
            with customers to provide accommodations on request.
          </p>

          <h2>Feedback and accommodations</h2>
          <p>
            For accessibility feedback or accommodation requests, contact us at{" "}
            <a href={`mailto:${NAP.email}`} className="text-navy hover:underline">
              {NAP.email}
            </a>{" "}
            or{" "}
            <a href={NAP.phoneTel} className="text-navy hover:underline">
              {NAP.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
