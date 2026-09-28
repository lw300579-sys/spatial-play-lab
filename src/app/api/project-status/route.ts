import { matrixGames } from "@/data/games";

// This health check must not be prerendered during `next build`: a temporary
// build-time network failure would otherwise ship every product as degraded.
// The response remains edge-cacheable through the Cache-Control header below.
export const dynamic = "force-dynamic";

type ProjectStatus = {
  state: "operational" | "degraded";
  checkedAt: string;
};

async function checkProject(url: string): Promise<ProjectStatus> {
  const checkedAt = new Date().toISOString();

  try {
    const response = await fetch(url, {
      headers: { "user-agent": "Ari-Portfolio-Release-Monitor/1.0" },
      redirect: "follow",
      signal: AbortSignal.timeout(4500),
    });
    const contentType = response.headers.get("content-type") ?? "";
    const html = contentType.includes("text/html") ? await response.text() : "";
    const shipsRawSource = /<script[^>]+src=["'][^"']*\/src\/(?:main|App)\.(?:t|j)sx?/i.test(html);
    const hasBuiltAssets = /\/(?:_next|assets)\//.test(html) || html.includes("self.__next_f");

    return {
      state:
        response.ok && contentType.includes("text/html") && hasBuiltAssets && !shipsRawSource
          ? "operational"
          : "degraded",
      checkedAt,
    };
  } catch {
    return { state: "degraded", checkedAt };
  }
}

export async function GET() {
  const entries = await Promise.all(
    matrixGames
      .filter((project): project is typeof project & { liveUrl: string } => Boolean(project.liveUrl))
      .map(async (project) => [project.id, await checkProject(project.liveUrl)] as const),
  );

  return Response.json(
    { projects: Object.fromEntries(entries) },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900",
      },
    },
  );
}
