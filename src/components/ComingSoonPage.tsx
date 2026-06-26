'use client';

import { Bot, MapPin, Moon, Satellite, Shield, Sun } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import { profile } from '@/data/portfolio';
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

export function ComingSoonPage() {
  const [dark, setDark] = useState(true);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const hasManualTheme = window.localStorage.getItem(THEME_MANUAL_KEY) === '1';
    setDark(hasManualTheme && stored ? stored === '1' : shouldUseDarkByLocalTime());
  }, []);

  useEffect(() => {
    document.body.style.background = dark ? '#010409' : '#e8ebe7';
  }, [dark]);

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
    <main className={`sonet-root coming-root ${dark ? 'dark' : ''}`}>
      <section className="coming-stage">
        <div className="coming-card">
          <button className="coming-theme-toggle" type="button" onClick={handleToggleDark} aria-label="Toggle theme">
            {dark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
          </button>
          <div className="coming-grid">
            <div className="coming-portrait">
              <ImageSlot slot="coming_portrait" placeholder="Portrait" alt="Injamamul Haque Sonet" />
            </div>
            <div className="coming-copy">
              <h1>Injamamul Haque Sonet<span>/</span></h1>
              <div className="coming-roles">
                <span>Software Security Engineer</span>
                <i />
                <span>System Architect</span>
                <i />
                <span>AI Researcher</span>
              </div>
              <p className="coming-location"><MapPin size={15} strokeWidth={1.8} /> Alexandria, VA, USA</p>
            </div>
          </div>

          <div className="coming-body">
            <p>
              I design scalable, reliable, and security-conscious systems — from AI-powered products and multi-agent workflows to cloud-native architectures. My work spans intelligent agents, RAG, MCP, and modern secure software development.
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
            <a href={profile.github}>GitHub <span>↗</span></a>
            <a href={profile.linkedin}>LinkedIn <span>↗</span></a>
          </div>
        </div>
      </section>
      <footer className="coming-footer">
        <div>
          <b>#</b>
          <span><strong>Injamamul Haque Sonet</strong><small>Designing secure, scalable, AI-first systems.</small></span>
        </div>
        <p>© 2026 Injamamul Haque Sonet. All rights reserved.</p>
      </footer>
    </main>
  );
}
