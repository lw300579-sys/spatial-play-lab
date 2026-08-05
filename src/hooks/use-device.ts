"use client";

import { useSyncExternalStore } from "react";

export type DeviceKind = "mobile" | "desktop" | "unknown";

function detectDevice(): DeviceKind {
  if (typeof window === "undefined") return "unknown";

  const ua = navigator.userAgent;
  const coarse =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const mobileUa =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  if (mobileUa || (coarse && narrow)) return "mobile";
  return "desktop";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getSnapshot(): DeviceKind {
  return detectDevice();
}

function getServerSnapshot(): DeviceKind {
  return "unknown";
}

export function useDevice(): {
  device: DeviceKind;
  isMobile: boolean;
  isDesktop: boolean;
  ready: boolean;
} {
  const device = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    device,
    isMobile: device === "mobile",
    isDesktop: device === "desktop",
    ready: device !== "unknown",
  };
}
