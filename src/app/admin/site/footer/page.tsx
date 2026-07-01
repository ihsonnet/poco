import type { Metadata } from 'next';
import { updateSiteFooterAction } from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { SiteFooterSettingsForm } from '@/components/admin/SiteSettingsSections';
import { requireAdmin } from '@/lib/adminAuth';
import { isDatabaseConfigured } from '@/lib/db';
import { getAdminSiteSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Footer Settings - IHSONNET Admin'
};

export default async function Page() {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell navKey="footer" title="footer">
        <DatabaseNotice />
      </AdminShell>
    );
  }

  return (
    <AdminShell navKey="footer" title="footer" action={<a className="admin-action" href="/admin/site">all settings</a>}>
      <SiteFooterSettingsForm action={updateSiteFooterAction} settings={await getAdminSiteSettings()} />
    </AdminShell>
  );
}
