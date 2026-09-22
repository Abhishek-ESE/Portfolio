import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import { siteUrl } from "@/data/site-url";
import "./globals.css";

const geist = localFont({
  src: "../../public/fonts/geist.woff2",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../public/fonts/geist-mono.woff2",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

const title = `${site.name} — Embedded Software Engineer`;
const description =
  "Embedded software engineer building firmware for electric vehicles and connected devices. Explore Abhishek Agrahari’s work in EV systems, CAN, cellular connectivity and embedded product development.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  alternates: { canonical: "/" },
  keywords: [
    "Abhishek Agrahari",
    "Embedded Software Engineer",
    "EV Firmware",
    "Vehicle Connectivity",
    "Embedded C",
    "STM32",
    "TI MCU",
    "ESP32",
    "CAN bus",
    "FreeRTOS",
    "Vehicle Telematics",
  ],
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title,
    description,
    siteName: `${site.name} — Engineering Portfolio`,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4f5ef",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Embedded Software Engineer",
  description,
  email: `mailto:${site.email}`,
  url: siteUrl,
  sameAs: [site.linkedin, site.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Embedded Systems",
    "Electric Vehicles",
    "CAN Bus",
    "STM32",
    "ESP32",
    "TI Microcontrollers",
    "FreeRTOS",
    "Vehicle Telematics",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Dr. A.P.J. Abdul Kalam Technical University",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
