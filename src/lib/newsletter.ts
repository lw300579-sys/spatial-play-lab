export function newsletterActionReady() {
  const raw = process.env.NEWSLETTER_ACTION?.trim();
  if (!raw) return false;
  try {
    return new URL(raw).protocol === "https:";
  } catch {
    return false;
  }
}
