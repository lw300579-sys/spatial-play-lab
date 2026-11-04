"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setReady(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures
    }
    setTheme(next);
  }

  const pressed = theme === "dark";
  const label = pressed ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={pressed}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border-2 border-charcoal bg-paper text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
    >
      <span aria-hidden className="font-mono text-[0.7rem] uppercase tracking-wide">
        {ready ? (pressed ? "Light" : "Dark") : "Theme"}
      </span>
    </button>
  );
}
