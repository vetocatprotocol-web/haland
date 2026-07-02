import { Bell } from 'lucide-react';

export function NotificationBell() {
  return (
    <button className="relative rounded-full border border-zinc-200 p-2.5 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900" aria-label="Notifikasi">
      <Bell className="h-4 w-4" />
      <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-zinc-900" />
    </button>
  );
}
