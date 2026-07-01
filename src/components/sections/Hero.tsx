import type { SiteSettings } from '@/lib/siteSettings';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { ScrambleText } from '@/components/ui/ScrambleText';

export function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section id="top" className="hero-grid">
      <div className="hero-media-cell">
        <ImageSlot src={settings.heroImageUrl || undefined} slot={settings.heroImageSlot || undefined} placeholder="Image here" className="hero-img" alt={`Portrait of ${settings.heroName} ${settings.heroLastName}`} />
      </div>
      <div className="hero-copy-cell">
        <div className="hero-kicker-row">
          <ScrambleText>{settings.heroLocation}</ScrambleText>
          <span className="open-status">{settings.heroStatus}<i /></span>
        </div>
        <div className="hero-main-copy">
          <h1 className="hero-name">
            {settings.heroName}<br />
            <span>{settings.heroLastName}</span>
          </h1>
          <ScrambleText className="hero-tag">{settings.heroTagline}</ScrambleText>
          <p className="hero-lede">{settings.heroLede}</p>
          <div className="hero-tags">
            {settings.heroTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <div className="hero-cta">
          <a href={settings.heroViewWorkHref}>{settings.heroViewWorkLabel} <span>↗</span></a>
          <a href={settings.githubUrl}>GitHub <span>↗</span></a>
          <a href={settings.linkedinUrl}>LinkedIn <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
