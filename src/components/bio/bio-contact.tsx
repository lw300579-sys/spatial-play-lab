"use client";

import { SITE } from "@/data/games";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { TrackedLink } from "@/components/ui/tracked-link";

export function BioContact() {
  const { copied, copy } = useCopyToClipboard();

  return (
    <section id="contact" className="scroll-mt-28 border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 border-2 border-charcoal bg-surface-raised p-6 sm:grid-cols-[1.25fr_0.75fr] sm:p-10">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">About</h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-charcoal/85">
            I&apos;m Ari. I build apps where your body is the controller: baseball, boxing, tennis, sign language, pickleball. Getting a phone camera to understand a person in a messy room is the hard part. That&apos;s the part I like.
          </p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-charcoal/85">
            I&apos;m open to product engineering and computer vision work, especially when the input is a real person moving around.
          </p>
          <p className="mt-3 max-w-lg text-base leading-relaxed text-charcoal/85">
            Mostly MediaPipe, TensorFlow.js and Three.js in the browser, with Next and TypeScript holding it together. Python when the video work gets heavy.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-3">
          <button
            type="button"
            onClick={() => copy(SITE.email)}
            aria-label={copied ? "Email copied" : `Copy ${SITE.email}`}
            className="min-h-11 border-2 border-charcoal bg-paper px-4 py-2.5 text-left text-sm font-semibold"
          >
            {copied ? "Email copied" : SITE.email}
          </button>
          {SITE.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 border-2 border-charcoal bg-surface-raised px-4 py-2.5 text-center text-sm font-semibold text-charcoal no-underline"
            >
              {social.label === "X" ? "X" : social.label}
            </a>
          ))}
          <TrackedLink
            href="/ari-swerdlow-resume.pdf"
            download
            eventName="resume_download"
            eventTarget="contact"
            className="min-h-11 border-2 border-charcoal bg-ochre px-4 py-2.5 text-center text-sm font-semibold text-charcoal no-underline"
          >
            Résumé (PDF)
          </TrackedLink>
          <a
            href="/resume"
            className="min-h-11 border-2 border-charcoal bg-paper px-4 py-2.5 text-center text-sm font-semibold text-charcoal no-underline"
          >
            Résumé (web)
          </a>
          <TrackedLink
            href={`mailto:${SITE.email}?subject=${encodeURIComponent("Hello")}`}
            eventName="contact_intent"
            eventTarget="contact-email"
            className="min-h-11 border-2 border-charcoal bg-coral px-4 py-2.5 text-center text-sm font-semibold no-underline"
          >
            Email me →
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
