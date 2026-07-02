import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SchemaJsonLd from "@/components/SchemaJsonLd";
import Analytics from "@/components/Analytics";
import { localBusinessSchema } from "@/lib/schema";
import { BRAND } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const interDisplay = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: `${BRAND.name} | Property Maintenance Canada + US`,
    template: `%s | ${BRAND.name}`,
  },
  description:
    "24/7 property maintenance across Canada and the US. Licensed plumbing, HVAC, electrical, drain, and building repairs. Call 1-855-910-9090.",
  keywords: [
    "US Canada home services",
    "North American maintenance company",
    "property maintenance USA Canada",
    "emergency plumber New York",
    "HVAC Miami",
    "commercial electrical Houston",
    "property management maintenance",
    "Bridgepoint Maintenance",
    "24/7 emergency repair",
  ],
  authors: [{ name: BRAND.name }],
  alternates: { canonical: "https://www.bridgepointmaintenance.com" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: BRAND.url,
    siteName: BRAND.name,
    title: `${BRAND.name} | Property Maintenance Canada + US`,
    description:
      "24/7 property maintenance across Canada and the US. Licensed plumbing, HVAC, electrical, drain, and building repairs.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Bridgepoint Maintenance | Property maintenance across Canada and the US",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} | Property Maintenance Canada + US`,
    description:
      "24/7 property maintenance across Canada and the US. Licensed plumbing, HVAC, electrical, drain, and building repairs.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA" className={`${inter.variable} ${interDisplay.variable}`}>
      <head>
        <SchemaJsonLd
          id="ld-localbusiness"
          data={localBusinessSchema()}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-53J6THCN');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* GA4 fallback gtag.js */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QGWNVC0N6P" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-QGWNVC0N6P');`,
          }}
        />
      </head>
      <body className="pb-14 lg:pb-0">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-53J6THCN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Analytics />
      </body>
    </html>
  );
}
