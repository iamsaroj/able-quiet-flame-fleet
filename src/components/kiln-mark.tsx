export function KilnMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M7 23V13c0-3.4 2.6-6 9-6s9 2.6 9 6v10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <rect x="11" y="16.5" width="10" height="7.5" rx="1.2" fill="currentColor" className="text-accent" />
    </svg>
  );
}
