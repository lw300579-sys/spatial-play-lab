"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/data/games";

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Posts to /api/subscribe, which forwards to NEWSLETTER_ACTION.
 * When ready is false, show the mailto fallback instead of a form.
 */
export function NewsletterForm({
  id,
  compact = false,
  status,
  ready,
}: {
  id: string;
  compact?: boolean;
  status?: "in" | "error" | null;
  ready: boolean;
}) {
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("A note, when there is one")}`;
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);

  if (!ready) {
    return (
      <p
        className={
          compact
            ? "font-mono text-[0.65rem] leading-relaxed text-muted"
            : "max-w-md text-sm leading-relaxed text-charcoal/75"
        }
      >
        Want a heads up when I ship something?{" "}
        <a className="text-cobalt underline underline-offset-2" href={mailto}>
          Email me
        </a>{" "}
        and I&apos;ll put you on the list.
      </p>
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
      {status === "in" ? (
        <p className="mb-3 text-sm text-charcoal" role="status">
          You&apos;re in. I&apos;ll email you when there&apos;s something worth opening.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mb-3 text-sm text-charcoal" role="alert">
          That didn&apos;t go through. Try again, or just{" "}
          <a className="text-cobalt underline underline-offset-2" href={mailto}>
            email me
          </a>
          .
        </p>
      ) : null}
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
