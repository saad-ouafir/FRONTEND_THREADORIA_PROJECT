export default function HeaderComponent({ page }) {
  return (
    <header className="p-4 border-b border-border bg-bg-secondary">
      <h1 className="font-bold text-lg text-text-primary">{page}</h1>
    </header>
  );
}
