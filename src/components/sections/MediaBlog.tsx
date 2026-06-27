'use client';

import { useEffect, useState } from 'react';
import { getContentHref, getContentPrimaryHref } from '@/data/content';
import { blog, media } from '@/data/portfolio';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function MediaSection() {
  const [index, setIndex] = useState(0);
  const mediaIndex = ((index % media.length) + media.length) % media.length;
  const mediaTrack = media.concat(media.map((item) => ({ ...item, slot: item.slot ? `${item.slot}_b` : undefined })));

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => value + 1), 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section>
      <SectionHeader id="media" eyebrow="press · video · social" title="news-&-media" action="all coverage" href="/view/media" compact />
      <div className="media-scroller scroller">
        <div className="media-track" style={{ transform: `translateX(-${mediaIndex * 25}%)` }}>
          {mediaTrack.map((item, itemIndex) => (
            <a
              href={getContentPrimaryHref('media', item.title)}
              className="media-card"
              key={`${item.title}-${itemIndex}`}
              target={item.href ? '_blank' : undefined}
              rel={item.href ? 'noreferrer' : undefined}
            >
              <div className="media-img">
                <span className="media-kind">{item.kind}</span>
                <ImageSlot slot={item.slot} placeholder={item.placeholder} alt={item.title} />
              </div>
              <div className="media-body">
                <span>{item.outlet}</span>
                <h3>{item.title}</h3>
                <i>{item.href ? 'open source' : 'watch'} ↗</i>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogSection() {
  return (
    <section>
      <SectionHeader id="writing" eyebrow="essays · field notes" title="blog" action="all posts" href="/view/blog" compact />
      <div className="blog-grid s3">
        {blog.map((item) => (
          <a href={getContentHref('blog', item.title)} className="blog-card" key={item.title}>
            <div className="blog-img"><ImageSlot slot={item.slot} placeholder={item.placeholder} alt={item.title} /></div>
            <div className="blog-body">
              <span>{item.tag}</span>
              <h3>{item.title}</h3>
              <i>read ↗</i>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
