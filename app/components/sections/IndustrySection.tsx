import Image from "next/image";
import Link from "next/link";
import { industries } from "@/app/data/industries";
import { Reveal } from "../motion/Reveal";
import { RollText } from "../motion/RollText";

export function IndustrySection() {
  return (
    <section id="industries" className="bg-white px-4 py-24 sm:px-8 lg:py-32">
      <div className="group mx-auto flex max-w-7xl flex-col gap-4 lg:gap-12">
        <Reveal className="flex flex-col items-start gap-5">
          <RollText className="text-base font-medium text-indigo lg:text-lg">Industry Expertise</RollText>
          <h2 className="text-3xl font-semibold leading-none tracking-tight text-midnight lg:text-5xl">
            Digital Solutions Built<br /> Across{" "}
            <span className="relative inline-block font-playfair italic transition-colors duration-300 ease-out group-hover:text-indigo after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-indigo after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100">Every Industry</span>
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {industries.map((industry, index) => (
            <div key={industry.title} className="pb-6 lg:sticky lg:top-28 lg:pb-10">
              <Reveal className="reveal-lg">
                <div className="group/card flex flex-col gap-4 rounded-[20px] border border-slate-200 bg-white p-4 transition-colors duration-500 hover:border-indigo/40 lg:gap-8 lg:rounded-[50px] lg:p-12">
                  <div className="flex max-w-206 flex-col gap-2">
                    <h3 className="text-3xl font-bold text-midnight">{industry.title}</h3>
                    <p className="text-base text-slate-600 lg:text-xl">{industry.description}</p>
                    <Link href={industry.link.href} className="w-fit text-base font-semibold text-midnight underline underline-offset-4 transition-colors hover:text-indigo lg:text-lg">{industry.link.label}</Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                    {industry.images.map((image, imageIndex) => (
                      <Reveal key={image.src} delay={imageIndex * 120} direction="scale" className="reveal-lg relative overflow-hidden rounded-3xl bg-slate-200">
                        <Image src={image.src} alt={image.alt} width={1600} height={900} sizes="(max-width:1024px) 100vw, 600px" priority={index === 0} className="h-auto w-full rounded-3xl transition-transform duration-500 ease-out hover:scale-105" />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/0 to-black/0" />
                        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap gap-2 lg:inset-x-6 lg:bottom-6">
                          {image.tags.map((tag) => <span key={tag} className="rounded-full border border-white/30 bg-black/30 px-1.5 py-1 text-[11px] font-medium text-white backdrop-blur-[30px] transition-colors duration-300 ease-out group-hover/card:bg-black/50 lg:px-3 lg:py-1.5 lg:text-xs">{tag}</span>)}
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
