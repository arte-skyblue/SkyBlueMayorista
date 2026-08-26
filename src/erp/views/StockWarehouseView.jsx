import React, { useState, useEffect } from 'react';
import {
  Building2,
  ArrowRightLeft,
  Package,
  Store,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  MapPin,
  Globe,
  Boxes
} from 'lucide-react';
import { fetchStockSummary, fetchErpProducts, transferStock } from '../erpClient';

export function StockWarehouseView() {
  const [loading, setLoading] = useState(true);
  const [warehouses, setWarehouses] = useState([]);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const wRes = await fetchStockSummary();
      if (wRes.success && Array.isArray(wRes.data)) {
        setWarehouses(wRes.data);
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

  const warehouseList = [
    {
      code: 'DEP_GRAL_SHOWROOM',
      name: 'Depósito General (Showroom Tapiales)',
      address: 'Curapaligue 1428 (Planta Showroom), Tapiales',
      company: 'DANIEL ALEJANDRO GRASSO',
      stockPares: 68946,
      type: 'Venta Mayorista Oficial',
      badge: 'Principal'
    },
    {
      code: 'OUTLET_TAPIALES',
      name: 'Outlet Curapaligue 1428 (Web)',
      address: 'Curapaligue 1428 (Local y Despacho Web), Tapiales',
      company: 'DANIEL ALEJANDRO GRASSO',
      stockPares: 44538,
      type: 'Stock Online & Minorista Directo',
      badge: 'Tiendanube'
    },
    {
      code: 'SBW_CANNING',
      name: 'SBW Canning',
      address: 'Canning, Buenos Aires',
      company: 'DANIEL ALEJANDRO GRASSO',
      stockPares: 0,
      type: 'Almacén Auxiliar',
      badge: 'Sucursal'
    },
    {
      code: 'DEP_CANUELAS',
      name: 'SkyBlue Cañuelas',
      address: 'Av. Libertad 1190, Cañuelas',
      company: 'DANIEL ALEJANDRO GRASSO',
      stockPares: 0,
      type: 'Local Comercial',
      badge: 'Sucursal'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header (Light Mode) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shadow-xs">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Control Multi-Depósito</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                4 Sucursales Activas
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Monitoreo y transferencias internas de inventario entre Showroom Tapiales y el Outlet Web Curapaligue 1428.
            </p>
          </div>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-200 transition-all shadow-2xs self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Warehouse Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {warehouseList.map((wh) => (
          <div
            key={wh.code}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 hover:border-slate-300 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  {wh.badge}
                </span>
                <h2 className="text-lg font-black text-slate-900 mt-2">{wh.name}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{wh.address}</span>
                </p>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black font-mono text-slate-900">
                  {wh.stockPares.toLocaleString('es-AR')}
                </div>
                <div className="text-xs text-slate-500 font-medium">pares disponibles</div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Empresa: <strong className="text-slate-700">{wh.company}</strong></span>
              <span className="font-semibold text-slate-700">{wh.type}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stock Transfer Info Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-slate-900">Reglas de Movimiento de Stock</h2>
            <p className="text-xs text-slate-500">Sincronización automática entre canales físicos y digitales</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <strong className="text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Depósito General (Showroom Tapiales)
            </strong>
            <p className="text-slate-600">
              Concentra el 60% del volumen físico ({warehouseList[0].stockPares.toLocaleString('es-AR')} pares) destinado exclusivamente a clientes mayoristas por curva cerrada y pedidos por bulto.
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-1.5">
            <strong className="text-purple-950 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Outlet Curapaligue 1428 (E-Commerce Web)
            </strong>
            <p className="text-purple-800">
              Concentra el 40% del volumen físico ({warehouseList[1].stockPares.toLocaleString('es-AR')} pares) alimentando en vivo la tienda web de Tiendanube y el mostrador outlet al público.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
