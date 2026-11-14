export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 32.5V15.8L17.2 9v16.7L7 32.5Z" fill="currentColor" opacity=".42" />
      <path d="M17.2 25.7V9L27.4 15.5v16.8L17.2 25.7Z" fill="currentColor" opacity=".72" />
      <path d="M27.4 32.3V15.5L41 7v17L27.4 32.3Z" fill="currentColor" />
      <path d="m17.2 25.7 10.2 6.6L41 24 27.5 41 7 32.5l10.2-6.8Z" fill="currentColor" opacity=".88" />
    </svg>
  );
}

