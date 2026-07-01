import type { Metadata } from 'next';
import { updateSiteHeroAction } from '@/app/admin/actions';
import { AdminShell } from '@/components/admin/AdminShell';
import { DatabaseNotice } from '@/components/admin/DatabaseNotice';
import { SiteHeroSettingsForm } from '@/components/admin/SiteSettingsSections';
import { requireAdmin } from '@/lib/adminAuth';
import { isDatabaseConfigured } from '@/lib/db';
import { getAdminSiteSettings } from '@/lib/siteSettings';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Hero Settings - IHSONNET Admin'
};

export default async function Page() {
  await requireAdmin();

  if (!isDatabaseConfigured()) {
    return (
      <AdminShell navKey="hero" title="hero">
        <DatabaseNotice />
      </AdminShell>
    );
  }

  return (
    <AdminShell navKey="hero" title="hero" action={<a className="admin-action" href="/admin/site">all settings</a>}>
      <SiteHeroSettingsForm action={updateSiteHeroAction} settings={await getAdminSiteSettings()} />
    </AdminShell>
  );
}
