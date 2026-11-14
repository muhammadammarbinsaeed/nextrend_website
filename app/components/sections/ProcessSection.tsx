import { Reveal } from "../motion/Reveal";

const steps = [
  { number: "01", title: "Understand the business", description: "We learn how your business works today—its goals, customers, workflows, systems, constraints, and the friction your team experiences." },
  { number: "02", title: "Find the digital gaps", description: "We map where technology can remove bottlenecks, improve the customer journey, connect information, or unlock a new growth opportunity." },
  { number: "03", title: "Design & execute", description: "We prioritize the right solution, define a practical roadmap, and move through design, development, testing, and launch with clear checkpoints." },
  { number: "04", title: "Support & evolve", description: "Launch is the start of real learning. We support the solution, watch how it performs, and keep improving it as the business changes." },
] as const;

export function ProcessSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`bg-midnight px-5 text-white sm:px-8 ${compact ? "py-20 lg:py-28" : "py-24 lg:py-36"}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_.5fr] lg:items-end">
          <div><Reveal direction="left" className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] text-white/45"><span className="text-mint">Our process</span><i className="h-px w-8 bg-white/15" />Business-led, end to end</Reveal><Reveal as="h2" className="max-w-220 text-[clamp(2.5rem,5vw,5.5rem)] font-semibold leading-[1.03] tracking-[-.055em]">We do not just build software. <span className="text-mint">We find where digital creates value.</span></Reveal></div>
          <p className="max-w-145 leading-8 text-white/50">Every engagement starts with understanding the business—not selecting a technology. That keeps the execution focused on the gaps that matter.</p>
        </div>
        <div className="mt-18 grid gap-5 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal as="article" delay={index * 120} key={step.number} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-6 transition duration-300 hover:-translate-y-1 hover:border-mint/30 hover:bg-white/7 md:p-7">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-midnight text-xs font-semibold text-mint transition group-hover:border-mint/30 group-hover:bg-mint group-hover:text-midnight">{step.number}</span>
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo/0 blur-2xl transition group-hover:bg-indigo/20" />
              <h3 className="relative mt-9 text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="relative mt-4 text-sm leading-7 text-white/45">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
