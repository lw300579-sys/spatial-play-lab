import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { HomeBelow } from "@/components/home/home-below";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SiteNav } from "@/components/ui/site-nav";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <>
      <a
        href="#apps"
        className="absolute left-4 top-4 z-[70] -translate-y-[200%] rounded-full border-2 border-charcoal bg-ochre px-4 py-3 font-mono text-sm font-semibold text-[var(--ochre-ink)] focus:translate-y-0 focus-visible:translate-y-0"
      >
        Skip to the apps
      </a>
      <ScrollProgress />
      <SiteNav currentPath="/" />
      <main className="flex-1">
        <Hero />
        <HomeBelow />
      </main>
    </>
  );
}
