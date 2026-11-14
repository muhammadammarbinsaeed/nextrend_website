import Link from "next/link";
import { ContactForm, Footer, Header, HeroShowcase, IndustrySection, ProcessSection, Reveal, RevealLines, ThemeButton } from "./components";
import { AlertIcon, ArrowUpRightIcon, ServiceIcon } from "@/public/icons";
import { services } from "./data/services";

const values = [
  ["Business before buzzwords", "We start with the outcome your business needs—not a fashionable feature list."],
  ["Built around reality", "Your workflows, customers, resources, and ambitions shape the solution."],
  ["Designed for people", "Clear, inclusive experiences make adoption easier for customers and teams."],
  ["Ready for what’s next", "Modern foundations let your digital products improve as the business grows."],
  ["Clear at every step", "Straightforward communication keeps decisions and priorities visible."],
  ["Partnership after launch", "We stay focused on refinement, support, and the next valuable improvement."],
] as const;

const testimonials = [
  { quote: "Nextrend brought structure to an idea we had struggled to explain for months. The final experience feels clear, confident, and genuinely built around how our customers think.", name: "Elena Marlow", role: "Operations Director", company: "Northstar & Co.", initials: "EM" },
  { quote: "They looked beyond the feature list and helped us simplify the entire workflow. Communication stayed transparent, decisions moved quickly, and the result feels ready to grow with us.", name: "Daniel Reeves", role: "Product Lead", company: "Arcwell Systems", initials: "DR" },
  { quote: "The team translated a complex business challenge into a digital product our staff could understand immediately. It is rare to find technical thinking this grounded in real business needs.", name: "Maya Chen", role: "Managing Partner", company: "Brightfield Advisory", initials: "MC" },
] as const;

function SectionLabel({ number, children, light = false }: { number: string; children: React.ReactNode; light?: boolean }) {
  return <Reveal direction="left" className={`mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[.2em] ${light ? "text-white/50" : "text-slate-400"}`}><span className={light ? "text-mint" : "text-indigo"}>{number}</span><i className={`h-px w-8 ${light ? "bg-white/20" : "bg-slate-200"}`} />{children}</Reveal>;
}

export default function Home() {
  return (
    <main className="overflow-x-clip bg-off-white text-midnight">
      <Header />

      <section id="home" className="relative min-h-screen overflow-hidden bg-midnight px-5 pb-12 pt-36 text-white sm:px-8 lg:pt-40">
        <div className="animate-grid absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="animate-glow absolute -right-48 top-0 h-180 w-180 rounded-full bg-indigo/20 blur-[130px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-190">
            <Reveal direction="down" className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-mint"><span className="h-2 w-2 animate-pulse rounded-full bg-mint shadow-[0_0_18px_#a8e6cf]" />Your Vision, Our Mission.</Reveal>
            <h1 className="font-display text-[clamp(3.25rem,7vw,7.4rem)] font-medium leading-[.92] tracking-[-.065em]"><RevealLines lines={["Your business has a future.", <><span className="bg-linear-to-r from-indigo-light to-mint bg-clip-text text-transparent">Let&apos;s build it</span> digitally.</>]} /></h1>
            <Reveal as="p" delay={450} className="mt-8 max-w-160 text-base leading-8 text-white/60 md:text-lg">From high-performing websites and mobile applications to intelligent automation, we help businesses embrace technology, simplify operations, and unlock new opportunities.</Reveal>
            <Reveal delay={600} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ThemeButton href="#contact" variant="primary" icon={<ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}>Start Your Project</ThemeButton>
              <ThemeButton href="#services" variant="outline" icon={<ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}>Explore Our Services</ThemeButton>
            </Reveal>
            <Reveal as="p" delay={800} direction="fade" className="mt-10 flex items-center gap-2 text-xs text-white/40"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-mint" /></span>Accepting new digital transformation projects</Reveal>
          </div>

          <Reveal direction="scale" delay={350} className="relative mx-auto aspect-square w-full max-w-155"><HeroShowcase /></Reveal>
        </div>
        <Reveal direction="fade" delay={900} className="relative mx-auto mt-14 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-5 text-[10px] uppercase tracking-[.18em] text-white/30 sm:flex-row"><span>Technology that moves business forward</span><span>Strategy · Design · Engineering · Growth</span></Reveal>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.32fr_1fr]">
          <SectionLabel number="01">The shift</SectionLabel>
          <div>
            <Reveal as="h2" className="font-display text-[clamp(2.6rem,6vw,6.2rem)] leading-[.98] tracking-[-.055em]">Technology is moving forward.<br /><span className="text-indigo">Is your business?</span></Reveal>
            <Reveal delay={150} className="mt-10 flex flex-col items-start justify-between gap-8 border-t border-slate-200 pt-8 md:flex-row">
              <p className="max-w-175 text-base leading-8 text-slate-500 md:text-lg">Customers expect speed, clarity, and convenience. Teams need systems that reduce friction, not create more of it. The gap grows every day—but closing it can start with one smart move.</p>
              <ThemeButton href="#about" variant="ghost" className="h-14 w-14 shrink-0 border-slate-200 p-0 text-midnight hover:bg-midnight hover:text-white" aria-label="Learn about our approach" icon={<ArrowUpRightIcon className="h-5 w-5" />}><span className="sr-only">Learn about our approach</span></ThemeButton>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="about" className="bg-navy px-5 py-24 text-white sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <SectionLabel number="02" light>The opportunity</SectionLabel>
          <Reveal as="h2" className="max-w-240 font-display text-[clamp(2.5rem,5vw,5.6rem)] leading-[1.02] tracking-[-.05em]">Great businesses deserve better <span className="text-mint">digital experiences.</span></Reveal>
          <Reveal className="mt-14 grid overflow-hidden rounded-[2rem] border border-white/10 lg:grid-cols-2">
            <div className="bg-white/3 p-6 md:p-10">
              <div className="mb-8 flex items-center gap-3 text-sm font-semibold text-coral"><AlertIcon className="h-11 w-11" />What slows growth</div>
              <ul>{["An outdated or limited online presence", "Repetitive work that drains valuable time", "Disconnected tools and scattered information", "Digital experiences that lose customer trust", "Missed opportunities to reach new markets"].map((item, index) => <Reveal as="li" delay={index * 90 + 200} direction="left" key={item} className="flex gap-5 border-t border-white/10 py-5 text-sm text-white/65 md:text-base"><span className="text-xs text-white/25">0{index + 1}</span>{item}</Reveal>)}</ul>
            </div>
            <div className="relative flex flex-col justify-end overflow-hidden bg-indigo p-6 md:p-10 lg:p-14">
              <div className="animate-glow absolute -right-20 -top-20 h-72 w-72 rounded-full bg-mint/25 blur-3xl" />
              <div className="relative mb-14 font-display text-8xl font-semibold tracking-tighter text-white/15">N<span className="text-mint">+</span></div>
              <h3 className="relative max-w-135 font-display text-3xl leading-tight tracking-tight md:text-5xl">We turn digital complexity into practical progress.</h3>
              <p className="relative mt-6 max-w-135 leading-7 text-white/65">Strategy, design, engineering, and growth come together around one goal: making technology genuinely useful for your business.</p>
              <Link href="#services" className="relative mt-9 flex w-fit items-center gap-2 text-sm font-semibold">See how we can help <ArrowUpRightIcon className="h-4 w-4" /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="services" className="px-5 py-24 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.48fr] lg:items-end">
            <div><SectionLabel number="03">What we do</SectionLabel><Reveal as="h2" className="font-display text-[clamp(2.6rem,5vw,5.6rem)] leading-[1.02] tracking-[-.055em]">Everything you need to move your business <span className="text-indigo">forward.</span></Reveal></div>
            <Reveal as="p" delay={150} className="max-w-135 text-base leading-8 text-slate-500">From your first digital presence to intelligent, connected systems, we build technology that makes a meaningful difference.</Reveal>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-200 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal as="article" delay={(index % 3) * 100} key={service.title} className="group relative min-h-125 bg-white p-7 transition duration-500 hover:z-10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo/10 md:p-9">
                <div className="flex items-start justify-between"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo/8 text-indigo transition duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-indigo group-hover:text-white"><ServiceIcon name={service.icon} className="h-8 w-8" /></div><span className="text-xs text-slate-300">0{index + 1}</span></div>
                <h3 className="mt-12 font-display text-2xl font-semibold tracking-tight md:text-3xl">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-500">{service.summary}</p>
                <div className="mt-7 flex flex-wrap gap-2">{service.deliverables.slice(0, 3).map((item) => <span key={item} className="rounded-full border border-slate-200 px-3 py-1.5 text-[10px] text-slate-400">{item}</span>)}</div>
                <Link href={`/services/${service.slug}`} className="absolute bottom-8 left-7 flex items-center gap-2 text-xs font-semibold text-midnight md:left-9">Explore service <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <IndustrySection />

      <section className="bg-indigo px-5 py-24 text-white sm:px-8 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.75fr_1fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <SectionLabel number="04" light>Why Nextrend</SectionLabel>
            <Reveal as="h2" className="font-display text-[clamp(2.6rem,5vw,5.2rem)] leading-[1.02] tracking-[-.055em]">More than a development team. <span className="text-mint">Your technology partner.</span></Reveal>
            <p className="mt-7 max-w-145 leading-8 text-white/60">Good technology starts with understanding. We look beyond the immediate build to the people, processes, and future it needs to support.</p>
          </div>
          <div>
            {values.map(([title, description], index) => <Reveal key={title} delay={(index % 2) * 80} direction="right" className="group grid grid-cols-[auto_1fr_auto] gap-5 border-t border-white/15 py-7 md:gap-8"><span className="text-xs text-mint">0{index + 1}</span><div><h3 className="font-display text-xl font-semibold md:text-2xl">{title}</h3><p className="mt-2 max-w-130 text-sm leading-6 text-white/50 md:text-base">{description}</p></div><ArrowUpRightIcon className="h-5 w-5 text-white/30 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-mint" /></Reveal>)}
          </div>
        </div>
      </section>

      <ProcessSection />

      <section id="testimonials" className="px-5 py-24 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.45fr] lg:items-end"><div><SectionLabel number="06">Client voices</SectionLabel><Reveal as="h2" className="font-display text-[clamp(2.6rem,5vw,5.6rem)] leading-[1.02] tracking-[-.055em]">Partnerships built on <span className="text-indigo">clarity and trust.</span></Reveal></div><p className="leading-8 text-slate-500">The best digital outcomes come from teams that listen closely, communicate honestly, and stay focused on the real goal.</p></div>
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal as="article" delay={index * 130} key={testimonial.name} className={`flex min-h-115 flex-col justify-between rounded-[2rem] border p-7 md:p-9 ${index === 1 ? "border-indigo bg-indigo text-white lg:-translate-y-6" : "border-slate-200 bg-white"}`}>
                <div>
                  <div className={`font-display text-6xl leading-none ${index === 1 ? "text-mint" : "text-indigo"}`}>&ldquo;</div>
                  <blockquote className={`mt-5 font-display text-xl leading-8 tracking-tight md:text-2xl ${index === 1 ? "text-white" : "text-midnight"}`}>{testimonial.quote}</blockquote>
                </div>
                <div className={`mt-10 flex items-center gap-4 border-t pt-6 ${index === 1 ? "border-white/15" : "border-slate-100"}`}>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold ${index === 1 ? "bg-mint text-midnight" : "bg-indigo/10 text-indigo"}`}>{testimonial.initials}</div>
                  <div><p className="text-sm font-semibold">{testimonial.name}</p><p className={`mt-1 text-xs ${index === 1 ? "text-white/50" : "text-slate-400"}`}>{testimonial.role} · {testimonial.company}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">Illustrative testimonials for layout preview. Replace with verified client feedback before launch.</p>
        </div>
      </section>

      <section className="border-y border-slate-200 px-5 py-24 sm:px-8 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.32fr_1fr]"><SectionLabel number="07">Our point of view</SectionLabel><div><Reveal as="p" className="text-sm font-semibold uppercase tracking-[.18em] text-indigo">Modern technology should not feel out of reach.</Reveal><Reveal as="h2" className="mt-7 max-w-250 font-display text-[clamp(2.5rem,5vw,5.5rem)] leading-[1.02] tracking-[-.05em]">We make digital transformation <span className="text-indigo">practical, valuable, and possible</span> for more businesses.</Reveal><Reveal as="p" delay={150} className="mt-8 max-w-175 text-lg leading-8 text-slate-500">Progress should not be reserved for the biggest teams or boldest budgets. With the right partner, every business can move with confidence.</Reveal></div></div>
      </section>

      <section id="contact" className="relative bg-navy px-5 py-24 text-white sm:px-8 lg:py-36">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1fr] lg:items-center">
          <div><SectionLabel number="08" light>Start a project</SectionLabel><Reveal as="h2" className="font-display text-[clamp(3rem,6vw,6.5rem)] leading-[.96] tracking-[-.06em]">Let&apos;s turn your next move into real <span className="text-mint">momentum.</span></Reveal><Reveal as="p" delay={120} className="mt-7 max-w-145 leading-8 text-white/55">Tell us where you want your business to go. We&apos;ll help you find the clearest digital path forward.</Reveal></div>
          <Reveal direction="right" delay={150}><ContactForm /></Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
