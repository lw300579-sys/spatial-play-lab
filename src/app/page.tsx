import { DeviceBanner } from "@/components/hero/device-banner";
import { Hero } from "@/components/hero/hero";
import { GameMatrix } from "@/components/game-card/game-matrix";
import { Sandbox } from "@/components/sandbox/sandbox";
import { BioContact } from "@/components/bio/bio-contact";

export default function Home() {
  return (
    <>
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
