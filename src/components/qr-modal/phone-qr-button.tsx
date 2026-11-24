"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useDevice } from "@/hooks/use-device";

const loadQrModal = () =>
  import("@/components/qr-modal/qr-modal").then((mod) => mod.QrModal);

const QrModal = dynamic(loadQrModal, { ssr: false });

export function PhoneQrButton({
  url,
  title,
  className = "",
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const { isMobile } = useDevice();
  const [open, setOpen] = useState(false);

  if (isMobile) return null;

  return (
    <>
      <button
        type="button"
        onMouseEnter={() => void loadQrModal()}
        onFocus={() => void loadQrModal()}
        onClick={() => setOpen(true)}
        className={`hidden min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-paper-ink md:inline-flex ${className}`}
      >
        Phone QR
      </button>
      {open ? <QrModal open={open} onClose={() => setOpen(false)} url={url} title={title} /> : null}
    </>
  );
}
