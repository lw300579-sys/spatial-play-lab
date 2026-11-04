import { NewsletterForm } from "@/components/newsletter-form";
import { newsletterActionReady } from "@/lib/newsletter";

export function SignupSection({ status }: { status?: "in" | "error" | null }) {
  return (
    <section id="signup" className="scroll-mt-28 border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Get an email when I ship something
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal/80">
          New app or a big update, that&apos;s it. Maybe once a month. No spam, I don&apos;t have time either.
        </p>
        <div className="mt-6">
          <NewsletterForm id="newsletter-home" status={status} ready={newsletterActionReady()} />
        </div>
      </div>
    </section>
  );
}
