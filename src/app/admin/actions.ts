'use server';

import { redirect } from 'next/navigation';
import { clearAdminSession, isPasswordValid, requireAdmin, setAdminSession } from '@/lib/adminAuth';
import { createAdminPost, deleteAdminPost, parseAdminPostInput, updateAdminPost } from '@/lib/adminContent';
import { getAdminSiteSettings, parseSiteSettingsInput, parseSiteSettingsSectionInput, updateSiteSettings } from '@/lib/siteSettings';

export async function loginAction(_prevState: { error: string }, formData: FormData) {
  const password = String(formData.get('password') ?? '');

  if (!isPasswordValid(password)) {
    return { error: 'Invalid admin password.' };
  }

  await setAdminSession();
  redirect('/admin/posts');
}

export async function logoutAction() {
  await clearAdminSession();
  redirect('/admin/login');
}

export async function createPostAction(formData: FormData) {
  await requireAdmin();
  const id = await createAdminPost(await parseAdminPostInput(formData));
  redirect(`/admin/posts/${id}`);
}

export async function updatePostAction(id: string, formData: FormData) {
  await requireAdmin();
  await updateAdminPost(id, await parseAdminPostInput(formData));
  redirect(`/admin/posts/${id}`);
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  await deleteAdminPost(id);
  redirect('/admin/posts');
}

export async function updateSiteSettingsAction(formData: FormData) {
  await requireAdmin();
  await updateSiteSettings(await parseSiteSettingsInput(formData));
  redirect('/admin/site');
}

export async function updateSiteHeaderAction(formData: FormData) {
  await requireAdmin();
  await updateSiteSettings(await parseSiteSettingsSectionInput(formData, await getAdminSiteSettings(), 'header'));
  redirect('/admin/site/header');
}

export async function updateSiteHeroAction(formData: FormData) {
  await requireAdmin();
  await updateSiteSettings(await parseSiteSettingsSectionInput(formData, await getAdminSiteSettings(), 'hero'));
  redirect('/admin/site/hero');
}

export async function updateSiteFooterAction(formData: FormData) {
  await requireAdmin();
  await updateSiteSettings(await parseSiteSettingsSectionInput(formData, await getAdminSiteSettings(), 'footer'));
  redirect('/admin/site/footer');
}

export async function updateSiteThemeAction(formData: FormData) {
  await requireAdmin();
  await updateSiteSettings(await parseSiteSettingsSectionInput(formData, await getAdminSiteSettings(), 'theme'));
  redirect('/admin/site/theme');
}

export async function updateSiteHomeOrderAction(formData: FormData) {
  await requireAdmin();
  await updateSiteSettings(await parseSiteSettingsSectionInput(formData, await getAdminSiteSettings(), 'home'));
  redirect('/admin/site/home');
}
