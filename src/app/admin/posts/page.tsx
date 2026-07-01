import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { requireAdmin } from '@/lib/adminAuth';
import { isDatabaseConfigured } from '@/lib/db';
import { listAdminPosts } from '@/lib/adminContent';
import { AdminPostsBoard } from '@/components/admin/AdminPostsBoard';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Posts — IHSONNET'
};

export default async function Page() {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell title="posts">
        <DatabaseNotice />
      </AdminShell>
    );
  }

  const posts = await listAdminPosts();

  return (
    <AdminShell navKey="posts" title="posts" action={<a className="admin-action" href="/admin/posts/new">new post ↗</a>}>
      <AdminPostsBoard posts={posts.map((post) => ({
        id: post.id,
        slug: post.slug,
        type: post.type,
        route: post.route,
        title: post.title,
        subtitle: post.subtitle,
        coverSlot: post.cover_slot,
        coverImageUrl: post.cover_image_url,
        publicationStatus: post.publication_status,
        featured: post.featured,
        updatedAt: post.updated_at.toISOString(),
        tags: post.tags
      }))} />
    </AdminShell>
  );
}
