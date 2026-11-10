"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useDevice } from "@/hooks/use-device";

const QrModal = dynamic(
  () => import("@/components/qr-modal/qr-modal").then((mod) => mod.QrModal),
  { ssr: false },
);

export function FlagshipQrButton({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const { isMobile, ready } = useDevice();
  const [open, setOpen] = useState(false);

  if (!ready || isMobile) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden min-h-11 items-center rounded-full border-2 border-charcoal bg-paper px-4 py-2 text-sm font-semibold md:inline-flex"
      >
        Phone QR
      </button>
      {open ? (
        <QrModal open onClose={() => setOpen(false)} url={url} title={title} />
      ) : null}
    </>
  );
}
