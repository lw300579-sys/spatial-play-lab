"use client";

import { useEffect } from "react";

/**
 * Progressive enhancement for [data-reveal] markers.
 * Lives as a sibling (returns null) so large server trees are NOT
 * serialized through a client component children boundary.
 */
export function RevealBoot() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!nodes.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const node of nodes) node.dataset.revealed = "true";
      return;
    }

    const vh = window.innerHeight || 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.revealed = "true";
          delete el.dataset.revealReady;
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.01 },
    );

    for (const node of nodes) {
      const rect = node.getBoundingClientRect();
      const alreadyVisible = rect.top < vh * 0.92 && rect.bottom > 0;
      if (alreadyVisible) {
        node.dataset.revealed = "true";
      } else {
        node.dataset.revealReady = "true";
        observer.observe(node);
      }
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
