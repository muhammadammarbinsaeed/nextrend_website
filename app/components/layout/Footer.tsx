import Image from "next/image";
import Link from "next/link";
import { services } from "@/app/data/services";

export function Footer() {
  return (
    <footer className="bg-midnight px-5 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 border-b border-white/10 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_.6fr_1fr_.75fr]">
        <div><Link href="/" className="-ml-[3px] block w-fit" aria-label="Nextrend Tech Solutions home"><Image src="/images/logo/nextrend-logo-dark.svg" alt="Nextrend Tech Solutions" width={324} height={56} className="h-12 w-auto" /></Link><p className="mt-4 max-w-80 text-sm leading-6 text-white/35">Your Vision, Our Mission. Technology shaped around how your business can move forward.</p></div>
        <div className="flex flex-col gap-3 text-sm text-white/45"><h3 className="mb-2 font-semibold text-white">Explore</h3><Link href="/#about" className="transition hover:text-mint">About</Link><Link href="/services" className="transition hover:text-mint">Services</Link><Link href="/#testimonials" className="transition hover:text-mint">Testimonials</Link></div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white/45 lg:grid-cols-1"><h3 className="col-span-2 mb-2 font-semibold text-white lg:col-span-1">Capabilities</h3>{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="transition hover:text-mint">{service.shortTitle}</Link>)}</div>
        <div className="flex flex-col gap-3 text-sm text-white/45"><h3 className="mb-2 font-semibold text-white">Start here</h3><Link href="mailto:hello@nextrend.tech" className="transition hover:text-mint">hello@nextrend.tech</Link><Link href="/#contact" className="transition hover:text-mint">Discuss a project</Link></div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 py-6 text-xs text-white/25 sm:flex-row"><span>© 2026 Nextrend Tech Solutions</span><span>Built for what&apos;s next.</span></div>
    </footer>
  );
}

