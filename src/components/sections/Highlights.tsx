import { highlights } from '@/data/portfolio';
import { ImageSlot } from '@/components/ui/ImageSlot';

export function Highlights() {
  return (
    <section className="s3 highlight-grid">
      {highlights.map((item) => (
        <a href={item.href} key={item.title} className="highlight-card">
          <ImageSlot slot={item.slot} placeholder={item.placeholder} alt={item.title} className="highlight-thumb" />
          <span className="highlight-copy">
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
            <i>read more ↗</i>
          </span>
        </a>
      ))}
    </section>
  );
}
