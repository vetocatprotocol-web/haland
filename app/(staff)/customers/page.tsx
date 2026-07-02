'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Plus, Eye, Trash2 } from 'lucide-react';
import { createCustomer, deleteCustomer, listCustomers } from '@/actions/customer';
import { DataTable } from '@/components/shared/data-table';
import { EmptyState } from '@/components/shared/empty-state';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';

type CustomerRow = {
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  notes: string | null;
  user?: { username: string; role: string; isActive: boolean } | null;
  pets?: { id: string; name: string }[];
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    void loadCustomers();
  }, []);

  async function loadCustomers() {
    setLoading(true);
    const result = await listCustomers();
    if (result.success) setCustomers(result.customers as CustomerRow[]);
    setLoading(false);
  }

  async function handleCreate() {
    const result = await createCustomer({
      name: 'Pelanggan Baru',
      phone: '',
      address: '',
      notes: '',
      createLogin: false,
    });

    if (result.success) {
      setMessage('Pelanggan ditambahkan.');
      await loadCustomers();
      return;
    }

    setMessage(result.message ?? 'Gagal menambahkan pelanggan.');
  }

  async function handleDelete(id: string) {
    const result = await deleteCustomer({ id });
    if (result.success) {
      setMessage('Pelanggan dihapus.');
      await loadCustomers();
      return;
    }
    setMessage(result.message ?? 'Gagal menghapus pelanggan.');
  }

  const columns: Array<{ key: keyof CustomerRow; header: string; render?: (row: CustomerRow) => ReactNode }> = [
    { key: 'name', header: 'Nama' },
    { key: 'phone', header: 'Telepon' },
    { key: 'address', header: 'Alamat' },
    { key: 'pets', header: 'Hewan', render: (row: CustomerRow) => row.pets?.length ?? 0 },
    { key: 'user', header: 'Login', render: (row: CustomerRow) => (row.user ? 'Ya' : 'Tidak') },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-500">Modul Customer</p>
          <h1 className="text-xl font-semibold text-zinc-900">Data pelanggan</h1>
        </div>
        <button type="button" onClick={handleCreate} className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700">
          <Plus className="h-4 w-4" />
          Tambah Pelanggan
        </button>
      </div>

      {message ? <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">{message}</div> : null}

      {loading ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-sm text-zinc-500">Memuat data pelanggan...</div>
      ) : customers.length === 0 ? (
        <EmptyState title="Belum ada pelanggan" description="Tambahkan pelanggan untuk mengisi data awal." />
      ) : (
        <div className="space-y-3">
          <DataTable title="Daftar pelanggan" columns={columns} rows={customers} emptyMessage="Belum ada pelanggan." />
          <div className="flex flex-wrap gap-2">
            {customers.map((customer) => (
              <div key={customer.id} className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
                <Link href={`/dashboard/customers/${customer.id}`} className="inline-flex items-center gap-2 font-medium text-zinc-900">
                  <Eye className="h-4 w-4" />
                  {customer.name}
                </Link>
                <button type="button" onClick={() => { setSelectedId(customer.id); setShowConfirm(true); }} className="ml-3 text-rose-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog open={showConfirm} title="Hapus pelanggan" description="Data pelanggan akan dihapus setelah memastikan tidak ada hewan terkait." confirmLabel="Hapus" onCancel={() => setShowConfirm(false)} onConfirm={() => { if (selectedId) void handleDelete(selectedId); setShowConfirm(false); }} />
    </div>
  );
}
