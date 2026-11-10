"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Once-only section reveal via IntersectionObserver.
 * SSR and no-JS stay fully visible. After hydration, off-screen
 * sections hide briefly, then animate in when they enter the viewport.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.revealed = "true";
      return;
    }

    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    const alreadyVisible = rect.top < vh * 0.92 && rect.bottom > 0;

    if (alreadyVisible) {
      node.dataset.revealed = "true";
      return;
    }

    node.dataset.revealReady = "true";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            delete (entry.target as HTMLElement).dataset.revealReady;
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -4% 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
