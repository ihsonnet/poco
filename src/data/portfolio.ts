import { Award, BriefcaseBusiness, GraduationCap, Trophy, Rocket, ShieldCheck, BrainCircuit, UsersRound } from 'lucide-react';
import type { ActivityItem, AwardItem, BlogItem, CocurricularItem, HighlightItem, HonorItem, JudgingItem, MediaItem, ProjectItem, ResearchItem, TalkItem, TimelineItem } from '@/types/portfolio';

export const profile = {
  name: 'Injamamul Haque',
  lastName: 'Sonet',
  brand: 'IHSONNET/',
  location: 'united states / global champion ’22',
  status: 'open to collaborate',
  tagline: 'space education technologist / judge / founder',
  lede: 'I build tools and frameworks that make the space we already depend on visible, understandable, and actionable — from NASA Space Apps to secure AI-first systems.',
  email: 'ihsonnet@gmail.com',
  github: 'https://github.com/ihsonnet',
  linkedin: 'https://www.linkedin.com/in/ihsonnet'
} as const;

export const navItems = [
  { label: 'Activity', href: '#activity' },
  { label: 'Recognition', href: '#recognition' },
  { label: 'Work', href: '#work' },
  { label: 'Speaking', href: '#speaking' },
  { label: 'Media', href: '#media' }
] as const;

export const heroTags = ['software security engineer', 'AI-first architect', 'M.S. cybersecurity'];

export const highlights: HighlightItem[] = [
  { title: 'Global Champion', subtitle: 'NASA International Space Apps Challenge 2022', slot: 'highlight_nasa', href: 'https://www.spaceappschallenge.org', placeholder: 'NASA' },
  { title: 'Creator', subtitle: 'Fairmark AI', slot: 'highlight_fairmark', href: '#work', placeholder: 'Fairmark' },
  { title: 'Mentor & Judge', subtitle: '15+ national & international platforms', slot: 'highlight_mentor', href: '#recognition', placeholder: 'Mentor' }
];

export const tickerItems = [
  { label: 'NASA Space Apps Global Champion — 2022', color: '#bf8700', text: 'var(--ink)' },
  { label: 'Most Inspirational Award', color: '#1c1f26', text: '#fff' },
  { label: '162+ countries · 3,000+ submissions', color: '#b794f6', text: 'var(--ink)' },
  { label: 'Judge & mentor · 10+ programs', color: '#ec5f67', text: '#fff' },
  { label: 'S.P.A.C.E. for Everyone', color: '#2da44e', text: '#fff' }
] as const;

export const recentActivity: ActivityItem[] = [
  { slot: 'act1', placeholder: 'Drop talk photo', date: '2026', tag: 'speaking', tagColor: '#bf8700', title: 'Talk: AI-First System Architecture — Infinity AI-BuildFest 2026' },
  { slot: 'act2', placeholder: 'Drop mentoring photo', date: '2026', tag: 'mentoring', tagColor: '#7c6cf0', title: 'Mentor (NRB) — Infinity AI-BuildFest 2026' },
  { slot: 'act3', placeholder: 'Drop event photo', date: '2026', tag: 'event', tagColor: '#a371f7', title: 'Delegate · WUST — Holiday Sweater Party, AWS Skills Center Arlington' },
  { slot: 'act4', placeholder: 'Drop judging photo', date: '2026', tag: 'judging', tagColor: '#1a7f37', title: 'Problem Setter & Judge — WUST Cybersecurity CTF 2026, Alexandria, VA' },
  { slot: 'act5', placeholder: 'Drop event photo', date: '2025', tag: 'event', tagColor: '#a371f7', title: 'Delegate · WUST SOC Lab — Aspen Cyber Summit 2025, Washington, DC' },
  { slot: 'act6', placeholder: 'Drop mentoring photo', date: '2025', tag: 'mentoring', tagColor: '#7c6cf0', title: 'Global Space Expert — ESA ActInSpace 2025–2026, France' }
];

export const timeline: TimelineItem[] = [
  { year: '2022', color: '#bf8700', title: 'Global Champion', org: 'NASA Space Apps Challenge 2022', icon: Trophy },
  { year: '2023', color: '#7c6cf0', title: 'B.Sc. in Software Engineering', org: 'Major in Cybersecurity', icon: GraduationCap },
  { year: '2023', color: '#a371f7', title: 'Jr. Software Engineer', org: 'Hubar Tech Limited', icon: BriefcaseBusiness },
  { year: '2025', color: '#2da44e', title: 'M.S. in Cybersecurity', org: 'WUST · in progress', icon: GraduationCap },
  { year: '2026', color: '#1a7f37', title: 'Software Security Engineer', org: 'Washington University of Science and Technology', current: true, icon: BriefcaseBusiness }
];

export const awards: AwardItem[] = [
  { year: '2022', title: 'NASA Space Apps Global Champion', org: 'International Space Apps Challenge', color: '#bf8700' },
  { year: '2022', title: 'Most Inspirational Award', org: 'Team Diamonds — Diamond in the Sky', color: '#bf8700' },
  { year: '2025', title: 'Global Space Expert', org: 'ActInSpace International', color: '#1a7f37' },
  { year: '—', title: 'B.Sc. CGPA 3.95+/4.00', org: 'Software Engineering (Cybersecurity)', color: '#7c6cf0' }
];

export const honors: HonorItem[] = [
  { slot: 'honor_1', year: '2023', title: 'National Finalist — Cyber Security Trade', org: 'Bangabandhu Sheikh Mujibur Rahman National Skills Competition', placeholder: 'Drop photo' },
  { slot: 'honor_2', year: '2023', title: 'Galactic Local Judge', org: 'NASA International Space Apps Challenge', placeholder: 'Drop photo' },
  { year: '2024', title: 'Business America Award — Innovation', org: 'System Architect, Team Diamonds', placeholder: 'Drop photo' },
  { slot: 'honor_4', year: '2022', title: 'National Champion', org: 'NASA International Space Apps Challenge', placeholder: 'Drop photo' },
  { slot: 'honor_5', year: '2023', title: 'Token of Appreciation — Club President', org: 'Dept. of Software Engineering, DIU', placeholder: 'Drop photo' },
  { slot: 'honor_6', year: '2022', title: 'Special Plaque of Honor', org: 'Amara Ekattor, Bangladesh', placeholder: 'Drop photo' },
  { slot: 'honor_7', year: '2022', title: 'No. 1 Club Award', org: 'Intra-University Club Competition, Daffodil International University', placeholder: 'Drop photo' },
  { slot: 'honor_8', year: '—', title: 'Industry & Academia Collaboration', org: 'Recognition', placeholder: 'Drop photo' }
];

export const judging: JudgingItem[] = [
  { year: '2025', role: 'Judge — WUST Cybersecurity CTF Competition', org: 'Washington University of Science and Technology', tags: ['Cyber', 'CTF'], color: '#1a7f37' },
  { year: '2025', role: 'Global Space Expert — ActInSpace', org: 'ActInSpace International', tags: ['Space', 'Innovation'], color: '#1a7f37' },
  { year: '2025', role: 'NASA Space Apps — Galactic Local Judge', org: 'Bangladesh & Arlington, Virginia', tags: ['NASA', 'Judge'], color: '#7c6cf0' },
  { year: '2025', role: 'Innovation Stage Judge', org: 'Innovation & startup program', tags: ['Innovation'], color: '#7c6cf0' },
  { year: '2024', role: 'Judge — National AI Build-a-thon', org: 'National hackathon', tags: ['AI', 'Hackathon'], color: '#bf8700' },
  { year: '2024', role: 'Lead Judge — Programming Contest', org: 'Collegiate contest', tags: ['Lead'], color: '#bf8700' },
  { year: '2023', role: 'Problem Setter & Judge', org: 'Programming contest', tags: ['Setter'], color: '#e16f24' }
];

export const projectSets: Record<'space' | 'ai' | 'security' | 'other', ProjectItem[]> = {
  space: [
    { name: 'Diamond in the Sky', slot: 'proj_space1', placeholder: 'Drop project image', category: 'NASA Space Apps 2022', status: 'Global Champion', statusColor: '#bf8700', desc: 'System Architect & Technical Lead for the Global Champion project — making the satellites and orbital systems we depend on visible to everyone.', tech: ['System Architecture', 'Data Viz', 'Space Apps'] },
    { name: 'S.P.A.C.E. for Everyone', slot: 'proj_space2', placeholder: 'Drop project image', category: 'Public Framework', status: 'Initiative', statusColor: '#1a7f37', desc: 'A public framework turning technical space and security work into something people outside the field can actually use and learn from.', tech: ['Education', 'Framework', 'open.wust.org'] }
  ],
  ai: [
    { name: 'FairMark AI', slot: 'proj_ai1', placeholder: 'Drop product screenshot', imageFit: 'contain', category: 'AI Education Technology', status: 'Production', statusColor: '#1a7f37', desc: 'AI-assisted academic evaluation platform for rubric-grounded assessment, Canvas LMS integration, LTI 1.3 workflows, and human-in-the-loop grading.', tech: ['Python', 'FastAPI', 'Docker', 'Canvas API'] },
    { name: 'PageCart AI', slot: 'proj_ai2', placeholder: 'Drop product screenshot', imageFit: 'contain', category: 'AI Commerce Automation', status: 'In development', statusColor: '#bf8700', desc: 'AI-powered commerce automation concept helping small businesses build product pages, import data, and automate customer engagement.', tech: ['React', 'TypeScript', 'AI Agents'] }
  ],
  security: [
    { name: 'SOC & Cyber Lab', placeholder: 'Drop lab screenshot', category: 'Cybersecurity', status: 'Ongoing', statusColor: '#7c6cf0', desc: 'Hands-on cybersecurity lab work: SIEM setup, vulnerability assessment, network analysis, penetration testing, and Linux security labs.', tech: ['Wazuh', 'Splunk', 'Kali', 'Nessus'] },
    { name: 'WUST Media Service', placeholder: 'Drop diagram', category: 'Internal Platform', status: 'Planned', statusColor: '#57606a', desc: 'Centralized media and file storage service for WUST internal systems, with upload and retrieval APIs and role-based access control.', tech: ['Django', 'Next.js', 'MySQL'] }
  ],
  other: [
    { name: 'Innovation Portfolio', placeholder: 'Drop archive visual', category: 'Community & Leadership', status: 'Archive', statusColor: '#57606a', desc: 'A living archive of community leadership, mentoring, judging, organizing, and public-facing innovation work across clubs and programs.', tech: ['Leadership', 'Mentoring', 'Events'] },
    { name: 'Research & Media Archive', placeholder: 'Drop media archive', category: 'Public Knowledge', status: 'Collection', statusColor: '#1a7f37', desc: 'A curated collection of research notes, talks, press features, and public frameworks connected to space, cybersecurity, and AI education.', tech: ['Research', 'Media', 'Writing'] }
  ]
};

export const research: ResearchItem[] = [
  { tag: 'aerospace', name: 'Keeping the Stars Alive', year: '2024', venue: 'Orbital Sustainability Review', desc: 'Satellite longevity, LEO constellation security, and orbital sustainability framed as a usable public concern.', slot: 'champ_landscape' },
  { tag: 'framework', name: 'S.P.A.C.E. Model', year: '2023', venue: 'NASA Space Apps', desc: 'A framework that makes space and orbital data visible, understandable, and actionable for non-specialists.', slot: 'proj_space2' },
  { tag: 'security', name: 'LEO Constellation Security', year: '2024', venue: 'Aspen Cyber Summit', desc: 'Security, forensics, and resilience for low-earth-orbit satellite constellations and ground systems.', slot: 'proj_space1' }
];

export const talks: TalkItem[] = [
  { slot: 'talk_1', role: 'Keynote', roleColor: '#bf8700', date: '2026', loc: 'Dhaka, Bangladesh', event: 'AI-First System Architecture', topic: 'Infinity AI-BuildFest 2026 — designing platforms around agentic systems.' },
  { slot: 'talk_2', role: 'Guest Speaker', roleColor: '#7c6cf0', date: '2023', loc: 'University of Dhaka', event: 'SPACEVERSE 1.0 — Panel Discussion', topic: 'Panel at the TSC Auditorium, University of Dhaka.' },
  { slot: 'talk_3', role: 'Special Guest', roleColor: '#1a7f37', date: '2023', loc: 'Bangladesh', event: 'NASA Junior Pilot Program', topic: 'Space Innovation Camp 2023.' },
  { slot: 'talk_4', role: 'Chief Guest', roleColor: '#e16f24', date: '2023', loc: 'Daffodil Int’l University', event: 'DIU SE Club — EC Orientation', topic: 'Executive Committee 2023–24 orientation.' }
];

export const media: MediaItem[] = [
  { slot: 'media1', placeholder: 'Drop press image', kind: 'press', outlet: 'Press feature', title: 'Team Diamonds wins NASA Space Apps' },
  { slot: 'media2', placeholder: 'Drop video thumb', kind: 'video', outlet: 'Video coverage', title: 'Diamond in the Sky — project film' },
  { slot: 'media3', placeholder: 'Drop social card', kind: 'social', outlet: 'Social', title: 'Global Champion announcement' },
  { slot: 'media4', placeholder: 'Drop publication', kind: 'article', outlet: 'Publication archive', title: 'Space education for everyone' }
];

export const blog: BlogItem[] = [
  { slot: 'blog1', placeholder: 'Drop cover image', tag: 'field note', title: 'Making orbital systems easier to explain' },
  { slot: 'blog2', placeholder: 'Drop cover image', tag: 'essay', title: 'What SOC practice teaches about clarity' },
  { slot: 'blog3', placeholder: 'Drop cover image', tag: 'essay', title: 'How to evaluate innovation without losing the human signal' }
];

export const cocurricular: CocurricularItem[] = [
  { key: 'cc_big', year: 'EC 2022–23', title: 'President', org: 'DIU Software Engineering Club', slides: ['cocurric_collage_big', 'cocurric_collage_big_b', 'cocurric_collage_big_c'] },
  { key: 'cc_1', year: 'Narsingdi', title: 'District Head', org: 'Bangladesh Innovation Forum', slides: ['cocurric_collage_1', 'cocurric_collage_1_b'] },
  { key: 'cc_2', year: 'Ambassador', title: 'Campus Ambassador', org: 'Youth Career Institute', slides: ['cocurric_collage_2', 'cocurric_collage_2_b'] },
  { key: 'cc_3', year: '2023', title: 'Lead Organizer', org: 'DIU CodeFest', slides: ['cocurric_collage_3', 'cocurric_collage_3_b'] },
  { key: 'cc_4', year: 'volunteer', title: 'Volunteer', org: 'Bidyanondo Foundation', slides: ['cocurric_collage_4', 'cocurric_collage_4_b'] }
];

export const visualPills = [
  { icon: Rocket, label: 'space systems' },
  { icon: ShieldCheck, label: 'secure software' },
  { icon: BrainCircuit, label: 'AI-first systems' },
  { icon: UsersRound, label: 'judge & mentor' },
  { icon: Award, label: 'global recognition' }
];
