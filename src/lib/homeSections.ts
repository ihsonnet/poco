export const HOME_SECTION_ITEMS = [
  {
    key: 'activity',
    label: 'Recent Activity',
    description: 'Recent activity cards and carousel block.'
  },
  {
    key: 'timeline',
    label: 'Timeline',
    description: 'Milestone timeline section.'
  },
  {
    key: 'recognition',
    label: 'Global Recognition',
    description: 'Recognition summary, media panel, and honors.'
  },
  {
    key: 'judging',
    label: 'Judging + Mosaic',
    description: 'Judging list, preview panel, and mosaic band.'
  },
  {
    key: 'work',
    label: 'Selected Work',
    description: 'Project showcase cards and tabs.'
  },
  {
    key: 'research',
    label: 'Research',
    description: 'Research and public framework section.'
  },
  {
    key: 'speaking',
    label: 'Speaking Panels',
    description: 'Speaking and panel highlights.'
  },
  {
    key: 'community',
    label: 'Community Leadership',
    description: 'Community and leadership showcase.'
  },
  {
    key: 'media',
    label: 'News & Media',
    description: 'Press and media coverage cards.'
  },
  {
    key: 'blog',
    label: 'Blog',
    description: 'Writing and blog section.'
  },
  {
    key: 'cta',
    label: 'Closing CTA',
    description: 'Final collaboration call-to-action.'
  }
] as const;

export type HomeSectionKey = (typeof HOME_SECTION_ITEMS)[number]['key'];

export const DEFAULT_HOME_SECTION_ORDER: HomeSectionKey[] = HOME_SECTION_ITEMS.map((item) => item.key);

