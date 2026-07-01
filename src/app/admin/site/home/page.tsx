import type { Metadata } from 'next';
import { updateSiteHomeOrderAction } from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { SiteHomeOrderSettingsForm } from '@/components/admin/SiteSettingsSections';
import { requireAdmin } from '@/lib/adminAuth';
import { isDatabaseConfigured } from '@/lib/db';
import { getAdminSiteSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Home Order - IHSONNET Admin'
};

export default async function Page() {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell navKey="home" title="home-order">
        <DatabaseNotice />
      </AdminShell>
    );
  }

  return (
    <AdminShell navKey="home" title="home-order" action={<a className="admin-action" href="/admin/site">all settings</a>}>
      <SiteHomeOrderSettingsForm action={updateSiteHomeOrderAction} settings={await getAdminSiteSettings()} />
    </AdminShell>
  );
}
