const RULES = [
  {
    n: "01",
    title: "Run it on the phone.",
    body: "Faster, and nobody has to wonder where their video went.",
  },
  {
    n: "02",
    title: "Make it work on a normal phone.",
    body: "Not just the new one in perfect lighting.",
  },
  {
    n: "03",
    title: "Be forgiving.",
    body: "Your living room isn't a baseball field. The game shouldn't pretend it is.",
  },
] as const;

export function Principles() {
  return (
    <section id="craft" className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          A few rules I build by
        </h2>
        <ol className="mt-10 space-y-8">
          {RULES.map((rule) => (
            <li key={rule.title} className="grid gap-3 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
              <span
                className="font-display text-4xl font-semibold leading-none text-charcoal/20 sm:text-5xl"
                aria-hidden
              >
                {rule.n}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">{rule.title}</h3>
                <p className="mt-2 max-w-[68ch] text-base leading-relaxed text-charcoal/80">
                  {rule.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
