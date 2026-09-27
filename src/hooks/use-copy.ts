"use client";

import { useCallback, useEffect, useState } from "react";

export function useCopyToClipboard(resetMs = 1800) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), resetMs);
    return () => window.clearTimeout(t);
  }, [copied, resetMs]);

  const copy = useCallback(async (text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const field = document.createElement("textarea");
        field.value = text;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        if (!ok) throw new Error("Copy was blocked");
      }
      setCopied(true);
      setCopyError(false);
      return true;
    } catch {
      setCopied(false);
      setCopyError(true);
      return false;
    }
  }, []);

  return { copied, copyError, copy };
}
