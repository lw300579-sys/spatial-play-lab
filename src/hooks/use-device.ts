"use client";

import { useSyncExternalStore } from "react";

export type DeviceKind = "mobile" | "desktop";

function detectDevice(): DeviceKind {
  const ua = navigator.userAgent;
  const narrow = window.innerWidth < 768;
  const mobilePhoneUa = /Android.*Mobile|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  if (mobilePhoneUa || narrow) return "mobile";
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
} {
  const device = useSyncExternalStore(subscribe, detectDevice, getServerSnapshot);

  return {
    device,
    isMobile: device === "mobile",
    isDesktop: device === "desktop",
  };
}
