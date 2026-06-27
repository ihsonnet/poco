import type { PoolClient, QueryResultRow } from 'pg';
import { randomUUID } from 'node:crypto';
import { dbQuery, withTransaction } from '@/lib/db';
import { slugify } from '@/data/content';

export type PublicationStatus = 'draft' | 'published' | 'archived';

export interface AdminPostListItem extends QueryResultRow {
  id: string;
  slug: string;
  type: string;
  route: 'blog' | 'details';
  title: string;
  subtitle: string;
  cover_slot: string | null;
  publication_status: PublicationStatus;
  published: boolean;
  featured: boolean;
  updated_at: Date;
  tags: string[];
}

export interface AdminPost extends AdminPostListItem {
  eyebrow: string;
  excerpt: string;
  body: string[];
  cover_fit: 'cover' | 'contain';
  year: string | null;
  location: string | null;
  status: string | null;
  status_color: string | null;
  external_url: string | null;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  gallery: Array<{ slot: string; caption: string; alt: string }>;
  attachments: Array<{ label: string; href: string; type: string }>;
}

export interface AdminPostInput {
  slug: string;
  type: string;
  route: 'blog' | 'details';
  title: string;
  subtitle: string;
  eyebrow: string;
  excerpt: string;
  body: string[];
  coverSlot: string;
  coverFit: 'cover' | 'contain';
  year: string;
  location: string;
  status: string;
  statusColor: string;
  externalUrl: string;
  publicationStatus: PublicationStatus;
  featured: boolean;
  sortOrder: number;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  gallery: Array<{ slot: string; caption: string; alt: string }>;
  attachments: Array<{ label: string; href: string; type: string }>;
}

export async function listAdminPosts() {
  return dbQuery<AdminPostListItem>(`
    select
      ci.id,
      ci.slug,
      ci.type,
      ci.route,
      ci.title,
      ci.subtitle,
      ci.cover_slot,
      ci.publication_status,
      ci.published,
      ci.featured,
      ci.updated_at,
      coalesce(array_agg(ct.name order by ct.name) filter (where ct.id is not null), '{}') as tags
    from content_items ci
    left join content_item_tags cit on cit.content_id = ci.id
    left join content_tags ct on ct.id = cit.tag_id
    group by ci.id
    order by ci.featured desc, ci.sort_order asc, ci.updated_at desc
  `);
}

export async function getAdminPost(id: string) {
  const rows = await dbQuery<AdminPost>(`
    select
      ci.*,
      coalesce(array_agg(ct.name order by ct.name) filter (where ct.id is not null), '{}') as tags,
      coalesce((
        select jsonb_agg(jsonb_build_object('slot', cgi.slot, 'caption', cgi.caption, 'alt', cgi.alt) order by cgi.sort_order)
        from content_gallery_images cgi
        where cgi.content_id = ci.id
      ), '[]'::jsonb) as gallery,
      coalesce((
        select jsonb_agg(jsonb_build_object('label', ca.label, 'href', ca.href, 'type', ca.type) order by ca.sort_order)
        from content_attachments ca
        where ca.content_id = ci.id
      ), '[]'::jsonb) as attachments
    from content_items ci
    left join content_item_tags cit on cit.content_id = ci.id
    left join content_tags ct on ct.id = cit.tag_id
    where ci.id = $1
    group by ci.id
  `, [id]);

  return rows[0] ?? null;
}

async function syncTags(client: PoolClient, contentId: string, tags: string[]) {
  await client.query('delete from content_item_tags where content_id = $1', [contentId]);

  for (const name of tags) {
    const slug = slugify(name);
    const tagId = randomUUID();
    const result = await client.query<{ id: string }>(`
      insert into content_tags (id, name, slug)
      values ($1, $2, $3)
      on conflict (slug) do update set name = excluded.name
      returning id
    `, [tagId, name, slug]);

    await client.query(`
      insert into content_item_tags (content_id, tag_id)
      values ($1, $2)
      on conflict do nothing
    `, [contentId, result.rows[0].id]);
  }
}

async function syncGallery(client: PoolClient, contentId: string, gallery: AdminPostInput['gallery']) {
  await client.query('delete from content_gallery_images where content_id = $1', [contentId]);

  for (const [index, image] of gallery.entries()) {
    await client.query(`
      insert into content_gallery_images (id, content_id, slot, alt, caption, sort_order)
      values ($1, $2, $3, $4, $5, $6)
    `, [randomUUID(), contentId, image.slot, image.alt, image.caption, index]);
  }
}

async function syncAttachments(client: PoolClient, contentId: string, attachments: AdminPostInput['attachments']) {
  await client.query('delete from content_attachments where content_id = $1', [contentId]);

  for (const [index, attachment] of attachments.entries()) {
    await client.query(`
      insert into content_attachments (id, content_id, label, href, type, sort_order)
      values ($1, $2, $3, $4, $5, $6)
    `, [randomUUID(), contentId, attachment.label, attachment.href, attachment.type, index]);
  }
}

export async function createAdminPost(input: AdminPostInput) {
  return withTransaction(async (client) => {
    const id = randomUUID();

    await client.query(`
      insert into content_items (
        id, slug, type, route, title, subtitle, eyebrow, excerpt, body, cover_slot, cover_fit,
        year, location, status, status_color, external_url, publication_status, published, featured, sort_order, seo_title, seo_description
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
    `, [
      id,
      input.slug,
      input.type,
      input.route,
      input.title,
      input.subtitle,
      input.eyebrow,
      input.excerpt,
      JSON.stringify(input.body),
      input.coverSlot || null,
      input.coverFit,
      input.year || null,
      input.location || null,
      input.status || null,
      input.statusColor || null,
      input.externalUrl || null,
      input.publicationStatus,
      input.publicationStatus === 'published',
      input.featured,
      input.sortOrder,
      input.seoTitle || null,
      input.seoDescription || null
    ]);

    await syncTags(client, id, input.tags);
    await syncGallery(client, id, input.gallery);
    await syncAttachments(client, id, input.attachments);

    return id;
  });
}

export async function updateAdminPost(id: string, input: AdminPostInput) {
  await withTransaction(async (client) => {
    await client.query(`
      update content_items
      set
        slug = $2,
        type = $3,
        route = $4,
        title = $5,
        subtitle = $6,
        eyebrow = $7,
        excerpt = $8,
        body = $9::jsonb,
        cover_slot = $10,
        cover_fit = $11,
        year = $12,
        location = $13,
        status = $14,
        status_color = $15,
        external_url = $16,
        publication_status = $17,
        published = $18,
        featured = $19,
        sort_order = $20,
        seo_title = $21,
        seo_description = $22
      where id = $1
    `, [
      id,
      input.slug,
      input.type,
      input.route,
      input.title,
      input.subtitle,
      input.eyebrow,
      input.excerpt,
      JSON.stringify(input.body),
      input.coverSlot || null,
      input.coverFit,
      input.year || null,
      input.location || null,
      input.status || null,
      input.statusColor || null,
      input.externalUrl || null,
      input.publicationStatus,
      input.publicationStatus === 'published',
      input.featured,
      input.sortOrder,
      input.seoTitle || null,
      input.seoDescription || null
    ]);

    await syncTags(client, id, input.tags);
    await syncGallery(client, id, input.gallery);
    await syncAttachments(client, id, input.attachments);
  });
}

export async function deleteAdminPost(id: string) {
  await dbQuery('delete from content_items where id = $1', [id]);
}

export function parseAdminPostInput(formData: FormData): AdminPostInput {
  const get = (name: string) => String(formData.get(name) ?? '').trim();
  const type = get('type') || 'project';
  const title = get('title');
  const route = get('route') === 'blog' ? 'blog' : 'details';
  const publicationStatus = ['draft', 'published', 'archived'].includes(get('publicationStatus'))
    ? get('publicationStatus') as PublicationStatus
    : 'draft';
  const body = get('body').split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const tags = get('tags').split(',').map((tag) => tag.trim()).filter(Boolean);
  const gallery = get('gallery').split('\n').map((line) => {
    const [slot = '', caption = '', alt = ''] = line.split('|').map((value) => value.trim());
    return slot ? { slot, caption, alt: alt || `${title} gallery image` } : null;
  }).filter((image): image is { slot: string; caption: string; alt: string } => Boolean(image));
  const attachments = get('attachments').split('\n').map((line) => {
    const [label = '', href = '', typeValue = 'external'] = line.split('|').map((value) => value.trim());
    const attachmentType = ['external', 'download', 'reference'].includes(typeValue) ? typeValue : 'external';
    return label && href ? { label, href, type: attachmentType } : null;
  }).filter((attachment): attachment is { label: string; href: string; type: string } => Boolean(attachment));

  return {
    slug: get('slug') || slugify(title),
    type,
    route,
    title,
    subtitle: get('subtitle'),
    eyebrow: get('eyebrow'),
    excerpt: get('excerpt'),
    body,
    coverSlot: get('coverSlot'),
    coverFit: get('coverFit') === 'contain' ? 'contain' : 'cover',
    year: get('year'),
    location: get('location'),
    status: get('status'),
    statusColor: get('statusColor'),
    externalUrl: get('externalUrl'),
    publicationStatus,
    featured: formData.get('featured') === 'on',
    sortOrder: Number(get('sortOrder') || 0),
    seoTitle: get('seoTitle'),
    seoDescription: get('seoDescription'),
    tags,
    gallery,
    attachments
  };
}
