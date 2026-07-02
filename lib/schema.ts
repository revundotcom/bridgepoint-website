import { BRAND, NAP, SOCIAL } from "./constants";
import { CITIES } from "./cities";
import { SERVICES } from "./services";

// Portfolio parent: Northstone Holdings (operating-brand bridge under Rothenbury Group).
const PARENT_ORG = {
  "@type": "Organization",
  "@id": "https://northstoneholdings.com/#organization",
  name: "Northstone Holdings",
  url: "https://northstoneholdings.com",
};

export function localBusinessSchema() {
 return {
 "@context": "https://schema.org",
 "@graph": [
 {
 "@type": "Organization",
 "@id": `${BRAND.url}/#organization`,
 name: BRAND.name,
 url: BRAND.url,
 logo: {
 "@type": "ImageObject",
 "@id": `${BRAND.url}/#logo`,
 url: `${BRAND.url}/assets/logo.png`,
 contentUrl: `${BRAND.url}/assets/logo.png`,
 caption: BRAND.name,
 },
 image: { "@id": `${BRAND.url}/#logo` },
 telephone: NAP.phoneE164,
 email: NAP.email,
 address: {
 "@type": "PostalAddress",
 streetAddress: "311 Bowes Road, Unit 401",
 addressLocality: "Concord",
 addressRegion: "ON",
 postalCode: "L4K 2R6",
 addressCountry: "CA",
 },
 contactPoint: [
 {
 "@type": "ContactPoint",
 telephone: NAP.phoneE164,
 contactType: "customer service",
 availableLanguage: ["en"],
 areaServed: ["CA", "US"],
 },
 ],
 parentOrganization: PARENT_ORG,
 sameAs: Object.values(SOCIAL).filter((u) => typeof u === "string" && u.length > 0),
 },
 {
 "@type": [
 "LocalBusiness",
 "GeneralContractor",
 "Plumber",
 "HVACBusiness",
 "Electrician",
 ],
 "@id": `${BRAND.url}/#localbusiness`,
 name: BRAND.name,
 alternateName: BRAND.shortName,
 description:
 "General contracting and emergency maintenance company operating across Canada and the US. Licensed plumbing, electrical, HVAC, and building services with 24/7 emergency response for property managers, commercial owners, multifamily operators, and institutional clients.",
 url: BRAND.url,
 telephone: NAP.phoneE164,
 email: NAP.email,
 priceRange: "$$",
 currenciesAccepted: "CAD",
 paymentAccepted:
 "Cash, Credit Card, Cheque, EFT, Invoice (Net-30 for commercial accounts)",
 address: {
 "@type": "PostalAddress",
 addressRegion: "North America",
 addressCountry: ["CA", "US"],
 },
 geo: {
 "@type": "GeoCoordinates",
 latitude: NAP.address.geo.lat,
 longitude: NAP.address.geo.lng,
 },
 hasMap: `https://www.google.com/maps/@46,-96,3z`,
 openingHoursSpecification: [
 {
 "@type": "OpeningHoursSpecification",
 dayOfWeek: [
 "Monday",
 "Tuesday",
 "Wednesday",
 "Thursday",
 "Friday",
 "Saturday",
 "Sunday",
 ],
 opens: "00:00",
 closes: "23:59",
 },
 ],
 areaServed: [
 { "@type": "AdministrativeArea", name: "Ontario, Canada" },
 ...CITIES.map((c) => ({
 "@type": "City",
 name: c.name,
 containedInPlace: {
 "@type": "AdministrativeArea",
 name: "Ontario",
 },
 })),
 ],
 serviceArea: {
 "@type": "GeoCircle",
 geoMidpoint: {
 "@type": "GeoCoordinates",
 latitude: NAP.address.geo.lat,
 longitude: NAP.address.geo.lng,
 },
 geoRadius: "120000",
 },
 sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin],
 hasOfferCatalog: {
 "@type": "OfferCatalog",
 name: "Bridgepoint Maintenance Services",
 itemListElement: SERVICES.map((s) => ({
 "@type": "Offer",
 itemOffered: {
 "@type": "Service",
 name: s.name,
 description: s.tagline,
 serviceType: s.shortName,
 areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
 provider: { "@id": `${BRAND.url}/#localbusiness` },
 },
 })),
 },
 },
 {
 "@type": "WebSite",
 "@id": `${BRAND.url}/#website`,
 url: BRAND.url,
 name: BRAND.name,
 publisher: { "@id": `${BRAND.url}/#organization` },
 inLanguage: "en-CA",
 },
 {
 "@type": "ContactPoint",
 "@id": `${BRAND.url}/#contact-emergency`,
 contactType: "Emergency Dispatch",
 telephone: NAP.phoneE164,
 availableLanguage: ["en-CA", "en"],
 areaServed: "CA-ON",
 hoursAvailable: {
 "@type": "OpeningHoursSpecification",
 dayOfWeek: [
 "Monday",
 "Tuesday",
 "Wednesday",
 "Thursday",
 "Friday",
 "Saturday",
 "Sunday",
 ],
 opens: "00:00",
 closes: "23:59",
 },
 },
 ],
 };
}

export function serviceSchema(serviceName: string, description: string) {
 return {
 "@context": "https://schema.org",
 "@type": "Service",
 name: serviceName,
 description,
 provider: { "@id": `${BRAND.url}/#localbusiness` },
 areaServed: { "@type": "AdministrativeArea", name: "Ontario" },
 };
}

export function faqSchema(faq: { q: string; a: string }[]) {
 return {
 "@context": "https://schema.org",
 "@type": "FAQPage",
 mainEntity: faq.map((item) => ({
 "@type": "Question",
 name: item.q,
 acceptedAnswer: { "@type": "Answer", text: item.a },
 })),
 };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
 return {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: items.map((item, i) => ({
 "@type": "ListItem",
 position: i + 1,
 name: item.name,
 item: item.url,
 })),
 };
}
