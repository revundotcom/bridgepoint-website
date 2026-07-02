import { writeFileSync } from "fs";
import { BRIDGEPOINT, buildConfirmationEmail, type ContactSubmission } from "../lib/contact-email";

const scenarios: Array<{ tag: string; s: ContactSubmission }> = [
  {
    tag: "emergency",
    s: { name: "Daniel Osei", email: "daniel@example.com", phone: "(416) 555-0142", city: "Toronto, ON", service: "Plumbing", urgency: "emergency", propertyType: "Multifamily / Condo", message: "Burst pipe flooding the basement of a 40 unit building. Water is spreading fast." },
  },
  {
    tag: "quote",
    s: { name: "Priya Sharma", email: "priya@example.com", phone: "(905) 555-0190", city: "Mississauga, ON", service: "HVAC", urgency: "quote", propertyType: "Commercial", message: "Need a quote to service rooftop units across two commercial plazas." },
  },
  {
    tag: "scheduled",
    s: { name: "Marcus Brown", email: "marcus@example.com", phone: "(647) 555-0110", city: "Vaughan, ON", service: "General Maintenance", urgency: "scheduled", propertyType: "Property Management Portfolio", message: "Setting up quarterly preventative maintenance across 12 managed properties." },
  },
];

for (const { tag, s } of scenarios) {
  const { subject, html } = buildConfirmationEmail(BRIDGEPOINT, s);
  // point the logo at the localhost-served copy for local preview only
  const local = html.replace(
    "https://bridgepointmaintenance.com/bpm-logo-email.png",
    "http://localhost:8347/bpm-logo-email.png",
  );
  writeFileSync(`/tmp/bpm-email-${tag}.html`, local);
  console.log(`${tag}: ${subject}  -> /tmp/bpm-email-${tag}.html`);
}
