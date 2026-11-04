import { FlagshipBands } from "@/components/flagships/flagship-bands";
import { HowItWorks } from "@/components/how/how-it-works";
import { ProductIndex } from "@/components/work/product-index";
import { Principles } from "@/components/craft/principles";
import { SignupSection } from "@/components/signup/signup-section";
import { BioContact } from "@/components/bio/bio-contact";
import { SiteFooter } from "@/components/bio/site-footer";
import { Reveal } from "@/components/ui/reveal";

export function HomeBelow({
  status,
}: {
  status: "in" | "error" | null;
}) {
  return (
    <>
      <Reveal>
        <FlagshipBands />
      </Reveal>
      <Reveal delay={60}>
        <ProductIndex />
      </Reveal>
      <Reveal delay={120}>
        <HowItWorks />
      </Reveal>
      <Reveal delay={60}>
        <Principles />
      </Reveal>
      <Reveal>
        <SignupSection status={status} />
      </Reveal>
      <Reveal delay={60}>
        <BioContact />
      </Reveal>
      <SiteFooter />
    </>
  );
}
