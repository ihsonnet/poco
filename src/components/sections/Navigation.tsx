'use client';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { navItems, profile } from '@/data/portfolio';

interface NavigationProps {
  dark: boolean;
  menuOpen: boolean;
  onToggleDark: () => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

export function Navigation({ dark, menuOpen, onToggleDark, onToggleMenu, onCloseMenu }: NavigationProps) {
  return (
    <nav className="snav">
      <div className="nav-top">
        <a href="#top" className="nav-brand" onClick={onCloseMenu}>
          <span className="brand-mark"><span /></span>
          <span>{profile.brand}</span>
        </a>
        <button className="nav-burger" onClick={onToggleMenu} aria-label="Toggle menu" type="button">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`} onClick={onCloseMenu}>
        {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        <div className="nav-spacer" />
        <button onClick={onToggleDark} aria-label="Toggle dark mode" className="theme-toggle" type="button">
          {dark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
        </button>
        <a href={profile.github} className="nav-github">GitHub <span className="nav-github-dot" aria-hidden="true" /></a>
        <a className="nav-contact" href={`mailto:${profile.email}`}>Contact <span>↗</span></a>
      </div>
    </nav>
  );
}
