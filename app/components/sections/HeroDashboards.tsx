"use client";

import { Fragment, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

/* ------------------------------------------------------------------ shared */
const ICONS = {
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  chart: "M18 20V10M12 20V4M6 20v-6",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  card: "M1 4h22v16H1zM1 10h22",
  bag: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  heart: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  box: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  plus: "M12 5v14M5 12h14",
  down: "M12 5v14M19 12l-7 7-7-7",
  swap: "M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3",
  layers: "M12 2L2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  zap: "M13 2L3 14h9l-1 8 10-12h-9z",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
} as const;
type IconName = keyof typeof ICONS;

function Icon({ name, size = 16, color = "currentColor", sw = 1.8 }: { name: IconName; size?: number; color?: string; sw?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[name]} /></svg>;
}

function Avatar({ name, bg, color = "#fff", size = 28 }: { name: string; bg: string; color?: string; size?: number }) {
  const text = name.replace(/[^A-Za-z ]/g, "").split(" ").map((p) => p[0]).slice(0, 2).join("");
  return <span style={{ width: size, height: size, background: bg, color, fontSize: size * 0.4 }} className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold">{text}</span>;
}

function smooth(points: [number, number][]) {
  return points.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`;
    const [px, py] = points[i - 1];
    const cx = (px + x) / 2;
    return `${d} C${cx},${py} ${cx},${y} ${x},${y}`;
  }, "");
}

const W = 1176, H = 668; // app content area inside the browser window

/* --------------------------------------------------------------- healthcare */
const HC = {
  teal: ["#ccfbf1", "#14b8a6", "#0f766e"], blue: ["#dbeafe", "#3b82f6", "#1d4ed8"], violet: ["#ede9fe", "#8b5cf6", "#6d28d9"], amber: ["#fef3c7", "#f59e0b", "#b45309"],
} as const;
const hcAppts: [number, number, number, string, string, keyof typeof HC][] = [
  [0, 8.5, 1, "Emily Carter", "Check-up", "teal"], [0, 10, 0.75, "Hassan Raza", "Follow-up", "blue"], [0, 13, 1.5, "Linda Park", "Minor procedure", "violet"], [0, 15.25, 0.75, "Tom Reyes", "Consultation", "amber"],
  [1, 9, 1, "Sofia Marino", "Vaccination", "teal"], [1, 11, 1, "Ben Wallace", "Lab review", "blue"], [1, 14, 0.75, "Aisha Noor", "Check-up", "teal"],
  [2, 8, 1.25, "Carlos Mendez", "Cardiology", "violet"], [2, 10.5, 1, "Grace Liu", "Follow-up", "blue"], [2, 12.5, 0.75, "Omar Siddiqui", "Consultation", "amber"], [2, 15, 1.5, "Nina Patel", "Pre-op review", "violet"],
  [3, 9.5, 1, "Peter Hall", "Check-up", "teal"], [3, 11.5, 1.25, "Yara Haddad", "Paediatrics", "blue"], [3, 14.5, 1, "Ivan Petrov", "Follow-up", "teal"],
  [4, 8.75, 0.75, "Sarah Mitchell", "Follow-up", "teal"], [4, 10.5, 1, "James Okafor", "Check-up", "blue"], [4, 12, 1, "Priya Nair", "Consultation", "violet"], [4, 14, 0.75, "Daniel Brooks", "Lab review", "amber"],
];
const fmtTime = (h: number) => { const hr = Math.floor(h), m = Math.round((h - hr) * 60); return `${((hr + 11) % 12) + 1}:${String(m).padStart(2, "0")}`; };

function Healthcare() {
  const days = ["Mon 9", "Tue 10", "Wed 11", "Thu 12", "Fri 13"];
  const hourH = 60, startH = 8, colW = 154, gutter = 52;
  const cal = [[26, 27, 28, 29, 30, 31, 1], [2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22], [23, 24, 25, 26, 27, 28, 29], [30, 1, 2, 3, 4, 5, 6]];
  return (
    <div style={{ width: W, height: H }} className="flex bg-white text-[#0f172a]">
      <div style={{ width: 60 }} className="flex flex-col items-center gap-5 border-r border-slate-100 bg-[#f8fafc] py-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#14b8a6] text-[14px] font-bold text-white">C</span>
        {(["grid", "calendar", "users", "heart", "file", "chart"] as IconName[]).map((n, i) => <span key={n} className={`flex h-9 w-9 items-center justify-center rounded-xl ${i === 1 ? "bg-[#14b8a6]/15 text-[#0f766e]" : "text-slate-400"}`}><Icon name={n} size={17} /></span>)}
      </div>
      <div style={{ width: 252 }} className="flex flex-col gap-5 border-r border-slate-100 p-4">
        <button className="flex items-center justify-center gap-2 rounded-xl bg-[#14b8a6] py-2.5 text-[12px] font-semibold text-white"><Icon name="plus" size={14} color="#fff" sw={2.4} />New appointment</button>
        <div>
          <div className="mb-2 flex items-center justify-between text-[12px] font-semibold"><span>November 2026</span><span className="text-slate-400">‹ ›</span></div>
          <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] text-slate-400">{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}</div>
          <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-[11px]">
            {cal.flat().map((n, i) => {
              const row = Math.floor(i / 7), out = (row === 0 && n > 20) || (row === 5 && n < 10);
              return <span key={i} className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full ${row === 2 && i % 7 < 5 ? "bg-[#14b8a6]/10" : ""} ${n === 13 && !out ? "!bg-[#14b8a6] font-semibold text-white" : out ? "text-slate-300" : "text-slate-700"}`}>{n}</span>;
            })}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Doctors</p>
          {[["Dr. Amelia Hart", "#14b8a6", "Cardiology"], ["Dr. Raj Patel", "#3b82f6", "General"], ["Dr. Lin Chen", "#8b5cf6", "Surgery"], ["Dr. Maya Okoye", "#f59e0b", "Paediatrics"]].map(([n, c, s]) => (
            <div key={n} className="flex items-center gap-2.5 py-1.5"><span style={{ background: c }} className="h-2.5 w-2.5 rounded-sm" /><span className="flex-1 text-[11.5px] font-medium">{n}</span><span className="text-[10px] text-slate-400">{s}</span></div>
          ))}
        </div>
        <div className="mt-auto rounded-xl bg-[#f0fdfa] p-3">
          <p className="text-[11px] font-semibold text-[#0f766e]">Today · 18 patients</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#14b8a6]/20"><div className="h-full w-[62%] rounded-full bg-[#14b8a6]" /></div>
          <p className="mt-1.5 text-[10px] text-slate-500">11 completed · 7 remaining</p>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
          <div className="flex items-center gap-3"><h3 className="text-[17px] font-semibold">Schedule</h3><span className="text-[12px] text-slate-400">Nov 9 to 13, 2026</span></div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-slate-200 p-0.5 text-[11px]">{["Day", "Week", "Month"].map((t) => <span key={t} className={`rounded-md px-3 py-1 ${t === "Week" ? "bg-slate-900 text-white" : "text-slate-500"}`}>{t}</span>)}</div>
            <span className="flex h-8 w-44 items-center gap-2 rounded-lg border border-slate-200 px-2.5 text-[11px] text-slate-400"><Icon name="search" size={13} />Search patients…</span>
            <Avatar name="Amelia Hart" bg="#14b8a6" size={32} />
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex border-b border-slate-100" style={{ paddingLeft: gutter }}>
            {days.map((d, i) => <div key={d} style={{ width: colW }} className={`py-2.5 text-center text-[11px] ${i === 4 ? "font-semibold text-[#0f766e]" : "text-slate-500"}`}>{d}</div>)}
          </div>
          <div className="relative" style={{ height: hourH * 9 }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} style={{ top: i * hourH, height: hourH }} className="absolute inset-x-0 border-b border-slate-100"><span style={{ width: gutter - 8 }} className="block pr-2 text-right text-[10px] text-slate-400">{((startH + i + 11) % 12) + 1} {startH + i < 12 ? "AM" : "PM"}</span></div>
            ))}
            {days.map((_, i) => <div key={i} style={{ left: gutter + i * colW, width: 1 }} className="absolute inset-y-0 bg-slate-100" />)}
            {hcAppts.map(([d, s, dur, name, type, color]) => {
              const [bg, border, text] = HC[color];
              return (
                <div key={name} style={{ left: gutter + d * colW + 4, width: colW - 8, top: (s - startH) * hourH + 2, height: dur * hourH - 4, background: bg, borderLeft: `3px solid ${border}`, color: text }} className="absolute overflow-hidden rounded-md px-2 py-1">
                  <p className="truncate text-[11px] font-semibold">{name}</p><p className="truncate text-[10px] opacity-80">{type} · {fmtTime(s)}</p>
                </div>
              );
            })}
            <div style={{ left: gutter + 4 * colW, width: colW, top: (10.9 - startH) * hourH }} className="absolute flex items-center"><span className="-ml-1 h-2 w-2 rounded-full bg-rose-500" /><span className="h-px flex-1 bg-rose-500" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ fintech */
function Fintech() {
  const txns: [string, string, string, string, string, boolean][] = [
    ["Stripe payout", "Revenue · 9:41 AM", "+$12,400.00", "#635bff", "St", true],
    ["Amazon Web Services", "Infrastructure · 8:12 AM", "-$2,184.55", "#f59e0b", "AW", false],
    ["Northwind Traders", "Invoice INV-2048 · Yesterday", "+$5,100.00", "#10b981", "NT", true],
    ["Figma", "Software · Yesterday", "-$75.00", "#ef4444", "Fi", false],
    ["Gusto Payroll", "Payroll · Nov 12", "-$38,620.00", "#06b6d4", "Gu", false],
    ["Brightfield Advisory", "Invoice INV-2046 · Nov 11", "+$8,750.00", "#8b5cf6", "BA", true],
  ];
  const line: [number, number][] = [[0, 150], [60, 128], [120, 140], [180, 100], [240, 112], [300, 78], [360, 90], [420, 58], [480, 70], [540, 38], [600, 46], [660, 22]];
  const donut = [["Payroll", 34, "#6477f5"], ["Infrastructure", 22, "#22d3ee"], ["Software", 18, "#a78bfa"], ["Office", 14, "#34d399"], ["Other", 12, "#475569"]] as const;
  let offset = 0;
  return (
    <div style={{ width: W, height: H }} className="flex flex-col bg-[#0a0f1f] text-white">
      <div className="flex items-center justify-between border-b border-white/8 px-6 py-3.5">
        <div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6477f5] text-[13px] font-bold">P</span><span className="text-[15px] font-semibold">Paylane</span></div>
        <div className="flex gap-1 rounded-xl bg-white/5 p-1 text-[12px]">{["Overview", "Cards", "Transfers", "Insights", "Team"].map((t, i) => <span key={t} className={`rounded-lg px-4 py-1.5 ${i === 0 ? "bg-white/12 font-medium" : "text-white/50"}`}>{t}</span>)}</div>
        <div className="flex items-center gap-3 text-white/60"><Icon name="search" size={16} /><Icon name="bell" size={16} /><Avatar name="Maya Chen" bg="#6477f5" size={32} /></div>
      </div>
      <div className="grid flex-1 grid-cols-[1.4fr_1fr] gap-5 p-5">
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-white/8 bg-linear-to-br from-[#161d3a] to-[#0f1530] p-5">
            <div className="flex items-start justify-between">
              <div><p className="text-[12px] text-white/50">Total balance</p><p className="mt-1 text-[34px] font-semibold leading-none tracking-tight">$482,910<span className="text-white/40">.40</span></p><p className="mt-2 text-[11px]"><span className="rounded-full bg-emerald-400/15 px-2 py-0.5 font-medium text-emerald-300">▲ 8.2%</span> <span className="text-white/40">+$36,480 this month</span></p></div>
              <div className="flex gap-1 rounded-lg bg-white/5 p-0.5 text-[10.5px]">{["1W", "1M", "3M", "1Y"].map((t) => <span key={t} className={`rounded-md px-2.5 py-1 ${t === "3M" ? "bg-white/15" : "text-white/45"}`}>{t}</span>)}</div>
            </div>
            <svg className="mt-3" width="100%" viewBox="0 0 660 170" fill="none"><defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#6477f5" stopOpacity=".4" /><stop offset="1" stopColor="#6477f5" stopOpacity="0" /></linearGradient></defs>{[30, 80, 130].map((y) => <line key={y} x1="0" x2="660" y1={y} y2={y} stroke="#fff" strokeOpacity=".06" />)}<path d={`${smooth(line)} L660,170 L0,170Z`} fill="url(#fg)" /><path d={smooth(line)} stroke="#8c9aff" strokeWidth="3" strokeLinecap="round" /><circle cx="600" cy="46" r="5" fill="#0f1530" stroke="#8c9aff" strokeWidth="3" /></svg>
          </div>
          <div className="grid grid-cols-[1.15fr_1fr] gap-5">
            <div className="relative h-[178px] overflow-hidden rounded-2xl bg-linear-to-br from-[#6477f5] via-[#7c5cff] to-[#a78bfa] p-5">
              <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10" /><div className="absolute -bottom-12 right-10 h-40 w-40 rounded-full bg-white/10" />
              <div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="text-[13px] font-semibold">Paylane Business</span><span className="h-6 w-9 rounded bg-amber-300/80" /></div><p className="text-[17px] tracking-[.18em]">•••• •••• •••• 4821</p><div className="flex justify-between text-[10px] text-white/75"><span>MAYA CHEN</span><span>09 / 29</span></div></div>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
              <p className="text-[12px] font-semibold">Quick actions</p>
              <div className="mt-3 grid grid-cols-2 gap-2.5">{([["send", "Send"], ["down", "Request"], ["plus", "Top up"], ["swap", "Convert"]] as [IconName, string][]).map(([i, l]) => <span key={l} className="flex items-center gap-2 rounded-xl bg-white/6 px-3 py-3 text-[11px]"><Icon name={i} size={14} color="#8c9aff" />{l}</span>)}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
            <div className="mb-2 flex items-center justify-between"><p className="text-[13px] font-semibold">Recent transactions</p><span className="text-[11px] text-[#8c9aff]">See all</span></div>
            {txns.map(([n, s, a, c, i, inc]) => (
              <div key={n} className="flex items-center gap-3 border-b border-white/6 py-2 last:border-0"><span style={{ background: c }} className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold">{i}</span><span className="min-w-0 flex-1"><span className="block truncate text-[11.5px] font-medium">{n}</span><span className="block text-[10px] text-white/40">{s}</span></span><span className={`text-[11.5px] font-semibold ${inc ? "text-emerald-300" : "text-white/85"}`}>{a}</span></div>
            ))}
          </div>
          <div className="flex flex-1 items-center gap-5 rounded-2xl border border-white/8 bg-white/4 p-4">
            <svg width="108" height="108" viewBox="0 0 120 120" className="shrink-0 -rotate-90"><circle cx="60" cy="60" r="44" stroke="#fff" strokeOpacity=".06" strokeWidth="16" fill="none" />{donut.map(([n, v, c]) => { const el = <circle key={n} cx="60" cy="60" r="44" fill="none" stroke={c} strokeWidth="16" strokeDasharray={`${(v / 100) * 276.5 - 2} 276.5`} strokeDashoffset={-(offset / 100) * 276.5} />; offset += v; return el; })}</svg>
            <div className="flex-1 text-[11px]"><p className="mb-2 text-[12px] font-semibold">Spending by category</p>{donut.map(([n, v, c]) => <div key={n} className="flex items-center gap-2 py-0.5"><span style={{ background: c }} className="h-2 w-2 rounded-full" /><span className="flex-1 text-white/60">{n}</span><span className="font-medium">{v}%</span></div>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- e-commerce */
function Ecommerce() {
  const cols: { name: string; count: number; color: string; cards: [string, string, string, string, string, string[], string?][] }[] = [
    { name: "New", count: 5, color: "#6366f1", cards: [["#10485", "Mei Tan", "2 items · $137.20", "11m ago", "#f59e0b", ["#fcd34d", "#fda4af"], "Gift"], ["#10484", "Leo Fernandez", "1 item · $59.00", "6m ago", "#6366f1", ["#a5b4fc"]], ["#10483", "Hannah Brooks", "3 items · $212.40", "2m ago", "#f2557a", ["#fda4af", "#fcd34d", "#86efac"], "Express"]] },
    { name: "Processing", count: 12, color: "#f59e0b", cards: [["#10481", "Marcus Lee", "1 item · $59.00", "38m ago", "#0ea5e9", ["#bae6fd"]], ["#10478", "Chloe Martin", "5 items · $318.90", "1h ago", "#10b981", ["#fda4af", "#a5b4fc", "#fcd34d"], "Express"], ["#10476", "Ryan Kapoor", "2 items · $98.00", "2h ago", "#8b5cf6", ["#c4b5fd", "#86efac"]]] },
    { name: "Shipped", count: 28, color: "#0ea5e9", cards: [["#10482", "Olivia Bennett", "3 items · $184.50", "FedEx ••8231", "#f2557a", ["#fda4af", "#fcd34d", "#a5b4fc"]], ["#10474", "Ethan Wright", "1 item · $129.00", "UPS ••4410", "#6366f1", ["#a5b4fc"]], ["#10471", "Zara Ali", "4 items · $243.80", "DHL ••9027", "#f59e0b", ["#fcd34d", "#86efac"], "Gift"]] },
    { name: "Delivered", count: 41, color: "#10b981", cards: [["#10480", "Aisha Khan", "2 items · $126.20", "Today 9:12", "#10b981", ["#86efac", "#bae6fd"]], ["#10469", "Noah Becker", "1 item · $72.00", "Yesterday", "#0ea5e9", ["#bae6fd"]], ["#10466", "Isla Romero", "3 items · $201.30", "Yesterday", "#f2557a", ["#fda4af", "#fcd34d"]]] },
  ];
  return (
    <div style={{ width: W, height: H }} className="flex flex-col bg-[#f6f6f9] text-[#111827]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <div className="flex items-center gap-6"><div className="flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f2557a] text-[13px] font-bold text-white">S</span><span className="text-[15px] font-semibold">Shopwave</span></div>
          <div className="flex gap-5 text-[12.5px] text-slate-500">{["Home", "Orders", "Products", "Customers", "Analytics", "Marketing"].map((t) => <span key={t} className={t === "Orders" ? "border-b-2 border-[#f2557a] pb-1 font-semibold text-slate-900" : ""}>{t}</span>)}</div></div>
        <div className="flex items-center gap-3"><span className="flex h-9 w-60 items-center gap-2 rounded-lg bg-slate-100 px-3 text-[11.5px] text-slate-400"><Icon name="search" size={14} />Search orders, customers…</span><Icon name="bell" size={17} color="#64748b" /><Avatar name="Olivia Reed" bg="#fde2e8" color="#f2557a" size={32} /></div>
      </div>
      <div className="flex items-end justify-between px-6 pb-3 pt-5">
        <div><h3 className="text-[20px] font-semibold tracking-tight">Orders</h3><p className="mt-0.5 text-[11.5px] text-slate-500">86 active orders · $14,820.60 in open value</p></div>
        <div className="flex items-center gap-2 text-[11.5px]">{["All", "Express", "Gift", "Unpaid"].map((t, i) => <span key={t} className={`rounded-full border px-3 py-1.5 ${i === 0 ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`}>{t}</span>)}<span className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-slate-600">Last 30 days ▾</span><span className="rounded-lg bg-[#f2557a] px-3.5 py-1.5 font-semibold text-white">Export</span></div>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-4 px-6 pb-5">
        {cols.map((col) => (
          <div key={col.name} className="flex flex-col gap-3 rounded-2xl bg-[#ececf2] p-3">
            <div className="flex items-center justify-between px-1"><span className="flex items-center gap-2 text-[12.5px] font-semibold"><i style={{ background: col.color }} className="h-2.5 w-2.5 rounded-full" />{col.name}</span><span className="rounded-full bg-white px-2 py-0.5 text-[10.5px] font-medium text-slate-500">{col.count}</span></div>
            {col.cards.map(([id, who, meta, time, c, thumbs, tag]) => (
              <div key={id} className="rounded-xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,.05)]">
                <div className="flex items-center justify-between"><span className="text-[11.5px] font-semibold">{id}</span>{tag && <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[9.5px] font-semibold text-amber-700">{tag}</span>}</div>
                <div className="mt-2 flex items-center gap-2"><Avatar name={who} bg={`${c}22`} color={c} size={24} /><span className="text-[11.5px] font-medium">{who}</span></div>
                <p className="mt-2 text-[11px] text-slate-500">{meta}</p>
                <div className="mt-2.5 flex items-center justify-between"><div className="flex -space-x-1.5">{thumbs.map((t, i) => <span key={i} style={{ background: t }} className="h-6 w-6 rounded-md border-2 border-white" />)}</div><span className="text-[10px] text-slate-400">{time}</span></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- logistics */
function Logistics() {
  const roads: ReactNode[] = [];
  for (let i = 0; i < 17; i++) roads.push(<line key={`h${i}`} x1="0" x2={W} y1={30 + i * 41 + (i % 3) * 5} y2={30 + i * 41 - (i % 4) * 9} stroke={i % 5 === 0 ? "#26364f" : "#17233a"} strokeWidth={i % 5 === 0 ? 3 : 1.5} />);
  for (let i = 0; i < 20; i++) roads.push(<line key={`v${i}`} y1="0" y2={H} x1={20 + i * 62 + (i % 3) * 7} x2={20 + i * 62 - (i % 4) * 11} stroke={i % 6 === 0 ? "#26364f" : "#17233a"} strokeWidth={i % 6 === 0 ? 3 : 1.5} />);
  const ships: [string, string, number, string, string, string][] = [
    ["NX-2048", "Karachi → Lahore", 72, "ETA 14:20", "In transit", "#38bdf8"], ["NX-2047", "Dubai → Riyadh", 48, "ETA 16:05", "On time", "#34d399"],
    ["NX-2045", "Doha → Muscat", 31, "ETA 18:15", "Delayed", "#f87171"], ["NX-2044", "Jeddah → Medina", 89, "ETA 11:50", "On time", "#34d399"], ["NX-2043", "Manchester → London", 15, "ETA 20:30", "In transit", "#38bdf8"],
  ];
  return (
    <div style={{ width: W, height: H }} className="relative overflow-hidden bg-[#0d1626] text-white">
      <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
        <rect width={W} height={H} fill="#0d1626" />
        <path d="M-20 520 C 200 430, 380 610, 620 500 S 980 380, 1200 450" stroke="#102c47" strokeWidth="54" />
        <rect x="560" y="120" width="170" height="110" rx="18" fill="#0f2a22" /><rect x="880" y="470" width="150" height="120" rx="18" fill="#0f2a22" /><rect x="400" y="260" width="110" height="80" rx="14" fill="#0f2a22" />
        {roads}
        <path d="M430 560 C 520 470 560 430 650 400 S 800 300 940 205" stroke="#f59e0b" strokeOpacity=".25" strokeWidth="16" strokeLinecap="round" />
        <path d="M430 560 C 520 470 560 430 650 400 S 800 300 940 205" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
        <path d="M940 205 C 990 170 1040 150 1100 130" stroke="#fff" strokeOpacity=".4" strokeWidth="4" strokeDasharray="2 10" strokeLinecap="round" />
        <path d="M520 160 C 600 190 640 260 700 270 S 800 250 860 330" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" /><path d="M700 640 C 760 600 800 560 860 540 S 980 520 1060 470" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
        {[[430, 560, "#fff"], [940, 205, "#f59e0b"], [520, 160, "#38bdf8"], [860, 330, "#38bdf8"], [700, 640, "#34d399"], [1060, 470, "#34d399"]].map(([x, y, c], i) => <g key={i}><circle cx={x as number} cy={y as number} r="13" fill={c as string} fillOpacity=".22" /><circle cx={x as number} cy={y as number} r="6" fill={c as string} /></g>)}
        <g transform="translate(704 372)"><circle r="19" fill="#f59e0b" /><path d="M-6 6 L0 -8 L6 6 L0 3Z" fill="#0d1626" transform="rotate(35)" /></g>
        <g transform="translate(640 232)"><circle r="14" fill="#38bdf8" /><path d="M-5 5 L0 -6 L5 5 L0 2Z" fill="#0d1626" transform="rotate(80)" /></g>
        <g transform="translate(920 520)"><circle r="14" fill="#34d399" /><path d="M-5 5 L0 -6 L5 5 L0 2Z" fill="#0d1626" transform="rotate(-50)" /></g>
      </svg>

      <div className="absolute bottom-4 left-4 top-4 flex w-[318px] flex-col gap-3 rounded-2xl border border-white/10 bg-[#0d1626]/90 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f59e0b] text-[13px] font-bold text-[#0d1626]">R</span><span className="text-[14px] font-semibold">RouteIQ</span><span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-300"><i className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />Live</span></div>
        <span className="flex h-9 items-center gap-2 rounded-lg bg-white/6 px-3 text-[11.5px] text-white/45"><Icon name="search" size={14} />Search shipment or driver</span>
        <div className="flex gap-1.5 text-[10.5px]">{[["All", 312], ["In transit", 241], ["Delayed", 7]].map(([t, n], i) => <span key={t as string} className={`rounded-full px-2.5 py-1 ${i === 0 ? "bg-[#f59e0b] font-semibold text-[#0d1626]" : "bg-white/8 text-white/65"}`}>{t} {n}</span>)}</div>
        <div className="flex flex-1 flex-col gap-2.5 overflow-hidden">
          {ships.map(([id, route, p, eta, st, c], i) => (
            <div key={id} className={`rounded-xl border p-3 ${i === 0 ? "border-[#f59e0b]/60 bg-[#f59e0b]/8" : "border-white/8 bg-white/4"}`}>
              <div className="flex items-center justify-between"><span className="text-[11.5px] font-semibold">{id}</span><span style={{ color: c }} className="text-[10px] font-medium">● {st}</span></div>
              <p className="mt-1 text-[11px] text-white/60">{route}</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div style={{ width: `${p}%`, background: c }} className="h-full rounded-full" /></div>
              <div className="mt-1.5 flex justify-between text-[10px] text-white/40"><span>{p}% complete</span><span>{eta}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-4 w-[296px] rounded-2xl border border-white/10 bg-[#0d1626]/92 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-wide text-white/40">Selected shipment</p><p className="text-[16px] font-semibold">NX-2048</p></div><span className="rounded-full bg-sky-400/15 px-2.5 py-1 text-[10px] font-medium text-sky-300">In transit</span></div>
        <div className="mt-3 flex items-center gap-2.5"><Avatar name="Bilal Ahmed" bg="#f59e0b" color="#0d1626" size={30} /><div><p className="text-[11.5px] font-medium">Bilal Ahmed</p><p className="text-[10px] text-white/40">Truck KHI-4821 · 62 km/h</p></div></div>
        <div className="mt-4 flex flex-col gap-3">
          {[["Picked up", "Karachi Hub · 06:10", true], ["Checkpoint cleared", "Hyderabad · 08:42", true], ["Out for delivery", "Multan · 11:55", true], ["Arrival at destination", "Lahore · 14:20", false]].map(([a, b, done]) => (
            <div key={a as string} className="flex items-start gap-3"><span className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[8px] ${done ? "bg-[#f59e0b] text-[#0d1626]" : "border border-white/25"}`}>{done ? "✓" : ""}</span><span><span className="block text-[11.5px] font-medium">{a}</span><span className="block text-[10px] text-white/40">{b}</span></span></div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">{["+", "−"].map((s) => <span key={s} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-[#0d1626]/90 text-[16px]">{s}</span>)}</div>
    </div>
  );
}

/* --------------------------------------------------------------------- saas */
function Saas() {
  const stages: [string, string, number, string][] = [["Visitors", "48,210", 100, "#ddd6fe"], ["Sign-ups", "6,420", 74, "#c4b5fd"], ["Activated", "3,180", 52, "#a78bfa"], ["Paid", "1,180", 30, "#7c5cff"]];
  const conv = ["13.3%", "49.5%", "37.1%"];
  const cohorts: [string, string, number[]][] = [["Oct 5", "412", [100, 68, 54, 47, 42, 39, 36, 34]], ["Oct 12", "388", [100, 71, 57, 49, 44, 41, 38]], ["Oct 19", "451", [100, 66, 52, 46, 41, 38]], ["Oct 26", "497", [100, 73, 59, 50, 45]], ["Nov 2", "523", [100, 70, 56, 49]], ["Nov 9", "540", [100, 72, 58]]];
  const feats: [string, number][] = [["Dashboards", 82], ["Team invites", 64], ["Integrations", 51], ["API keys", 33], ["Data exports", 28]];
  return (
    <div style={{ width: W, height: H }} className="flex bg-[#f7f6fb] text-[#17132b]">
      <aside style={{ width: 196 }} className="flex flex-col border-r border-[#ebe8f5] bg-white p-4">
        <div className="mb-5 flex items-center gap-2.5"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c5cff] text-[13px] font-bold text-white">L</span><span className="text-[15px] font-semibold">Launchpad</span></div>
        {([["grid", "Overview"], ["users", "Users"], ["layers", "Acquisition"], ["chart", "Revenue"], ["card", "Billing"], ["zap", "Automations"], ["file", "Feedback"]] as [IconName, string][]).map(([i, l], k) => <span key={l} className={`mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-[12px] ${k === 2 ? "bg-[#7c5cff]/10 font-semibold text-[#6d3df5]" : "text-slate-500"}`}><Icon name={i} size={15} />{l}</span>)}
        <div className="mt-auto rounded-xl bg-linear-to-br from-[#7c5cff] to-[#a78bfa] p-3.5 text-white"><p className="text-[12px] font-semibold">Pro plan</p><p className="mt-1 text-[10px] text-white/75">8,420 of 10,000 events used this month</p><div className="mt-2 h-1.5 rounded-full bg-white/25"><div className="h-full w-[84%] rounded-full bg-white" /></div></div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between"><div><h3 className="text-[19px] font-semibold tracking-tight">Acquisition & retention</h3><div className="mt-2 flex gap-4 text-[12px] text-slate-500">{["Funnel", "Cohorts", "Channels", "Features"].map((t, i) => <span key={t} className={i === 0 ? "border-b-2 border-[#7c5cff] pb-1 font-semibold text-[#17132b]" : ""}>{t}</span>)}</div></div>
          <div className="flex items-center gap-2 text-[11.5px]"><span className="rounded-lg border border-[#e4e0f3] bg-white px-3 py-2">Oct 5 to Nov 13 ▾</span><span className="rounded-lg border border-[#e4e0f3] bg-white px-3 py-2">All plans ▾</span><Avatar name="Jonas Weber" bg="#ede9fe" color="#6d3df5" size={34} /></div></div>
        <div className="grid grid-cols-[1.5fr_1fr] gap-4">
          <div className="rounded-2xl border border-[#ebe8f5] bg-white p-4">
            <div className="mb-2 flex items-center justify-between"><p className="text-[13px] font-semibold">Conversion funnel</p><span className="text-[11px] text-slate-400">Overall 2.4% · +0.4 pts</span></div>
            <div className="flex flex-col gap-1.5">{stages.map(([n, v, w, c], i) => (
              <div key={n}>{i > 0 && <p className="mb-0.5 pl-1 text-[9.5px] leading-none text-slate-400">↓ {conv[i - 1]} continue</p>}
                <div style={{ width: `${w}%`, background: c }} className="flex items-center justify-between rounded-lg px-3 py-2 text-[12px] font-medium"><span className={i > 1 ? "text-white" : "text-[#3b2a8a]"}>{n}</span><span className={i > 1 ? "text-white" : "text-[#3b2a8a]"}>{v}</span></div></div>
            ))}</div>
          </div>
          <div className="grid grid-rows-3 gap-3">{[["MRR", "$24,812", "+11.8%"], ["Trial → paid", "18.4%", "+2.1%"], ["Net revenue retention", "112%", "+4 pts"]].map(([l, v, d]) => <div key={l} className="flex items-center justify-between rounded-2xl border border-[#ebe8f5] bg-white px-5"><div><p className="text-[11px] text-slate-500">{l}</p><p className="mt-0.5 text-[22px] font-semibold tracking-tight">{v}</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">▲ {d}</span></div>)}</div>
        </div>
        <div className="grid flex-1 grid-cols-[1.5fr_1fr] gap-4">
          <div className="rounded-2xl border border-[#ebe8f5] bg-white p-4">
            <p className="mb-2 text-[13px] font-semibold">Weekly retention by cohort</p>
            <div className="grid text-[10.5px]" style={{ gridTemplateColumns: "64px 44px repeat(8, 1fr)", gap: 3 }}>
              <span /><span className="text-slate-400">Users</span>{Array.from({ length: 8 }).map((_, i) => <span key={i} className="text-center text-slate-400">W{i}</span>)}
              {cohorts.map(([n, u, vals]) => (<Fragment key={n}><span className="py-1 font-medium">{n}</span><span className="py-1 text-slate-500">{u}</span>{Array.from({ length: 8 }).map((_, i) => vals[i] === undefined ? <span key={i} /> : <span key={i} style={{ background: `rgba(124,92,255,${0.1 + (vals[i] / 100) * 0.85})`, color: vals[i] > 55 ? "#fff" : "#4c3a9e" }} className="rounded-md py-1 text-center font-medium">{vals[i]}%</span>)}</Fragment>))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#ebe8f5] bg-white p-4">
            <p className="mb-2 text-[13px] font-semibold">Feature adoption</p>
            <div className="flex flex-col gap-2">{feats.map(([n, v]) => <div key={n}><div className="mb-1 flex justify-between text-[11.5px]"><span className="font-medium">{n}</span><span className="text-slate-500">{v}%</span></div><div className="h-2 rounded-full bg-[#f0edfa]"><div style={{ width: `${v}%` }} className="h-full rounded-full bg-linear-to-r from-[#7c5cff] to-[#a78bfa]" /></div></div>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- macOS + Safari frame */
type Dash = { id: string; brand: string; accent: string; label: string; url: string; tab: string; dark: boolean; Content: ComponentType; toast: { title: string; body: string } };

export const dashboards: readonly Dash[] = [
  { id: "healthcare", brand: "CareSync", accent: "#14b8a6", label: "Healthcare", url: "app.caresync.health/schedule", tab: "Schedule | CareSync", dark: false, Content: Healthcare, toast: { title: "Booking confirmed", body: "Sarah Mitchell · Fri 8:45 AM · Dr. Hart" } },
  { id: "fintech", brand: "Paylane", accent: "#6477f5", label: "Fintech", url: "dashboard.paylane.io/overview", tab: "Overview | Paylane", dark: true, Content: Fintech, toast: { title: "Payment received", body: "+$5,100.00 from Northwind Traders" } },
  { id: "ecommerce", brand: "Shopwave", accent: "#f2557a", label: "E-commerce & Retail", url: "admin.shopwave.store/orders", tab: "Orders | Shopwave", dark: false, Content: Ecommerce, toast: { title: "New order #10483", body: "$212.40 · 3 items · Express shipping" } },
  { id: "logistics", brand: "RouteIQ", accent: "#f59e0b", label: "Logistics & Operations", url: "ops.routeiq.app/live", tab: "Live map | RouteIQ", dark: true, Content: Logistics, toast: { title: "Shipment NX-2048", body: "Out for delivery · ETA 14:20" } },
  { id: "saas", brand: "Launchpad", accent: "#7c5cff", label: "Startups & SaaS", url: "app.launchpad.so/acquisition", tab: "Acquisition | Launchpad", dark: false, Content: Saas, toast: { title: "New signup", body: "Emma Collins started a Pro trial" } },
];

function MacScreen({ dash }: { dash: Dash }) {
  const { Content } = dash;
  const bar = dash.dark ? "#1a1f2e" : "#eef0f5";
  return (
    <div style={{ width: 1200, height: 750, background: "linear-gradient(135deg,#0f1b4d 0%,#3b2a8f 45%,#c2417a 100%)" }} className="relative overflow-hidden text-white">
      <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl" />
      {/* menu bar with notch */}
      <div style={{ height: 28 }} className="relative z-10 flex items-center justify-between bg-black/25 px-4 text-[12px] backdrop-blur-xl">
        <div className="flex items-center gap-5"><span className="h-3.5 w-3 rounded-[40%] bg-white" /><b className="font-semibold">Safari</b>{["File", "Edit", "View", "History", "Bookmarks", "Window", "Help"].map((m) => <span key={m} className="opacity-90">{m}</span>)}</div>
        <div className="flex items-center gap-4 opacity-95"><span className="h-2.5 w-5 rounded-[3px] border border-white/90 p-px"><i className="block h-full w-[70%] rounded-[1px] bg-white" /></span><span>Sat 14 Nov</span><span>10:42 AM</span></div>
        <div style={{ width: 124, height: 28 }} className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center justify-center rounded-b-[14px] bg-black"><i className="h-2 w-2 rounded-full bg-[#101826] ring-1 ring-[#1d2a40]" /></div>
      </div>
      {/* browser window */}
      <div style={{ left: 12, right: 12, top: 36, bottom: 8 }} className="absolute overflow-hidden rounded-xl bg-white shadow-[0_25px_60px_-10px_rgba(0,0,0,.55)] ring-1 ring-black/30">
        <div style={{ height: 42, background: bar }} className="flex items-center gap-3 border-b border-black/10 px-3.5">
          <span className="flex gap-1.5"><i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" /></span>
          <span className={`ml-2 text-[13px] ${dash.dark ? "text-white/40" : "text-slate-400"}`}>‹ ›</span>
          <span style={{ background: dash.dark ? "#0e1220" : "#fff" }} className={`mx-auto flex h-7 w-[46%] items-center justify-center gap-1.5 rounded-lg text-[11.5px] ${dash.dark ? "text-white/70" : "text-slate-600"}`}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>{dash.url}</span>
          <span className={`text-[11px] ${dash.dark ? "text-white/45" : "text-slate-400"}`}>{dash.tab}</span>
        </div>
        <div style={{ width: W, height: H }} className="overflow-hidden"><Content /></div>
      </div>
    </div>
  );
}

/** Renders the fixed-size macOS screen and scales it to its container's width. */
export function DashboardScreen({ dash }: { dash: Dash }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const update = () => setScale(node.clientWidth / 1200);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: 1200, height: 750 }}><MacScreen dash={dash} /></div>
    </div>
  );
}
