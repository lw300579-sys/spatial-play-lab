const allowedEvents = new Set([
  "case_study_open",
  "live_product_open",
  "contact_intent",
  "resume_download",
  "evidence_open",
]);

const tokenPattern = /^[a-z0-9][a-z0-9-]{0,79}$/i;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 60;
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

export async function POST(request: Request) {
  if (!sameOriginAllowed(request)) {
    return Response.json({ error: "Forbidden origin" }, { status: 403 });
  }

  if (isRateLimited(clientKey(request))) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > 2_048) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > 2_048) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return Response.json({ error: "Invalid event" }, { status: 400 });
  }

  const { event, target, path } = payload as Record<string, unknown>;
  if (
    typeof event !== "string" ||
    !allowedEvents.has(event) ||
    typeof target !== "string" ||
    !tokenPattern.test(target) ||
    typeof path !== "string" ||
    !path.startsWith("/") ||
    path.length > 160
  ) {
    return Response.json({ error: "Invalid event" }, { status: 400 });
  }

  // Deliberately excludes cookies, IP-derived fields, user-agent, referrer,
  // camera data, and persistent identifiers. Hosting logs provide aggregate
  // event counts without adding a third-party tracker to the portfolio.
  console.info(
    JSON.stringify({
      type: "portfolio_event",
      event,
      target,
      path,
      recordedAt: new Date().toISOString(),
    }),
  );

  return new Response(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
