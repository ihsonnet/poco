'use client';

import { useState } from 'react';
import { research } from '@/data/portfolio';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Research() {
  const [hovered, setHovered] = useState(0);
  const featured = research[hovered] ?? research[0];

  return (
    <section>
      <SectionHeader id="research" eyebrow="research · public frameworks" title="research" action="read papers" href="mailto:ihsonnet@gmail.com" compact />
      <div className="research-grid stack2">
        <div className="research-cover">
          <div className="research-cover-label"><span>cover-preview</span><span>{featured.tag}</span></div>
          <div className="research-a4">
            <ImageSlot slot={`research_cover_${hovered}`} placeholder="Drop A4 cover" alt={featured.name} />
          </div>
          <div className="research-cover-copy">
            <h3>{featured.name}</h3>
            <p>{featured.desc}</p>
            <span>{featured.venue} · {featured.year}</span>
          </div>
        </div>
        <div className="research-list">
          {research.map((paper, index) => (
            <button key={paper.name} type="button" onMouseEnter={() => setHovered(index)} onFocus={() => setHovered(index)} className={index === hovered ? 'active' : ''}>
              <span className="research-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="research-copy">
                <em>{paper.tag}</em>
                <strong>{paper.name}</strong>
                <small>{paper.venue} · {paper.year}</small>
                <p>{paper.desc}</p>
              </span>
              <span className="research-arrow">↗</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
