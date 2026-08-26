import React, { useState } from 'react';
import {
  X,
  Boxes,
  Globe,
  Tag,
  DollarSign,
  Building2,
  Package,
  Barcode,
  Layers,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';
import { toggleProductWeb } from '../erpClient';

export function ProductDetailDrawer({ product, onClose, onUpdated }) {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'prices' | 'details'
  const [togglingWeb, setTogglingWeb] = useState(false);
  const [isWeb, setIsWeb] = useState(product?.isPublishedWeb || false);

  if (!product) return null;

  const handleToggleWeb = async () => {
    setTogglingWeb(true);
    try {
      const res = await toggleProductWeb(product.id);
      if (res.success) {
        setIsWeb(res.isPublishedWeb);
        if (onUpdated) onUpdated({ ...product, isPublishedWeb: res.isPublishedWeb });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTogglingWeb(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-2xl bg-white border-l border-slate-200 shadow-2xl h-full flex flex-col justify-between overflow-hidden animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header (Light Mode) */}
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <img
              src={product.mainImage}
              alt={product.sku}
              className="w-20 h-20 object-cover rounded-2xl bg-white border border-slate-200 shadow-2xs shrink-0"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400&auto=format&fit=crop';
              }}
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-mono text-xs font-black bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-lg">
                  SKU: {product.sku}
                </span>
                <span className="text-xs font-black text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-200">
                  {product.brand}
                </span>
                <span className="text-xs font-semibold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-lg">
                  {product.category}
                </span>
              </div>
              <h2 className="text-base font-black text-slate-900 leading-snug">
                {product.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                <span>Temporada: <strong className="text-slate-700">{product.season}</strong></span>
                <span>•</span>
                <span>Rubro: <strong className="text-slate-700">{product.category}</strong></span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-all shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation (Light Mode) */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-white">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'border-sky-600 text-sky-700 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Curva & Stock Depósitos</span>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'prices'
                ? 'border-sky-600 text-sky-700 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>10 Listas de Precios</span>
          </button>

          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-sky-600 text-sky-700 font-black'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Detalle Técnico & Web</span>
          </button>
        </div>

        {/* Tab Body (Light Mode) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {/* TAB 1: CURVE & WAREHOUSE STOCKS */}
          {activeTab === 'matrix' && (
            <div className="space-y-6">
              {/* Summary KPIs */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-slate-500 uppercase">Showroom Tapiales</div>
                  <div className="text-xl font-black font-mono text-slate-900 mt-1">
                    {product.depGralStock || 0}p
                  </div>
                </div>
                <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-purple-700 uppercase">Outlet (Web)</div>
                  <div className="text-xl font-black font-mono text-purple-900 mt-1">
                    {product.outletStock || 0}p
                  </div>
                </div>
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 shadow-2xs">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase">Stock Físico Total</div>
                  <div className="text-xl font-black font-mono text-emerald-900 mt-1">
                    {product.totalPhysicalStock || 0}p
                  </div>
                </div>
              </div>

              {/* Size Curve Breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Curva de Talles Oficial (35 al 40)
                </h3>
                <div className="grid grid-cols-6 gap-2 text-center font-mono">
                  {['35', '36', '37', '38', '39', '40'].map((sz) => {
                    const totalSzStock = Math.floor((product.totalPhysicalStock || 0) / 6);
                    return (
                      <div key={sz} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="text-xs font-black text-slate-900">Talle {sz}</div>
                        <div className="text-sm font-black text-sky-700 mt-1">{totalSzStock}p</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 10 PRICE LISTS */}
          {activeTab === 'prices' && (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Nombre de Lista Oficial</th>
                    <th className="p-3 text-right">Monto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {(product.allPrices || []).map((pr) => (
                    <tr key={pr.listNumber} className="hover:bg-slate-50/80">
                      <td className="p-3 font-bold text-slate-400">L{pr.listNumber}</td>
                      <td className="p-3 font-sans font-medium text-slate-800">{pr.listName}</td>
                      <td className="p-3 text-right font-black text-slate-900 text-sm">
                        ${pr.amount?.toLocaleString('es-AR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: TECHNICAL DETAILS & WEB SYNC */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 text-xs">
                <h3 className="font-black text-slate-900">Estado de Publicación en Tiendanube</h3>
                <p className="text-slate-500">
                  Al estar publicado en la web, el calzado es visible en el catálogo de www.skyblue.com.ar y descuenta stock en vivo de Curapaligue 1428.
                </p>
                <button
                  onClick={handleToggleWeb}
                  disabled={togglingWeb}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    isWeb
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>{isWeb ? 'Publicado en Tienda Web (Activo)' : 'Pausado en Tienda Web'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
}
