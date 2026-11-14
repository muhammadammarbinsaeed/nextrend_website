"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { services } from "@/app/data/services";
import ThemeButton, { ButtonVariant } from "../buttons/ThemeButton";
import { ArrowUpRightIcon, ServiceIcon } from "@/public/icons";

const navigation = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Testimonials", href: "/#testimonials", id: "testimonials" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(pathname === "/" ? "home" : pathname.startsWith("/services") ? "services" : "");

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 10);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    if (pathname !== "/") return () => window.removeEventListener("scroll", updateHeader);
    const sections = ["home", "about", "services", "testimonials", "contact"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-25% 0px -65%" });
    sections.forEach((section) => observer.observe(section));
    return () => { window.removeEventListener("scroll", updateHeader); observer.disconnect(); };
  }, [pathname]);

  const navClass = (isActive: boolean) => `relative text-sm transition-colors duration-500 after:absolute after:-bottom-2 after:left-0 after:h-px after:origin-left after:transition-all after:duration-300 ${scrolled ? "after:bg-indigo" : "after:bg-mint"} ${isActive ? `${scrolled ? "text-midnight" : "text-white"} after:w-full` : `after:w-0 ${scrolled ? "text-slate-500 hover:text-midnight" : "text-white/60 hover:text-white"}`}`;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 animate-[header-in_.9s_cubic-bezier(.22,1,.36,1)_backwards] transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${scrolled ? "px-2 py-2" : "px-0 py-0"}`}>
      <div className={`mx-auto flex items-center justify-between border transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${scrolled ? "max-w-7xl rounded-full border-slate-200/70 bg-white px-5 py-2.5 shadow-[0_20px_50px_-12px_rgba(13,18,32,0.4)]" : "max-w-[3000px] rounded-none border-transparent bg-transparent px-5 py-4 md:px-10"}`}>
        <Link href="/" onClick={() => setOpen(false)} className="relative block h-9 w-52 shrink-0 sm:h-10 sm:w-58" aria-label="Nextrend Tech Solutions home">
          <Image src="/images/logo/nextrend-logo-dark.svg" alt="Nextrend Tech Solutions" width={324} height={56} priority className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${scrolled ? "opacity-0" : "opacity-100"}`} />
          <Image src="/images/logo/nextrend-logo-light.svg" alt="" aria-hidden="true" width={324} height={56} priority className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${scrolled ? "opacity-100" : "opacity-0"}`} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          <Link href="/" className={navClass(active === "home")}>Home</Link>
          <Link href="/#about" className={navClass(active === "about")}>About</Link>
          <Menu>
            <MenuButton className={`${navClass(active === "services")} group flex cursor-pointer items-center gap-1.5 border-0 bg-transparent outline-none`}>
              Services
              <svg className="h-3.5 w-3.5 transition group-data-open:rotate-180" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </MenuButton>
            <MenuItems anchor="bottom" transition className="z-60 mt-5 w-90 origin-top rounded-3xl border border-white/10 bg-midnight/98 p-3 text-white shadow-2xl outline-none backdrop-blur-xl transition duration-200 ease-out data-closed:-translate-y-2 data-closed:scale-95 data-closed:opacity-0">
              <div className="mb-2 flex items-center justify-between px-3 py-2"><span className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/35">Our capabilities</span><Link href="/services" className="text-xs text-mint hover:text-white">View all</Link></div>
              {services.map((service) => (
                <MenuItem key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="group flex items-center gap-3 rounded-2xl px-3 py-3 outline-none transition data-focus:bg-white/8">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/6 text-mint transition group-data-focus:bg-mint group-data-focus:text-midnight"><ServiceIcon name={service.icon} className="h-6 w-6" /></span>
                    <span><span className="block text-sm font-medium">{service.title}</span><span className="mt-0.5 block text-[11px] text-white/35">{service.eyebrow}</span></span>
                  </Link>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          {navigation.slice(2).map((item) => <Link key={item.id} href={item.href} className={navClass(active === item.id)}>{item.label}</Link>)}
        </nav>

        <ThemeButton href="/#contact" variant={scrolled ? ButtonVariant.PRIMARY : ButtonVariant.SECONDARY} size="sm" icon={<ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />} className="max-md:hidden">Let&apos;s Talk</ThemeButton>
        <ThemeButton aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)} variant={ButtonVariant.GHOST} size="sm" className={`h-10 w-10 p-0 lg:hidden ${scrolled ? "border-slate-200 text-midnight hover:bg-slate-100" : "border-white/10 text-white hover:bg-white/10"}`}>
          <span className="relative h-4 w-5"><i className={`absolute left-0 top-1 h-px w-5 bg-current transition ${open ? "translate-y-1 rotate-45" : ""}`} /><i className={`absolute bottom-1 left-0 h-px w-5 bg-current transition ${open ? "-translate-y-1 -rotate-45" : ""}`} /></span>
        </ThemeButton>
      </div>

      <nav className={`mx-auto mt-2 max-w-7xl origin-top overflow-auto rounded-3xl border border-white/10 bg-midnight/98 px-5 backdrop-blur-xl transition-all duration-500 ease-out lg:hidden ${open ? "max-h-[calc(100vh-7rem)] translate-y-0 py-5 opacity-100" : "pointer-events-none max-h-0 -translate-y-2 py-0 opacity-0"}`} aria-label="Mobile navigation">
        {navigation.slice(0, 2).map((item, index) => <Link key={item.id} href={item.href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${index * 70 + 100}ms` : "0ms" }} className={`flex items-center gap-4 border-b border-white/8 py-4 text-lg text-white transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}><span className="text-xs text-mint/70">0{index + 1}</span>{item.label}</Link>)}
        <div style={{ transitionDelay: open ? "240ms" : "0ms" }} className={`border-b border-white/8 py-4 transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}><Link href="/services" onClick={() => setOpen(false)} className="flex items-center gap-4 text-lg text-white"><span className="text-xs text-mint/70">03</span>Services</Link><div className="mt-4 grid gap-2 pl-8">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-white/50 hover:bg-white/5 hover:text-white"><ServiceIcon name={service.icon} className="h-5 w-5 text-mint" />{service.title}</Link>)}</div></div>
        {navigation.slice(2).map((item, index) => <Link key={item.id} href={item.href} onClick={() => setOpen(false)} style={{ transitionDelay: open ? `${index * 70 + 330}ms` : "0ms" }} className={`flex items-center gap-4 border-b border-white/8 py-4 text-lg text-white transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}`}><span className="text-xs text-mint/70">0{index + 4}</span>{item.label}</Link>)}
      </nav>
    </header>
  );
}
