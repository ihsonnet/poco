import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isAdminAuthenticated } from '@/lib/adminAuth';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login — IHSONNET'
};

export default async function Page() {
  if (await isAdminAuthenticated()) {
    redirect('/admin/posts');
  }

  return (
    <main className="admin-login">
      <LoginForm />
    </main>
  );
}
