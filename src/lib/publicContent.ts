import type { QueryResultRow } from 'pg';
import {
  contentPosts,
  filterPostsByTag,
  getCollection,
  getPost,
  getRelatedPosts,
  tagSlug,
  type ContentAttachment,
  type ContentCollection,
  type ContentGalleryImage,
  type ContentKind,
  type ContentPost,
  type DetailRouteKind
} from '@/data/content';
import { dbQuery, isDatabaseConfigured } from '@/lib/db';

interface PublicPostRow extends QueryResultRow {
  id: string;
  slug: string;
  type: string;
  route: DetailRouteKind;
  title: string;
  subtitle: string;
  eyebrow: string;
  excerpt: string;
  body: string[];
  cover_slot: string | null;
  cover_fit: 'cover' | 'contain';
  year: string | null;
  location: string | null;
  status: string | null;
  status_color: string | null;
  external_url: string | null;
  publication_status: 'draft' | 'published' | 'archived';
  tags: string[];
  gallery: ContentGalleryImage[];
  attachments: ContentAttachment[];
}

const contentKinds: ContentKind[] = ['activity', 'award', 'honor', 'judging', 'project', 'research', 'speaking', 'media', 'blog', 'leadership'];

function asContentKind(value: string): ContentKind {
  return contentKinds.includes(value as ContentKind) ? value as ContentKind : 'project';
}

function mapPost(row: PublicPostRow): ContentPost {
  return {
    slug: row.slug,
    type: asContentKind(row.type),
    route: row.route,
    title: row.title,
    subtitle: row.subtitle,
    eyebrow: row.eyebrow,
    excerpt: row.excerpt,
    body: Array.isArray(row.body) ? row.body : [],
    coverSlot: row.cover_slot ?? undefined,
    coverFit: row.cover_fit,
    year: row.year ?? undefined,
    location: row.location ?? undefined,
    status: row.status ?? undefined,
    statusColor: row.status_color ?? undefined,
    externalUrl: row.external_url ?? undefined,
    tags: row.tags ?? [],
    gallery: row.gallery ?? [],
    attachments: row.attachments ?? []
  };
}

async function queryPublishedPosts(where = '', values: unknown[] = []) {
  return dbQuery<PublicPostRow>(`
    select
      ci.id,
      ci.slug,
      ci.type,
      ci.route,
      ci.title,
      ci.subtitle,
      ci.eyebrow,
      ci.excerpt,
      ci.body,
      ci.cover_slot,
      ci.cover_fit,
      ci.year,
      ci.location,
      ci.status,
      ci.status_color,
      ci.external_url,
      ci.publication_status,
      coalesce(array_agg(ct.name order by ct.name) filter (where ct.id is not null), '{}') as tags,
      coalesce((
        select jsonb_agg(jsonb_build_object('slot', cgi.slot, 'alt', cgi.alt, 'caption', cgi.caption) order by cgi.sort_order)
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
    where ci.publication_status = 'published'
    ${where}
    group by ci.id
    order by ci.featured desc, ci.sort_order asc, ci.updated_at desc
  `, values);
}

export async function getRuntimePosts() {
  if (!isDatabaseConfigured()) return contentPosts;

  try {
    const rows = await queryPublishedPosts();
    return rows.length ? rows.map(mapPost) : contentPosts;
  } catch {
    return contentPosts;
  }
}

export async function getRuntimePost(slug: string) {
  if (!isDatabaseConfigured()) return getPost(slug);

  try {
    const rows = await queryPublishedPosts('and ci.slug = $1', [slug]);
    return rows[0] ? mapPost(rows[0]) : getPost(slug);
  } catch {
    return getPost(slug);
  }
}

export async function getRuntimeCollection(slug: string) {
  const baseCollection = getCollection(slug);
  if (!baseCollection) return null;

  const posts = await getRuntimePosts();
  const types = new Set(baseCollection.posts.map((post) => post.type));
  const collectionPosts = posts.filter((post) => types.has(post.type));
  const nextPosts = collectionPosts.length ? collectionPosts : baseCollection.posts;
  const tags = Array.from(new Set(nextPosts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b));

  return {
    ...baseCollection,
    posts: nextPosts,
    tags
  } satisfies ContentCollection;
}

export async function getRuntimeRelatedPosts(post: ContentPost, limit = 3) {
  if (!isDatabaseConfigured()) return getRelatedPosts(post, limit);

  const posts = await getRuntimePosts();
  const tagSet = new Set(post.tags.map(tagSlug));

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      post: candidate,
      score: candidate.tags.reduce((score, tag) => score + (tagSet.has(tagSlug(tag)) ? 1 : 0), 0)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export async function getRuntimeCollectionPosts(slug: string, tag?: string) {
  const collection = await getRuntimeCollection(slug);
  if (!collection) return [];
  return filterPostsByTag(collection.posts, tag);
}
