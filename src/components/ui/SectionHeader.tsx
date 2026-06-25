import { ArrowUpRight } from 'lucide-react';
import { ScrambleText } from '@/components/ui/ScrambleText';

interface SectionHeaderProps {
  id?: string;
  eyebrow: string;
  title: string;
  action?: string;
  href?: string;
  compact?: boolean;
}

export function SectionHeader({ id, eyebrow, title, action, href = '#', compact = false }: SectionHeaderProps) {
  return (
    <div id={id} className={`section-header ${compact ? 'section-header-compact' : ''}`}>
      <div>
        <ScrambleText className="section-eyebrow">{eyebrow}</ScrambleText>
        <h2 className="section-title">{title}<span>/</span></h2>
      </div>
      {action ? (
        <a href={href} className="frame-button">
          {action} <ArrowUpRight size={14} strokeWidth={1.8} />
        </a>
      ) : null}
    </div>
  );
}
