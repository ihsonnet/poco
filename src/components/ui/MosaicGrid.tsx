const palette = ['#2da44e', '#1a7f37', '#a371f7', '#bf8700', '#e16f24', '#56d364', '#7c6cf0', '#ec5f67'];
const ghPalette = ['var(--gh-blank)', 'var(--gh-blank)', 'var(--gh-blank)', 'var(--gh-blank)', 'var(--gh-blank)', '#ace3b6', '#57d364', '#2da44e', '#1a7f37', '#0f5023'];

function buildMosaic(count: number, colors: string[], seed: number) {
  return Array.from({ length: count }, (_, i) => {
    const raw = Math.sin((i + 1 + seed) * 12.9898) * 43758.5453;
    const f = raw - Math.floor(raw);
    return colors[Math.floor(f * colors.length)];
  });
}

interface MosaicGridProps {
  count?: number;
  type?: 'github' | 'accent';
  seed?: number;
  className?: string;
}

export function MosaicGrid({ count = 120, type = 'github', seed = 0, className = '' }: MosaicGridProps) {
  const colors = buildMosaic(count, type === 'github' ? ghPalette : palette, seed);
  return (
    <div className={`mosaic-grid ${className}`}>
      {colors.map((color, index) => <span key={`${color}-${index}`} style={{ background: color }} />)}
    </div>
  );
}
