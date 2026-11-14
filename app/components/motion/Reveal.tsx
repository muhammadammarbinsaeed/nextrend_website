"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** delay in ms, handy for staggering siblings */
  delay?: number;
  direction?: Direction;
}

/**
 * Scroll-triggered entrance animation. Uses a CSS animation (not a transition)
 * so it never fights with the hover transitions already on the element.
 */
export function Reveal({ children, as, className = "", style, delay = 0, direction = "up" }: RevealProps) {
  const Tag: ElementType = as ?? "div";
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal reveal-${direction} ${className}`} style={{ animationDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}
