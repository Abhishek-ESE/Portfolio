import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jet = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet",
  display: "swap",
});

const description =
  "Abhishek Agrahari — Embedded Software Engineer and EV systems consultant. Firmware on TI MCU, STM32 and ESP32 for BMS, VCU and CAN vehicle intelligence, telematics and FOTA.";

export const metadata: Metadata = {
  metadataBase: new URL("https://abhishek-agrahari.vercel.app"),
  title: {
    default: `${site.name} — Embedded Software Engineer | EV Firmware`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "Embedded Software Engineer",
    "EV Firmware Developer",
    "Embedded EV Consultant",
    "STM32",
    "ESP32",
    "TI MCU",
    "CAN bus",
    "BMS",
    "VCU",
    "Vehicle Telematics",
    "AIS-140",
    "FreeRTOS",
    "FOTA",
    "Abhishek Agrahari",
  ],
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: `${site.name} — Embedded Software Engineer | EV Firmware`,
    description,
    siteName: `${site.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Embedded Software Engineer | EV Firmware`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
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
  url: "https://abhishek-agrahari.vercel.app",
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
    "Battery Management Systems",
    "STM32",
    "ESP32",
    "TI Microcontrollers",
    "FreeRTOS",
    "Vehicle Telematics",
    "AIS-140",
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
    <html lang="en" className={`${space.variable} ${inter.variable} ${jet.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
