import Image from "next/image";
import Link from "next/link";
import { services } from "@/app/data/services";
import { MailIcon, WhatsAppIcon } from "@/public/icons";

const footerLinkClass = "relative w-fit transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-mint after:transition-transform after:duration-300 hover:text-mint hover:after:scale-x-100";

export function Footer() {
  return (
    <footer className="bg-midnight px-5 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 border-b border-white/10 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_.55fr_.9fr_1.15fr]">
        <div>
          <Link href="/" className="-ml-[3px] block w-fit" aria-label="Nextrend Tech Solutions home">
            <Image src="/images/logo/nextrend-logo-dark.svg" alt="Nextrend Tech Solutions" width={324} height={56} className="h-12 w-auto" />
          </Link>
          <p className="mt-4 max-w-80 text-sm leading-6 text-white/35">Your Vision, Our Mission. Technology shaped around how your business can move forward.</p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-white/45">
          <h3 className="mb-2 font-semibold text-white">Explore</h3>
          <Link href="/#about" className={footerLinkClass}>About</Link>
          <Link href="/services" className={footerLinkClass}>Services</Link>
          <Link href="/#testimonials" className={footerLinkClass}>Testimonials</Link>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-white/45 lg:grid-cols-1">
          <h3 className="col-span-2 mb-2 font-semibold text-white lg:col-span-1">Capabilities</h3>
          {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className={footerLinkClass}>{service.shortTitle}</Link>)}
        </div>

        <div className="flex flex-col gap-4 text-sm text-white/45">
          <h3 className="mb-1 font-semibold text-white">Start here</h3>
          <Link href="mailto:info.nextrendtechsolutions@gmail.com" className={`${footerLinkClass} flex items-center gap-2.5`}>
            <MailIcon className="h-4.5 w-4.5 shrink-0 text-mint" />
            <span>info.nextrendtechsolutions@gmail.com</span>
          </Link>
          <Link href="https://wa.me/923149423016" target="_blank" rel="noreferrer" className={`${footerLinkClass} flex items-center gap-2.5`}>
            <WhatsAppIcon className="h-4.5 w-4.5 shrink-0 text-mint" />
            <span>+92 314 9423016</span>
          </Link>
          <Link href="/#contact" className={footerLinkClass}>Discuss a project</Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 py-6 text-xs text-white/25 sm:flex-row">
        <span>© 2026 Nextrend Tech Solutions</span>
        <span>Built for what&apos;s next.</span>
      </div>
    </footer>
  );
}
