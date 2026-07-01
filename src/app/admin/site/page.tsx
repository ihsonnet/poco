import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { SiteSettingsOverview } from '@/components/admin/SiteSettingsSections';
import { requireAdmin } from '@/lib/adminAuth';
import { isDatabaseConfigured } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Settings - IHSONNET Admin'
};

export default async function Page() {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell navKey="settings" title="settings">
        <DatabaseNotice />
      </AdminShell>
    );
  }

  return (
    <AdminShell navKey="settings" title="settings" action={<a className="admin-action" href="/admin/posts">back to posts</a>}>
      <SiteSettingsOverview />
    </AdminShell>
  );
}
