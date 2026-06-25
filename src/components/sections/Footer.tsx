import { profile } from '@/data/portfolio';
import { TerminalMark } from '@/components/ui/TerminalMark';

export function Footer() {
  return (
    <footer>
      <div className="footer-wordmark">
        <div className="footer-inner">
          <TerminalMark large />
          <h2>ihsonnet<span>/</span></h2>
        </div>
      </div>
      <div className="footer-bar">
        <span>© 2026 Injamamul Haque Sonet</span>
        <a href={profile.github}>GitHub</a>
        <a href={profile.linkedin}>LinkedIn</a>
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <div />
        <span>space education technologist · judge · founder</span>
      </div>
    </footer>
  );
}
