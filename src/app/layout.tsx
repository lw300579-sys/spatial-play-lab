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
    default: "Ari Swerdlow · Product engineer",
    template: "%s · Ari Swerdlow",
  },
  description:
    "I build browser games and training apps you control with your body. No install. Just a link and a camera.",
  keywords: [
    "Ari Swerdlow",
    "browser games",
    "computer vision",
    "camera apps",
    "portfolio",
  ],
  authors: [{ name: "Ari Swerdlow" }],
  openGraph: {
    title: "Ari Swerdlow",
    description: "Browser apps you control by moving.",
    type: "website",
    url: siteUrl,
    siteName: "Ari Swerdlow",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ari Swerdlow",
    description: "Browser apps you control by moving.",
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
        jobTitle: "Product engineer",
        sameAs: SITE.socials.map((social) => social.href),
        knowsAbout: [
          "computer vision",
          "browser games",
          "pose tracking",
          "MediaPipe",
          "TensorFlow.js",
          "Three.js",
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
