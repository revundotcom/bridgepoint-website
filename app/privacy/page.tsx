import { BRAND, NAP } from "@/lib/constants";

export const metadata = {
  title: "Privacy Policy | Bridgepoint Maintenance",
  description:
    "Bridgepoint Maintenance privacy policy. how we collect, use, and protect personal information in compliance with PIPEDA.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="bg-white">
      <div className="container-bp py-16 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emergency mb-3">
          Legal
        </p>
        <h1 className="text-4xl font-bold text-navy mb-4">Privacy Policy</h1>

        <div className="prose-bp">
          <p>
            {BRAND.name} ("Bridgepoint", "we", "us", or "our") respects your
            privacy and is committed to protecting your personal information in
            accordance with Canada's Personal Information Protection and
            Electronic Documents Act (PIPEDA), Ontario privacy law, and
            Canada's Anti-Spam Legislation (CASL).
          </p>

          <h2>Information we collect</h2>
          <p>
            We collect personal information you provide directly to us. name,
            phone number, email address, property address, service requests,
            and related information necessary to dispatch maintenance services
            and operate our business.
          </p>

          <h2>How we use information</h2>
          <ul>
            <li>To dispatch and complete maintenance services you request</li>
            <li>To communicate with you about service requests and follow-up</li>
            <li>To send service reminders and account notices (with consent)</li>
            <li>To meet legal, regulatory, and compliance obligations</li>
            <li>To improve our services and operations</li>
          </ul>

          <h2>Sharing of information</h2>
          <p>
            We share personal information only with our coordinated trades
            network, dispatch partners, and service providers as needed to
            deliver requested services. We do not sell personal information.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            Our website uses cookies and analytics tools (such as Google
            Analytics 4 and Google Tag Manager) to understand site usage and
            improve performance. You can manage cookie preferences in your
            browser.
          </p>

          <h2>Your rights under PIPEDA</h2>
          <p>
            You have the right to access, correct, and request deletion of
            personal information we hold about you, subject to legal and
            contractual exceptions. To exercise these rights, contact us at{" "}
            <a href={`mailto:${NAP.email}`} className="text-navy hover:underline">
              {NAP.email}
            </a>
            .
          </p>

          <h2>CASL consent</h2>
          <p>
            We send commercial electronic messages only with your express or
            implied consent. To withdraw consent, reply UNSUBSCRIBE to any of
            our emails or contact us at{" "}
            <a href={`mailto:${NAP.email}`} className="text-navy hover:underline">
              {NAP.email}
            </a>
            .
          </p>

          <h2>Data retention and security</h2>
          <p>
            We retain personal information only as long as necessary to fulfill
            the purposes for which it was collected and to comply with legal
            obligations. We implement reasonable safeguards to protect personal
            information.
          </p>

          <h2>Contact us</h2>
          <p>
            For privacy questions or to exercise your rights, contact:
            <br />
            {BRAND.name}
            <br />
            {NAP.address.full}
            <br />
            <a href={`mailto:${NAP.email}`} className="text-navy hover:underline">
              {NAP.email}
            </a>
            <br />
            <a href={NAP.phoneTel} className="text-navy hover:underline">
              {NAP.phone}
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
