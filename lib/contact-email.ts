// Branded contact-form confirmation + internal lead alert.
// Built per brand via a BrandEmailConfig so the rollout to other portfolio
// brands is just a new config + a new contextual copy map.
// Bridgepoint house style: institutional prose, no emojis, no dashes.

export type BrandEmailConfig = {
  name: string;
  logoUrl: string;
  site: string;
  phoneDisplay: string;
  phoneTel: string;
  fromEmail: string; // verified Resend sender, e.g. hello@bridgepointmaintenance.com
  replyTo: string;
  leadInbox: string[]; // who gets the internal alert
  address: string;
  // Trust-band items. NEVER put geography here (no province, no "Ontario", no
  // "Canada-only"). These are US + Canada brands that work locally; a local
  // confirmation speaks to service and responsiveness, not footprint.
  trustStrip: string[];
  colors: { navy: string; accent: string; emergency: string; cream: string; ink: string };
};

export const BRIDGEPOINT: BrandEmailConfig = {
  name: "Bridge Point Maintenance",
  logoUrl: "https://bridgepointmaintenance.com/bpm-logo-email.png",
  site: "bridgepointmaintenance.com",
  phoneDisplay: "1 855 910 9090",
  phoneTel: "+18559109090",
  fromEmail: "hello@bridgepointmaintenance.com",
  replyTo: "service@bridgepointmaintenance.com",
  leadInbox: ["service@bridgepointmaintenance.com", "media@bridgepointmaintenance.com"],
  address: "311 Bowes Road, Unit 401, Concord, ON L4K 2R6",
  trustStrip: ["24/7 EMERGENCY RESPONSE", "COMMERCIAL & RESIDENTIAL", "FAST LOCAL DISPATCH"],
  colors: {
    navy: "#0F2441",
    accent: "#23BDC8",
    emergency: "#E03131",
    cream: "#FFF9F6",
    ink: "#1F2933",
  },
};

export type ContactSubmission = {
  name: string;
  email: string;
  phone: string;
  city: string;
  service: string; // human readable
  urgency: "emergency" | "same-week" | "scheduled" | "quote" | string;
  propertyType: string; // human readable
  message: string;
};

// Contextual intro + next-step line, keyed off how urgent the request is.
function urgencyCopy(u: string): { intro: string; next: string; isEmergency: boolean } {
  switch (u) {
    case "emergency":
      return {
        intro:
          "Your emergency service request has been logged and our dispatch team has been alerted. For the fastest possible response, please call us now so we can mobilize a technician.",
        next: "A dispatcher is reviewing your request immediately.",
        isEmergency: true,
      };
    case "same-week":
      return {
        intro:
          "Thank you for your request. We have received the details and a Bridge Point coordinator will reach out to schedule a visit this week.",
        next: "Expect a call or email from our team within one business day.",
        isEmergency: false,
      };
    case "scheduled":
      return {
        intro:
          "Thank you for your request. We have received your scheduled and preventative maintenance details and will be in touch to arrange a time that works for you.",
        next: "A coordinator will follow up to confirm timing.",
        isEmergency: false,
      };
    case "quote":
      return {
        intro:
          "Thank you for your request. We have received your details and our estimating team will prepare a quote for the work you described.",
        next: "Expect your estimate within one to two business days.",
        isEmergency: false,
      };
    default:
      return {
        intro:
          "Thank you for contacting Bridge Point Maintenance. We have received your request and a member of our team will be in touch shortly.",
        next: "A coordinator will follow up with you soon.",
        isEmergency: false,
      };
  }
}

function row(label: string, value: string, c: BrandEmailConfig["colors"]): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 16px;font:600 12px/1.4 Arial,Helvetica,sans-serif;color:${c.ink};opacity:.6;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid #EEE;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:10px 16px;font:400 15px/1.5 Arial,Helvetica,sans-serif;color:${c.ink};border-bottom:1px solid #EEE">${value}</td>
  </tr>`;
}

const esc = (s: string) =>
  String(s || "").replace(/[<>&]/g, (m) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[m] as string));

export function buildConfirmationEmail(
  brand: BrandEmailConfig,
  s: ContactSubmission,
): { subject: string; html: string; text: string } {
  const c = brand.colors;
  const { intro, next, isEmergency } = urgencyCopy(s.urgency);

  const emergencyBlock = isEmergency
    ? `<tr><td style="padding:0 32px 10px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.emergency};border-radius:8px">
          <tr><td style="padding:16px 20px;text-align:center">
            <a href="tel:${brand.phoneTel}" style="font:700 18px/1.2 Arial,Helvetica,sans-serif;color:#fff;text-decoration:none">Call now ${brand.phoneDisplay}</a>
          </td></tr>
        </table>
      </td></tr>`
    : "";

  const summary = `<tr><td style="padding:8px 32px 4px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.cream};border:1px solid #F0E6DD;border-radius:8px">
        ${row("Service", esc(s.service), c)}
        ${row("Urgency", esc(humanUrgency(s.urgency)), c)}
        ${row("Property", esc(s.propertyType), c)}
        ${row("Location", esc(s.city), c)}
        ${row("Your note", esc(s.message), c)}
      </table>
    </td></tr>`;

  const html = `<!doctype html><html><body style="margin:0;background:${c.cream}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${c.cream};padding:32px 12px">
   <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #ECECEC;border-radius:14px;overflow:hidden">
      <tr><td style="padding:32px 32px 24px">
        <img src="${brand.logoUrl}" alt="${esc(brand.name)}" width="260" style="width:260px;max-width:72%;height:auto;display:block;border:0"/>
      </td></tr>
      <tr><td style="background:${c.navy};padding:13px 28px">
        <p style="margin:0;font:600 11px/1.5 Arial,Helvetica,sans-serif;color:#ffffff;letter-spacing:.13em;text-align:center">${brand.trustStrip.map(esc).join("&nbsp;&nbsp;&middot;&nbsp;&nbsp;")}</p>
      </td></tr>
      <tr><td style="padding:26px 32px 0">
        <h1 style="margin:0;font:700 25px/1.3 Georgia,'Times New Roman',serif;color:${c.navy}">Request received</h1>
        <p style="margin:14px 0 0;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:${c.ink}">Hello ${esc(firstName(s.name))},</p>
        <p style="margin:10px 0 18px;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:${c.ink}">${intro}</p>
      </td></tr>
      ${emergencyBlock}
      ${summary}
      <tr><td style="padding:22px 32px 0">
        <p style="margin:0;font:600 13px/1.5 Arial,Helvetica,sans-serif;color:${c.navy};text-transform:uppercase;letter-spacing:.06em">What happens next</p>
        <p style="margin:6px 0 0;font:400 15px/1.65 Arial,Helvetica,sans-serif;color:${c.ink}">${next}</p>
      </td></tr>
      <tr><td style="padding:26px 32px 32px">
        <hr style="border:none;border-top:1px solid #EEE;margin:0 0 16px"/>
        <p style="margin:0;font:400 13px/1.6 Arial,Helvetica,sans-serif;color:${c.ink};opacity:.75">
          ${esc(brand.name)}<br/>
          ${esc(brand.address)}<br/>
          <a href="tel:${brand.phoneTel}" style="color:${c.navy};text-decoration:none">${brand.phoneDisplay}</a> &nbsp;|&nbsp;
          <a href="https://${brand.site}" style="color:${c.navy};text-decoration:none">${brand.site}</a>
        </p>
        <p style="margin:12px 0 0;font:400 11px/1.5 Arial,Helvetica,sans-serif;color:${c.ink};opacity:.5">
          This is an automated confirmation of a request you submitted at ${brand.site}. You may reply to this email to reach our team directly.
        </p>
      </td></tr>
    </table>
   </td></tr>
  </table></body></html>`;

  const text = `Request received

Hello ${firstName(s.name)},

${intro}

Service: ${s.service}
Urgency: ${humanUrgency(s.urgency)}
Property: ${s.propertyType}
Location: ${s.city}
Your note: ${s.message}

What happens next: ${next}

${brand.name}
${brand.address}
${brand.phoneDisplay} | ${brand.site}`;

  const subject = isEmergency
    ? `We received your emergency request, ${firstName(s.name)} (${brand.name})`
    : `We received your request, ${firstName(s.name)} (${brand.name})`;

  return { subject, html, text };
}

export function buildLeadAlert(brand: BrandEmailConfig, s: ContactSubmission): {
  subject: string;
  html: string;
} {
  const c = brand.colors;
  const rows = [
    row("Name", esc(s.name), c),
    row("Email", `<a href="mailto:${esc(s.email)}">${esc(s.email)}</a>`, c),
    row("Phone", `<a href="tel:${esc(s.phone)}">${esc(s.phone)}</a>`, c),
    row("Service", esc(s.service), c),
    row("Urgency", esc(humanUrgency(s.urgency)), c),
    row("Property", esc(s.propertyType), c),
    row("Location", esc(s.city), c),
    row("Message", esc(s.message), c),
  ].join("");
  const flag = s.urgency === "emergency" ? " [EMERGENCY]" : "";
  return {
    subject: `New ${brand.name} request${flag}: ${s.name} (${s.service})`,
    html: `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border:1px solid #eee;border-radius:8px">
      <tr><td style="background:${c.navy};padding:14px 16px;font:700 15px Arial;color:#fff">New website request${flag}</td></tr>
      ${rows}
    </table>`,
  };
}

function firstName(full: string): string {
  return esc((full || "there").trim().split(/\s+/)[0]);
}
function humanUrgency(u: string): string {
  return (
    {
      emergency: "Emergency dispatch",
      "same-week": "Same week",
      scheduled: "Scheduled / preventative",
      quote: "Quote only",
    }[u] || u
  );
}
