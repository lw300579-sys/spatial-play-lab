"use client";

import { SITE } from "@/data/games";
import { useCopyToClipboard } from "@/hooks/use-copy";

export function CopyEmailButton() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(SITE.email)}
      aria-label={copied ? "Email copied" : `Copy ${SITE.email}`}
      className="min-h-11 border-2 border-charcoal bg-paper px-4 py-2.5 text-left text-sm font-semibold"
    >
      {copied ? "Email copied" : SITE.email}
    </button>
  );
}
