import { awards, blog, cocurricular, honors, judging, media, projectSets, recentActivity, research, talks } from '@/data/portfolio';

export type ContentKind = 'activity' | 'award' | 'honor' | 'judging' | 'project' | 'research' | 'speaking' | 'media' | 'blog' | 'leadership';
export type DetailRouteKind = 'blog' | 'details';

export interface ContentAttachment {
  label: string;
  href: string;
  type: 'external' | 'download' | 'reference';
}

export interface ContentGalleryImage {
  slot: string;
  alt: string;
  caption?: string;
}

export interface ContentPost {
  slug: string;
  type: ContentKind;
  route: DetailRouteKind;
  title: string;
  subtitle: string;
  eyebrow: string;
  excerpt: string;
  body: string[];
  coverSlot?: string;
  coverFit?: 'cover' | 'contain';
  year?: string;
  location?: string;
  status?: string;
  statusColor?: string;
  externalUrl?: string;
  tags: string[];
  attachments?: ContentAttachment[];
  gallery?: ContentGalleryImage[];
}

export interface ContentCollection {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  posts: ContentPost[];
}

type PostInput = Omit<ContentPost, 'slug' | 'route'> & { slug?: string };

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function tagSlug(value: string) {
  return slugify(value);
}

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

function cleanTags(tags: Array<string | undefined>) {
  return unique(tags.filter(Boolean).map((tag) => tag!.trim()).filter(Boolean));
}

function galleryFromSlots(slots: Array<string | undefined>, title: string): ContentGalleryImage[] {
  return cleanTags(slots).map((slot, index) => ({
    slot,
    alt: `${title} gallery image ${index + 1}`,
    caption: index === 0 ? 'cover reference' : `supporting photo ${index + 1}`
  }));
}

function createPost(input: PostInput): ContentPost {
  const route: DetailRouteKind = input.type === 'blog' ? 'blog' : 'details';
  return {
    ...input,
    route,
    slug: input.slug ?? slugify(input.title),
    tags: cleanTags(input.tags)
  };
}

const activityPosts = recentActivity.map((item) => createPost({
  type: 'activity',
  title: item.title,
  subtitle: `${item.tag} · ${item.date}`,
  eyebrow: 'recent activity',
  excerpt: `${item.title} — part of ongoing public work across AI systems, judging, mentoring, and community-facing technology programs.`,
  body: [
    `${item.title} reflects a recent public milestone in Sonet’s work across secure software, AI-first systems, space education, and technical community building.`,
    'This entry is structured as a concise activity record now, with room for photos, references, event notes, and outcomes as the archive grows.'
  ],
  coverSlot: item.slot,
  year: item.date,
  tags: ['activity', item.tag, item.date],
  gallery: galleryFromSlots([item.slot], item.title)
}));

const awardPosts = awards.map((award) => createPost({
  type: 'award',
  title: award.title,
  subtitle: award.org,
  eyebrow: 'award · recognition',
  excerpt: `${award.title} from ${award.org}.`,
  body: [
    `${award.title} is part of the recognition record behind the portfolio’s global-recognition section.`,
    'The detail page is designed to hold award context, selection criteria, project contribution, certificates, press links, and related evidence over time.'
  ],
  coverSlot: award.title.includes('NASA') || award.title.includes('Inspirational') ? 'champ_landscape' : undefined,
  year: award.year,
  status: 'Recognition',
  statusColor: award.color,
  tags: ['award', 'recognition', award.year, award.org],
  gallery: galleryFromSlots(
    award.title.includes('NASA') || award.title.includes('Inspirational') ? ['champ_landscape', 'champ_sq1', 'champ_sq2', 'champ_sq3'] : [],
    award.title
  )
}));

const honorPosts = honors.map((honor) => createPost({
  type: 'honor',
  title: honor.title,
  subtitle: honor.org,
  eyebrow: 'honor · distinction',
  excerpt: `${honor.title} — ${honor.org}.`,
  body: [
    `${honor.title} is included in the broader honors and distinctions archive.`,
    'This page can expand with the event background, certificate, photos, organizers, and contribution notes.'
  ],
  coverSlot: honor.slot,
  year: honor.year,
  tags: ['honor', 'award', 'recognition', honor.year, honor.org],
  gallery: galleryFromSlots([honor.slot], honor.title)
}));

const judgingPosts = judging.map((item) => createPost({
  type: 'judging',
  title: item.role,
  subtitle: item.org,
  eyebrow: 'judge · mentor · setter',
  excerpt: `${item.role} at ${item.org}.`,
  body: [
    `${item.role} documents judging, mentoring, problem-setting, or program-review work connected to technical education and innovation.`,
    'This record is ready for certificate images, judging criteria, participant scope, and program links.'
  ],
  year: item.year,
  status: item.tags[0],
  statusColor: item.color,
  tags: ['judging', 'mentoring', item.year, ...item.tags, item.org],
  gallery: galleryFromSlots([`judge_cert_${judging.indexOf(item)}`], item.role)
}));

const projectPosts = Object.entries(projectSets).flatMap(([group, projects]) => projects.map((project) => createPost({
  type: 'project',
  title: project.name,
  subtitle: project.category,
  eyebrow: 'project · case study',
  excerpt: project.desc,
  body: [
    project.desc,
    'This case-study page is structured for problem framing, architecture decisions, implementation notes, outcomes, screenshots, attachments, and public references.',
    'The same detail template can support production products, research prototypes, community initiatives, and internal platforms without duplicating layouts.'
  ],
  coverSlot: project.slot,
  coverFit: project.imageFit,
  status: project.status,
  statusColor: project.statusColor,
  tags: ['project', group, project.category, project.status, ...project.tech],
  gallery: galleryFromSlots([project.slot], project.name)
})));

const researchPosts = research.map((paper) => createPost({
  type: 'research',
  title: paper.name,
  subtitle: paper.venue,
  eyebrow: 'research · public framework',
  excerpt: paper.desc,
  body: [
    paper.desc,
    'This page is intended for research summaries, citations, framework diagrams, PDFs, notes, and related talks or project artifacts.'
  ],
  coverSlot: paper.slot,
  year: paper.year,
  tags: ['research', paper.tag, paper.year, paper.venue],
  gallery: galleryFromSlots([paper.slot, `research_cover_${research.indexOf(paper)}`], paper.name)
}));

const speakingPosts = talks.map((talk) => createPost({
  type: 'speaking',
  title: talk.event,
  subtitle: talk.topic,
  eyebrow: 'speaking · panel',
  excerpt: `${talk.topic} ${talk.loc ? `Presented in ${talk.loc}.` : ''}`,
  body: [
    `${talk.event} captures a public speaking, keynote, guest lecture, or panel contribution.`,
    talk.topic,
    'The page can hold slides, photos, recording links, event context, audience notes, and follow-up resources.'
  ],
  coverSlot: talk.slot,
  year: talk.date,
  location: talk.loc,
  status: talk.role,
  statusColor: talk.roleColor,
  tags: ['speaking', talk.role, talk.date, talk.loc],
  gallery: galleryFromSlots([talk.slot], talk.event)
}));

const mediaPosts = media.map((item) => createPost({
  type: 'media',
  title: item.title,
  subtitle: item.outlet,
  eyebrow: `media · ${item.kind}`,
  excerpt: `${item.title} from ${item.outlet}.`,
  body: [
    `${item.title} is part of the public news and media archive.`,
    'This page can hold source links, embeds, screenshots, quotes, social references, and publication details.'
  ],
  coverSlot: item.slot,
  status: item.kind,
  externalUrl: item.href,
  tags: ['media', item.kind, item.outlet],
  attachments: item.href ? [{
    label: item.outlet,
    href: item.href,
    type: 'external'
  }] : undefined,
  gallery: galleryFromSlots([item.slot], item.title)
}));

const blogPosts = blog.map((item) => createPost({
  type: 'blog',
  title: item.title,
  subtitle: item.tag,
  eyebrow: `blog · ${item.tag}`,
  excerpt: `A ${item.tag} on ${item.title.toLowerCase()}.`,
  body: [
    `${item.title} is a draft-ready writing page in the portfolio system.`,
    'The layout supports long-form writing, inline references, supporting media, attachments, and related project links while staying inside the same visual language as the main site.',
    'Use this post body as the source for expanded essays, field notes, technical breakdowns, or launch updates.'
  ],
  coverSlot: item.slot,
  tags: ['blog', item.tag, 'writing'],
  gallery: galleryFromSlots([item.slot], item.title)
}));

const leadershipPosts = cocurricular.map((item) => createPost({
  type: 'leadership',
  title: item.title,
  subtitle: item.org,
  eyebrow: 'community · leadership',
  excerpt: `${item.title} — ${item.org}.`,
  body: [
    `${item.title} records community leadership and public-facing program work.`,
    'This detail page can grow with role summaries, timelines, event photos, responsibilities, and program outcomes.'
  ],
  coverSlot: item.slides[0],
  year: item.year,
  tags: ['leadership', 'community', item.year, item.org],
  gallery: galleryFromSlots(item.slides, item.title)
}));

const rawPosts = [
  ...activityPosts,
  ...awardPosts,
  ...honorPosts,
  ...judgingPosts,
  ...projectPosts,
  ...researchPosts,
  ...speakingPosts,
  ...mediaPosts,
  ...blogPosts,
  ...leadershipPosts
];

function withUniqueSlugs(posts: ContentPost[]) {
  const seen = new Map<string, number>();

  return posts.map((post) => {
    const count = seen.get(post.slug) ?? 0;
    seen.set(post.slug, count + 1);
    return count === 0 ? post : { ...post, slug: `${post.slug}-${count + 1}` };
  });
}

export const contentPosts = withUniqueSlugs(rawPosts);

export const blogContentPosts = contentPosts.filter((post) => post.type === 'blog');
export const detailContentPosts = contentPosts.filter((post) => post.type !== 'blog');

const bySlug = new Map(contentPosts.map((post) => [post.slug, post]));
const byTypeAndTitle = new Map(contentPosts.map((post) => [`${post.type}:${post.title}`, getPostHref(post)]));
const byTypeAndTitlePrimary = new Map(contentPosts.map((post) => [`${post.type}:${post.title}`, getPostPrimaryHref(post)]));

function buildCollection(slug: string, title: string, eyebrow: string, description: string, types: ContentKind[]): ContentCollection {
  const posts = contentPosts.filter((post) => types.includes(post.type));
  return {
    slug,
    title,
    eyebrow,
    description,
    posts,
    tags: unique(posts.flatMap((post) => post.tags)).sort((a, b) => a.localeCompare(b))
  };
}

const collectionList = [
  buildCollection('activity', 'recent-activity', 'latest{}', 'A rolling archive of recent events, talks, judging, mentoring, and public milestones.', ['activity']),
  buildCollection('awards', 'all-awards-&-honors', 'honors · distinctions', 'Recognition, honors, awards, finalist records, and public distinctions in one browsable archive.', ['award', 'honor']),
  buildCollection('recognition', 'global-recognition', 'awards · honors', 'The complete recognition record behind the homepage award and honor sections.', ['award', 'honor']),
  buildCollection('judging', 'judging-mentoring', 'judge · mentor · setter', 'A full record of judging, mentoring, reviewing, and problem-setting work.', ['judging']),
  buildCollection('projects', 'selected-work', 'projects / case studies', 'Projects, public frameworks, AI products, security labs, and case-study-ready work.', ['project']),
  buildCollection('research', 'research', 'research · public frameworks', 'Research notes, public frameworks, and technical writing connected to space, AI, and security.', ['research']),
  buildCollection('speaking', 'speaking-&-panels', 'keynote · talk · panel', 'Talks, panels, keynotes, workshops, and public teaching records.', ['speaking']),
  buildCollection('media', 'news-&-media', 'press · video · social', 'Press, video, social coverage, publication references, and public media mentions.', ['media']),
  buildCollection('blog', 'blog', 'essays · field notes', 'Field notes, essays, technical breakdowns, and long-form writing.', ['blog']),
  buildCollection('leadership', 'community-&-leadership', 'leadership · community', 'Community leadership, organizing, club roles, and ambassador records.', ['leadership']),
  buildCollection('all', 'all-records', 'portfolio · archive', 'Every public record currently available in the portfolio content system.', ['activity', 'award', 'honor', 'judging', 'project', 'research', 'speaking', 'media', 'blog', 'leadership'])
];

const collectionAliases: Record<string, string> = {
  award: 'awards',
  'all-awards': 'awards',
  'all-honors': 'awards',
  'all-projects': 'projects',
  'all-posts': 'blog',
  'all-coverage': 'media',
  'full-record': 'judging',
  honor: 'awards',
  project: 'projects',
  work: 'projects'
};

const collectionsBySlug = new Map(collectionList.map((collection) => [collection.slug, collection]));

export function getPostHref(post: ContentPost) {
  return `/${post.route}/${post.slug}`;
}

export function getPostPrimaryHref(post: ContentPost) {
  return post.externalUrl || getPostHref(post);
}

export function isExternalPost(post: ContentPost) {
  return Boolean(post.externalUrl);
}

export function getContentHref(type: ContentKind, title: string) {
  return byTypeAndTitle.get(`${type}:${title}`) ?? '#';
}

export function getContentPrimaryHref(type: ContentKind, title: string) {
  return byTypeAndTitlePrimary.get(`${type}:${title}`) ?? getContentHref(type, title);
}

export function getPost(slug: string) {
  return bySlug.get(slug) ?? null;
}

export function getCollection(slug: string) {
  return collectionsBySlug.get(collectionAliases[slug] ?? slug) ?? null;
}

export function getCollectionSlugs() {
  return unique([...collectionList.map((collection) => collection.slug), ...Object.keys(collectionAliases)]);
}

export function getRelatedPosts(post: ContentPost, limit = 3) {
  const tagSet = new Set(post.tags.map(tagSlug));
  return contentPosts
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

export function getCollectionTagHref(collectionSlug: string, tag?: string) {
  return tag ? `/view/${collectionSlug}?tag=${tagSlug(tag)}` : `/view/${collectionSlug}`;
}

export function filterPostsByTag(posts: ContentPost[], activeTag?: string) {
  if (!activeTag) return posts;
  return posts.filter((post) => post.tags.some((tag) => tagSlug(tag) === activeTag));
}
