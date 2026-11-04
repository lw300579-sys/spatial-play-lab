/**
 * One media slot per app.
 * A clip in src/data/clips.ts replaces the still. Otherwise the screenshot shows.
 * Clips are muted, looping, and inline so they can sit in a card.
 */
export function AppMedia({
  clip,
  desktop,
  mobile,
  alt,
  priority = false,
  frame = "card",
}: {
  clip?: string | null;
  desktop: string;
  mobile?: string | null;
  alt: string;
  priority?: boolean;
  frame?: "card" | "hero";
}) {
  const frameClass =
    frame === "hero"
      ? "aspect-[4/5] w-full object-cover object-center sm:aspect-[16/10]"
      : mobile
        ? "aspect-[390/844] w-full object-cover object-top md:aspect-[16/10]"
        : "aspect-[16/10] w-full object-cover object-top";

  if (clip) {
    return (
      <video
        src={clip}
        poster={desktop}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        className={frameClass}
      />
    );
  }

  return (
    <picture>
      {mobile ? <source media="(max-width: 767px)" srcSet={mobile} type="image/webp" /> : null}
      <img
        src={desktop}
        alt={alt}
        width={1280}
        height={800}
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        className={frameClass}
      />
    </picture>
  );
}
