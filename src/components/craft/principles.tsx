const RULES = [
  {
    title: "Run it on the phone.",
    body: "Faster, and nobody has to wonder where their video went.",
  },
  {
    title: "Make it work on a normal phone.",
    body: "Not just the new one in perfect lighting.",
  },
  {
    title: "Be forgiving.",
    body: "Your living room isn't a baseball field. The game shouldn't pretend it is.",
  },
] as const;

export function Principles() {
  return (
    <section id="craft" className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight">A few rules I build by</h2>
        <div className="mt-8 grid border-2 border-charcoal md:grid-cols-3">
          {RULES.map((rule) => (
            <article key={rule.title} className="border-b border-charcoal/20 bg-paper p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
              <h3 className="font-display text-xl font-semibold tracking-tight">{rule.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{rule.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
