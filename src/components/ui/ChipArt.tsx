export function ChipArt() {
  return (
    <svg viewBox="0 0 100 100" width="66%" height="66%" aria-hidden="true">
      <g stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
        <line x1="40" y1="16" x2="40" y2="26" /><line x1="50" y1="16" x2="50" y2="26" /><line x1="60" y1="16" x2="60" y2="26" />
        <line x1="40" y1="74" x2="40" y2="84" /><line x1="50" y1="74" x2="50" y2="84" /><line x1="60" y1="74" x2="60" y2="84" />
        <line x1="16" y1="40" x2="26" y2="40" /><line x1="16" y1="50" x2="26" y2="50" /><line x1="16" y1="60" x2="26" y2="60" />
        <line x1="74" y1="40" x2="84" y2="40" /><line x1="74" y1="50" x2="84" y2="50" /><line x1="74" y1="60" x2="84" y2="60" />
      </g>
      <rect x="26" y="26" width="48" height="48" rx="9" fill="none" stroke="#fff" strokeWidth="2.6" />
      <g fill="none" stroke="#57d364" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 36 C 44 33, 37 37, 38 43 C 34 45, 34 52, 39 54 C 39 59, 45 61, 50 58" />
        <path d="M50 36 C 56 33, 63 37, 62 43 C 66 45, 66 52, 61 54 C 61 59, 55 61, 50 58" />
        <line x1="50" y1="36" x2="50" y2="58" />
        <path d="M44 43 q3 2 0 5" /><path d="M56 43 q-3 2 0 5" />
      </g>
    </svg>
  );
}
