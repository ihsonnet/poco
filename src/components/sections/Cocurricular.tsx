'use client';

import { useEffect, useState } from 'react';
import { cocurricular } from '@/data/portfolio';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { ScrambleText } from '@/components/ui/ScrambleText';

export function Cocurricular() {
  const [slides, setSlides] = useState<Record<string, number>>({});

  useEffect(() => {
    let tick = 0;
    const timer = window.setInterval(() => {
      const item = cocurricular[tick % cocurricular.length];
      tick += 1;
      setSlides((current) => ({ ...current, [item.key]: (current[item.key] ?? 0) + 1 }));
    }, 1500);
    return () => window.clearInterval(timer);
  }, []);

  const big = cocurricular[0];
  const small = cocurricular.slice(1);

  return (
    <section>
      <div id="community" className="section-header community-header">
        <div>
          <ScrambleText className="section-eyebrow">leadership · community</ScrambleText>
          <h2 className="section-title">community-&-leadership<span>/</span></h2>
        </div>
        <div className="plain-section-action">03 roles</div>
      </div>
      <div className="cocurricular-grid stack2">
        <CocurricularPanel item={big} index={slides[big.key] ?? 0} big />
        <div className="cc-smalls">
          {small.map((item) => <CocurricularPanel key={item.key} item={item} index={slides[item.key] ?? 0} />)}
        </div>
      </div>
    </section>
  );
}

function CocurricularPanel({ item, index, big = false }: { item: typeof cocurricular[number]; index: number; big?: boolean }) {
  const slide = item.slides[((index % item.slides.length) + item.slides.length) % item.slides.length];
  const placeholder = item.slides.indexOf(slide) === 0 ? 'Drop photo' : `photo ${item.slides.indexOf(slide) + 1}`;

  return (
    <article className={big ? 'cc-panel cc-panel-big' : 'cc-panel'}>
      <ImageSlot slot={slide} placeholder={placeholder} alt={item.title} />
      <div className="cc-copy">
        <div>
          <span>{item.year}</span>
          <h3>{item.title}</h3>
          <p>{item.org}</p>
        </div>
        <i>↗</i>
      </div>
    </article>
  );
}
