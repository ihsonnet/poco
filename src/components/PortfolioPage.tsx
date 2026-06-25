'use client';

import { useEffect, useState } from 'react';
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

const THEME_STORAGE_KEY = 'sonet-dark';
const THEME_MANUAL_KEY = 'sonet-theme-manual';

function shouldUseDarkByLocalTime() {
  const hour = new Date().getHours();
  return hour < 7 || hour >= 19;
}

export function PortfolioPage() {
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
    document.body.style.background = dark ? '#010409' : '#e8ebe7';
  }, [dark, themeReady]);

  const handleToggleDark = () => {
    setDark((value) => {
      const nextValue = !value;
      window.localStorage.setItem(THEME_STORAGE_KEY, nextValue ? '1' : '0');
      window.localStorage.setItem(THEME_MANUAL_KEY, '1');
      return nextValue;
    });
  };

  return (
    <main className={`sonet-root ${dark ? 'dark' : ''}`}>
      <Navigation
        dark={dark}
        menuOpen={menuOpen}
        onToggleDark={handleToggleDark}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <div className="full-bleed-line" />
      <Hero />
      <Highlights />
      <Ticker />
      <ActivityCarousel />
      <Timeline />
      <Recognition />
      <div className="gap-line" />
      <JudgingMentoring />
      <MosaicBand />
      <Projects />
      <Research />
      <Speaking />
      <Cocurricular />
      <div className="gap-line" />
      <MediaSection />
      <BlogSection />
      <div className="gap-line" />
      <FinalCTA />
      <Footer />
    </main>
  );
}
