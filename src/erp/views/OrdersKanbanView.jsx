import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  Truck,
  MessageCircle,
  ArrowRight,
  User,
  Package,
  DollarSign,
  RefreshCw,
  ShoppingBag
} from 'lucide-react';
import { fetchErpOrders, updateOrderStatus, getOrderWhatsAppPayload } from '../erpClient';

const COLUMNS = [
  { id: 'NEW', title: 'Nuevos Pedidos', color: 'border-slate-300 bg-slate-50' },
  { id: 'APPROVED', title: 'Aprobados / Stock Confirmado', color: 'border-sky-300 bg-sky-50/50' },
  { id: 'IN_PICKING', title: '📦 En Armado Showroom', color: 'border-amber-300 bg-amber-50/50' },
  { id: 'READY_TO_SHIP', title: '🚀 Listo p/ Expreso', color: 'border-purple-300 bg-purple-50/50' },
  { id: 'DELIVERED', title: '✓ Despachado / Entregado', color: 'border-emerald-300 bg-emerald-50/40' }
];

export function OrdersKanbanView() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchErpOrders();
      if (res.success && Array.isArray(res.data)) {
        setOrders(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOpenWhatsApp = async (orderId) => {
    try {
      const res = await getOrderWhatsAppPayload(orderId);
      if (res.success && res.whatsappUrl) {
        window.open(res.whatsappUrl, '_blank');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header (Light Mode) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Tablero de Pedidos & WhatsApp
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-50 text-sky-700 border border-sky-200">
                Flujo Mayorista
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Kanban de pedidos en curso, picking por talle y generación de comprobantes para WhatsApp.
            </p>
          </div>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-200 transition-all shadow-2xs"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Kanban Columns Grid (Light Mode) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {COLUMNS.map((col) => {
          const colOrders = orders.filter((o) => (o.status || 'NEW') === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-3xl border p-4 flex flex-col gap-3 min-h-[450px] shadow-xs ${col.color}`}
            >
              <div className="flex items-center justify-between font-black text-xs text-slate-800 pb-2 border-b border-slate-200/80">
                <span>{col.title}</span>
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-mono text-[11px]">
                  {colOrders.length}
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {colOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2 hover:border-sky-300 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-slate-900">
                        #{ord.orderNumber || ord.id}
                      </span>
                      <span className="font-mono font-extrabold text-xs text-sky-700">
                        ${ord.totalAmount?.toLocaleString('es-AR') || 0}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ord.customer?.name || 'Cliente Mostrador'}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono">
                      {ord.items?.length || 1} artículo(s) • Total: {ord.totalPairs || 12} pares
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleOpenWhatsApp(ord.id)}
                        className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] border border-emerald-200 flex items-center gap-1 transition-all"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </button>

                      {col.id === 'NEW' && (
                        <button
                          onClick={() => handleStatusChange(ord.id, 'APPROVED')}
                          className="p-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg border border-sky-200"
                          title="Aprobar pedido"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
