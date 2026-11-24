import Link from "next/link";
import { SITE } from "@/data/games";

export function SiteFooter({ isHome = false }: { isHome?: boolean }) {
  return (
    <footer data-print-hide className="px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 border-t-2 border-charcoal/15 pt-8">
        <p className="font-mono text-[0.7rem] leading-relaxed text-muted">
          {SITE.name} · I build browser apps you control by moving. ·{" "}
          <Link className="text-cobalt underline-offset-2 hover:underline" href="/testing">
            Testing
          </Link>
          {" · "}
          <Link className="text-cobalt underline-offset-2 hover:underline" href="/resume">
            Resume
          </Link>
          {" · "}
          <Link className="text-cobalt underline-offset-2 hover:underline" href="/privacy">
            Privacy
          </Link>
          {" · "}
          <a
            className="text-cobalt underline-offset-2 hover:underline"
            href={SITE.socials[0].href}
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          {" · "}
          <a
            className="text-cobalt underline-offset-2 hover:underline"
            href={SITE.socials[1].href}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4">
          {isHome ? (
            <a
              href="#signup"
              className="inline-flex min-h-11 items-center font-mono text-[0.7rem] text-cobalt no-underline hover:underline"
            >
              Get an email when I ship something →
            </a>
          ) : (
            <Link
              href="/#signup"
              className="inline-flex min-h-11 items-center font-mono text-[0.7rem] text-cobalt no-underline hover:underline"
            >
              Get an email when I ship something →
            </Link>
          )}
          {isHome ? (
            <a
              href="#top"
              className="inline-flex min-h-11 items-center font-mono text-[0.7rem] uppercase tracking-wider text-cobalt no-underline hover:underline"
            >
              ↑ Back to top
            </a>
          ) : (
            <Link
              href="/"
              className="inline-flex min-h-11 items-center font-mono text-[0.7rem] uppercase tracking-wider text-cobalt no-underline hover:underline"
            >
              ← Back to portfolio
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
