const STEPS = [
  { n: "01", title: "Open the link", body: "Nothing to install." },
  { n: "02", title: "Allow the camera", body: "It stays on your phone for the game itself." },
  { n: "03", title: "Move", body: "Your swing, punch or hand is the controller." },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="border-b-2 border-charcoal px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight">How they work</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <article key={step.n} className="border-2 border-charcoal bg-surface-raised p-5">
              <p className="font-mono text-[0.65rem] text-muted">{step.n}</p>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
