import { DeviceBanner } from "@/components/hero/device-banner";
import { Hero } from "@/components/hero/hero";
import { GameMatrix } from "@/components/game-card/game-matrix";
import { Sandbox } from "@/components/sandbox/sandbox";
import { BioContact } from "@/components/bio/bio-contact";
import { SiteNav } from "@/components/ui/site-nav";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <>
      <a
        href="#games"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:border-2 focus:border-charcoal focus:bg-ochre focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to games
      </a>
      <ScrollProgress />
      <SiteNav />
      <DeviceBanner />
      <main className="flex-1">
        <Hero />
        <GameMatrix />
        <Sandbox />
        <BioContact />
      </main>
    </>
  );
}
