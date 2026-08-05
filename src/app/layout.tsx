import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Spatial Play Lab — Browser AR & Computer Vision",
  description:
    "Interactive browser-based mobile AR games, computer vision experiments, and physical computing web apps. Swing, punch, sign, and play—no app store required.",
  openGraph: {
    title: "Spatial Play Lab",
    description:
      "Browser AR tennis, shadow boxing, ASL training, and biomechanics coaching—running live in your phone camera.",
    type: "website",
  },
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
