export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="16" cy="6.5" r="1.6" fill="currentColor" />
      <circle cx="24.3" cy="11.2" r="1.35" fill="currentColor" />
      <circle cx="24.3" cy="20.8" r="1.35" fill="currentColor" />
      <circle cx="16" cy="25.5" r="1.6" fill="currentColor" />
      <circle cx="7.7" cy="20.8" r="1.35" fill="currentColor" />
      <circle cx="7.7" cy="11.2" r="1.35" fill="currentColor" />
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
    </svg>
  );
}
