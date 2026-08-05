"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { reduced, spring, springSnappy } from "@/lib/motion";
import { TactileButton } from "@/components/ui/tactile-button";

interface QrModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export function QrModal({ open, onClose, url, title }: QrModalProps) {
  const reduce = useReducedMotion();
  const { copied, copy } = useCopyToClipboard();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

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
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="qr-modal-title"
            className="sticker sticker-lg relative z-10 w-full max-w-md bg-paper p-6 sm:p-8"
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            transition={reduce ? reduced : spring}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted">
                  Scan to launch
                </p>
                <h2
                  id="qr-modal-title"
                  className="font-display text-2xl font-semibold tracking-tight text-charcoal"
                >
                  {title}
                </h2>
              </div>
              <TactileButton
                variant="secondary"
                className="!px-3 !py-1.5"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </TactileButton>
            </div>

            <div className="mx-auto mb-5 flex aspect-square w-full max-w-[240px] items-center justify-center border-2 border-charcoal bg-white p-4">
              <QRCodeSVG
                value={url}
                size={208}
                bgColor="#FFFFFF"
                fgColor="#18181B"
                level="M"
                includeMargin={false}
              />
            </div>

            <p className="mb-4 text-center font-mono text-[0.7rem] leading-relaxed text-muted">
              Requires Camera Access · Best in Safari / Chrome
            </p>

            <p className="mb-5 text-center text-sm leading-relaxed text-charcoal/80">
              Scan with your phone camera to launch the instant WebXR experience.
            </p>

            <div className="flex flex-col gap-2 sm:flex-row">
              <TactileButton
                accent="cobalt"
                fullWidth
                onClick={() => copy(url)}
                className="relative"
              >
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
                      <span aria-hidden>✓</span> Copied
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Copy Game URL
                    </motion.span>
                  )}
                </AnimatePresence>
              </TactileButton>
              <TactileButton variant="secondary" fullWidth onClick={onClose}>
                Close
              </TactileButton>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
