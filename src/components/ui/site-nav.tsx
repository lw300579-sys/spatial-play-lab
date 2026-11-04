import { SITE } from "@/data/games";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const LINKS = [
  { href: "#apps", label: "Apps" },
  { href: "/testing", label: "Testing" },
  { href: "/resume", label: "Résumé" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6">
        <a
          href="#top"
          className="group inline-flex min-h-11 items-center gap-2.5 no-underline"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-charcoal bg-coral text-sm font-bold text-white"
            aria-hidden
          >
            {SITE.shortName}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-charcoal">
            <span className="sr-only">AS · </span>
            <span className="hidden min-[430px]:inline">{SITE.name}</span>
            <span className="min-[430px]:hidden">Ari</span>
          </span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="min-h-11 px-2 py-2 font-mono text-[0.62rem] uppercase tracking-wide text-charcoal/70 no-underline hover:text-charcoal sm:px-3 sm:text-xs"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
