import type { ReactNode } from 'react';
import { logoutAction } from '@/app/admin/actions';

interface AdminShellProps {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
}

export function AdminShell({ title, eyebrow = 'content admin', action, children }: AdminShellProps) {
  return (
    <main className="admin-root">
      <header className="admin-header">
        <a href="/" className="admin-brand">IHSONNET/</a>
        <nav>
          <a href="/admin/posts">Posts</a>
          <a href="/view/all">View site</a>
          <form action={logoutAction}>
            <button type="submit">Logout</button>
          </form>
        </nav>
      </header>
      <section className="admin-title-row">
        <div>
          <span>{eyebrow}</span>
          <h1>{title}<i>/</i></h1>
        </div>
        {action}
      </section>
      {children}
    </main>
  );
}
