import type { Metadata } from 'next';
import { updateSiteHeaderAction } from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { SiteHeaderSettingsForm } from '@/components/admin/SiteSettingsSections';
import { requireAdmin } from '@/lib/adminAuth';
import { isDatabaseConfigured } from '@/lib/db';
import { getAdminSiteSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Header Settings - IHSONNET Admin'
};

export default async function Page() {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell navKey="header" title="header">
        <DatabaseNotice />
      </AdminShell>
    );
  }

  return (
    <AdminShell navKey="header" title="header" action={<a className="admin-action" href="/admin/site">all settings</a>}>
      <SiteHeaderSettingsForm action={updateSiteHeaderAction} settings={await getAdminSiteSettings()} />
    </AdminShell>
  );
}
