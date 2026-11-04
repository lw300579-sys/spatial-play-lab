import Link from "next/link";
import { SITE } from "@/data/games";

export function SiteFooter() {
  return (
    <footer className="px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t-2 border-charcoal/15 pt-8">
        <p className="font-mono text-[0.7rem] leading-relaxed text-muted">
          {SITE.name} · I build browser apps you control by moving. ·{" "}
          <Link className="text-cobalt" href="/testing">
            Testing
          </Link>
          {" · "}
          <Link className="text-cobalt" href="/privacy">
            Privacy
          </Link>
          {" · "}
          <a className="text-cobalt" href={SITE.socials[0].href}>
            X
          </a>
          {" · "}
          <a className="text-cobalt" href={SITE.socials[1].href}>
            GitHub
          </a>
        </p>
        <Link
          href="/#signup"
          className="font-mono text-[0.7rem] text-cobalt no-underline hover:underline"
        >
          Get an email when I ship something →
        </Link>
        <a href="#top" className="font-mono text-[0.7rem] uppercase tracking-wider text-cobalt no-underline">
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}
