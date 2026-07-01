import { ChipArt } from '@/components/ui/ChipArt';
import { MosaicGrid } from '@/components/ui/MosaicGrid';
import { SatelliteArt } from '@/components/ui/SatelliteArt';

export function FinalCTA({ email }: { email: string }) {
  return (
    <section className="final-cta stack2">
      <div className="cta-art-grid">
        <div className="cta-art-dark"><SatelliteArt /></div>
        <MosaicGrid count={16} type="accent" seed={3} className="cta-tile-mosaic" />
        <div className="cta-terminal">&gt;_</div>
        <div className="cta-chip"><ChipArt /></div>
      </div>
      <div className="cta-copy fixedw">
        <div className="cta-eyebrow">open-to-collaboration <span /></div>
        <h2>Let’s build the next clear technical story.</h2>
        <a href={`mailto:${email}`} className="frame-button cta-button">Send an email <span>↗</span></a>
      </div>
    </section>
  );
}
