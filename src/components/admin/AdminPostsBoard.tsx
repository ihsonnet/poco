'use client';

import { useMemo, useState } from 'react';
import type { PublicationStatus } from '@/lib/adminContent';
import { ImageSlot } from '@/components/ui/ImageSlot';

type PostStatusFilter = PublicationStatus | 'all';
type SortOption = 'updated-desc' | 'updated-asc' | 'title-az' | 'title-za' | 'type';

export interface AdminBoardPost {
  id: string;
  slug: string;
  type: string;
  route: 'blog' | 'details';
  title: string;
  subtitle: string;
  coverSlot: string | null;
  coverImageUrl: string | null;
  publicationStatus: PublicationStatus;
  featured: boolean;
  updatedAt: string;
  tags: string[];
}

interface AdminPostsBoardProps {
  posts: AdminBoardPost[];
}

function matchesSearch(post: AdminBoardPost, query: string) {
  if (!query) return true;

  return [
    post.title,
    post.subtitle,
    post.slug,
    post.type,
    post.route,
    post.publicationStatus,
    ...post.tags
  ].join(' ').toLowerCase().includes(query);
}

function sortPosts(posts: AdminBoardPost[], sort: SortOption) {
  return [...posts].sort((a, b) => {
    if (sort === 'updated-desc') return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
    if (sort === 'updated-asc') return Date.parse(a.updatedAt) - Date.parse(b.updatedAt);
    if (sort === 'title-az') return a.title.localeCompare(b.title);
    if (sort === 'title-za') return b.title.localeCompare(a.title);
    return a.type.localeCompare(b.type) || a.title.localeCompare(b.title);
  });
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

export function AdminPostsBoard({ posts }: AdminPostsBoardProps) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<PostStatusFilter>('all');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState<SortOption>('updated-desc');

  const normalizedQuery = query.trim().toLowerCase();
  const typeOptions = useMemo(() => Array.from(new Set(posts.map((post) => post.type))).sort(), [posts]);
  const counts = useMemo(() => ({
    all: posts.length,
    archived: posts.filter((post) => post.publicationStatus === 'archived').length,
    draft: posts.filter((post) => post.publicationStatus === 'draft').length,
    published: posts.filter((post) => post.publicationStatus === 'published').length
  }), [posts]);

  const visiblePosts = useMemo(() => {
    const filtered = posts
      .filter((post) => status === 'all' || post.publicationStatus === status)
      .filter((post) => type === 'all' || post.type === type)
      .filter((post) => matchesSearch(post, normalizedQuery));

    return sortPosts(filtered, sort);
  }, [normalizedQuery, posts, sort, status, type]);

  const resetFilters = () => {
    setQuery('');
    setStatus('all');
    setType('all');
    setSort('updated-desc');
  };

  const filtersActive = Boolean(normalizedQuery || status !== 'all' || type !== 'all' || sort !== 'updated-desc');

  return (
    <>
      <div className="admin-posts-toolbar">
        <div className="admin-posts-summary">
          <span>{String(visiblePosts.length).padStart(2, '0')} / {String(posts.length).padStart(2, '0')} records</span>
          <p>Draft, publish, archive, upload covers, and keep the portfolio content system tidy.</p>
        </div>
        <div className="admin-status-stats" aria-label="Post status counts">
          {(['all', 'draft', 'published', 'archived'] as const).map((item) => (
            <button
              type="button"
              className={status === item ? 'active' : ''}
              onClick={() => setStatus(item)}
              key={item}
            >
              <b>{counts[item]}</b>
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="admin-filter-bar">
        <label className="admin-filter-search">
          <span>search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="title, slug, tag, type..."
          />
        </label>
        <label>
          <span>status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as PostStatusFilter)}>
            <option value="all">all statuses</option>
            <option value="draft">draft</option>
            <option value="published">published</option>
            <option value="archived">archived</option>
          </select>
        </label>
        <label>
          <span>type</span>
          <select value={type} onChange={(event) => setType(event.target.value)}>
            <option value="all">all types</option>
            {typeOptions.map((typeOption) => <option value={typeOption} key={typeOption}>{typeOption}</option>)}
          </select>
        </label>
        <label>
          <span>sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
            <option value="updated-desc">newest updated</option>
            <option value="updated-asc">oldest updated</option>
            <option value="title-az">title A-Z</option>
            <option value="title-za">title Z-A</option>
            <option value="type">type</option>
          </select>
        </label>
        <button type="button" onClick={resetFilters} disabled={!filtersActive}>reset</button>
      </div>

      <div className="admin-post-grid">
        {visiblePosts.map((post) => (
          <a href={`/admin/posts/${post.id}`} className="admin-post-card" key={post.id}>
            <div className="admin-post-thumb">
              <ImageSlot src={post.coverImageUrl ?? undefined} slot={post.coverSlot ?? undefined} placeholder="No cover image" alt={post.title} />
            </div>
            <div className="admin-post-copy">
              <div>
                <span className={`admin-status-pill admin-status-${post.publicationStatus}`}>{post.publicationStatus}</span>
                {post.featured ? <span className="admin-status-pill admin-status-featured">featured</span> : null}
              </div>
              <h2>{post.title || 'Untitled post'}<i>/</i></h2>
              <p>{post.subtitle || `/${post.route}/${post.slug}`}</p>
              <footer>
                <span>{post.type}</span>
                <span>{formatDate(post.updatedAt)}</span>
              </footer>
            </div>
          </a>
        ))}
        {!visiblePosts.length ? (
          <div className="admin-empty admin-empty-card">
            <h2>{posts.length ? 'no-matches' : 'no-posts-yet'}<span>/</span></h2>
            <p>{posts.length ? 'Try a wider search, reset filters, or switch status/type filters back to all.' : 'Create the first database post and upload a cover image to start building the managed archive.'}</p>
            {posts.length ? (
              <button className="admin-action" type="button" onClick={resetFilters}>reset filters ↗</button>
            ) : (
              <a className="admin-action" href="/admin/posts/new">create first post ↗</a>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
}
