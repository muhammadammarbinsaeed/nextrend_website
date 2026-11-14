"use client";

import { Description, Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";

export interface ThemeDropdownOption { label: string; value: string; disabled?: boolean; }

interface ThemeDropdownProps {
  id: string;
  name: string;
  label?: string;
  options: readonly ThemeDropdownOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
  className?: string;
}

export default function ThemeDropdown({ id, name, label, options, placeholder = "Select an option", required, disabled, value, defaultValue = "", onChange, onBlur, errorMessage, className = "" }: ThemeDropdownProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selectedValue = value ?? internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);
  const handleChange = (nextValue: string) => { if (value === undefined) setInternalValue(nextValue); onChange?.(nextValue); };

  return (
    <Field className="w-full" disabled={disabled}>
      {label && <Label className="mb-2 block text-sm font-medium text-slate-700">{label}{required && <span className="text-indigo"> *</span>}</Label>}
      <Listbox name={name} value={selectedValue} onChange={handleChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton id={id} onBlur={onBlur} aria-required={required} aria-invalid={Boolean(errorMessage)} aria-describedby={errorMessage ? `${id}-error` : undefined} className={`group flex h-13 w-full items-center justify-between rounded-xl border bg-white px-4 text-left text-sm text-midnight outline-none transition data-focus:ring-4 data-disabled:cursor-not-allowed data-disabled:opacity-60 ${errorMessage ? "border-red-400 data-focus:border-red-400 data-focus:ring-red-100" : "border-slate-200 data-focus:border-indigo/60 data-focus:ring-indigo/10"} ${className}`}>
            <span className={selectedOption ? "" : "text-slate-400"}>{selectedOption?.label ?? placeholder}</span>
            <svg className="h-4 w-4 text-slate-500 transition group-data-open:rotate-180" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </ListboxButton>
          <ListboxOptions anchor="bottom start" transition className="z-60 mt-2 max-h-72 w-(--button-width) origin-top overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl outline-none transition duration-150 data-closed:scale-95 data-closed:opacity-0">
            {options.map((option) => <ListboxOption key={option.value} value={option.value} disabled={option.disabled} className="cursor-pointer rounded-xl px-3 py-3 text-sm text-slate-700 outline-none transition data-focus:bg-indigo/8 data-focus:text-indigo data-selected:bg-indigo/8 data-selected:font-semibold data-disabled:cursor-not-allowed data-disabled:opacity-40">{option.label}</ListboxOption>)}
          </ListboxOptions>
        </div>
      </Listbox>
      {errorMessage && <Description id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-500">{errorMessage}</Description>}
    </Field>
  );
}
