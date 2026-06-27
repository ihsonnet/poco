'use client';

import { useState } from 'react';
import { judging } from '@/data/portfolio';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ImageSlot } from '@/components/ui/ImageSlot';

export function JudgingMentoring() {
  const [hovered, setHovered] = useState(0);
  const current = judging[hovered] ?? judging[0];

  return (
    <section>
      <SectionHeader id="judging" eyebrow="judge · mentor · setter" title="judging-mentoring" action="full record" href="/view/judging" compact />
      <div className="judging-stack stack2">
        <div className="judging-list">
          {judging.map((item, index) => (
            <button className={`judging-row ${index === hovered ? 'active' : ''}`} key={`${item.year}-${item.role}`} onMouseEnter={() => setHovered(index)} onFocus={() => setHovered(index)} type="button">
              <span className="judge-year" style={{ color: item.color }}>{item.year}</span>
              <span className="judge-logo-slot">
                <ImageSlot slot={`judge_logo_${index}`} placeholder="logo" alt={`${item.org} logo`} fit="contain" />
              </span>
              <span className="judge-copy">
                <strong>{item.role}</strong>
                <em>{item.org}</em>
              </span>
              <span className="judge-tags">{item.tags.map((tag) => <i key={tag}>{tag}</i>)}</span>
            </button>
          ))}
        </div>
        <div className="judge-preview">
          <div className="judge-preview-head">
            <span>certificate</span>
            <b style={{ color: current.color }}>{current.year}</b>
          </div>
          <div className="judge-preview-card">
            <ImageSlot slot={`judge_cert_${hovered}`} placeholder="Drop certificate" alt={current.role} />
          </div>
          <h3>{current.role}</h3>
          <p>hover a row to preview · drag a certificate onto the frame</p>
        </div>
      </div>
    </section>
  );
}
