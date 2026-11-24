"use client";

import { useEffect, useRef } from "react";

/**
 * Progressive scroll reveal fallback for browsers without native
 * CSS Scroll-Driven Animations (`animation-timeline: view()`).
 * Always uses threshold: 0 so tall sections never stay hidden on short viewports.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supportsNativeViewTimeline =
      typeof CSS !== "undefined" &&
      CSS.supports("(animation-timeline: view()) and (animation-range: entry)");

    if (reduced || supportsNativeViewTimeline) {
      node.dataset.revealState = "revealed";
      return;
    }

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.98) {
      node.dataset.revealState = "revealed";
      return;
    }

    node.dataset.revealState = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealState = "revealed";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -24px 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
