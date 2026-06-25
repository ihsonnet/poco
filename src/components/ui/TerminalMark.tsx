export function TerminalMark({ large = false }: { large?: boolean }) {
  return (
    <div className={large ? 'terminal-mark terminal-mark-large' : 'terminal-mark'} aria-hidden="true">
      <svg viewBox="0 0 100 100" width="56%" height="56%">
        <polyline points="34,32 54,51 34,70" fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="56" y1="68" x2="80" y2="68" stroke="currentColor" strokeWidth="11" strokeLinecap="round" />
      </svg>
    </div>
  );
}
