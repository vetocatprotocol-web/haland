export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="max-w-xl rounded-xl border border-border bg-muted p-8 shadow-sm">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-secondary">Haland Petcare</p>
        <h1 className="text-2xl font-semibold">Foundation setup complete</h1>
        <p className="mt-3 text-sm text-secondary">
          Next.js, Tailwind, Prisma, authentication, and placeholder structure are now in place.
        </p>
      </div>
    </main>
  );
}
