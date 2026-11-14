"use client";

import { useEffect, useState } from "react";
import { DashboardScreen, dashboards } from "./HeroDashboards";

/** MacBook mockup whose screen cycles through a different product for each industry we build for. */
export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((value) => (value + 1) % dashboards.length), 4800);
    return () => clearInterval(id);
  }, [paused]);

  const current = dashboards[active];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-7" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="absolute inset-[8%] rounded-full bg-indigo/25 blur-[90px]" />

      <div className="relative w-full">
        <div className="animate-float-slow">
          {/* lid */}
          <div className="relative rounded-[1.1rem] bg-linear-to-b from-[#2a2d36] to-[#0c0d11] p-[1.1%] pb-[1.4%] shadow-[0_40px_80px_-20px_rgba(0,0,0,.75)] ring-1 ring-white/20">
            <div className="relative aspect-[1200/750] overflow-hidden rounded-[.4rem] bg-black">
              {dashboards.map((dash, index) => (
                <div key={dash.id} aria-hidden={index !== active} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === active ? "opacity-100" : "opacity-0"}`}>
                  <DashboardScreen dash={dash} />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/0 via-white/[.07] to-white/0" />
            </div>
          </div>
        </div>

        {/* floating notification */}
        <div key={current.id} className="absolute -top-[10%] right-[1%] z-30 w-[46%] animate-[reveal-up_.8s_cubic-bezier(.22,1,.36,1)_backwards] rounded-2xl border border-white/20 bg-white/92 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <span style={{ background: current.accent }} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white">{current.brand[0]}</span>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-midnight">{current.toast.title}</p>
              <p className="truncate text-[10px] text-slate-500">{current.toast.body}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex w-full items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl">
        <div key={current.id} className="min-w-0 animate-[reveal-up_.7s_cubic-bezier(.22,1,.36,1)_backwards]">
          <span className="block text-[10px] uppercase tracking-[.18em] text-mint">Built for</span>
          <span className="block truncate text-sm font-semibold">{current.label}</span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5" role="tablist" aria-label="Industry dashboards">
          {dashboards.map((dash, index) => (
            <button key={dash.id} type="button" role="tab" aria-selected={index === active} aria-label={dash.label} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === active ? "w-6 bg-mint" : "w-1.5 bg-white/30 hover:bg-white/60"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
