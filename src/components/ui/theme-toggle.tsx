"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const onMediaChange = () => {
    try {
      if (!localStorage.getItem("theme")) {
        document.documentElement.classList.toggle("dark", media.matches);
      }
    } catch {
      document.documentElement.classList.toggle("dark", media.matches);
    }
    onStoreChange();
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== "theme") return;
    const nextDark =
      event.newValue === "dark" || (event.newValue !== "light" && media.matches);
    document.documentElement.classList.toggle("dark", nextDark);
    onStoreChange();
  };

  media.addEventListener("change", onMediaChange);
  window.addEventListener("storage", onStorage);
  window.addEventListener("theme-change", onStoreChange);
  return () => {
    media.removeEventListener("change", onMediaChange);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("theme-change", onStoreChange);
  };
}

function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);
  const pressed = theme === "dark";
  const label = pressed ? "Switch to light mode" : "Switch to dark mode";

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures
    }
    window.dispatchEvent(new Event("theme-change"));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={pressed}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-3 text-charcoal transition-colors hover:bg-paper-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
    >
      <span aria-hidden="true" className="font-mono text-[0.7rem] uppercase tracking-wide">
        {pressed ? "Light" : "Dark"}
      </span>
    </button>
  );
}
