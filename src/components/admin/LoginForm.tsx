'use client';

import { useActionState } from 'react';
import { loginAction } from '@/app/admin/actions';

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, { error: '' });

  return (
    <form className="admin-login-card" action={formAction}>
      <span>protected admin</span>
      <h1>content-console<i>/</i></h1>
      <p>Manage portfolio posts, blog entries, details, tags, galleries, and attachments.</p>
      <label>
        <span>password</span>
        <input name="password" type="password" autoComplete="current-password" required />
      </label>
      {state.error ? <b>{state.error}</b> : null}
      <button type="submit" disabled={pending}>{pending ? 'checking...' : 'login ↗'}</button>
    </form>
  );
}
