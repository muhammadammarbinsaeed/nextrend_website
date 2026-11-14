"use client";

import type { InputHTMLAttributes, ReactNode } from "react";

interface ThemeInputProps extends InputHTMLAttributes<HTMLInputElement> { id: string; name: string; label?: ReactNode; errorMessage?: string; }

export default function ThemeInput({ id, name, label, errorMessage, required, className = "", ...props }: ThemeInputProps) {
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-700">{label}{required && <span className="text-indigo"> *</span>}</label>}
      <input id={id} name={name} required={required} aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage ? `${id}-error` : undefined} className={`h-13 w-full rounded-xl border bg-white px-4 text-sm text-midnight outline-none transition placeholder:text-slate-400 focus:ring-4 ${errorMessage ? "border-red-400 focus:border-red-400 focus:ring-red-100" : "border-slate-200 focus:border-indigo/60 focus:ring-indigo/10"} ${className}`} {...props} />
      {errorMessage && <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}

