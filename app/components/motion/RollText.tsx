import type { CSSProperties } from "react";

/** Letter-by-letter "roll" on hover: each glyph is stacked twice and slides up with a stagger. */
export function RollText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span aria-label={children} className={`roll-root ${className}`}>
      <span aria-hidden="true" className="roll-wrap">
        {Array.from(children).map((char, index) => {
          const glyph = char === " " ? " " : char;
          return (
            <span key={index} style={{ "--i": index } as CSSProperties} className="roll-cell">
              <span className="roll-stack"><span className="roll-glyph">{glyph}</span><span className="roll-glyph">{glyph}</span></span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
