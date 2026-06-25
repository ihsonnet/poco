import { profile, heroTags } from '@/data/portfolio';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { ScrambleText } from '@/components/ui/ScrambleText';

export function Hero() {
  return (
    <section id="top" className="hero-grid">
      <div className="hero-media-cell">
        <ImageSlot slot="hero_portrait" placeholder="Image here" className="hero-img" alt="Portrait of Injamamul Haque Sonet" />
      </div>
      <div className="hero-copy-cell">
        <div className="hero-kicker-row">
          <ScrambleText>{profile.location}</ScrambleText>
          <span className="open-status">{profile.status}<i /></span>
        </div>
        <div className="hero-main-copy">
          <h1 className="hero-name">
            {profile.name}<br />
            <span>{profile.lastName}</span>
          </h1>
          <ScrambleText className="hero-tag">{profile.tagline}</ScrambleText>
          <p className="hero-lede">{profile.lede}</p>
          <div className="hero-tags">
            {heroTags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <div className="hero-cta">
          <a href="#work">View work <span>↗</span></a>
          <a href={profile.github}>GitHub <span>↗</span></a>
          <a href={profile.linkedin}>LinkedIn <span>↗</span></a>
        </div>
      </div>
    </section>
  );
}
