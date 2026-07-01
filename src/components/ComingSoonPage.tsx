'use client';

import { Bot, MapPin, Moon, Satellite, Shield, Sun } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import type { SiteSettings } from '@/lib/siteSettings';
import { buildSiteThemeVars, getThemeBackground } from '@/lib/themeStyles';
import { ImageSlot } from '@/components/ui/ImageSlot';

const TYPEWRITER_TEXT = 'Full portfolio coming soon.';
const THEME_STORAGE_KEY = 'sonet-dark';
const THEME_MANUAL_KEY = 'sonet-theme-manual';

function shouldUseDarkByLocalTime() {
  const hour = new Date().getHours();
  return hour < 7 || hour >= 19;
}

const focusAreas = [
  { label: 'Cybersecurity', icon: Shield, color: '#3fb950' },
  { label: 'AI & Agents', icon: Bot, color: '#a371f7' },
  { label: 'Space Tech', icon: Satellite, color: '#58a6ff' }
] as const;

export function ComingSoonPage({ settings }: { settings: SiteSettings }) {
  const [dark, setDark] = useState(true);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const hasManualTheme = window.localStorage.getItem(THEME_MANUAL_KEY) === '1';
    setDark(hasManualTheme && stored ? stored === '1' : shouldUseDarkByLocalTime());
  }, []);

  useEffect(() => {
    document.body.style.background = getThemeBackground(settings, dark);
  }, [dark, settings]);

  useEffect(() => {
    const isComplete = typedText === TYPEWRITER_TEXT;
    const delay = isComplete ? 1300 : 75;
    const timer = window.setTimeout(() => {
      setTypedText(isComplete ? '' : TYPEWRITER_TEXT.slice(0, typedText.length + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [typedText]);

  const handleToggleDark = () => {
    setDark((value) => {
      const nextValue = !value;
      window.localStorage.setItem(THEME_STORAGE_KEY, nextValue ? '1' : '0');
      window.localStorage.setItem(THEME_MANUAL_KEY, '1');
      return nextValue;
    });
  };

  return (
    <main className={`sonet-root coming-root ${dark ? 'dark' : ''}`} style={buildSiteThemeVars(settings, dark)}>
      <section className="coming-stage">
        <div className="coming-card">
          <button className="coming-theme-toggle" type="button" onClick={handleToggleDark} aria-label="Toggle theme">
            {dark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
          </button>
          <div className="coming-grid">
            <div className="coming-portrait">
              <ImageSlot src={settings.heroImageUrl || undefined} slot={settings.heroImageUrl ? undefined : (settings.heroImageSlot || 'coming_portrait')} placeholder="Portrait" alt={`${settings.heroName} ${settings.heroLastName}`} />
            </div>
            <div className="coming-copy">
              <h1>{settings.heroName} {settings.heroLastName}<span>/</span></h1>
              <div className="coming-roles">
                <span>Software Security Engineer</span>
                <i />
                <span>System Architect</span>
                <i />
                <span>AI Researcher</span>
              </div>
              <p className="coming-location"><MapPin size={15} strokeWidth={1.8} /> {settings.heroLocation}</p>
            </div>
          </div>

          <div className="coming-body">
            <p>
              {settings.heroLede}
            </p>
            <p>
              I served as System Architect & Technical Lead for <strong>Diamond in the Sky</strong>, a NASA International Space Apps Challenge 2022 <em>Global Champion</em> project. I continue to contribute through research, technical mentoring, and emerging technology initiatives.
            </p>
            <p className="coming-note" aria-label={TYPEWRITER_TEXT}><span>{typedText}</span><i aria-hidden="true" /></p>
          </div>

          <div className="coming-tags">
            {focusAreas.map(({ label, icon: Icon, color }) => (
              <span key={label} style={{ '--chip-icon': color } as CSSProperties}>
                <Icon size={15} strokeWidth={1.9} /> {label}
              </span>
            ))}
          </div>

          <div className="coming-actions">
            <a href={settings.githubUrl}>GitHub <span>↗</span></a>
            <a href={settings.linkedinUrl}>LinkedIn <span>↗</span></a>
          </div>
        </div>
      </section>
      <footer className="coming-footer">
        <div>
          <b>#</b>
          <span><strong>{settings.heroName} {settings.heroLastName}</strong><small>Designing secure, scalable, AI-first systems.</small></span>
        </div>
        <p>{settings.footerCopyright}. All rights reserved.</p>
      </footer>
    </main>
  );
}
