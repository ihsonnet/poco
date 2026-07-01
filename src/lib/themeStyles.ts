import type { CSSProperties } from 'react';
import type { SiteSettings, SiteThemePalette } from '@/lib/siteSettings';

function getPalette(settings: SiteSettings, dark: boolean): SiteThemePalette {
  return dark ? settings.themeDark : settings.themeLight;
}

export function buildSiteThemeVars(settings: SiteSettings, dark: boolean): CSSProperties {
  const palette = getPalette(settings, dark);

  return {
    '--bg': palette.bg,
    '--surface': palette.surface,
    '--ink': palette.ink,
    '--ink-solid': palette.inkSolid,
    '--muted': palette.muted,
    '--muted2': palette.muted2,
    '--border': palette.border,
    '--border-faint': palette.borderFaint,
    '--accent': palette.primary,
    '--button-secondary': palette.secondaryButton,
    '--button-tertiary': palette.tertiaryButton,
    '--cta-chip-bg': palette.chip
  } as CSSProperties;
}

export function getThemeBackground(settings: SiteSettings, dark: boolean) {
  return getPalette(settings, dark).bg;
}
