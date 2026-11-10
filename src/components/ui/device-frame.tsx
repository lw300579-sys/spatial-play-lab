import Image from "next/image";
import type { ReactNode } from "react";

type FrameVariant = "phone" | "browser";

interface DeviceFrameProps {
  variant: FrameVariant;
  src: string;
  alt: string;
  caption?: string;
  clip?: string | null;
  url?: string | null;
  priority?: boolean;
  unoptimized?: boolean;
  sizes?: string;
  className?: string;
  quality?: number;
  blurDataURL?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
}

function hostLabel(url?: string | null) {
  if (!url) return "ari-swerdlow.vercel.app";
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] || url;
  }
}

export function DeviceFrame({
  variant,
  src,
  alt,
  caption,
  clip,
  url,
  priority = false,
  unoptimized = false,
  sizes = "(max-width: 768px) 90vw, 420px",
  className = "",
  quality = 80,
  blurDataURL,
  width,
  height,
}: DeviceFrameProps) {
  const resolvedWidth = width ?? (variant === "phone" ? 390 : 1440);
  const resolvedHeight = height ?? (variant === "phone" ? 844 : 900);

  const media = clip ? (
    <video
      src={clip}
      poster={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      className="h-full w-full object-cover object-top"
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      sizes={sizes}
      // Next 16: `preload` inserts a head link for true LCP images.
      // Avoid combining it with fetchPriority (docs warn against both).
      {...(priority
        ? { preload: true as const, loading: "eager" as const }
        : { fetchPriority: "auto" as const })}
      quality={quality}
      unoptimized={unoptimized}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      className="h-full w-full object-cover object-top transition-transform duration-150 group-hover:scale-[1.02]"
    />
  );

  if (variant === "browser") {
    return (
      <figure className={`group ${className}`}>
        <div className="overflow-hidden rounded-xl border border-[color:var(--frame,#111)] bg-[color:var(--frame,#111)] shadow-[0_18px_40px_rgba(0,0,0,0.14)] transition-transform duration-150 hover:-translate-y-0.5">
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
            </span>
            <span className="min-w-0 flex-1 truncate rounded bg-white/10 px-2 py-1 font-mono text-[0.65rem] text-white/70">
              {hostLabel(url)}
            </span>
          </div>
          <div className="aspect-[16/10] overflow-hidden bg-black">{media}</div>
        </div>
        {caption ? (
          <figcaption className="mt-2 text-sm leading-relaxed text-muted">{caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={`group ${className}`}>
      <div className="overflow-hidden rounded-[2.25rem] border-[10px] border-[color:var(--frame,#111)] bg-[color:var(--frame,#111)] shadow-[0_24px_60px_rgba(0,0,0,0.18)] transition-transform duration-150 hover:-translate-y-0.5">
        <div className="aspect-[9/19.5] overflow-hidden bg-black">{media}</div>
      </div>
      {caption ? (
        <figcaption className="mt-2 text-sm leading-relaxed text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
