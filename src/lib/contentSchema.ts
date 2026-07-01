import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getPool, isDatabaseConfigured } from '@/lib/db';

declare global {
  // eslint-disable-next-line no-var
  var sonetContentSchemaPromise: Promise<void> | undefined;
}

async function runContentSchemaMigration() {
  const migrationPath = path.join(process.cwd(), 'database/migrations/001_content_admin.sql');
  const sql = await readFile(migrationPath, 'utf8');

  await getPool().query(sql);
}

export async function ensureContentSchema() {
  if (!isDatabaseConfigured()) return;

  if (!globalThis.sonetContentSchemaPromise) {
    globalThis.sonetContentSchemaPromise = runContentSchemaMigration().catch((error) => {
      globalThis.sonetContentSchemaPromise = undefined;
      throw error;
    });
  }

  await globalThis.sonetContentSchemaPromise;
}
