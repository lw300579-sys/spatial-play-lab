export const SHOT_VERSION = "2";

export function versionedShot(src: string): string {
  if (!src.startsWith("/shots/") || src.includes("?")) return src;
  return `${src}?v=${SHOT_VERSION}`;
}
