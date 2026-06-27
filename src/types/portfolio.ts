import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import type { SlotId } from '@/data/imageSlots';

type SourceSlotId = SlotId | (string & {});

export type IconType = ComponentType<LucideProps>;

export interface HighlightItem {
  title: string;
  subtitle: string;
  slot: SlotId;
  href: string;
  placeholder: string;
}

export interface ActivityItem {
  slot: SlotId;
  date: string;
  tag: string;
  tagColor: string;
  title: string;
  placeholder: string;
}

export interface TimelineItem {
  year: string;
  color: string;
  title: string;
  org: string;
  icon: IconType;
  current?: boolean;
}

export interface AwardItem {
  year: string;
  title: string;
  org: string;
  color: string;
}

export interface HonorItem {
  slot?: SourceSlotId;
  year: string;
  title: string;
  org: string;
  placeholder: string;
}

export interface JudgingItem {
  year: string;
  role: string;
  org: string;
  tags: string[];
  color: string;
}

export interface ProjectItem {
  name: string;
  slot?: SourceSlotId;
  placeholder: string;
  imageFit?: 'cover' | 'contain';
  category: string;
  status: string;
  statusColor: string;
  desc: string;
  tech: string[];
}

export interface ResearchItem {
  tag: string;
  name: string;
  year: string;
  venue: string;
  desc: string;
  slot?: SourceSlotId;
}

export interface TalkItem {
  slot?: SourceSlotId;
  role: string;
  roleColor: string;
  date: string;
  loc: string;
  event: string;
  topic: string;
}

export interface MediaItem {
  slot?: SourceSlotId;
  placeholder: string;
  kind: string;
  outlet: string;
  title: string;
  href?: string;
}

export interface BlogItem {
  slot?: SourceSlotId;
  placeholder: string;
  tag: string;
  title: string;
}

export interface CocurricularItem {
  key: string;
  year: string;
  title: string;
  org: string;
  slides: SourceSlotId[];
}
