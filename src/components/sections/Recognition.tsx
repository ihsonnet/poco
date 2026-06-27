import { getContentHref } from '@/data/content';
import { awards, honors } from '@/data/portfolio';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function Recognition() {
  return (
    <section>
      <div className="gap-line" />
      <SectionHeader id="recognition" eyebrow="most-inspirational-award · 2022" title="global-recognition" action="all awards" href="/view/awards" compact />
      <div className="recognition-stack stack2">
        <div className="recognition-copy fixedh">
          <h3>Most Inspirational Award</h3>
          <p>
            As System Architect of <strong>Team Diamonds</strong>, I helped build <em>Diamond in the Sky</em> — a Global Champion in the NASA International Space Apps Challenge 2022, selected from thousands of teams worldwide.
          </p>
          <div className="recognition-stats">
            <span><b>162+</b><em>countries</em></span>
            <span><b>3,000+</b><em>submissions</em></span>
            <span><b style={{ color: 'var(--accent)' }}>10</b><em>global awards</em></span>
          </div>
        </div>
        <div className="recognition-media recog-media">
          <ImageSlot slot="champ_landscape" placeholder="Drop champion image" alt="Champion recognition" />
          <div className="recognition-thumbs">
            <ImageSlot slot="champ_sq1" placeholder="Drop photo" alt="NASA Space Apps stage" />
            <ImageSlot slot="champ_sq2" placeholder="Drop photo" alt="Team Diamonds" />
            <ImageSlot slot="champ_sq3" placeholder="Drop photo" alt="Bangladesh flag team" />
          </div>
        </div>
      </div>
      <div className="awards-grid s4">
        {awards.map((award) => (
          <a href={getContentHref('award', award.title)} className="award-card" key={`${award.year}-${award.title}`}>
            <span style={{ color: award.color }}>{award.year}</span>
            <h3>{award.title}</h3>
            <p>{award.org}</p>
          </a>
        ))}
      </div>
      <SectionHeader eyebrow="honors · distinctions" title="other-awards-&-honors" action="view all" href="/view/awards" compact />
      <div className="honors-grid s4">
        {honors.map((honor) => (
          <a href={getContentHref('honor', honor.title)} className="honor-card" key={`${honor.year}-${honor.title}`}>
            <div className="honor-img"><ImageSlot slot={honor.slot} placeholder={honor.placeholder} alt={honor.title} /></div>
            <div className="honor-body">
              <span>{honor.year}</span>
              <h3>{honor.title}</h3>
              <p>{honor.org}</p>
              <i>↗</i>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
