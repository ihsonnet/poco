import type { Metadata } from 'next';
import { updateSiteThemeAction } from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { SiteThemeSettingsForm } from '@/components/admin/SiteSettingsSections';
import { requireAdmin } from '@/lib/adminAuth';
import { isDatabaseConfigured } from '@/lib/db';
import { getAdminSiteSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Theme Settings - IHSONNET Admin'
};

export default async function Page() {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell navKey="theme" title="theme">
        <DatabaseNotice />
      </AdminShell>
    );
  }

  return (
    <AdminShell navKey="theme" title="theme" action={<a className="admin-action" href="/admin/site">all settings</a>}>
      <SiteThemeSettingsForm action={updateSiteThemeAction} settings={await getAdminSiteSettings()} />
    </AdminShell>
  );
}
