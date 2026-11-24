"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useId, useRef, useState } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy";

interface QrModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function QrModal({ open, onClose, url, title }: QrModalProps) {
  const { copied, copyError, copy } = useCopyToClipboard();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [canShare] = useState(
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };
    dialog.addEventListener("close", handleClose);

    // Light-dismiss fallback when `closedby="any"` is unsupported (e.g., Safari)
    let cleanupFallback: (() => void) | undefined;
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const outside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect();
        return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      };
      let pressedOutside = false;
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = outside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e) && dialog.open) {
          dialog.close();
        }
        pressedOutside = false;
      };
      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);
      cleanupFallback = () => {
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      cleanupFallback?.();
    };
  }, [onClose]);

  const handleShare = async () => {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
      return;
    }
    try {
      await navigator.share({ title, url, text: `Play ${title} in your browser` });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      await copy(url);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as Record<string, string>)}
      aria-labelledby={titleId}
      className="m-auto w-[min(calc(100vw-2rem),28rem)] max-h-[90dvh] overflow-y-auto rounded-2xl border-2 border-charcoal bg-paper p-0 text-charcoal shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
    >
      <div className="border-b-2 border-charcoal bg-coral px-6 py-4 text-[var(--coral-ink)]">
        <p className="font-mono text-[0.65rem] uppercase tracking-widest text-[var(--coral-ink)]">
          Scan to launch · Opens in your browser
        </p>
        <h1 id={titleId} className="font-display text-2xl font-semibold tracking-tight">
          {title}
        </h1>
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
            title={`QR code to open ${title} on your phone`}
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
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-coral px-5 py-2.5 text-sm font-semibold text-[var(--coral-ink)] no-underline"
          >
            Open on this device ↗
          </a>
          <button
            type="button"
            onClick={() => copy(url)}
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-cobalt px-5 py-2.5 text-sm font-semibold text-[var(--cobalt-ink)]"
          >
            {copied ? "Copied to clipboard" : "Copy game URL"}
          </button>
          {copyError ? (
            <p role="status" className="text-center text-xs font-semibold text-coral">
              Copy was blocked. Open the game, then copy the address from your browser.
            </p>
          ) : null}
          <div className="flex gap-2">
            {canShare ? (
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-5 py-2.5 text-sm font-semibold text-charcoal"
              >
                Share
              </button>
            ) : null}
            <form method="dialog" className="flex flex-1">
              <button
                type="submit"
                autoFocus
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-5 py-2.5 text-sm font-semibold text-charcoal"
              >
                Close
              </button>
            </form>
          </div>
          <p className="truncate text-center font-mono text-[0.65rem] text-muted-soft">{url}</p>
        </div>
      </div>
    </dialog>
  );
}
