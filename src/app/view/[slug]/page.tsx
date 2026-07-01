import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CollectionPage } from '@/components/CollectionPage';
import { ContentShell } from '@/components/ContentShell';
import { getCollectionSlugs } from '@/data/content';
import { getRuntimeCollection } from '@/lib/publicContent';
import { getRuntimeSiteSettings } from '@/lib/siteSettings';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tag?: string }>;
}

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return getCollectionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getRuntimeCollection(slug);

  if (!collection) {
    return { title: 'Archive — IHSONNET' };
  }

  return {
    title: `${collection.title}/ — IHSONNET`,
    description: collection.description
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { tag } = await searchParams;
  const collection = await getRuntimeCollection(slug);

  if (!collection) notFound();

  return (
    <ContentShell settings={await getRuntimeSiteSettings()}>
      <CollectionPage collection={collection} activeTag={tag} />
    </ContentShell>
  );
}
