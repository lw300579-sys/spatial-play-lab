"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "system", label: "System" },
  { id: "evidence", label: "Evidence" },
  { id: "decisions", label: "Decisions" },
  { id: "next", label: "Next" },
] as const;

export function CaseStudyProgress() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-22% 0px -64%", threshold: [0, 0.2, 0.6] },
    );

    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Case study sections"
      className="sticky top-[3.55rem] z-40 overflow-x-auto border-b-2 border-charcoal bg-paper/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-max min-w-full max-w-6xl px-4 sm:px-6">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={active === section.id ? "location" : undefined}
            className={`border-b-4 px-3 py-2.5 font-mono text-[0.62rem] uppercase tracking-wider no-underline transition-colors sm:px-5 sm:text-[0.68rem] ${
              active === section.id
                ? "border-coral text-charcoal"
                : "border-transparent text-charcoal/55 hover:text-charcoal"
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
