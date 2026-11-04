import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/data/games";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  // optional: never block H1 LCP on the display face under slow networks
  display: "optional",
  weight: ["600"],
  // skip SOFT/WONK axes — they inflate the preload woff2 ~3× without changing the look much
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "optional",
  weight: ["400", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "optional",
  weight: ["400", "500"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F3EC" },
    { media: "(prefers-color-scheme: dark)", color: "#121211" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const themeBootScript = `(function(){try{var s=localStorage.getItem('theme');var d=s==='dark'||(s!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

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
      suppressHydrationWarning
      className={`${fraunces.variable} ${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="relative min-h-full font-sans text-charcoal">
        <JsonLd data={structuredData} />
        <div className="grain-overlay" aria-hidden="true" />
        <div className="paper-canvas flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
