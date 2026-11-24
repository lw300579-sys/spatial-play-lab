"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CopyEmailButton } from "@/components/bio/copy-email-button";
import { SITE } from "@/data/games";

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function SubscriptionStatusBanner({ mailto }: { mailto: string }) {
  const searchParams = useSearchParams();
  const flag = searchParams.get("subscribed");

  if (flag === "1") {
    return (
      <p className="mb-3 text-sm text-charcoal" role="status">
        You&apos;re in. I&apos;ll email you when there&apos;s something worth opening.
      </p>
    );
  }
  if (flag === "0") {
    return (
      <p className="mb-3 text-sm text-charcoal" role="alert">
        That didn&apos;t go through. Try again, or just{" "}
        <a className="text-cobalt underline underline-offset-2" href={mailto}>
          email me
        </a>
        .
      </p>
    );
  }
  return null;
}

/**
 * Posts to /api/subscribe, which forwards to NEWSLETTER_ACTION.
 * When ready is false, shows a direct email/copy action instead of a dead form.
 */
export function NewsletterForm({
  id,
  compact = false,
  ready,
}: {
  id: string;
  compact?: boolean;
  ready: boolean;
}) {
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("Put me on the release list")}`;
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);

  if (!ready) {
    return (
      <div className={compact ? "flex flex-wrap items-center gap-3" : "flex flex-wrap items-center gap-3"}>
        <a
          href={mailto}
          className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-coral px-5 py-2.5 text-sm font-semibold text-[var(--coral-ink)] no-underline transition-transform hover:-translate-y-0.5"
        >
          Email me to join →
        </a>
        <CopyEmailButton
          email={SITE.email}
          label={`Copy ${SITE.email}`}
          className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-charcoal bg-paper px-5 py-2.5 text-sm font-semibold text-charcoal transition-colors hover:bg-paper-ink"
        />
      </div>
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    if (!looksLikeEmail(email)) {
      event.preventDefault();
      setInvalid(true);
      return;
    }
    setInvalid(false);
  }

  return (
    <div>
      <Suspense fallback={null}>
        <SubscriptionStatusBanner mailto={mailto} />
      </Suspense>
      <form
        action="/api/subscribe"
        method="post"
        onSubmit={onSubmit}
        noValidate
        className={
          compact
            ? "flex flex-col gap-2 sm:flex-row sm:items-center"
            : "flex max-w-lg flex-col gap-2 sm:flex-row"
        }
      >
        <label className="sr-only" htmlFor={id}>
          Email address
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@email.com"
          value={email}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-error` : undefined}
          onChange={(event) => {
            setEmail(event.target.value);
            if (invalid) setInvalid(false);
          }}
          className="min-h-11 min-w-0 flex-1 rounded-full border-2 border-charcoal bg-paper px-4 py-2 text-sm text-charcoal placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
        />
        <input
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px"
        />
        <button
          type="submit"
          className="min-h-11 rounded-full border-2 border-charcoal bg-charcoal px-5 py-2 text-sm font-semibold text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
        >
          Sign me up
        </button>
      </form>
      {invalid ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-coral" role="alert">
          That email looks off.
        </p>
      ) : null}
    </div>
  );
}
