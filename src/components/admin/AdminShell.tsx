import type { ReactNode } from 'react';
import { logoutAction } from '@/app/admin/actions';

interface AdminShellProps {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
  navKey?: 'posts' | 'settings' | 'header' | 'hero' | 'footer' | 'theme' | 'home';
}

const settingsNavKeys = new Set<NonNullable<AdminShellProps['navKey']>>(['settings', 'header', 'hero', 'footer', 'theme', 'home']);

export function AdminShell({ title, eyebrow = 'content admin', action, children, navKey }: AdminShellProps) {
  const settingsOpen = navKey ? settingsNavKeys.has(navKey) : false;

  return (
    <main className="admin-root">
      <aside className="admin-sidebar">
        <a href="/" className="admin-sidebar-brand">
          <span aria-hidden="true" />
          <strong>IHSONNET/</strong>
          <small>content console</small>
        </a>
        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          <a href="/admin/posts" className={navKey === 'posts' ? 'active' : undefined}>
            <span>01</span>
            Posts
          </a>

          <details className="admin-sidebar-group" open={settingsOpen}>
            <summary className={settingsOpen ? 'active' : undefined}>
              <span>02</span>
              Site Settings
              <i aria-hidden="true">▾</i>
            </summary>
            <div className="admin-sidebar-subnav">
              <a href="/admin/site" className={navKey === 'settings' ? 'active' : undefined}>
                <span>02.0</span>
                Overview
              </a>
              <a href="/admin/site/header" className={navKey === 'header' ? 'active' : undefined}>
                <span>02.1</span>
                Header
              </a>
              <a href="/admin/site/hero" className={navKey === 'hero' ? 'active' : undefined}>
                <span>02.2</span>
                Hero
              </a>
              <a href="/admin/site/theme" className={navKey === 'theme' ? 'active' : undefined}>
                <span>02.3</span>
                Colors
              </a>
              <a href="/admin/site/home" className={navKey === 'home' ? 'active' : undefined}>
                <span>02.4</span>
                Home Order
              </a>
              <a href="/admin/site/footer" className={navKey === 'footer' ? 'active' : undefined}>
                <span>02.5</span>
                Footer
              </a>
            </div>
          </details>

          <a href="/view/all"><span>↗</span>View site</a>
        </nav>
        <div className="admin-sidebar-status">
          <span>system</span>
          <strong>PostgreSQL content archive</strong>
          <p>Draft, publish, archive, and manage uploaded media.</p>
        </div>
        <form className="admin-sidebar-logout" action={logoutAction}>
          <button type="submit">Logout ↗</button>
        </form>
      </aside>
      <section className="admin-main">
        <div className="admin-panel-frame">
          <section className="admin-title-row">
            <div>
              <span>{eyebrow}</span>
              <h1>{title}<i>/</i></h1>
            </div>
            {action}
          </section>
          <div className="admin-content-panel">
            {children}
          </div>
        </div>
        <footer className="admin-footer">
          <div>
            <strong>IHSONNET/</strong>
            <span>admin panel</span>
          </div>
          <nav aria-label="Admin footer">
            <a href="/admin/posts">Posts</a>
            <a href="/admin/site">Site Settings</a>
            <a href="/admin/site/header">Header</a>
            <a href="/admin/site/hero">Hero</a>
            <a href="/admin/site/theme">Colors</a>
            <a href="/admin/site/home">Home Order</a>
            <a href="/admin/site/footer">Footer</a>
            <a href="/view/all">View site</a>
          </nav>
        </footer>
      </section>
    </main>
  );
}
