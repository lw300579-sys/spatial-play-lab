import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "local";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateBuckets.get(key);
  if (!current || now >= current.resetAt) {
    if (rateBuckets.size > 500) rateBuckets.clear();
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function sameOriginAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function backTo(request: Request, subscribed: "0" | "1") {
  const fallback = new URL("/", request.url);
  const referer = request.headers.get("referer");
  let target = fallback;
  if (referer) {
    try {
      const parsed = new URL(referer);
      const here = new URL(request.url);
      if (parsed.origin === here.origin) target = parsed;
    } catch {
      target = fallback;
    }
  }
  target.searchParams.set("subscribed", subscribed);
  target.hash = "signup";
  const response = NextResponse.redirect(target, 303);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

function providerUrl() {
  const raw = process.env.NEWSLETTER_ACTION?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  if (!sameOriginAllowed(request)) {
    return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
  }
  if (isRateLimited(clientKey(request))) {
    return backTo(request, "0");
  }

  const provider = providerUrl();
  if (!provider) return backTo(request, "0");

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return backTo(request, "0");
  }

  const honeypot = String(form.get("company") ?? "").trim();
  if (honeypot) return backTo(request, "1");

  const email = String(form.get("email") ?? "").trim();
  if (!emailPattern.test(email) || email.length > 320) return backTo(request, "0");

  const body = new URLSearchParams();
  body.set("email", email);

  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json, text/html;q=0.8",
  };
  const apiKey = process.env.BUTTONDOWN_API_KEY?.trim();
  if (apiKey && provider.hostname.endsWith("buttondown.com")) {
    headers.Authorization = `Token ${apiKey}`;
  }

  try {
    const response = await fetch(provider, {
      method: "POST",
      headers,
      body,
      redirect: "follow",
    });
    return backTo(request, response.ok ? "1" : "0");
  } catch {
    return backTo(request, "0");
  }
}
