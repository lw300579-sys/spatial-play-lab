"use client";

import { useSyncExternalStore } from "react";

export type DeviceKind = "mobile" | "desktop";

function detectDevice(): DeviceKind {
  const ua = navigator.userAgent;
  const coarse =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const mobileUa =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  if (mobileUa || narrow || coarse) return "mobile";
  return "desktop";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

/** Optimistic desktop for SSR — no "Detecting…" flash on first paint */
function getServerSnapshot(): DeviceKind {
  return "desktop";
}

export function useDevice(): {
  device: DeviceKind;
  isMobile: boolean;
  isDesktop: boolean;
  ready: boolean;
} {
  const device = useSyncExternalStore(subscribe, detectDevice, getServerSnapshot);

  return {
    device,
    isMobile: device === "mobile",
    isDesktop: device === "desktop",
    ready: true,
  };
}
