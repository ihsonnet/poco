import { timeline } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Timeline() {
  return (
    <section>
      <SectionHeader id="timeline" eyebrow="2022 → now" title="timeline" action="full CV" href="mailto:ihsonnet@gmail.com" compact />
      <div className="timeline-wrap">
        <div className="tl-grid">
          <div className="tl-base" />
          {timeline.map((item, index) => {
            const Icon = item.icon;
            const top = index % 2 === 0;
            return (
              <div className="tl-item" key={`${item.year}-${item.title}`}>
                <div className="tl-bub-top">
                  {top ? <Bubble item={item} Icon={Icon} top /> : null}
                </div>
                <div className="tl-dot-wrap">
                  <div className="tl-dot" style={{ background: item.color }}><span /></div>
                </div>
                <div className="tl-bub-bot">
                  {!top ? <Bubble item={item} Icon={Icon} /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Bubble({ item, Icon, top = false }: { item: (typeof timeline)[number]; Icon: (typeof timeline)[number]['icon']; top?: boolean }) {
  return (
    <div className={`timeline-bubble ${top ? 'top' : 'bottom'}`}>
      <Icon className="timeline-icon" size={30} strokeWidth={1.7} style={{ color: item.color }} />
      <div className="timeline-year" style={{ color: item.color }}>{item.year}</div>
      <div className="timeline-title">{item.title}</div>
      <div className="timeline-org">{item.org}</div>
      {item.current ? <span className="current-pill">current <i /></span> : null}
    </div>
  );
}
