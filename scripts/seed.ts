import { readFile } from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

import { collectionList, contentPosts, slugify, tagSlug, type ContentAttachment, type ContentGalleryImage, type ContentPost } from '../src/data/contentShared';
import { heroTags, navItems, profile } from '../src/data/portfolio';
import { DEFAULT_HOME_SECTION_ORDER } from '../src/lib/homeSections';

const root = path.resolve(__dirname, '..');
const envFiles = ['.env.local', '.env'];

const defaultLightTheme = {
  bg: '#e8ebe7',
  surface: '#ffffff',
  ink: '#0d1117',
  inkSolid: '#0d1117',
  muted: '#57606a',
  muted2: '#3d444d',
  border: '#d5dbd3',
  borderFaint: '#e9ede6',
  primary: '#1a7f37',
  secondaryButton: '#0d1117',
  tertiaryButton: '#0a66c2',
  chip: '#4b40c9'
} as const;

const defaultDarkTheme = {
  bg: '#0d1117',
  surface: '#11161d',
  ink: '#e6edf3',
  inkSolid: '#21262d',
  muted: '#9aa4ae',
  muted2: '#b3bcc6',
  border: '#30363d',
  borderFaint: '#21262d',
  primary: '#2da44e',
  secondaryButton: '#21262d',
  tertiaryButton: '#0a66c2',
  chip: '#4b40c9'
} as const;

function unquote(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
    || (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

async function loadEnvFile(fileName: string) {
  try {
    const content = await readFile(path.join(root, fileName), 'utf8');

    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;

      const separatorIndex = line.indexOf('=');
      if (separatorIndex === -1) continue;

      const key = line.slice(0, separatorIndex).trim();
      const value = unquote(line.slice(separatorIndex + 1));

      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code !== 'ENOENT') throw error;
  }
}

function contentId(post: ContentPost) {
  return `seed:content:${post.slug}`;
}

function tagId(name: string) {
  return `seed:tag:${tagSlug(name)}`;
}

function attachmentId(post: ContentPost, index: number) {
  return `seed:attachment:${post.slug}:${index}`;
}

function galleryId(post: ContentPost, index: number) {
  return `seed:gallery:${post.slug}:${index}`;
}

function collectionId(slug: string) {
  return `seed:collection:${slug}`;
}

async function upsertTags(client: pg.Client, post: ContentPost) {
  await client.query('delete from content_item_tags where content_id = $1', [contentId(post)]);

  for (const name of post.tags) {
    await client.query(
      `insert into content_tags (id, name, slug)
       values ($1, $2, $3)
       on conflict (slug) do update set name = excluded.name`,
      [tagId(name), name, slugify(name)]
    );

    await client.query(
      `insert into content_item_tags (content_id, tag_id)
       values ($1, $2)
       on conflict do nothing`,
      [contentId(post), tagId(name)]
    );
  }
}

async function upsertGallery(client: pg.Client, post: ContentPost, gallery: ContentGalleryImage[] = []) {
  await client.query('delete from content_gallery_images where content_id = $1', [contentId(post)]);

  for (const [index, image] of gallery.entries()) {
    await client.query(
      `insert into content_gallery_images (id, content_id, slot, image_url, alt, caption, sort_order)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [
        galleryId(post, index),
        contentId(post),
        image.slot ?? null,
        image.imageUrl ?? null,
        image.alt,
        image.caption ?? null,
        index
      ]
    );
  }
}

async function upsertAttachments(client: pg.Client, post: ContentPost, attachments: ContentAttachment[] = []) {
  await client.query('delete from content_attachments where content_id = $1', [contentId(post)]);

  for (const [index, attachment] of attachments.entries()) {
    await client.query(
      `insert into content_attachments (id, content_id, label, href, type, sort_order)
       values ($1, $2, $3, $4, $5, $6)`,
      [attachmentId(post, index), contentId(post), attachment.label, attachment.href, attachment.type, index]
    );
  }
}

async function upsertPost(client: pg.Client, post: ContentPost, index: number) {
  await client.query(
    `insert into content_items (
      id, slug, type, route, title, subtitle, eyebrow, excerpt, body, cover_slot, cover_image_url, cover_fit,
      year, location, status, status_color, external_url, publication_status, published, featured, sort_order,
      seo_title, seo_description
    )
    values (
      $1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12,
      $13, $14, $15, $16, $17, 'published', true, false, $18,
      $19, $20
    )
    on conflict (slug) do update set
      type = excluded.type,
      route = excluded.route,
      title = excluded.title,
      subtitle = excluded.subtitle,
      eyebrow = excluded.eyebrow,
      excerpt = excluded.excerpt,
      body = excluded.body,
      cover_slot = excluded.cover_slot,
      cover_image_url = excluded.cover_image_url,
      cover_fit = excluded.cover_fit,
      year = excluded.year,
      location = excluded.location,
      status = excluded.status,
      status_color = excluded.status_color,
      external_url = excluded.external_url,
      publication_status = excluded.publication_status,
      published = excluded.published,
      featured = excluded.featured,
      sort_order = excluded.sort_order,
      seo_title = excluded.seo_title,
      seo_description = excluded.seo_description`,
    [
      contentId(post),
      post.slug,
      post.type,
      post.route,
      post.title,
      post.subtitle,
      post.eyebrow,
      post.excerpt,
      JSON.stringify(post.body),
      post.coverSlot ?? null,
      post.coverImageUrl ?? null,
      post.coverFit ?? 'cover',
      post.year ?? null,
      post.location ?? null,
      post.status ?? null,
      post.statusColor ?? null,
      post.externalUrl ?? null,
      index,
      post.title,
      post.excerpt
    ]
  );

  await upsertTags(client, post);
  await upsertGallery(client, post, post.gallery);
  await upsertAttachments(client, post, post.attachments);
}

async function upsertCollections(client: pg.Client) {
  for (const [index, collection] of collectionList.entries()) {
    const id = collectionId(collection.slug);

    await client.query(
      `insert into content_collections (id, slug, title, eyebrow, description, sort_order)
       values ($1, $2, $3, $4, $5, $6)
       on conflict (slug) do update set
         title = excluded.title,
         eyebrow = excluded.eyebrow,
         description = excluded.description,
         sort_order = excluded.sort_order`,
      [id, collection.slug, collection.title, collection.eyebrow, collection.description, index]
    );

    await client.query('delete from content_collection_items where collection_id = $1', [id]);

    for (const [postIndex, post] of collection.posts.entries()) {
      await client.query(
        `insert into content_collection_items (collection_id, content_id, sort_order)
         values ($1, $2, $3)
         on conflict (collection_id, content_id) do update set sort_order = excluded.sort_order`,
        [id, contentId(post), postIndex]
      );
    }
  }
}

async function upsertSiteSettings(client: pg.Client) {
  await client.query(
    `insert into site_settings (
      id, brand, contact_email, github_url, linkedin_url, nav_items,
      hero_name, hero_last_name, hero_location, hero_status, hero_tagline, hero_lede, hero_tags,
      hero_image_slot, hero_image_url, hero_view_work_label, hero_view_work_href,
      footer_wordmark, footer_copyright, footer_tagline, home_section_order,
      theme_light, theme_dark
    )
    values (
      'global', $1, $2, $3, $4, $5::jsonb,
      $6, $7, $8, $9, $10, $11, $12::jsonb,
      $13, $14, $15, $16,
      $17, $18, $19, $20::jsonb,
      $21::jsonb, $22::jsonb
    )
    on conflict (id) do update set
      brand = excluded.brand,
      contact_email = excluded.contact_email,
      github_url = excluded.github_url,
      linkedin_url = excluded.linkedin_url,
      nav_items = excluded.nav_items,
      hero_name = excluded.hero_name,
      hero_last_name = excluded.hero_last_name,
      hero_location = excluded.hero_location,
      hero_status = excluded.hero_status,
      hero_tagline = excluded.hero_tagline,
      hero_lede = excluded.hero_lede,
      hero_tags = excluded.hero_tags,
      hero_image_slot = excluded.hero_image_slot,
      hero_image_url = excluded.hero_image_url,
      hero_view_work_label = excluded.hero_view_work_label,
      hero_view_work_href = excluded.hero_view_work_href,
      footer_wordmark = excluded.footer_wordmark,
      footer_copyright = excluded.footer_copyright,
      footer_tagline = excluded.footer_tagline,
      home_section_order = excluded.home_section_order,
      theme_light = excluded.theme_light,
      theme_dark = excluded.theme_dark`,
    [
      profile.brand,
      profile.email,
      profile.github,
      profile.linkedin,
      JSON.stringify(navItems),
      profile.name,
      profile.lastName,
      profile.location,
      profile.status,
      profile.tagline,
      profile.lede,
      JSON.stringify(heroTags),
      'hero_portrait',
      '',
      'View work',
      '#work',
      'ihsonnet/',
      '© 2026 Injamamul Haque Sonet',
      'space education technologist · judge · founder',
      JSON.stringify(DEFAULT_HOME_SECTION_ORDER),
      JSON.stringify(defaultLightTheme),
      JSON.stringify(defaultDarkTheme)
    ]
  );
}

async function main() {
  for (const fileName of envFiles) {
    await loadEnvFile(fileName);
  }

  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured. Add it to .env.local or export it before running db:seed.');
  }

  const migrationPath = path.join(root, 'database/migrations/001_content_admin.sql');
  const migrationSql = await readFile(migrationPath, 'utf8');
  const client = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined
  });

  await client.connect();

  try {
    await client.query(migrationSql);
    await client.query('begin');

    for (const [index, post] of contentPosts.entries()) {
      await upsertPost(client, post, index);
    }

    await upsertCollections(client);
    await upsertSiteSettings(client);

    await client.query('commit');
    console.log(`Seed complete: ${contentPosts.length} posts, ${collectionList.length} collections, site settings synced.`);
  } catch (error) {
    await client.query('rollback');
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
