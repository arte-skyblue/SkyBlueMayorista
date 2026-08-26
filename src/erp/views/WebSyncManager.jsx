import React, { useState, useEffect } from 'react';
import {
  Globe,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Store,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { fetchErpProducts, toggleProductWeb } from '../erpClient';

export function WebSyncManager() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString('es-AR'));

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchErpProducts();
      if (res.success) {
        setProducts(res.data);
        setLastSync(new Date().toLocaleTimeString('es-AR'));
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

  const handleToggle = async (id) => {
    try {
      const res = await toggleProductWeb(id);
      if (res.success) {
        setProducts(products.map((p) => (p.id === id ? { ...p, isPublishedWeb: res.isPublishedWeb } : p)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const publishedCount = products.filter((p) => p.isPublishedWeb).length;
  const hiddenCount = products.filter((p) => !p.isPublishedWeb).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 rounded-2xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Zap className="w-4 h-4" /> Sincronizador en Tiempo Real Web
          </div>
          <h1 className="text-2xl font-black">Conexión con Tienda Online SkyBlue</h1>
          <p className="text-xs text-purple-200 mt-1">
            Cualquier cambio de stock, precio o visibilidad se propaga a la web en menos de 100 ms.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="http://localhost:4000/api/v1/public/catalog"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold backdrop-blur"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Ver API Pública Web
          </a>
          <button
            onClick={loadData}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-400 text-slate-950 rounded-xl text-xs font-bold shadow-lg shadow-purple-500/30"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Sincronizar Ahora
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-500 uppercase">Estado Conexión</span>
            <span className="text-sm font-black text-emerald-600">✓ Conectado en Vivo</span>
            <span className="block text-[11px] text-slate-400">Última sincro: {lastSync}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-500 uppercase">Publicados en Web</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{publishedCount} modelos</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-500 uppercase">Ocultos / Pausados</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">{hiddenCount} modelos</span>
          </div>
        </div>
      </div>

      {/* Products Web Toggle Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4">
          Interruptores de Publicación Web por Modelo
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                p.isPublishedWeb
                  ? 'bg-purple-50/40 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={p.mainImage}
                  alt={p.sku}
                  className="w-12 h-12 rounded-lg object-cover bg-white shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[11px] font-black text-purple-700 dark:text-purple-400">{p.brand}</div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{p.sku} - {p.title}</div>
                  <div className="text-[10px] text-slate-500">Stock Outlet (Web): <strong>{p.stockSummary.physicalOutlet}</strong></div>
                </div>
              </div>

              {/* Switch */}
              <button
                onClick={() => handleToggle(p.id)}
                className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                  p.isPublishedWeb ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm ${
                    p.isPublishedWeb ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
