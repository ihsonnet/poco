'use client';

import { Fragment, type ReactNode, useEffect, useMemo, useState } from 'react';
import type { SiteSettings } from '@/lib/siteSettings';
import { buildSiteThemeVars, getThemeBackground } from '@/lib/themeStyles';
import { ActivityCarousel } from '@/components/sections/ActivityCarousel';
import { BlogSection, MediaSection } from '@/components/sections/MediaBlog';
import { Cocurricular } from '@/components/sections/Cocurricular';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Highlights } from '@/components/sections/Highlights';
import { JudgingMentoring } from '@/components/sections/JudgingMentoring';
import { MosaicBand } from '@/components/sections/MosaicBand';
import { Navigation } from '@/components/sections/Navigation';
import { Projects } from '@/components/sections/Projects';
import { Recognition } from '@/components/sections/Recognition';
import { Research } from '@/components/sections/Research';
import { Speaking } from '@/components/sections/Speaking';
import { Ticker } from '@/components/sections/Ticker';
import { Timeline } from '@/components/sections/Timeline';
import type { HomeSectionKey } from '@/lib/homeSections';

const THEME_STORAGE_KEY = 'sonet-dark';
const THEME_MANUAL_KEY = 'sonet-theme-manual';

function shouldUseDarkByLocalTime() {
  const hour = new Date().getHours();
  return hour < 7 || hour >= 19;
}

export function PortfolioPage({ settings }: { settings: SiteSettings }) {
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

  const orderedSections = useMemo(() => {
    const sectionMap: Record<HomeSectionKey, ReactNode> = {
      activity: <ActivityCarousel />,
      timeline: <Timeline />,
      recognition: <Recognition />,
      judging: (
        <>
          <div className="gap-line" />
          <JudgingMentoring />
          <MosaicBand />
        </>
      ),
      work: <Projects />,
      research: <Research />,
      speaking: <Speaking />,
      community: <Cocurricular />,
      media: (
        <>
          <div className="gap-line" />
          <MediaSection />
        </>
      ),
      blog: <BlogSection />,
      cta: (
        <>
          <div className="gap-line" />
          <FinalCTA email={settings.contactEmail} />
        </>
      )
    };

    return settings.homeSectionOrder.map((key) => (
      <Fragment key={key}>
        {sectionMap[key]}
      </Fragment>
    ));
  }, [settings]);

  return (
    <main className={`sonet-root ${dark ? 'dark' : ''}`} style={buildSiteThemeVars(settings, dark)}>
      <Navigation
        settings={settings}
        dark={dark}
        menuOpen={menuOpen}
        onToggleDark={handleToggleDark}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <div className="full-bleed-line" />
      <Hero settings={settings} />
      <Highlights />
      <Ticker />
      {orderedSections}
      <Footer settings={settings} />
    </main>
  );
}
