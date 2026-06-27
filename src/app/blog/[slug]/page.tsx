import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContentShell } from '@/components/ContentShell';
import { DetailPage } from '@/components/DetailPage';
import { blogContentPosts } from '@/data/content';
import { getRuntimePost, getRuntimeRelatedPosts } from '@/lib/publicContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return blogContentPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getRuntimePost(slug);

  if (!post || post.type !== 'blog') {
    return { title: 'Blog — IHSONNET' };
  }

  return {
    title: `${post.title} — IHSONNET`,
    description: post.excerpt
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getRuntimePost(slug);

  if (!post || post.type !== 'blog') notFound();

  return (
    <ContentShell>
      <DetailPage post={post} related={await getRuntimeRelatedPosts(post)} />
    </ContentShell>
  );
}
