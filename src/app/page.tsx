import { Hero } from "@/components/hero/hero";
import { HomeBelow } from "@/components/home/home-below";
import { SiteNav } from "@/components/ui/site-nav";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ subscribed?: string | string[] }>;
}) {
  const query = await searchParams;
  const flag = Array.isArray(query.subscribed) ? query.subscribed[0] : query.subscribed;
  const status = flag === "1" ? "in" : flag === "0" ? "error" : null;

  return (
    <>
      <a
        href="#apps"
        className="absolute left-4 top-4 z-[70] -translate-y-[200%] rounded-full border-2 border-charcoal bg-ochre px-4 py-3 font-mono text-sm focus:translate-y-0 focus-visible:translate-y-0"
      >
        Skip to the apps
      </a>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <HomeBelow status={status} />
      </main>
    </>
  );
}
