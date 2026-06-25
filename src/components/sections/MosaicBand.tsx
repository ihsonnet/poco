import { MosaicGrid } from '@/components/ui/MosaicGrid';

export function MosaicBand() {
  return (
    <section className="mosaic-shell">
      <div className="mosaic-band">
        <MosaicGrid count={144} type="github" seed={4} />
      </div>
    </section>
  );
}
