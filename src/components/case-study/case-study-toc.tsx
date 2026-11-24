"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  readonly id: string;
  readonly label: string;
}

export function CaseStudyToc({ items }: { items: readonly TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <details data-print-hide className="mb-8 border border-charcoal/20 bg-surface-raised p-4 xl:hidden">
        <summary className="cursor-pointer font-mono text-xs uppercase tracking-wider text-charcoal">
          On this page
        </summary>
        <ul className="mt-3 space-y-2 border-l border-charcoal/15 pl-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="inline-flex min-h-9 items-center font-mono text-xs uppercase tracking-wide text-muted no-underline hover:text-charcoal"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </details>

      <aside data-print-hide className="hidden xl:block">
        <nav className="sticky top-28" aria-label="On this page">
          <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
            On this page
          </p>
          <ul className="space-y-2 border-l border-charcoal/15 pl-3">
            {items.map((item) => {
              const active = item.id === activeId;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active ? "location" : undefined}
                    className={`block py-0.5 font-mono text-[0.68rem] uppercase tracking-wide no-underline transition-colors ${
                      active
                        ? "font-semibold text-charcoal"
                        : "text-muted hover:text-charcoal"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
