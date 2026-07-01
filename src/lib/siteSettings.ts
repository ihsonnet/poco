import type { QueryResultRow } from 'pg';
import { dbQuery, isDatabaseConfigured } from '@/lib/db';
import { heroTags, navItems, profile } from '@/data/portfolio';
import { ensureContentSchema } from '@/lib/contentSchema';
import { DEFAULT_HOME_SECTION_ORDER, type HomeSectionKey } from '@/lib/homeSections';
import { saveUploadedImage } from '@/lib/uploads';

export interface SiteNavItem {
  label: string;
  href: string;
}

export interface SiteThemePalette {
  bg: string;
  surface: string;
  ink: string;
  inkSolid: string;
  muted: string;
  muted2: string;
  border: string;
  borderFaint: string;
  primary: string;
  secondaryButton: string;
  tertiaryButton: string;
  chip: string;
}

export interface SiteSettings {
  brand: string;
  contactEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  navItems: SiteNavItem[];
  heroName: string;
  heroLastName: string;
  heroLocation: string;
  heroStatus: string;
  heroTagline: string;
  heroLede: string;
  heroTags: string[];
  heroImageSlot: string;
  heroImageUrl: string;
  heroViewWorkLabel: string;
  heroViewWorkHref: string;
  footerWordmark: string;
  footerCopyright: string;
  footerTagline: string;
  homeSectionOrder: HomeSectionKey[];
  themeLight: SiteThemePalette;
  themeDark: SiteThemePalette;
}

export type SiteSettingsSection = 'header' | 'hero' | 'footer' | 'theme' | 'home';

interface SiteSettingsRow extends QueryResultRow {
  id: string;
  brand: string;
  contact_email: string;
  github_url: string;
  linkedin_url: string;
  nav_items: SiteNavItem[];
  hero_name: string;
  hero_last_name: string;
  hero_location: string;
  hero_status: string;
  hero_tagline: string;
  hero_lede: string;
  hero_tags: string[];
  hero_image_slot: string | null;
  hero_image_url: string | null;
  hero_view_work_label: string;
  hero_view_work_href: string;
  footer_wordmark: string;
  footer_copyright: string;
  footer_tagline: string;
  home_section_order: HomeSectionKey[] | null;
  theme_light: SiteThemePalette | null;
  theme_dark: SiteThemePalette | null;
}

const SITE_SETTINGS_ID = 'global';

export const defaultLightTheme: SiteThemePalette = {
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
};

export const defaultDarkTheme: SiteThemePalette = {
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
};

export const defaultSiteSettings: SiteSettings = {
  brand: profile.brand,
  contactEmail: profile.email,
  githubUrl: profile.github,
  linkedinUrl: profile.linkedin,
  navItems: navItems.map((item) => ({ label: item.label, href: item.href })),
  heroName: profile.name,
  heroLastName: profile.lastName,
  heroLocation: profile.location,
  heroStatus: profile.status,
  heroTagline: profile.tagline,
  heroLede: profile.lede,
  heroTags: [...heroTags],
  heroImageSlot: 'hero_portrait',
  heroImageUrl: '',
  heroViewWorkLabel: 'View work',
  heroViewWorkHref: '#work',
  footerWordmark: 'ihsonnet/',
  footerCopyright: '© 2026 Injamamul Haque Sonet',
  footerTagline: 'space education technologist · judge · founder',
  homeSectionOrder: DEFAULT_HOME_SECTION_ORDER,
  themeLight: defaultLightTheme,
  themeDark: defaultDarkTheme
};

function normalizeHomeSectionOrder(value: HomeSectionKey[] | null | undefined) {
  if (!Array.isArray(value)) return DEFAULT_HOME_SECTION_ORDER;

  const unique = value.filter((key, index): key is HomeSectionKey => (
    typeof key === 'string'
    && DEFAULT_HOME_SECTION_ORDER.includes(key as HomeSectionKey)
    && value.indexOf(key) === index
  ));

  const missing = DEFAULT_HOME_SECTION_ORDER.filter((key) => !unique.includes(key));
  const next = [...unique, ...missing];

  return next.length ? next : DEFAULT_HOME_SECTION_ORDER;
}

function isHexColor(value: string) {
  return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value.trim());
}

function normalizePalette(palette: SiteThemePalette | null | undefined, fallback: SiteThemePalette) {
  if (!palette || typeof palette !== 'object') return fallback;

  const next = { ...fallback };

  for (const key of Object.keys(fallback) as Array<keyof SiteThemePalette>) {
    const candidate = String(palette[key] ?? '').trim();
    if (isHexColor(candidate)) {
      next[key] = candidate;
    }
  }

  return next;
}

function normalizeNavItems(items: SiteNavItem[] | null | undefined) {
  if (!Array.isArray(items)) return defaultSiteSettings.navItems;

  const normalized = items
    .map((item) => ({
      label: String(item?.label ?? '').trim(),
      href: String(item?.href ?? '').trim()
    }))
    .filter((item) => item.label && item.href);

  return normalized.length ? normalized : defaultSiteSettings.navItems;
}

function normalizeTags(tags: string[] | null | undefined) {
  if (!Array.isArray(tags)) return defaultSiteSettings.heroTags;
  const normalized = tags.map((tag) => String(tag).trim()).filter(Boolean);
  return normalized.length ? normalized : defaultSiteSettings.heroTags;
}

function mapRow(row: SiteSettingsRow): SiteSettings {
  return {
    brand: row.brand || defaultSiteSettings.brand,
    contactEmail: row.contact_email || defaultSiteSettings.contactEmail,
    githubUrl: row.github_url || defaultSiteSettings.githubUrl,
    linkedinUrl: row.linkedin_url || defaultSiteSettings.linkedinUrl,
    navItems: normalizeNavItems(row.nav_items),
    heroName: row.hero_name || defaultSiteSettings.heroName,
    heroLastName: row.hero_last_name || defaultSiteSettings.heroLastName,
    heroLocation: row.hero_location || defaultSiteSettings.heroLocation,
    heroStatus: row.hero_status || defaultSiteSettings.heroStatus,
    heroTagline: row.hero_tagline || defaultSiteSettings.heroTagline,
    heroLede: row.hero_lede || defaultSiteSettings.heroLede,
    heroTags: normalizeTags(row.hero_tags),
    heroImageSlot: row.hero_image_slot || defaultSiteSettings.heroImageSlot,
    heroImageUrl: row.hero_image_url || '',
    heroViewWorkLabel: row.hero_view_work_label || defaultSiteSettings.heroViewWorkLabel,
    heroViewWorkHref: row.hero_view_work_href || defaultSiteSettings.heroViewWorkHref,
    footerWordmark: row.footer_wordmark || defaultSiteSettings.footerWordmark,
    footerCopyright: row.footer_copyright || defaultSiteSettings.footerCopyright,
    footerTagline: row.footer_tagline || defaultSiteSettings.footerTagline,
    homeSectionOrder: normalizeHomeSectionOrder(row.home_section_order),
    themeLight: normalizePalette(row.theme_light, defaultLightTheme),
    themeDark: normalizePalette(row.theme_dark, defaultDarkTheme)
  };
}

export async function getRuntimeSiteSettings() {
  if (!isDatabaseConfigured()) return defaultSiteSettings;

  try {
    await ensureContentSchema();
    const rows = await dbQuery<SiteSettingsRow>('select * from site_settings where id = $1 limit 1', [SITE_SETTINGS_ID]);
    return rows[0] ? mapRow(rows[0]) : defaultSiteSettings;
  } catch {
    return defaultSiteSettings;
  }
}

export async function getAdminSiteSettings() {
  await ensureContentSchema();
  const rows = await dbQuery<SiteSettingsRow>('select * from site_settings where id = $1 limit 1', [SITE_SETTINGS_ID]);
  return rows[0] ? mapRow(rows[0]) : defaultSiteSettings;
}

function parseDelimitedLines(raw: string) {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function getPalette(formData: FormData, prefix: 'themeLight' | 'themeDark', fallback: SiteThemePalette) {
  const read = (key: keyof SiteThemePalette) => String(formData.get(`${prefix}.${key}`) ?? '').trim();

  return normalizePalette(
    {
      bg: read('bg'),
      surface: read('surface'),
      ink: read('ink'),
      inkSolid: read('inkSolid'),
      muted: read('muted'),
      muted2: read('muted2'),
      border: read('border'),
      borderFaint: read('borderFaint'),
      primary: read('primary'),
      secondaryButton: read('secondaryButton'),
      tertiaryButton: read('tertiaryButton'),
      chip: read('chip')
    },
    fallback
  );
}

export async function parseSiteSettingsInput(formData: FormData): Promise<SiteSettings> {
  const get = (name: string) => String(formData.get(name) ?? '').trim();
  const heroImageUpload = await saveUploadedImage(formData.get('heroImage'), get('heroName') || get('brand') || 'hero', 'site-hero');
  const navItemsValue = parseDelimitedLines(get('navItems'))
    .map((line) => {
      const [label = '', href = ''] = line.split('|').map((value) => value.trim());
      return label && href ? { label, href } : null;
    })
    .filter((item): item is SiteNavItem => Boolean(item));

  return {
    brand: get('brand') || defaultSiteSettings.brand,
    contactEmail: get('contactEmail') || defaultSiteSettings.contactEmail,
    githubUrl: get('githubUrl') || defaultSiteSettings.githubUrl,
    linkedinUrl: get('linkedinUrl') || defaultSiteSettings.linkedinUrl,
    navItems: navItemsValue.length ? navItemsValue : defaultSiteSettings.navItems,
    heroName: get('heroName') || defaultSiteSettings.heroName,
    heroLastName: get('heroLastName') || defaultSiteSettings.heroLastName,
    heroLocation: get('heroLocation') || defaultSiteSettings.heroLocation,
    heroStatus: get('heroStatus') || defaultSiteSettings.heroStatus,
    heroTagline: get('heroTagline') || defaultSiteSettings.heroTagline,
    heroLede: get('heroLede') || defaultSiteSettings.heroLede,
    heroTags: parseDelimitedLines(get('heroTags')).length ? parseDelimitedLines(get('heroTags')) : defaultSiteSettings.heroTags,
    heroImageSlot: get('heroImageSlot') || defaultSiteSettings.heroImageSlot,
    heroImageUrl: heroImageUpload || get('heroImageUrl'),
    heroViewWorkLabel: get('heroViewWorkLabel') || defaultSiteSettings.heroViewWorkLabel,
    heroViewWorkHref: get('heroViewWorkHref') || defaultSiteSettings.heroViewWorkHref,
    footerWordmark: get('footerWordmark') || defaultSiteSettings.footerWordmark,
    footerCopyright: get('footerCopyright') || defaultSiteSettings.footerCopyright,
    footerTagline: get('footerTagline') || defaultSiteSettings.footerTagline,
    homeSectionOrder: normalizeHomeSectionOrder(parseDelimitedLines(get('homeSectionOrder')) as HomeSectionKey[]),
    themeLight: getPalette(formData, 'themeLight', defaultLightTheme),
    themeDark: getPalette(formData, 'themeDark', defaultDarkTheme)
  };
}

export async function parseSiteSettingsSectionInput(
  formData: FormData,
  current: SiteSettings,
  section: SiteSettingsSection
): Promise<SiteSettings> {
  const get = (name: string) => String(formData.get(name) ?? '').trim();

  if (section === 'header') {
    const navItemsValue = parseDelimitedLines(get('navItems'))
      .map((line) => {
        const [label = '', href = ''] = line.split('|').map((value) => value.trim());
        return label && href ? { label, href } : null;
      })
      .filter((item): item is SiteNavItem => Boolean(item));

    return {
      ...current,
      brand: get('brand') || current.brand,
      contactEmail: get('contactEmail') || current.contactEmail,
      githubUrl: get('githubUrl') || current.githubUrl,
      linkedinUrl: get('linkedinUrl') || current.linkedinUrl,
      navItems: navItemsValue.length ? navItemsValue : current.navItems
    };
  }

  if (section === 'hero') {
    const heroImageUpload = await saveUploadedImage(formData.get('heroImage'), get('heroName') || current.heroName || current.brand || 'hero', 'site-hero');

    return {
      ...current,
      heroName: get('heroName') || current.heroName,
      heroLastName: get('heroLastName') || current.heroLastName,
      heroLocation: get('heroLocation') || current.heroLocation,
      heroStatus: get('heroStatus') || current.heroStatus,
      heroTagline: get('heroTagline') || current.heroTagline,
      heroLede: get('heroLede') || current.heroLede,
      heroTags: parseDelimitedLines(get('heroTags')).length ? parseDelimitedLines(get('heroTags')) : current.heroTags,
      heroImageSlot: get('heroImageSlot') || current.heroImageSlot,
      heroImageUrl: heroImageUpload || get('heroImageUrl') || current.heroImageUrl,
      heroViewWorkLabel: get('heroViewWorkLabel') || current.heroViewWorkLabel,
      heroViewWorkHref: get('heroViewWorkHref') || current.heroViewWorkHref
    };
  }

  if (section === 'footer') {
    return {
      ...current,
      footerWordmark: get('footerWordmark') || current.footerWordmark,
      footerCopyright: get('footerCopyright') || current.footerCopyright,
      footerTagline: get('footerTagline') || current.footerTagline
    };
  }

  if (section === 'home') {
    return {
      ...current,
      homeSectionOrder: normalizeHomeSectionOrder(parseDelimitedLines(get('homeSectionOrder')) as HomeSectionKey[])
    };
  }

  return {
    ...current,
    themeLight: getPalette(formData, 'themeLight', current.themeLight),
    themeDark: getPalette(formData, 'themeDark', current.themeDark)
  };
}

export async function updateSiteSettings(input: SiteSettings) {
  await ensureContentSchema();

  await dbQuery(
    `insert into site_settings (
      id, brand, contact_email, github_url, linkedin_url, nav_items,
      hero_name, hero_last_name, hero_location, hero_status, hero_tagline, hero_lede, hero_tags,
      hero_image_slot, hero_image_url, hero_view_work_label, hero_view_work_href,
      footer_wordmark, footer_copyright, footer_tagline, home_section_order, theme_light, theme_dark
    )
    values (
      $1, $2, $3, $4, $5, $6::jsonb,
      $7, $8, $9, $10, $11, $12, $13::jsonb,
      $14, $15, $16, $17,
      $18, $19, $20, $21::jsonb, $22::jsonb, $23::jsonb
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
      theme_dark = excluded.theme_dark,
      updated_at = now()`,
    [
      SITE_SETTINGS_ID,
      input.brand,
      input.contactEmail,
      input.githubUrl,
      input.linkedinUrl,
      JSON.stringify(input.navItems),
      input.heroName,
      input.heroLastName,
      input.heroLocation,
      input.heroStatus,
      input.heroTagline,
      input.heroLede,
      JSON.stringify(input.heroTags),
      input.heroImageSlot || null,
      input.heroImageUrl || null,
      input.heroViewWorkLabel,
      input.heroViewWorkHref,
      input.footerWordmark,
      input.footerCopyright,
      input.footerTagline,
      JSON.stringify(input.homeSectionOrder),
      JSON.stringify(input.themeLight),
      JSON.stringify(input.themeDark)
    ]
  );
}
