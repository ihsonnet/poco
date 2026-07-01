import type { Metadata } from 'next';
import { ComingSoonPage } from '@/components/ComingSoonPage';
import { getRuntimeSiteSettings } from '@/lib/siteSettings';

export const metadata: Metadata = {
  title: 'Portfolio Coming Soon — Injamamul Haque Sonet',
  description: 'A concise coming-soon profile page for Injamamul Haque Sonet.'
};

export default async function Page() {
  return <ComingSoonPage settings={await getRuntimeSiteSettings()} />;
}
