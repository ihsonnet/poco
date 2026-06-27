'use server';

import { redirect } from 'next/navigation';
import { clearAdminSession, isPasswordValid, requireAdmin, setAdminSession } from '@/lib/adminAuth';
import { createAdminPost, deleteAdminPost, parseAdminPostInput, updateAdminPost } from '@/lib/adminContent';

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
  const id = await createAdminPost(parseAdminPostInput(formData));
  redirect(`/admin/posts/${id}`);
}

export async function updatePostAction(id: string, formData: FormData) {
  await requireAdmin();
  await updateAdminPost(id, parseAdminPostInput(formData));
  redirect(`/admin/posts/${id}`);
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  await deleteAdminPost(id);
  redirect('/admin/posts');
}
