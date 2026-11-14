import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckBoxIcon } from "@/public/icons";
import { Footer, Header, ProcessSection, Reveal, RevealLines, ThemeButton } from "@/app/components";
import { ArrowUpRightIcon, ServiceIcon } from "@/public/icons";
import { services } from "@/app/data/services";

export const metadata: Metadata = {
  title: "Digital Services | Nextrend Tech Solutions",
  description: "Explore Nextrend's website, mobile app, full-stack, AI automation, SEO, and social media services.",
};

export default function ServicesPage() {
  return (
    <main className="overflow-hidden bg-off-white text-midnight">
      <Header />
      <section className="relative overflow-hidden bg-midnight px-5 pb-24 pt-40 text-white sm:px-8 lg:pb-32 lg:pt-48">
        <div className="animate-grid absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="animate-glow absolute -right-40 -top-40 h-150 w-150 rounded-full bg-indigo/25 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal direction="down" className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-mint"><span className="h-2 w-2 animate-pulse rounded-full bg-mint shadow-[0_0_16px_#a8e6cf]" />Our capabilities</Reveal>
          <div className="grid gap-10 lg:grid-cols-[1fr_.45fr] lg:items-end"><h1 className="max-w-240 text-[clamp(3.4rem,7vw,7.5rem)] font-semibold leading-[.94] tracking-[-.065em]"><RevealLines lines={["Technology shaped around", <span key="g" className="bg-linear-to-r from-indigo-light to-mint bg-clip-text text-transparent">business progress.</span>]} /></h1><Reveal as="p" delay={400} className="max-w-145 text-base leading-8 text-white/55">We bring strategy, design, engineering, automation, and digital growth together—so each solution addresses a real gap instead of adding another disconnected tool.</Reveal></div>
      </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 2) * 120}><Link href={`/services/${service.slug}`} className="group block h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition duration-500 hover:-translate-y-1 hover:border-indigo/30 hover:shadow-2xl hover:shadow-indigo/10">
                <div className="relative aspect-[16/9] overflow-hidden bg-midnight"><Image src={service.image} alt={`${service.title} service`} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" priority={index < 2} /><span className="absolute left-5 top-5 flex h-13 w-13 items-center justify-center rounded-2xl border border-white/15 bg-midnight/65 text-mint backdrop-blur-xl"><ServiceIcon name={service.icon} className="h-7 w-7" /></span></div>
                <div className="p-7 md:p-9"><div className="flex items-start justify-between gap-6"><div><span className="text-[10px] font-semibold uppercase tracking-[.2em] text-indigo">{service.eyebrow}</span><h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{service.title}</h2></div><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 transition group-hover:border-midnight group-hover:bg-midnight group-hover:text-white"><ArrowUpRightIcon className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span></div><p className="mt-5 max-w-160 text-sm leading-7 text-slate-500 md:text-base">{service.summary}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{service.deliverables.slice(0, 2).map((item) => <span key={item} className="flex items-center gap-2 text-xs text-slate-500"><CheckBoxIcon className="h-5 w-5 text-indigo" />{item}</span>)}</div></div>
              </Link></Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection compact />

      <section className="px-5 py-24 sm:px-8 lg:py-32"><Reveal direction="scale" className="mx-auto flex max-w-7xl flex-col items-center rounded-[2.5rem] bg-indigo px-6 py-18 text-center text-white md:px-12"><span className="text-xs font-semibold uppercase tracking-[.2em] text-mint">Not sure where to begin?</span><h2 className="mt-5 max-w-220 text-4xl font-semibold leading-tight tracking-[-.045em] md:text-6xl">Let&apos;s find the digital gap worth solving first.</h2><p className="mt-6 max-w-150 leading-7 text-white/60">Start with the business challenge. We&apos;ll help you identify the right path, scope, and technology.</p><ThemeButton href="/#contact" variant="secondary" size="lg" className="mt-8" icon={<ArrowUpRightIcon className="h-4 w-4" />}>Discuss your business</ThemeButton></Reveal></section>
      <Footer />
    </main>
  );
}

