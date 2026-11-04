"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }
  window.addEventListener("scroll", onStoreChange, { passive: true });
  window.addEventListener("resize", onStoreChange);
  return () => {
    window.removeEventListener("scroll", onStoreChange);
    window.removeEventListener("resize", onStoreChange);
  };
}

function getProgress() {
  if (typeof window === "undefined") return 0;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return -1;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

export function ScrollProgress() {
  const progress = useSyncExternalStore(subscribe, getProgress, () => -1);
  if (progress < 0) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-coral"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden
    />
  );
}
