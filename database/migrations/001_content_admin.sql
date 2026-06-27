create table if not exists content_items (
  id text primary key,
  slug text not null unique,
  type text not null,
  route text not null default 'details' check (route in ('blog', 'details')),
  title text not null,
  subtitle text not null default '',
  eyebrow text not null default '',
  excerpt text not null default '',
  body jsonb not null default '[]'::jsonb,
  cover_slot text,
  cover_fit text not null default 'cover' check (cover_fit in ('cover', 'contain')),
  year text,
  location text,
  status text,
  status_color text,
  external_url text,
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published', 'archived')),
  published boolean not null default false,
  featured boolean not null default false,
  sort_order integer not null default 0,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table content_items add column if not exists external_url text;
alter table content_items add column if not exists publication_status text not null default 'draft';
alter table content_items drop constraint if exists content_items_publication_status_check;
alter table content_items add constraint content_items_publication_status_check
  check (publication_status in ('draft', 'published', 'archived'));
update content_items
set publication_status = case when published then 'published' else publication_status end
where publication_status = 'draft';

create table if not exists content_tags (
  id text primary key,
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists content_item_tags (
  content_id text not null references content_items(id) on delete cascade,
  tag_id text not null references content_tags(id) on delete cascade,
  primary key (content_id, tag_id)
);

create table if not exists content_collections (
  id text primary key,
  slug text not null unique,
  title text not null,
  eyebrow text not null default '',
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists content_collection_items (
  collection_id text not null references content_collections(id) on delete cascade,
  content_id text not null references content_items(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (collection_id, content_id)
);

create table if not exists content_attachments (
  id text primary key,
  content_id text not null references content_items(id) on delete cascade,
  label text not null,
  href text not null,
  type text not null default 'external' check (type in ('external', 'download', 'reference')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists content_gallery_images (
  id text primary key,
  content_id text not null references content_items(id) on delete cascade,
  slot text,
  image_url text,
  alt text not null default '',
  caption text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  check (slot is not null or image_url is not null)
);

create index if not exists content_items_type_idx on content_items(type);
create index if not exists content_items_route_idx on content_items(route);
create index if not exists content_items_published_idx on content_items(published);
create index if not exists content_items_publication_status_idx on content_items(publication_status);
create index if not exists content_items_sort_idx on content_items(featured desc, sort_order asc, updated_at desc);
create index if not exists content_tags_slug_idx on content_tags(slug);
create index if not exists content_gallery_content_idx on content_gallery_images(content_id, sort_order);
create index if not exists content_attachments_content_idx on content_attachments(content_id, sort_order);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists content_items_updated_at on content_items;
create trigger content_items_updated_at
before update on content_items
for each row execute function set_updated_at();

drop trigger if exists content_collections_updated_at on content_collections;
create trigger content_collections_updated_at
before update on content_collections
for each row execute function set_updated_at();
