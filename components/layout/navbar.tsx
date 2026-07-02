import { NotificationBell } from './notification-bell';

export function Navbar() {
  return (
    <header className="border-b border-zinc-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">Haland Petcare</p>
          <h1 className="text-base font-semibold text-zinc-900">Halo, Admin</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 sm:block">Mode Operasional</div>
          <NotificationBell />
        </div>
      </div>
    </header>
  );
}
