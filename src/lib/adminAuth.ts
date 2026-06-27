import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_COOKIE = 'sonet_admin';

function getAdminSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'dev-admin-secret';
}

function sign(value: string) {
  return createHmac('sha256', getAdminSecret()).update(value).digest('hex');
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function isPasswordValid(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return typeof expected === 'string' && expected.length > 0 && safeEqual(password, expected);
}

export async function setAdminSession() {
  const sessionValue = `admin.${sign('admin')}`;
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE, sessionValue, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  return Boolean(value && safeEqual(value, `admin.${sign('admin')}`));
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login');
  }
}
