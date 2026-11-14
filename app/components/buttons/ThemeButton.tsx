"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export const ButtonVariant = { PRIMARY: "primary", SECONDARY: "secondary", OUTLINE: "outline", GHOST: "ghost" } as const;
type ButtonVariantType = (typeof ButtonVariant)[keyof typeof ButtonVariant];

interface ThemeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariantType;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

const variants: Record<ButtonVariantType, string> = {
  primary: "border-indigo bg-indigo text-white shadow-lg shadow-indigo/15 hover:-translate-y-0.5 hover:border-indigo-light hover:bg-indigo-light hover:shadow-xl hover:shadow-indigo/25",
  secondary: "border-mint bg-mint text-midnight shadow-lg shadow-mint/10 hover:-translate-y-0.5 hover:border-white hover:bg-white",
  outline: "border-white/25 bg-white/5 text-white hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10",
  ghost: "border-transparent bg-transparent text-current hover:bg-black/5",
};

const sizes = { sm: "min-h-10 px-4 py-2 text-xs", md: "min-h-12 px-6 py-3 text-sm", lg: "min-h-14 px-7 py-3.5 text-sm" };

export default function ThemeButton({ children, href, variant = ButtonVariant.PRIMARY, icon, iconPosition = "end", fullWidth = false, size = "md", className = "", type = "button", ...props }: ThemeButtonProps) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full border font-semibold outline-none transition-all duration-300 active:scale-[.97] focus-visible:ring-4 focus-visible:ring-indigo/25 ${sizes[size]} ${fullWidth ? "w-full" : "w-fit"} ${variants[variant]} ${className}`;
  const content = <>{iconPosition === "start" && icon}{children}{iconPosition === "end" && icon}</>;
  if (href) {
    const external = href.startsWith("http");
    return <Link href={href} className={classes} aria-label={props["aria-label"]} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{content}</Link>;
  }
  return <button {...props} type={type} className={classes}>{content}</button>;
}

