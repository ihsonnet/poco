export function DatabaseNotice() {
  return (
    <div className="admin-notice">
      <h2>database-not-configured<span>/</span></h2>
      <p>Set `DATABASE_URL`, run the migration, then reload this admin page.</p>
      <code>npm run db:migrate</code>
    </div>
  );
}
