'use client';

import { useMemo, useState } from 'react';
import { filterPostsByTag, getCollectionTagHref, getPostPrimaryHref, isExternalPost, tagSlug, type ContentCollection, type ContentPost } from '@/data/content';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TagList } from '@/components/ui/TagList';

type SortOption = 'featured' | 'newest' | 'oldest' | 'title-az' | 'title-za' | 'type';

interface CollectionPageProps {
  collection: ContentCollection;
  activeTag?: string;
}

function getYearValue(post: ContentPost) {
  const match = post.year?.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

function matchesSearch(post: ContentPost, query: string) {
  if (!query) return true;

  const haystack = [
    post.title,
    post.subtitle,
    post.eyebrow,
    post.excerpt,
    post.year,
    post.location,
    post.status,
    post.type,
    ...post.tags
  ].join(' ').toLowerCase();

  return haystack.includes(query);
}

function sortPosts(posts: Array<{ post: ContentPost; index: number }>, sort: SortOption) {
  return [...posts].sort((a, b) => {
    if (sort === 'featured') return a.index - b.index;
    if (sort === 'newest') return getYearValue(b.post) - getYearValue(a.post) || a.index - b.index;
    if (sort === 'oldest') return getYearValue(a.post) - getYearValue(b.post) || a.index - b.index;
    if (sort === 'title-az') return a.post.title.localeCompare(b.post.title);
    if (sort === 'title-za') return b.post.title.localeCompare(a.post.title);
    return a.post.type.localeCompare(b.post.type) || a.index - b.index;
  }).map(({ post }) => post);
}

export function CollectionPage({ collection, activeTag }: CollectionPageProps) {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sort, setSort] = useState<SortOption>('featured');

  const normalizedQuery = query.trim().toLowerCase();
  const activeLabel = collection.tags.find((tag) => tagSlug(tag) === activeTag);
  const typeOptions = useMemo(() => Array.from(new Set(collection.posts.map((post) => post.type))).sort(), [collection.posts]);

  const posts = useMemo(() => {
    const taggedPosts = filterPostsByTag(collection.posts, activeTag);
    const filteredPosts = taggedPosts
      .map((post, index) => ({ post, index }))
      .filter(({ post }) => typeFilter === 'all' || post.type === typeFilter)
      .filter(({ post }) => matchesSearch(post, normalizedQuery));

    return sortPosts(filteredPosts, sort);
  }, [activeTag, collection.posts, normalizedQuery, sort, typeFilter]);

  const resetLocalFilters = () => {
    setQuery('');
    setTypeFilter('all');
    setSort('featured');
  };

  return (
    <section className="archive-page">
      <Breadcrumbs items={[{ label: 'view', href: '/view/all' }, { label: collection.slug }]} />
      <div className="archive-hero">
        <div>
          <span className="section-eyebrow">{collection.eyebrow}</span>
          <h1 className="archive-title">{collection.title}<span>/</span></h1>
          <p>{collection.description}</p>
        </div>
        <div className="archive-count">{String(posts.length).padStart(2, '0')} / {String(collection.posts.length).padStart(2, '0')} records</div>
      </div>

      <div className="archive-tools">
        <label className="archive-search">
          <span>search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="title, tag, year, type..."
          />
        </label>
        <label>
          <span>filter</span>
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="all">all types</option>
            {typeOptions.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label>
          <span>sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
            <option value="featured">featured order</option>
            <option value="newest">newest first</option>
            <option value="oldest">oldest first</option>
            <option value="title-az">title A-Z</option>
            <option value="title-za">title Z-A</option>
            <option value="type">type</option>
          </select>
        </label>
        {activeTag ? (
          <a className="archive-reset" href={getCollectionTagHref(collection.slug)}>reset all</a>
        ) : (
          <button className="archive-reset" type="button" onClick={resetLocalFilters}>reset</button>
        )}
      </div>

      <div className="archive-tags">
        <a className={!activeTag ? 'active' : ''} href={getCollectionTagHref(collection.slug)}>all</a>
        {collection.tags.map((tag) => (
          <a key={tag} className={tagSlug(tag) === activeTag ? 'active' : ''} href={getCollectionTagHref(collection.slug, tag)}>
            {tag}
          </a>
        ))}
      </div>

      {activeLabel || normalizedQuery || typeFilter !== 'all' ? (
        <p className="archive-filter-note">
          Showing {posts.length} record{posts.length === 1 ? '' : 's'}
          {activeLabel ? <> tagged <b>{activeLabel}</b></> : null}
          {typeFilter !== 'all' ? <> in <b>{typeFilter}</b></> : null}
          {normalizedQuery ? <> matching <b>{query.trim()}</b></> : null}.
        </p>
      ) : null}

      {posts.length ? (
        <div className="archive-grid">
          {posts.map((post) => (
            <a
              className="archive-card"
              href={getPostPrimaryHref(post)}
              key={post.slug}
              target={isExternalPost(post) ? '_blank' : undefined}
              rel={isExternalPost(post) ? 'noreferrer' : undefined}
            >
              <div className="archive-card-cover">
                <ImageSlot slot={post.coverSlot} src={post.coverImageUrl} fit={post.coverFit ?? 'cover'} placeholder="Drop cover image" alt={post.title} />
              </div>
              <div className="archive-card-body">
                <div className="archive-card-meta">
                  <span>{post.eyebrow}</span>
                  <span>{post.year ?? post.status ?? post.type}</span>
                </div>
                <h2>{post.title}<span>/</span></h2>
                <p>{post.subtitle}</p>
                <TagList tags={post.tags.slice(0, 5)} small />
                <i>{isExternalPost(post) ? 'open source' : post.route === 'blog' ? 'read post' : 'view details'} ↗</i>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="archive-empty">
          <h2>no-matches<span>/</span></h2>
          <p>Try a broader search term, clear the active tag, or switch the type filter back to all types.</p>
          {activeTag ? <a href={getCollectionTagHref(collection.slug)}>reset all ↗</a> : <button type="button" onClick={resetLocalFilters}>reset filters ↗</button>}
        </div>
      )}
    </section>
  );
}
