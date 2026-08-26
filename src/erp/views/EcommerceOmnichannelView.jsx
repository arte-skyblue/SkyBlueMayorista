import React, { useState } from 'react';
import {
  Globe,
  ShoppingBag,
  Store,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Package,
  Truck,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Send,
  Zap,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function EcommerceOmnichannelView() {
  const [syncing, setSyncing] = useState(false);

  const channels = [
    {
      id: 'TIENDANUBE',
      name: 'Tiendanube',
      subtitle: 'www.skyblue.com.ar (Web Minorista)',
      status: 'ONLINE',
      badge: 'Principal',
      textColor: 'text-sky-700',
      stockWarehouse: 'Outlet Curapaligue 1428',
      publishedProducts: 1420,
      todayOrders: 18,
      todaySalesAmount: 486000,
      lastSync: 'Hace 3 minutos'
    },
    {
      id: 'MERCADOLIBRE',
      name: 'Mercado Libre',
      subtitle: 'Tienda Oficial SkyBlue Mayorista',
      status: 'ONLINE',
      badge: 'Full / Flex',
      textColor: 'text-amber-700',
      stockWarehouse: 'Depósito General Showroom',
      publishedProducts: 850,
      todayOrders: 29,
      todaySalesAmount: 792500,
      lastSync: 'Hace 1 minuto'
    },
    {
      id: 'MERCADOSHOPS',
      name: 'Mercado Shops',
      subtitle: 'Catálogo Mayorista Express',
      status: 'ONLINE',
      badge: 'B2B',
      textColor: 'text-purple-700',
      stockWarehouse: 'Depósito General Showroom',
      publishedProducts: 430,
      todayOrders: 7,
      todaySalesAmount: 215000,
      lastSync: 'Hace 12 minutos'
    },
    {
      id: 'PROVINCIA_COMPRAS',
      name: 'Provincia Compras',
      subtitle: 'Portal de Financiación Banco Provincia',
      status: 'ONLINE',
      badge: '24 Cuotas',
      textColor: 'text-emerald-700',
      stockWarehouse: 'Outlet Curapaligue 1428',
      publishedProducts: 610,
      todayOrders: 14,
      todaySalesAmount: 398000,
      lastSync: 'Hace 5 minutos'
    }
  ];

  const recentOmniOrders = [
    {
      id: 'MLA-2098145',
      channel: 'Mercado Libre',
      customer: 'Calzados San Juan S.R.L.',
      items: 'Curva REF175019 Zapatilla Negro (12 pares)',
      warehouse: 'Showroom Tapiales',
      total: 333000,
      status: 'LISTO_DESPACHO',
      time: 'Hace 12 min'
    },
    {
      id: 'TN-9842',
      channel: 'Tiendanube',
      customer: 'Florencia Benitez',
      items: 'Zapatilla Refresh Plataforma (Talle 38)',
      warehouse: 'Outlet Curapaligue 1428',
      total: 42500,
      status: 'PREPARANDO',
      time: 'Hace 28 min'
    },
    {
      id: 'PC-4410',
      channel: 'Provincia Compras',
      customer: 'Lucas Fernandez',
      items: 'Borcego SkyBlue Cuero Suela (Talle 39)',
      warehouse: 'Outlet Curapaligue 1428',
      total: 58000,
      status: 'EN_CAMINO',
      time: 'Hace 45 min'
    }
  ];

  const handleGlobalSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert('¡Sincronización omnicanal completada! Stock y pedidos actualizados.');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header (Light Mode) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shadow-xs">
            <Globe className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">E-Commerce & Omnicanalidad</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                4 Canales Sincronizados
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Conexión en tiempo real con Tiendanube (www.skyblue.com.ar), Mercado Libre, Mercado Shops y Provincia Compras con descuento automático de stock en Curapaligue 1428.
            </p>
          </div>
        </div>

        <button
          onClick={handleGlobalSync}
          disabled={syncing}
          className="flex items-center gap-2 px-5 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-black text-xs shadow-md transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Sincronizando...' : 'Sincronizar Canales'}</span>
        </button>
      </div>

      {/* 4 Channels Grid (Light Mode) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {channels.map((ch) => (
          <div
            key={ch.id}
            className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-extrabold text-slate-900 text-base">{ch.name}</span>
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 ${ch.textColor}`}>
                  {ch.badge}
                </span>
              </div>

              <div className="text-xs text-slate-500 font-medium">{ch.subtitle}</div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Depósito de Stock:</span>
                  <strong className="text-slate-800">{ch.stockWarehouse}</strong>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Productos Sincronizados:</span>
                  <strong className="font-mono text-slate-900">{ch.publishedProducts.toLocaleString('es-AR')}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">{ch.lastSync}</span>
              <span className="text-emerald-700 font-bold font-mono">
                ${ch.todaySalesAmount.toLocaleString('es-AR')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Omnichannel Orders (Light Mode) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-black text-slate-900">Órdenes Omnicanal Recientes</h2>

        <div className="divide-y divide-slate-100 text-xs">
          {recentOmniOrders.map((ord) => (
            <div key={ord.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-slate-900">{ord.id}</span>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {ord.channel}
                  </span>
                  <strong className="text-slate-800">{ord.customer}</strong>
                </div>
                <div className="text-slate-500 text-[11px]">
                  {ord.items} • Depósito: <strong className="text-slate-700">{ord.warehouse}</strong>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono font-black text-sm text-slate-900">
                  ${ord.total.toLocaleString('es-AR')}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
