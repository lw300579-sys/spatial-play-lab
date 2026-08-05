import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
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

const siteUrl = "https://spatial-play-lab.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Spatial Play Lab — Browser AR & Computer Vision",
    template: "%s · Spatial Play Lab",
  },
  description:
    "Interactive browser-based mobile AR games, computer vision experiments, and physical computing web apps. Swing, punch, sign, and play—no app store required.",
  keywords: [
    "WebXR",
    "browser AR",
    "MediaPipe",
    "computer vision",
    "pose tracking",
    "ASL",
    "interactive portfolio",
  ],
  authors: [{ name: "Spatial Play Lab" }],
  openGraph: {
    title: "Spatial Play Lab",
    description:
      "Browser AR tennis, shadow boxing, ASL training, and biomechanics coaching—running live in your phone camera.",
    type: "website",
    url: siteUrl,
    siteName: "Spatial Play Lab",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spatial Play Lab",
    description:
      "Browser AR that moves with you—games, boxing, ASL, biomechanics.",
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
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="relative min-h-full font-sans text-charcoal">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="paper-canvas flex min-h-full flex-col">{children}</div>
      </body>
    </html>
  );
}
