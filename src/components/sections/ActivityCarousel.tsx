'use client';

import { useEffect, useMemo, useState } from 'react';
import { getContentHref } from '@/data/content';
import { recentActivity } from '@/data/portfolio';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ActivityCarousel() {
  const [index, setIndex] = useState(0);
  const maxIndex = useMemo(() => Math.max(0, recentActivity.length - 4), []);
  const offset = Math.min(index, maxIndex);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % (maxIndex + 1)), 3800);
    return () => window.clearInterval(timer);
  }, [maxIndex]);

  return (
    <section>
      <SectionHeader id="activity" eyebrow="latest{}" title="recent-activity" action="view all" href="/view/activity" />
      <div className="scroller">
        <div className="scroller-track" style={{ transform: `translateX(-${offset * 25}%)` }}>
          {recentActivity.map((item) => (
            <a href={getContentHref('activity', item.title)} className="scroller-card" key={`${item.date}-${item.title}`}>
              <div className="scroller-image"><ImageSlot slot={item.slot} placeholder={item.placeholder} alt={item.title} /></div>
              <div className="scroller-body">
                <div className="meta-row"><span>{item.date}</span><span style={{ color: item.tagColor }}>{item.tag}</span></div>
                <h3>{item.title}</h3>
                <i>read more ↗</i>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
