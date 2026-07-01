'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { SiteSettings } from '@/lib/siteSettings';
import { buildSiteThemeVars, getThemeBackground } from '@/lib/themeStyles';
import { Footer } from '@/components/sections/Footer';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Navigation } from '@/components/sections/Navigation';

const THEME_STORAGE_KEY = 'sonet-dark';
const THEME_MANUAL_KEY = 'sonet-theme-manual';

function shouldUseDarkByLocalTime() {
  const hour = new Date().getHours();
  return hour < 7 || hour >= 19;
}

export function ContentShell({ children, settings }: { children: ReactNode; settings: SiteSettings }) {
  const [dark, setDark] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const hasManualTheme = window.localStorage.getItem(THEME_MANUAL_KEY) === '1';
    setDark(hasManualTheme && stored ? stored === '1' : shouldUseDarkByLocalTime());
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.body.style.background = getThemeBackground(settings, dark);
  }, [dark, settings, themeReady]);

  const handleToggleDark = () => {
    setDark((value) => {
      const nextValue = !value;
      window.localStorage.setItem(THEME_STORAGE_KEY, nextValue ? '1' : '0');
      window.localStorage.setItem(THEME_MANUAL_KEY, '1');
      return nextValue;
    });
  };

  return (
    <main className={`sonet-root content-root ${dark ? 'dark' : ''}`} style={buildSiteThemeVars(settings, dark)}>
      <Navigation
        settings={settings}
        dark={dark}
        homeHref="/"
        linkPrefix="/"
        menuOpen={menuOpen}
        onToggleDark={handleToggleDark}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <div className="full-bleed-line" />
      {children}
      <div className="gap-line" />
      <FinalCTA email={settings.contactEmail} />
      <Footer settings={settings} />
    </main>
  );
}
