import type { SVGProps } from "react";

export default function CheckBoxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.2.6h9.6a6.6 6.6 0 0 1 6.6 6.6v9.6a6.6 6.6 0 0 1-6.6 6.6H7.2a6.6 6.6 0 0 1-6.6-6.6V7.2A6.6 6.6 0 0 1 7.2.6Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="m7.75 12.15 2.7 2.7 5.8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

