import { Hero } from "@/components/hero/hero";
import { FlagshipBands } from "@/components/flagships/flagship-bands";
import { HowItWorks } from "@/components/how/how-it-works";
import { ProductIndex } from "@/components/work/product-index";
import { Principles } from "@/components/craft/principles";
import { SignupSection } from "@/components/signup/signup-section";
import { BioContact } from "@/components/bio/bio-contact";
import { SiteFooter } from "@/components/bio/site-footer";
import { SiteNav } from "@/components/ui/site-nav";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ subscribed?: string | string[] }>;
}) {
  const query = await searchParams;
  const flag = Array.isArray(query.subscribed) ? query.subscribed[0] : query.subscribed;
  const status = flag === "1" ? "in" : flag === "0" ? "error" : null;

  return (
    <>
      <a
        href="#apps"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:border-2 focus:border-charcoal focus:bg-ochre focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
      >
        Skip to the apps
      </a>
      <ScrollProgress />
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <FlagshipBands />
        <ProductIndex />
        <HowItWorks />
        <Principles />
        <SignupSection status={status} />
        <BioContact />
        <SiteFooter />
      </main>
    </>
  );
}
