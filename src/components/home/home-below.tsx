import { BioContact } from "@/components/bio/bio-contact";
import { SiteFooter } from "@/components/bio/site-footer";
import { Principles } from "@/components/craft/principles";
import { FlagshipBands } from "@/components/flagships/flagship-bands";
import { HowItWorks } from "@/components/how/how-it-works";
import { SignupSection } from "@/components/signup/signup-section";
import { Reveal } from "@/components/ui/reveal";
import { ProductIndex } from "@/components/work/product-index";

export function HomeBelow() {
  return (
    <>
      <FlagshipBands />
      <ProductIndex />
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Principles />
      </Reveal>
      <Reveal>
        <SignupSection />
      </Reveal>
      <Reveal>
        <BioContact />
      </Reveal>
      <SiteFooter isHome />
    </>
  );
}
