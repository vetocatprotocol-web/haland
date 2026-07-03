'use client';

import { useEffect, useState } from 'react';
import { BarChart3, Banknote, CalendarDays, Users, Warehouse } from 'lucide-react';
import { getAppointmentSummary } from '@/actions/appointment';
import { getPetHotelSummary } from '@/actions/pet-hotel';
import { getLowStockSummary } from '@/actions/inventory';
import { getStaffBillingSummary } from '@/actions/invoice';

export default function DashboardPage() {
  const [appointmentsToday, setAppointmentsToday] = useState<number | null>(null);
  const [occupiedRooms, setOccupiedRooms] = useState<number | null>(null);
  const [totalRooms, setTotalRooms] = useState<number | null>(null);
  const [lowStockCount, setLowStockCount] = useState<number | null>(null);
  const [todaySales, setTodaySales] = useState<number | null>(null);
  const [todayRevenue, setTodayRevenue] = useState<number | null>(null);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    const [appointmentResult, hotelResult, inventoryResult, billingResult] = await Promise.all([
      getAppointmentSummary(),
      getPetHotelSummary(),
      getLowStockSummary(),
      getStaffBillingSummary(),
    ]);

    if (appointmentResult.success) {
      setAppointmentsToday(appointmentResult.appointmentsToday);
    }
    if (hotelResult.success) {
      setOccupiedRooms(hotelResult.occupiedRooms);
      setTotalRooms(hotelResult.totalRooms);
    }
    if (inventoryResult.success) {
      setLowStockCount(inventoryResult.lowStockCount);
    }
    if (billingResult.success) {
      setTodaySales(billingResult.invoiceCount);
      setTodayRevenue(billingResult.revenueToday);
    }
  }

  const cards = [
    { title: 'Pelanggan', value: '—', subtitle: 'Data placeholder', icon: Users },
    { title: 'Appointment Hari Ini', value: appointmentsToday === null ? '—' : String(appointmentsToday), subtitle: 'Data real dari jadwal hari ini', icon: CalendarDays },
    { title: 'Stok Menipis', value: lowStockCount === null ? '—' : String(lowStockCount), subtitle: 'Produk dengan stok di bawah minimum', icon: Warehouse },
    { title: 'Kamar Terisi', value: occupiedRooms === null ? '—' : `${occupiedRooms}/${totalRooms}`, subtitle: 'Pet hotel - kamar yang sedang digunakan', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-zinc-500">Dashboard Staff</p>
        <h1 className="mt-1 text-xl font-semibold text-zinc-900">Ringkasan operasional</h1>
        <p className="mt-2 text-sm text-zinc-600">Ringkasan real-time dari sistem klinik.</p>
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
