'use client';

import { useEffect, useState } from 'react';
import { talks } from '@/data/portfolio';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Speaking() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % talks.length), 3800);
    return () => window.clearInterval(timer);
  }, []);

  const current = talks[active] ?? talks[0];

  return (
    <section>
      <SectionHeader id="speaking" eyebrow="keynote · talk · panel" title="speaking-&-panels" action="book a talk" href="mailto:ihsonnet@gmail.com" compact />
      <div className="speaking-grid stack2">
        <div className="talk-feature">
          <ImageSlot slot={current.slot} placeholder="Drop stage photo" alt={current.event} />
          <div className="talk-feature-shade" />
          <span className="talk-role-pill" style={{ background: current.roleColor }}>{current.role}</span>
          <div className="talk-feature-copy">
            <span>{current.date} · {current.loc}</span>
            <h3>{current.event}</h3>
            <p>{current.topic}</p>
          </div>
        </div>
        <div className="talk-list">
          {talks.map((talk, index) => (
            <button type="button" key={talk.event} className={index === active ? 'active' : ''} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
              <div className="talk-thumb"><ImageSlot slot={talk.slot} placeholder="img" alt={talk.event} /></div>
              <span>
                <span className="talk-list-meta">
                  <em style={{ background: talk.roleColor }}>{talk.role}</em>
                  <small>{talk.date} · {talk.loc}</small>
                </span>
                <strong>{talk.event}</strong>
                <b>{talk.topic}</b>
              </span>
              <i>↗</i>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
