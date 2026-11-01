import { SITE } from "@/data/games";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter({ status }: { status?: "in" | "error" | null }) {
  return (
    <footer className="px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t-2 border-charcoal/15 pt-8">
        <div className="max-w-md">
          <p className="font-mono text-[0.7rem] text-charcoal">Get an email when I ship something.</p>
          <div className="mt-3">
            <NewsletterForm id="newsletter-footer" compact status={status} />
          </div>
        </div>
        <p className="font-mono text-[0.7rem] leading-relaxed text-muted">
          {SITE.name} · I build browser apps you control by moving. ·{" "}
          <a className="text-cobalt" href="/evidence">Notes</a>
          {" · "}
          <a className="text-cobalt" href="/privacy">Privacy</a>
          {" · "}
          <a className="text-cobalt" href={SITE.socials[0].href}>X</a>
          {" · "}
          <a className="text-cobalt" href={SITE.socials[1].href}>GitHub</a>
        </p>
        <a href="#top" className="font-mono text-[0.7rem] uppercase tracking-wider text-cobalt no-underline">
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}
