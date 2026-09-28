import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/data/games";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://ari-swerdlow.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ari Swerdlow · Camera-First Product Engineer",
    template: "%s · Ari Swerdlow",
  },
  description:
    "Ari Swerdlow builds camera-first products at the intersection of computer vision, game systems, and product design—from browser fitness and AR baseball to sports intelligence.",
  keywords: [
    "Ari Swerdlow",
    "WebXR",
    "browser AR",
    "MediaPipe",
    "computer vision",
    "pose tracking",
    "ASL",
    "portfolio",
  ],
  authors: [{ name: "Ari Swerdlow" }],
  openGraph: {
    title: "Ari Swerdlow",
    description:
      "Camera-first product engineering: browser fitness, AR baseball, and sports intelligence from ordinary video.",
    type: "website",
    url: siteUrl,
    siteName: "Ari Swerdlow",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ari Swerdlow",
    description:
      "Camera-first product engineering across browser fitness, AR games, coaching, and sports intelligence.",
    creator: "@2Swerdy",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#FFFDF7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: SITE.name,
        url: siteUrl,
        email: `mailto:${SITE.email}`,
        jobTitle: "Product Engineer · Applied Computer Vision",
        sameAs: SITE.socials.map((social) => social.href),
        knowsAbout: [
          "Computer vision",
          "Browser-based augmented reality",
          "Game systems",
          "Human-computer interaction",
          "Sports intelligence",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: `${SITE.name} portfolio`,
        url: siteUrl,
        description: metadata.description,
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="relative min-h-full font-sans text-charcoal">
        <JsonLd data={structuredData} />
        <div className="grain-overlay" aria-hidden="true" />
        <div className="paper-canvas flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
