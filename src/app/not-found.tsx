import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center px-4 py-16 sm:px-6">
      <div className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
        <div className="relative mx-auto flex h-56 w-56 rotate-3 items-center justify-center border-4 border-charcoal bg-coral text-paper sticker-lg sm:h-72 sm:w-72">
          <span className="font-display text-8xl font-semibold sm:text-9xl">404</span>
          <span className="absolute -bottom-4 -left-5 -rotate-6 border-2 border-charcoal bg-ochre px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-charcoal sticker-sm">
            tracking lost
          </span>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cobalt">Recoverable state</p>
          <h1 className="mt-3 font-display text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
            This route left the frame.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-charcoal/75">
            The page may have moved, but the portfolio is still running. Re-enter through selected work or inspect the evidence ledger.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/#flagships" className="border-2 border-charcoal bg-coral px-5 py-3 font-semibold text-white no-underline sticker-sm">
              See selected work
            </Link>
            <Link href="/evidence" className="border-2 border-charcoal bg-paper px-5 py-3 font-semibold no-underline sticker-sm">
              Open evidence ledger
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
