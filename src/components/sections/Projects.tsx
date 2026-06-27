'use client';

import { useState } from 'react';
import { getContentHref } from '@/data/content';
import { projectSets } from '@/data/portfolio';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TagList } from '@/components/ui/TagList';

type Tab = keyof typeof projectSets;

const tabs: { key: Tab; label: string }[] = [
  { key: 'space', label: 'Space & Education' },
  { key: 'ai', label: 'AI & EdTech' },
  { key: 'security', label: 'Security' },
  { key: 'other', label: 'Others' }
];

export function Projects() {
  const [tab, setTab] = useState<Tab>('space');

  return (
    <section>
      <SectionHeader id="work" eyebrow="projects / case studies" title="selected-work" action="all projects" href="/view/projects" compact />
      <div className="proj-tabs">
        {tabs.map((item) => <button key={item.key} type="button" onClick={() => setTab(item.key)} className={item.key === tab ? 'active' : ''}>{item.label}<span aria-hidden="true" /></button>)}
      </div>
      <div className="project-grid stack2">
        {projectSets[tab].map((project) => (
          <article className="project-card" key={project.name}>
            <div className="project-media"><ImageSlot slot={project.slot} placeholder={project.placeholder} alt={project.name} fit={project.imageFit ?? 'cover'} /></div>
            <div className="project-body">
              <div className="project-title-row">
                <h3>{project.name}<span>/</span></h3>
                <b style={{ background: project.statusColor }}>{project.status}</b>
              </div>
              <em>{project.category}</em>
              <p>{project.desc}</p>
              <TagList tags={project.tech} small />
              <a href={getContentHref('project', project.name)}>View case study ↗</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
