import type { ReactNode } from "react";

/** Headline where every line slides up from behind a mask. Pure CSS, no JS. */
export function RevealLines({ lines, baseDelay = 100, step = 130 }: { lines: ReactNode[]; baseDelay?: number; step?: number }) {
  return (
    <>
      {lines.map((line, index) => (
        <span key={index} className="line-mask">
          <span className="line-rise" style={{ animationDelay: `${baseDelay + index * step}ms` }}>{line}</span>
        </span>
      ))}
    </>
  );
}
