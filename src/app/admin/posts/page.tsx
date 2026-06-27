import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { requireAdmin } from '@/lib/adminAuth';
import { isDatabaseConfigured } from '@/lib/db';
import { listAdminPosts } from '@/lib/adminContent';

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
    <AdminShell title="posts" action={<a className="admin-action" href="/admin/posts/new">new post ↗</a>}>
      <div className="admin-table">
        <div className="admin-table-head">
          <span>title</span>
          <span>type</span>
          <span>status</span>
          <span>updated</span>
        </div>
        {posts.map((post) => (
          <a href={`/admin/posts/${post.id}`} className="admin-table-row" key={post.id}>
            <span>
              <b>{post.title}</b>
              <small>/{post.route}/{post.slug}</small>
            </span>
            <span>{post.type}</span>
            <span>{post.publication_status}{post.featured ? ' · featured' : ''}</span>
            <span>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(post.updated_at))}</span>
          </a>
        ))}
        {!posts.length ? <p className="admin-empty">No database posts yet. Create the first record.</p> : null}
      </div>
    </AdminShell>
  );
}
