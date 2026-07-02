import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getService } from "@/lib/services";
import {
  BRIDGEPOINT,
  buildConfirmationEmail,
  buildLeadAlert,
  type ContactSubmission,
} from "@/lib/contact-email";

export const runtime = "nodejs";

// Simple per-IP rate limit (in-memory; resets on cold start).
const hits = new Map<string, { n: number; reset: number }>();
const WINDOW = 60 * 60 * 1000;
const MAX = 6;
function limited(ip: string): boolean {
  const now = Date.now();
  const r = hits.get(ip);
  if (!r || now > r.reset) {
    hits.set(ip, { n: 1, reset: now + WINDOW });
    return false;
  }
  r.n += 1;
  return r.n > MAX;
}

const clean = (s: unknown, max = 2000) =>
  String(s ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

const PROPERTY_LABELS: Record<string, string> = {
  commercial: "Commercial",
  multifamily: "Multifamily / Condo",
  institutional: "Institutional",
  "property-management": "Property Management Portfolio",
  residential: "Residential",
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254);
  const phone = clean(body.phone, 40);
  const city = clean(body.city, 120);
  const serviceSlug = clean(body.service, 80);
  const urgency = clean(body.urgency, 40);
  const propertyType = clean(body.propertyType, 80);
  const message = clean(body.message, 4000);

  if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !phone) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  const submission: ContactSubmission = {
    name,
    email,
    phone,
    city,
    service: getService(serviceSlug)?.shortName || (serviceSlug === "other" ? "Other / not sure" : serviceSlug || "General inquiry"),
    urgency,
    propertyType: PROPERTY_LABELS[propertyType] || propertyType || "Not specified",
    message,
  };

  const resend = new Resend(process.env.RESEND_API_KEY);
  const brand = BRIDGEPOINT;
  const confirm = buildConfirmationEmail(brand, submission);
  const alert = buildLeadAlert(brand, submission);
  const fromBranded = `${brand.name} <${brand.fromEmail}>`;
  const fromFallback = `${brand.name} <onboarding@resend.dev>`;

  // 1) Internal lead alert. Never lose a lead: if the branded domain is not
  //    verified yet, retry from the Resend sandbox sender so the team is still notified.
  try {
    const { error } = await resend.emails.send({
      from: fromBranded,
      to: brand.leadInbox,
      replyTo: email,
      subject: alert.subject,
      html: alert.html,
    });
    if (error) throw new Error(JSON.stringify(error));
  } catch (e) {
    console.error("[contact] branded lead alert failed, retrying from sandbox:", e);
    try {
      await resend.emails.send({
        from: fromFallback,
        to: brand.leadInbox,
        replyTo: email,
        subject: alert.subject,
        html: alert.html,
      });
    } catch (e2) {
      console.error("[contact] sandbox lead alert also failed:", e2);
    }
  }

  // 2) Branded confirmation to the submitter. Requires the verified domain.
  //    If it fails (domain not verified), we still return success to the user;
  //    the lead alert above already captured the request.
  let confirmationSent = false;
  try {
    const { error } = await resend.emails.send({
      from: fromBranded,
      to: [email],
      replyTo: brand.replyTo,
      subject: confirm.subject,
      html: confirm.html,
      text: confirm.text,
    });
    if (error) throw new Error(JSON.stringify(error));
    confirmationSent = true;
  } catch (e) {
    console.error("[contact] branded confirmation failed (domain verified?):", e);
  }

  return NextResponse.json({ success: true, confirmationSent });
}
