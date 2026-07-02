'use client';

import { BarChart3, CalendarDays, Users, Warehouse } from 'lucide-react';

const cards = [
  { title: 'Pelanggan', value: '—', subtitle: 'Data placeholder', icon: Users },
  { title: 'Appointment Hari Ini', value: '—', subtitle: 'Data placeholder', icon: CalendarDays },
  { title: 'Stok Menipis', value: '—', subtitle: 'Data placeholder', icon: Warehouse },
  { title: 'Ringkasan Bisnis', value: '—', subtitle: 'Data placeholder', icon: BarChart3 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-zinc-500">Dashboard Staff</p>
        <h1 className="mt-1 text-xl font-semibold text-zinc-900">Kerangka dashboard</h1>
        <p className="mt-2 text-sm text-zinc-600">Data real akan diisi setelah modul terkait selesai.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-600">{card.title}</p>
                <div className="rounded-lg bg-zinc-100 p-2 text-zinc-700">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-2xl font-semibold text-zinc-900">{card.value}</p>
              <p className="mt-1 text-sm text-zinc-500">{card.subtitle}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
