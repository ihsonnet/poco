# IHSONNET — GitHub Universe Inspired Next.js Portfolio

This is the updated standalone Next.js conversion rebuilt from the latest uploaded `GitHub Universe Website Clone (1).zip` source.

## Stack

- Next.js App Router
- TypeScript
- Lucide React icons
- Reusable section components
- CSS design system matching the standalone HTML direction
- Extracted image-slot assets saved as real files under `public/images/slots`
- Standalone output enabled in `next.config.ts`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

Because `next.config.ts` uses `output: 'standalone'`, a production server bundle will be generated in `.next/standalone` after a successful build.

## File structure

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    PortfolioPage.tsx
    sections/
      Navigation.tsx
      Hero.tsx
      Highlights.tsx
      Ticker.tsx
      ActivityCarousel.tsx
      Timeline.tsx
      Recognition.tsx
      JudgingMentoring.tsx
      MosaicBand.tsx
      Projects.tsx
      Research.tsx
      Speaking.tsx
      Cocurricular.tsx
      MediaBlog.tsx
      FinalCTA.tsx
      Footer.tsx
    ui/
      ImageSlot.tsx
      SectionHeader.tsx
      ScrambleText.tsx
      TerminalMark.tsx
      MosaicGrid.tsx
      TagList.tsx
      SatelliteArt.tsx
      ChipArt.tsx
  data/
    portfolio.ts
    imageSlots.ts
  types/
    portfolio.ts
public/
  images/slots/
  reference/
```

## Notes

- The reusable section components preserve the original page rhythm: sticky nav, two-column hero, bordered sections, ticker, timeline bubbles, award grids, project tabs, hover-based research/speaking panels, co-curricular collage, final CTA, and footer wordmark.
- `public/reference/` contains small screenshot references from the uploaded source for comparison.
- I attempted a local dependency install in the sandbox, but npm produced package tar extraction errors in this environment. The project folder is clean and does not include `node_modules`; run `npm install` on your local machine.
