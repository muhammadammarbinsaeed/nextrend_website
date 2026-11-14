import type { SVGProps } from "react";

export default function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 8.1c.2-.4.4-.4.7-.4h.4c.2 0 .3.1.4.4l.7 1.6c.1.3 0 .5-.2.7l-.5.6c-.2.2-.1.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.2.6 0l.7-.8c.2-.2.4-.3.7-.2l1.6.8c.3.1.4.3.4.5 0 .3-.1 1.2-.6 1.7-.5.5-1.2.8-2 .6-1.2-.2-2.8-.9-4.4-2.4-1.3-1.2-2.2-2.7-2.5-3.8-.3-.9.1-1.5.4-1.9.2-.1.4-.3.5-.5Z" fill="currentColor" />
    </svg>
  );
}
