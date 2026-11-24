"use client";

import { useCopyToClipboard } from "@/hooks/use-copy";

export function CopyEmailButton({
  email,
  className = "",
  label,
}: {
  email: string;
  className?: string;
  label?: string;
}) {
  const { copied, copyError, copy } = useCopyToClipboard();

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={() => copy(email)}
        aria-label={copied ? "Email copied" : `Copy ${email}`}
        className={
          className ||
          "inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-5 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-paper-ink"
        }
      >
        {copied ? "Email copied" : (label ?? email)}
      </button>
      {copyError ? (
        <p role="status" className="text-xs font-medium text-coral">
          Clipboard blocked — email is {email}
        </p>
      ) : null}
    </div>
  );
}
