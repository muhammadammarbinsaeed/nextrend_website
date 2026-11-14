import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckBoxIcon } from "@/public/icons";
import { Footer, Header, ProcessSection, Reveal, RevealLines, ThemeButton } from "@/app/components";
import { ArrowUpRightIcon, ServiceIcon } from "@/public/icons";
import { getService, services } from "@/app/data/services";

type Props = { params: Promise<{ slug: string }> };

export const instant = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return { title: `${service.title} | Nextrend Tech Solutions`, description: service.summary };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <main className="overflow-hidden bg-off-white text-midnight">
      <Header />
      <section className="relative overflow-hidden bg-midnight px-5 pb-20 pt-38 text-white sm:px-8 lg:pb-28 lg:pt-46">
        <div className="animate-grid absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="animate-glow absolute -right-40 top-0 h-150 w-150 rounded-full bg-indigo/25 blur-[140px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div><Link href="/services" className="mb-8 flex w-fit items-center gap-2 text-xs text-white/40 transition hover:text-mint"><span>←</span> All services</Link><div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] text-mint"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/6"><ServiceIcon name={service.icon} className="h-7 w-7" /></span>{service.eyebrow}</div><h1 className="text-[clamp(3.2rem,6vw,6.8rem)] font-semibold leading-[.94] tracking-[-.06em]"><RevealLines lines={[service.title]} /></h1><Reveal as="p" delay={300} className="mt-7 max-w-155 text-base leading-8 text-white/58 md:text-lg">{service.summary}</Reveal><Reveal delay={450} className="mt-9 flex flex-col gap-4 sm:flex-row"><ThemeButton href="/#contact" variant="primary" size="lg" icon={<ArrowUpRightIcon className="h-4 w-4" />}>Start a conversation</ThemeButton><ThemeButton href="#approach" variant="outline" size="lg" icon={<ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}>See our approach</ThemeButton></Reveal></div>
          <Reveal direction="scale" delay={250} className="relative aspect-[6/4] overflow-hidden rounded-[2rem] border border-white/10 bg-navy shadow-2xl shadow-black/30"><Image src={service.image} alt={`${service.title} service`} fill priority sizes="(max-width:1024px) 100vw, 58vw" className="object-cover transition duration-700 hover:scale-[1.02]" /></Reveal>
        </div>
      </section>

      <section id="approach" className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.42fr_1fr]"><div><div className="mb-6 text-xs font-bold uppercase tracking-[.2em] text-indigo">The business challenge</div><p className="text-sm leading-7 text-slate-400">Technology only matters when it improves the way customers engage or the way the business operates.</p></div><div><Reveal as="h2" className="max-w-245 text-[clamp(2.4rem,5vw,5.2rem)] font-semibold leading-[1.04] tracking-[-.055em]">The goal is not to add more technology. <span className="text-indigo">It is to remove the right friction.</span></Reveal><p className="mt-8 max-w-190 text-lg leading-9 text-slate-500">{service.challenge}</p></div></div></section>

      <section className="bg-white px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2"><div><span className="text-xs font-bold uppercase tracking-[.2em] text-indigo">What we deliver</span><Reveal as="h2" className="mt-5 text-4xl font-semibold tracking-[-.045em] md:text-5xl">A complete path from opportunity to execution.</Reveal><p className="mt-6 max-w-150 leading-8 text-slate-500">{service.description}</p></div><div className="grid gap-4">{service.deliverables.map((item, index) => <Reveal key={item} delay={index * 90} direction="right" className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-off-white p-5 transition hover:-translate-y-0.5 hover:border-indigo/30 hover:bg-white hover:shadow-lg"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo/8 text-indigo"><CheckBoxIcon className="h-6 w-6" /></span><span className="font-medium">{item}</span><span className="ml-auto text-xs text-slate-300">0{index + 1}</span></Reveal>)}</div></div></section>

      <ProcessSection compact />

      <section className="px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.55fr_1fr]"><div><span className="text-xs font-bold uppercase tracking-[.2em] text-indigo">What changes</span><Reveal as="h2" className="mt-5 text-4xl font-semibold tracking-[-.045em] md:text-5xl">Technology that leaves the business stronger.</Reveal></div><div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2">{service.outcomes.map((outcome, index) => <Reveal key={outcome} delay={index * 90} className="group bg-white p-7 transition hover:bg-indigo hover:text-white"><span className="text-xs text-indigo transition group-hover:text-mint">0{index + 1}</span><h3 className="mt-10 text-xl font-semibold">{outcome}</h3></Reveal>)}</div></div></section>

      <section className="bg-white px-5 py-24 sm:px-8 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><span className="text-xs font-bold uppercase tracking-[.2em] text-indigo">Explore more</span><Reveal as="h2" className="mt-4 text-4xl font-semibold tracking-[-.045em]">Connected capabilities</Reveal></div><Link href="/services" className="flex items-center gap-2 text-sm font-semibold">View all services <ArrowUpRightIcon className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-5 md:grid-cols-3">{related.map((item, index) => <Reveal key={item.slug} delay={index * 120} className="h-full"><Link href={`/services/${item.slug}`} className="group block h-full rounded-3xl border border-slate-200 p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo/30 hover:shadow-xl"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo/8 text-indigo"><ServiceIcon name={item.icon} className="h-7 w-7" /></span><h3 className="mt-8 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{item.summary}</p><span className="mt-7 flex items-center gap-2 text-xs font-semibold text-indigo">Explore service <ArrowUpRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></Link></Reveal>)}</div></div></section>

      <section className="px-5 py-24 sm:px-8 lg:py-32"><Reveal direction="scale" className="mx-auto flex max-w-7xl flex-col items-center rounded-[2.5rem] bg-indigo px-6 py-18 text-center text-white md:px-12"><span className="text-xs font-semibold uppercase tracking-[.2em] text-mint">Move from idea to impact</span><Reveal as="h2" className="mt-5 max-w-220 text-4xl font-semibold leading-tight tracking-[-.045em] md:text-6xl">Let&apos;s see what {service.shortTitle.toLowerCase()} can change for your business.</Reveal><p className="mt-6 max-w-150 leading-7 text-white/60">We&apos;ll start by understanding the challenge and identifying where the strongest digital opportunity sits.</p><ThemeButton href="/#contact" variant="secondary" size="lg" className="mt-8" icon={<ArrowUpRightIcon className="h-4 w-4" />}>Start the conversation</ThemeButton></Reveal></section>
      <Footer />
    </main>
  );
}
