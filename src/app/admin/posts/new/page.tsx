import type { Metadata } from 'next';
import { createPostAction } from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { PostForm } from '@/components/admin/PostForm';
import { requireAdmin } from '@/lib/adminAuth';
import { isDatabaseConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'New Post — IHSONNET Admin'
};

export default async function Page() {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell title="new-post">
        <DatabaseNotice />
      </AdminShell>
    );
  }

  return (
    <AdminShell title="new-post" action={<a className="admin-action" href="/admin/posts">back ↗</a>}>
      <PostForm action={createPostAction} submitLabel="create post" />
    </AdminShell>
  );
}
