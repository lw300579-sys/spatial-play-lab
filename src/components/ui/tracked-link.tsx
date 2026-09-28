"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

export type PortfolioEvent =
  | "case_study_open"
  | "live_product_open"
  | "contact_intent"
  | "resume_download"
  | "evidence_open";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: PortfolioEvent;
  eventTarget: string;
};

export function TrackedLink({
  eventName,
  eventTarget,
  onClick,
  ...props
}: TrackedLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const body = JSON.stringify({
      event: eventName,
      target: eventTarget,
      path: window.location.pathname,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/events",
        new Blob([body], { type: "application/json" }),
      );
      return;
    }

    void fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
      keepalive: true,
    });
  }

  return <a {...props} onClick={handleClick} />;
}
