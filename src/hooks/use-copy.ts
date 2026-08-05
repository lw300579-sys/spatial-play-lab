"use client";

import { useCallback, useEffect, useState } from "react";

export function useCopyToClipboard(resetMs = 1800) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), resetMs);
    return () => window.clearTimeout(t);
  }, [copied, resetMs]);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  }, []);

  return { copied, copy };
}
