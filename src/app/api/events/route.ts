const allowedEvents = new Set([
  "case_study_open",
  "live_product_open",
  "contact_intent",
  "resume_download",
  "evidence_open",
]);

const tokenPattern = /^[a-z0-9][a-z0-9-]{0,79}$/i;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 2_048) {
    return Response.json({ error: "Payload too large" }, { status: 413 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
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
