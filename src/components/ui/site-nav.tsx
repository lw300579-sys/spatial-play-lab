import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SITE } from "@/data/games";

type ActiveRoute = "/" | "/testing" | "/resume" | "/privacy" | "/work";

export function SiteNav({ currentPath = "/" }: { currentPath?: ActiveRoute }) {
  const isHome = currentPath === "/";
  const links = [
    { href: isHome ? "#apps" : "/#apps", label: "Apps", active: currentPath === "/work" },
    { href: "/testing", label: "Testing", active: currentPath === "/testing" },
    { href: isHome ? "#contact" : "/#contact", label: "Contact", active: false },
  ] as const;

  const brandHref = isHome ? "#top" : "/";

  return (
    <header
      data-print-hide
      className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6">
        {isHome ? (
          <a
            href={brandHref}
            className="group inline-flex min-h-11 items-center gap-2.5 no-underline"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-charcoal bg-coral text-sm font-bold text-[var(--coral-ink)]"
              aria-hidden="true"
            >
              {SITE.shortName}
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-charcoal">
              <span className="sr-only">AS · </span>
              <span className="hidden min-[430px]:inline">{SITE.name}</span>
              <span className="min-[430px]:hidden">Ari</span>
            </span>
          </a>
        ) : (
          <Link
            href={brandHref}
            className="group inline-flex min-h-11 items-center gap-2.5 no-underline"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-charcoal bg-coral text-sm font-bold text-[var(--coral-ink)]"
              aria-hidden="true"
            >
              {SITE.shortName}
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-charcoal">
              <span className="sr-only">AS · </span>
              <span className="hidden min-[430px]:inline">{SITE.name}</span>
              <span className="min-[430px]:hidden">Ari</span>
            </span>
          </Link>
        )}
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
            {links.map((link) => {
              const cls = `inline-flex min-h-11 items-center px-2 py-2 font-mono text-[0.62rem] uppercase tracking-wide no-underline transition-colors sm:px-3 sm:text-xs ${
                link.active
                  ? "font-semibold text-charcoal underline decoration-2 underline-offset-4"
                  : "text-charcoal/75 hover:text-charcoal"
              }`;
              return link.href.startsWith("#") ? (
                <a key={link.label} href={link.href} className={cls}>
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={link.active ? "page" : undefined}
                  className={cls}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
