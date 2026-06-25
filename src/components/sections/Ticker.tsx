import { tickerItems } from '@/data/portfolio';

export function Ticker() {
  const rows = [...tickerItems, ...tickerItems];
  return (
    <section className="ticker-wrap" aria-label="Recognition ticker">
      <div className="ticker-track">
        {rows.map((item, index) => (
          <span key={`${item.label}-${index}`} style={{ background: item.color, color: item.text }}>
            {item.label} <b>■</b>
          </span>
        ))}
      </div>
    </section>
  );
}
