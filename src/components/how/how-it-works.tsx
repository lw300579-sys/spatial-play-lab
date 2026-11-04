const STEPS = [
  {
    n: "01",
    title: "Open the link.",
    body: "No download, no account.",
  },
  {
    n: "02",
    title: "Let it use your camera.",
    body: "The tracking runs on your phone and nothing gets uploaded.",
  },
  {
    n: "03",
    title: "Move.",
    body: "That's the controller.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          How these work
        </h2>
        <ol className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          <span
            className="pointer-events-none absolute left-[8%] right-[8%] top-7 hidden h-px bg-charcoal/20 md:block"
            aria-hidden
          />
          {STEPS.map((step) => (
            <li key={step.n} className="relative flex gap-4 md:flex-col md:gap-3">
              <span
                className="font-mono text-4xl font-medium leading-none text-charcoal/25 md:text-5xl"
                aria-hidden
              >
                {step.n}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-charcoal/80">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
