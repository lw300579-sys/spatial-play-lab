import dynamic from "next/dynamic";
import { FlagshipBands } from "@/components/flagships/flagship-bands";
import { HowItWorks } from "@/components/how/how-it-works";
import { ProductIndex } from "@/components/work/product-index";
import { Principles } from "@/components/craft/principles";
import { BioContact } from "@/components/bio/bio-contact";
import { SiteFooter } from "@/components/bio/site-footer";
import { RevealBoot } from "@/components/ui/reveal-boot";

const SignupSection = dynamic(() =>
  import("@/components/signup/signup-section").then((mod) => mod.SignupSection),
);

export function HomeBelow({
  status,
}: {
  status: "in" | "error" | null;
}) {
  return (
    <>
      <RevealBoot />
      {/* First real content stays visible without scroll / without waiting on reveal JS. */}
      <FlagshipBands />
      <div className="reveal" data-reveal>
        <ProductIndex />
      </div>
      <div className="reveal" data-reveal style={{ transitionDelay: "60ms" }}>
        <HowItWorks />
      </div>
      <div className="reveal" data-reveal style={{ transitionDelay: "60ms" }}>
        <Principles />
      </div>
      <div className="reveal" data-reveal>
        <SignupSection status={status} />
      </div>
      <div className="reveal" data-reveal style={{ transitionDelay: "60ms" }}>
        <BioContact />
      </div>
      <SiteFooter />
    </>
  );
}
