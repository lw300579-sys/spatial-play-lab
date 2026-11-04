"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy";

interface QrModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function QrModal({ open, onClose, url, title }: QrModalProps) {
  const { copied, copyError, copy } = useCopyToClipboard();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const share = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url, text: `Play ${title} in your browser` });
        return;
      } catch {
        /* fall through to copy */
      }
    }
    await copy(url);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        aria-label="Close QR modal"
        className="absolute inset-0 bg-charcoal/55 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-modal-title"
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border-2 border-charcoal bg-paper shadow-[0_24px_60px_rgba(0,0,0,0.2)]"
      >
        <div className="border-b-2 border-charcoal bg-coral px-6 py-4 text-white">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-white/80">
            Scan to launch · Opens in your browser
          </p>
          <h2 id="qr-modal-title" className="font-display text-2xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>

        <div className="p-6 sm:p-8">
          <div className="relative mx-auto mb-5 flex aspect-square w-full max-w-[240px] items-center justify-center border-2 border-charcoal bg-white p-4">
            <QRCodeSVG
              value={url}
              size={208}
              bgColor="#FFFFFF"
              fgColor="#18181B"
              level="M"
              includeMargin={false}
            />
          </div>

          <p className="mb-2 text-center font-mono text-[0.7rem] leading-relaxed text-muted">
            Camera access required · Best in Safari or Chrome
          </p>
          <p className="mb-5 text-center text-sm leading-relaxed text-charcoal/80">
            Point your phone camera at this code. No app store required.
          </p>

          <div className="flex flex-col gap-2">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-coral px-5 py-2.5 text-sm font-semibold no-underline"
            >
              Open on this device
            </a>
            <button
              type="button"
              onClick={() => copy(url)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-cobalt px-5 py-2.5 text-sm font-semibold text-white"
            >
              {copied ? "Copied to clipboard" : "Copy game URL"}
            </button>
            {copyError ? (
              <p role="status" className="text-center text-xs font-semibold text-coral">
                Copy was blocked. Open the game, then copy the address from your browser.
              </p>
            ) : null}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={share}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-5 py-2.5 text-sm font-semibold"
              >
                Share
              </button>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-5 py-2.5 text-sm font-semibold"
              >
                Close
              </button>
            </div>
            <p className="truncate text-center font-mono text-[0.6rem] text-muted-soft">{url}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
