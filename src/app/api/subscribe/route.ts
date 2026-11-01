import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  return NextResponse.redirect(target, 303);
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
