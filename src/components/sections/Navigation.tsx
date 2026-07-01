'use client';

import { Menu, Moon, Sun, X } from 'lucide-react';
import type { SiteSettings } from '@/lib/siteSettings';

interface NavigationProps {
  settings: SiteSettings;
  dark: boolean;
  homeHref?: string;
  linkPrefix?: string;
  menuOpen: boolean;
  onToggleDark: () => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

export function Navigation({ settings, dark, homeHref = '#top', linkPrefix = '', menuOpen, onToggleDark, onToggleMenu, onCloseMenu }: NavigationProps) {
  return (
    <nav className="snav">
      <div className="nav-top">
        <a href={homeHref} className="nav-brand" onClick={onCloseMenu}>
          <span className="brand-mark"><span /></span>
          <span>{settings.brand}</span>
        </a>
        <button className="nav-burger" onClick={onToggleMenu} aria-label="Toggle menu" type="button">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={onCloseMenu}>
        {settings.navItems.map((item) => <a key={`${item.label}-${item.href}`} href={`${linkPrefix}${item.href}`}>{item.label}</a>)}
        <div className="nav-spacer" />
        <button onClick={onToggleDark} aria-label="Toggle dark mode" className="theme-toggle" type="button">
          {dark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
        </button>
        <a href={settings.githubUrl} className="nav-github">GitHub <span className="nav-github-dot" aria-hidden="true" /></a>
        <a className="nav-contact" href={`mailto:${settings.contactEmail}`}>Contact <span>↗</span></a>
      </div>
    </nav>
  );
}
