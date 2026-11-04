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
  sizes?: string;
  className?: string;
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
  sizes = "(max-width: 768px) 90vw, 420px",
  className = "",
}: DeviceFrameProps) {
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
      width={variant === "phone" ? 390 : 1440}
      height={variant === "phone" ? 844 : 900}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMxMTEiLz48L3N2Zz4="
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
