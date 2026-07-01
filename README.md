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

## Coming soon mode

Set `COMING_SOON_MODE=true` to redirect every normal page route, including `/`, to `/coming-soon`.
Leave it unset or `false` to show the full portfolio site; `/coming-soon` redirects back to `/` while the flag is off.
Admin routes under `/admin` remain available so content can be managed while the public site is hidden.

## PostgreSQL admin panel

The project includes a lightweight PostgreSQL-backed content admin at `/admin`.

Required environment variables:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ihsonnet
DATABASE_SSL=false
ADMIN_PASSWORD=change-me
ADMIN_SECRET=change-me-to-a-long-random-string
```

Run the initial migration:

```bash
npm run db:migrate
```

Seed the current homepage/archive content into the database:

```bash
npm run db:seed
```

The migration command uses the project `pg` dependency and reads `.env.local` automatically, so you do not need the `psql` CLI installed.
The seed command uses the same source content as the current homepage and archive views, then inserts published posts, collections, and default site settings into PostgreSQL in an idempotent way.

Then visit `http://localhost:3000/admin/login`. The admin can create and edit posts with title, slug, type, route, post status (`draft`, `published`, `archived`), tags, cover slot, cover image upload, external URL, rich text paragraphs, gallery image uploads, gallery rows, and attachments.
Global header, hero, and footer content can be edited from `http://localhost:3000/admin/site`.
Only `published` database records are read by `/view/[slug]`, `/blog/[slug]`, and `/details/[slug]`; `draft` and `archived` records stay hidden from the public site. If the database is not configured or has no published records, the current static portfolio content remains the fallback.
Uploaded images are saved under structured folders: cover images go to `public/uploads/covers/YYYY/MM`, and gallery images go to `public/uploads/gallery/YYYY/MM`. Uploaded media is ignored by git except for `.gitkeep` placeholders, so back `public/uploads` up or mount persistent storage in production.

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
