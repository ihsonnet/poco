export function SatelliteArt() {
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%" className="satellite-art" aria-hidden="true">
      <rect width="100" height="100" fill="#06070e" />
      <circle cx="18" cy="20" r="1.1" fill="#fff" opacity="0.85" />
      <circle cx="31" cy="74" r="1" fill="#fff" opacity="0.55" />
      <circle cx="83" cy="22" r="1.3" fill="#fff" opacity="0.9" />
      <circle cx="70" cy="84" r="1" fill="#fff" opacity="0.5" />
      <circle cx="11" cy="48" r="0.9" fill="#fff" opacity="0.5" />
      <circle cx="90" cy="60" r="1.1" fill="#57d364" opacity="0.8" />
      <g transform="rotate(-18 50 50)">
        <rect x="30" y="48.4" width="12" height="3.2" rx="1" fill="#7c8595" />
        <rect x="58" y="48.4" width="12" height="3.2" rx="1" fill="#7c8595" />
        <rect x="6" y="38" width="24" height="24" rx="1.5" fill="#a371f7" />
        <rect x="70" y="38" width="24" height="24" rx="1.5" fill="#a371f7" />
        <g stroke="#06070e" strokeWidth="1" opacity="0.85">
          <line x1="14" y1="38" x2="14" y2="62" /><line x1="22" y1="38" x2="22" y2="62" /><line x1="6" y1="46" x2="30" y2="46" /><line x1="6" y1="54" x2="30" y2="54" />
          <line x1="78" y1="38" x2="78" y2="62" /><line x1="86" y1="38" x2="86" y2="62" /><line x1="70" y1="46" x2="94" y2="46" /><line x1="70" y1="54" x2="94" y2="54" />
        </g>
        <rect x="41" y="39" width="18" height="22" rx="3" fill="#e3e5ec" />
        <rect x="44" y="43" width="12" height="3" rx="1.5" fill="#0d1117" opacity="0.16" />
        <rect x="44" y="49" width="12" height="3" rx="1.5" fill="#0d1117" opacity="0.16" />
        <line x1="50" y1="39" x2="50" y2="30" stroke="#9aa0ad" strokeWidth="2" />
        <circle cx="50" cy="27" r="5" fill="none" stroke="#57d364" strokeWidth="2.2" />
        <circle cx="50" cy="27" r="1.5" fill="#57d364" />
      </g>
    </svg>
  );
}
