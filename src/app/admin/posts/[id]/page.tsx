import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { deletePostAction, updatePostAction } from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { PostForm } from '@/components/admin/PostForm';
import { requireAdmin } from '@/lib/adminAuth';
import { getAdminPost } from '@/lib/adminContent';
import { isDatabaseConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Edit Post — IHSONNET Admin'
};

export default async function Page({ params }: PageProps) {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell title="edit-post">
        <DatabaseNotice />
      </AdminShell>
    );
  }

  const { id } = await params;
  const post = await getAdminPost(id);

  if (!post) notFound();

  return (
    <AdminShell title="edit-post" action={<a className="admin-action" href="/admin/posts">back ↗</a>}>
      <PostForm action={updatePostAction.bind(null, id)} post={post} submitLabel="save changes" />
      <form className="admin-danger" action={deletePostAction.bind(null, id)}>
        <button type="submit">delete post</button>
      </form>
    </AdminShell>
  );
}
