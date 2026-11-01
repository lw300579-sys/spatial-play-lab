import { SITE } from "@/data/games";

const LINKS = [
  { href: "#apps", label: "Work" },
  { href: "/evidence", label: "Notes" },
  { href: "/resume", label: "Résumé" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b-2 border-charcoal bg-paper/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5 no-underline" aria-label="Ari Swerdlow, home">
          <span
            className="flex h-8 w-8 items-center justify-center border-2 border-charcoal bg-coral text-sm font-bold text-white"
            aria-hidden
          >
            {SITE.shortName}
          </span>
          <span className="hidden font-display text-lg font-semibold tracking-tight text-charcoal min-[430px]:inline">
            {SITE.name}
          </span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-2 py-1.5 font-mono text-[0.62rem] uppercase tracking-wide text-charcoal/70 no-underline hover:text-charcoal sm:px-3 sm:text-xs"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
