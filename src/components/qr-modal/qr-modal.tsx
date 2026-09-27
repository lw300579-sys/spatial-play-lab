"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { reduced, spring, springSnappy } from "@/lib/motion";
import { TactileButton } from "@/components/ui/tactile-button";
import { TactileLink } from "@/components/ui/tactile-button";

interface QrModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function QrModal({ open, onClose, url, title }: QrModalProps) {
  const reduce = useReducedMotion();
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
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduce ? reduced : { duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close QR modal"
            className="absolute inset-0 bg-charcoal/55 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
            className="sticker sticker-lg relative z-10 w-full max-w-md overflow-hidden bg-paper"
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            transition={reduce ? reduced : spring}
          >
            <div className="border-b-2 border-charcoal bg-coral px-6 py-4 text-white">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-white/80">
                Scan to launch · Opens in your browser
              </p>
              <h2
                id="qr-modal-title"
                className="font-display text-2xl font-semibold tracking-tight"
              >
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
                <span
                  className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l-2 border-t-2 border-coral"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r-2 border-t-2 border-coral"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-coral"
                  aria-hidden
                />
                <span
                  className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-coral"
                  aria-hidden
                />
              </div>

              <p className="mb-2 text-center font-mono text-[0.7rem] leading-relaxed text-muted">
                Camera access required · Best in Safari or Chrome
              </p>
              <p className="mb-5 text-center text-sm leading-relaxed text-charcoal/80">
                Point your phone camera at this code for an instant browser AR
                launch. No app store required.
              </p>

              <div className="flex flex-col gap-2">
                <TactileLink
                  href={url}
                  accent="coral"
                  fullWidth
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open on this device
                </TactileLink>
                <TactileButton accent="cobalt" fullWidth onClick={() => copy(url)}>
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="ok"
                        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={reduce ? reduced : springSnappy}
                        className="inline-flex items-center gap-2"
                      >
                        <span aria-hidden>✓</span> Copied to clipboard
                      </motion.span>
                    ) : (
                      <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        Copy Game URL
                      </motion.span>
                    )}
                  </AnimatePresence>
                </TactileButton>
                {copyError ? (
                  <p role="status" className="text-center text-xs font-semibold text-coral">
                    Copy was blocked. Open the game, then copy the address from your browser.
                  </p>
                ) : null}
                <div className="flex gap-2">
                  <TactileButton variant="secondary" fullWidth onClick={share}>
                    Share
                  </TactileButton>
                  <TactileButton ref={closeRef} variant="secondary" fullWidth onClick={onClose}>
                    Close
                  </TactileButton>
                </div>
                <p className="truncate text-center font-mono text-[0.6rem] text-muted-soft">
                  {url}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
