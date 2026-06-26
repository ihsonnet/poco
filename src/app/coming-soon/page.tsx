import type { Metadata } from 'next';
import { ComingSoonPage } from '@/components/ComingSoonPage';

export const metadata: Metadata = {
  title: 'Portfolio Coming Soon — Injamamul Haque Sonet',
  description: 'A concise coming-soon profile page for Injamamul Haque Sonet.'
};

export default function Page() {
  return <ComingSoonPage />;
}
