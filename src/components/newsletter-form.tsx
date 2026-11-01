import { SITE } from "@/data/games";

function newsletterReady() {
  const raw = process.env.NEWSLETTER_ACTION?.trim();
  if (!raw) return false;
  try {
    return new URL(raw).protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Posts to /api/subscribe, which forwards to NEWSLETTER_ACTION.
 * Buttondown embed URL: https://buttondown.com/api/emails/embed-subscribe/<username>
 * Optional BUTTONDOWN_API_KEY is sent when the host is buttondown.com.
 * When NEWSLETTER_ACTION is unset, this is a mailto fallback and the form is not shown.
 */
export function NewsletterForm({
  id,
  compact = false,
  status,
}: {
  id: string;
  compact?: boolean;
  status?: "in" | "error" | null;
}) {
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("A note, when there is one")}`;

  if (!newsletterReady()) {
    return (
      <p className={compact ? "font-mono text-[0.65rem] leading-relaxed text-muted" : "max-w-md text-sm leading-relaxed text-charcoal/75"}>
        No list yet.{" "}
        <a className="text-cobalt underline underline-offset-2" href={mailto}>
          Email me
        </a>{" "}
        if you want a note when there is one.
      </p>
    );
  }

  return (
    <div>
      {status === "in" ? (
        <p className="mb-3 text-sm text-charcoal" role="status">
          You're in. I'll email you when there's something worth opening.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mb-3 text-sm text-charcoal" role="alert">
          That didn't go through. Try again, or just{" "}
          <a className="text-cobalt underline underline-offset-2" href={mailto}>
            email me
          </a>
          .
        </p>
      ) : null}
      <form action="/api/subscribe" method="post" className={compact ? "flex flex-col gap-2 sm:flex-row sm:items-center" : "flex max-w-lg flex-col gap-2 sm:flex-row"}>
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
          className="min-w-0 flex-1 border-2 border-charcoal bg-paper px-3 py-2 text-sm text-charcoal outline-none placeholder:text-muted"
        />
        <input
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px"
        />
        <button type="submit" className="border-2 border-charcoal bg-charcoal px-4 py-2 text-sm font-semibold text-paper">
          Sign me up
        </button>
      </form>
    </div>
  );
}
