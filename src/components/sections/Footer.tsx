import type { SiteSettings } from '@/lib/siteSettings';
import { TerminalMark } from '@/components/ui/TerminalMark';

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer>
      <div className="footer-wordmark">
        <div className="footer-inner">
          <TerminalMark large />
          <h2>{settings.footerWordmark.replace(/\/$/, '')}<span>/</span></h2>
        </div>
      </div>
      <div className="footer-bar">
        <span>{settings.footerCopyright}</span>
        <a href={settings.githubUrl}>GitHub</a>
        <a href={settings.linkedinUrl}>LinkedIn</a>
        <a href={`mailto:${settings.contactEmail}`}>{settings.contactEmail}</a>
        <div />
        <span>{settings.footerTagline}</span>
      </div>
    </footer>
  );
}
