import React, { useState, useEffect } from 'react';
import {
  Package,
  Boxes,
  Building2,
  Clock,
  ArrowRight,
  TrendingUp,
  Layers,
  Search,
  Users,
  Truck,
  DollarSign,
  Globe,
  Sparkles,
  ShoppingBag,
  Factory,
  CheckCircle2
} from 'lucide-react';
import {
  fetchStockSummary,
  fetchErpOrders,
  fetchErpCustomers,
  fetchErpProducts
} from '../erpClient';

export function DashboardView({ onNavigate, onOpenOmnibar }) {
  const [stockWarehouses, setStockWarehouses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(3264);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [sRes, oRes, cRes, pRes] = await Promise.all([
          fetchStockSummary(),
          fetchErpOrders(),
          fetchErpCustomers(),
          fetchErpProducts({ limit: 1 })
        ]);
        if (sRes.success && Array.isArray(sRes.data)) setStockWarehouses(sRes.data);
        if (oRes.success && Array.isArray(oRes.data)) setOrders(oRes.data);
        if (cRes.success && Array.isArray(cRes.data)) setCustomers(cRes.data);
        if (pRes.pagination?.totalCount) setTotalProductsCount(pRes.pagination.totalCount);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalPhysicalPares = 113484;
  const showroomPares = 68946;
  const outletPares = 44538;

  return (
    <div className="space-y-6">
      {/* Top Banner (Light Mode) */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-700 rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-sky-200" />
              <span>SkyBlue ERP Core v3.0 • Sistema Operativo Mayorista</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">
              Centro de Control & Operaciones
            </h1>
            <p className="text-sm text-sky-100 font-medium">
              Gestión centralizada de <strong className="text-white">3.264 artículos de calzado</strong>, stock en sucursales, pedidos mayoristas y despacho a expresos de transporte.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenOmnibar}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-900 hover:bg-sky-50 rounded-2xl text-xs font-black shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <Search className="w-4 h-4 text-sky-600" />
              <span>Buscador Omnibar</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-600">Ctrl+K</kbd>
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-500/30 hover:bg-sky-500/40 text-white border border-white/30 rounded-2xl text-xs font-bold transition-all hover:scale-105"
            >
              <Layers className="w-4 h-4" />
              <span>Ver Catálogo 360°</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Main KPI Cards (Light Mode) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Stock Total */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Stock en Depósitos</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <Boxes className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              {totalPhysicalPares.toLocaleString('es-AR')}
            </div>
            <div className="text-xs text-slate-500 mt-1">pares en sucursales activas</div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Showroom + Outlet Web</span>
            <button
              onClick={() => onNavigate('stock-warehouses')}
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
            >
              <span>Ver Sucursales</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 2: Catálogo */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Catálogo Maestro</span>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              {totalProductsCount.toLocaleString('es-AR')}
            </div>
            <div className="text-xs text-slate-500 mt-1">artículos con fotos y 10 listas</div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Curva 35 a 40</span>
            <button
              onClick={() => onNavigate('products')}
              className="text-sky-700 hover:text-sky-800 font-bold flex items-center gap-1"
            >
              <span>Explorar</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 3: Clientes */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Cuentas Corrientes</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              53
            </div>
            <div className="text-xs text-slate-500 mt-1">clientes mayoristas registrados</div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Saldos & Límites</span>
            <button
              onClick={() => onNavigate('customers')}
              className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1"
            >
              <span>Ver CRM</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 4: Transportes */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Expresos al Interior</span>
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-slate-900 tracking-tight font-mono">
              56
            </div>
            <div className="text-xs text-slate-500 mt-1">empresas de transporte oficiales</div>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Envíos Nacionales</span>
            <button
              onClick={() => onNavigate('transports')}
              className="text-purple-700 hover:text-purple-800 font-bold flex items-center gap-1"
            >
              <span>Ver Expresos</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Warehouse Live Distribution */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900">Desglose de Stock por Sucursal</h2>
              <p className="text-xs text-slate-500">Disponibilidad en tiempo real en los 4 depósitos operativos</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('stock-warehouses')}
            className="text-xs text-sky-700 hover:text-sky-800 font-bold flex items-center gap-1"
          >
            <span>Gestionar Transferencias</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Warehouse 1: Showroom */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-xs text-slate-900">Depósito General</span>
              <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">Showroom</span>
            </div>
            <div className="text-xs text-slate-500">Tapiales • Venta Mayorista</div>
            <div className="pt-2 flex items-baseline justify-between">
              <span className="text-xs text-slate-500">Stock:</span>
              <span className="text-xl font-black font-mono text-emerald-600">{showroomPares.toLocaleString('es-AR')} pares</span>
            </div>
          </div>

          {/* Warehouse 2: Outlet Curapaligue */}
          <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-2xl space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-xs text-purple-900">Outlet SkyBlue</span>
              <span className="text-[10px] font-mono font-bold bg-purple-100 px-2 py-0.5 rounded border border-purple-200 text-purple-700">Curapaligue 1428</span>
            </div>
            <div className="text-xs text-purple-600">Stock Tienda Web Minorista (www.skyblue.com.ar)</div>
            <div className="pt-2 flex items-baseline justify-between">
              <span className="text-xs text-purple-600">Stock:</span>
              <span className="text-xl font-black font-mono text-purple-700">{outletPares.toLocaleString('es-AR')} pares</span>
            </div>
          </div>

          {/* Warehouse 3: Canning */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-xs text-slate-900">SBW Canning</span>
              <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">Local</span>
            </div>
            <div className="text-xs text-slate-500">Canning • Buenos Aires</div>
            <div className="pt-2 flex items-baseline justify-between">
              <span className="text-xs text-slate-500">Stock:</span>
              <span className="text-xl font-black font-mono text-slate-700">0 pares</span>
            </div>
          </div>

          {/* Warehouse 4: Cañuelas */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex justify-between items-start">
              <span className="font-extrabold text-xs text-slate-900">SkyBlue Cañuelas</span>
              <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">Av. Libertad 1190</span>
            </div>
            <div className="text-xs text-slate-500">Cañuelas • Buenos Aires</div>
            <div className="pt-2 flex items-baseline justify-between">
              <span className="text-xs text-slate-500">Stock:</span>
              <span className="text-xl font-black font-mono text-slate-700">0 pares</span>
            </div>
          </div>
        </div>
      </div>

      {/* Omnichannel & Production Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Omnichannel E-commerce */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-black text-slate-900">Canales E-Commerce Conectados</h2>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              4 En Línea
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <strong className="text-slate-900">Tiendanube (www.skyblue.com.ar)</strong>
                <div className="text-[11px] text-slate-500">Descuenta stock de Outlet Curapaligue 1428</div>
              </div>
              <span className="text-xs font-bold text-sky-700">Sincronizado</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <strong className="text-slate-900">Mercado Libre (Tienda Oficial)</strong>
                <div className="text-[11px] text-slate-500">Publicaciones y órdenes MLA</div>
              </div>
              <span className="text-xs font-bold text-amber-700">Sincronizado</span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <strong className="text-slate-900">Provincia Compras & Mercado Shops</strong>
                <div className="text-[11px] text-slate-500">Catálogo mayorista y promociones bancarias</div>
              </div>
              <span className="text-xs font-bold text-emerald-700">Sincronizado</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('ecommerce')}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-2xl text-xs border border-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <span>Abrir Monitor Omnicanal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: MRP Production */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Factory className="w-5 h-5 text-orange-600" />
              <h2 className="text-base font-black text-slate-900">Producción & Talleres Externos (MRP)</h2>
            </div>
            <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
              Destajo por Par
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex justify-between">
                <span>Órdenes de Producción (OPs)</span>
                <span className="text-sky-700 font-mono">En curso</span>
              </div>
              <p className="text-slate-500">Corte, aparado, armado, suelas y pegado con control de calidad.</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="font-bold text-slate-900 flex justify-between">
                <span>Liquidación a Talleres y Operarios</span>
                <span className="text-emerald-700 font-mono">Automático</span>
              </div>
              <p className="text-slate-500">Cálculo de haberes por lote terminado según tarifa por par.</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('production')}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-2xl text-xs border border-slate-200 transition-all flex items-center justify-center gap-2"
          >
            <span>Gestionar Producción & Talleres</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
