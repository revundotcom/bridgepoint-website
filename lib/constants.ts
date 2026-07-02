export const BRAND = {
  name: "Bridgepoint Maintenance",
  shortName: "Bridgepoint",
  wordmark: "BRIDGEPOINT",
  legalEntity: "Bridgepoint Maintenance Inc.",
  tagline: "Home-service dispatch across Canada and the US.",
  taglineLong: "One service line for plumbing, HVAC, electrical, drain, sewer, and building repairs.",
  domain: "bridgepointmaintenance.com",
  url: "https://bridgepointmaintenance.com",
} as const;

export const NAP = {
  name: "Bridgepoint Maintenance",
  phone: "1-855-910-9090",
  phoneE164: "+18559109090",
  phoneTel: "tel:+18559109090",
  email: "service@bridgepointmaintenance.com",
  emergencyEmail: "emergency@bridgepointmaintenance.com",
  careersEmail: "careers@bridgepointmaintenance.com",
  address: {
    line1: "Continental Canada and US",
    streetNumber: "",
    city: "",
    region: "North America",
    regionFull: "North America",
    postalCode: "",
    country: "",
    countryCode: "",
    full: "North American dispatch. Continental Canada and US.",
    geo: { lat: 46, lng: -96 },
  },
  hours: {
    summary: "24/7 emergency dispatch",
    office: "Mon-Fri 8:00am-6:00pm ET, Sat 9:00am-2:00pm ET",
    detailed: [
      { day: "Monday", hours: "Open 24 hours" },
      { day: "Tuesday", hours: "Open 24 hours" },
      { day: "Wednesday", hours: "Open 24 hours" },
      { day: "Thursday", hours: "Open 24 hours" },
      { day: "Friday", hours: "Open 24 hours" },
      { day: "Saturday", hours: "Open 24 hours" },
      { day: "Sunday", hours: "Open 24 hours" },
    ],
  },
} as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/bridgepointmaintenance",
  instagram: "https://www.instagram.com/bridgepointmaintenance",
  linkedin: "https://www.linkedin.com/company/bridgepointmaintenance",
  youtube: "https://www.youtube.com/@bridgepointmaintenance",
  tiktok: "https://www.tiktok.com/@bridgepointmaintenance",
  x: "https://x.com/bridgepointmtn",
  pinterest: "https://www.pinterest.com/bridgepointmaintenance",
  threads: "https://www.threads.net/@bridgepointmaintenance",
  bluesky: "https://bsky.app/profile/bridgepointmaintenance.bsky.social",
} as const;

export const SOCIAL_LIST = Object.entries(SOCIAL).map(([key, url]) => ({
  key,
  url,
  label: key.charAt(0).toUpperCase() + key.slice(1),
}));

export const NAV_PRIMARY = [
  { href: "/services", label: "Services" },
  { href: "/property-managers", label: "Property Managers" },
  { href: "/locations", label: "Service Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/help", label: "Help" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const COMPLIANCE = {
  aoda:
    "Bridgepoint Maintenance is committed to providing accessible service to all customers in compliance with the Accessibility for Ontarians with Disabilities Act (AODA). For accessibility accommodations, contact us at service@bridgepointmaintenance.com or 1-855-910-9090.",
  casl:
    "By submitting this form, you consent to receive electronic communications from Bridgepoint Maintenance regarding your service request and related services. You may withdraw consent at any time by replying UNSUBSCRIBE or contacting us at service@bridgepointmaintenance.com. We comply with Canada's Anti-Spam Legislation (CASL).",
  pipeda:
    "Bridgepoint Maintenance collects and uses personal information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA). See our Privacy Policy for details on how we handle your data.",
} as const;
