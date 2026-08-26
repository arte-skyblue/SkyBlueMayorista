import React, { useState, useEffect } from 'react';
import {
  Truck,
  Search,
  MapPin,
  Phone,
  User,
  Plus,
  ShieldCheck,
  ExternalLink,
  PackageCheck,
  RefreshCw
} from 'lucide-react';
import { fetchErpTransports } from '../erpClient';

export function TransportsLogisticsView() {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetchErpTransports();
        if (res.success) setTransports(res.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = transports.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      (t.code && t.code.toLowerCase().includes(q)) ||
      (t.address && t.address.toLowerCase().includes(q)) ||
      (t.contact && t.contact.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header (Light Mode) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shadow-xs">
            <Truck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Logística & Expresos de Transporte
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-50 text-purple-800 border border-purple-200">
                {transports.length} Expresos Activos
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Directorio de expresos, comisionistas y correos para despacho de bultos y curvas de calzado a todo el país.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar expreso o localidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 transition-all font-medium"
          />
        </div>
      </div>

      {/* Grid of Transport Cards (Light Mode) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-600 mb-2" />
            Cargando expresos de transporte...
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400">
            No se encontraron transportes que coincidan con la búsqueda.
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                    {t.code || `TR-${t.id}`}
                  </span>
                  <h2 className="text-sm font-black text-slate-900 mt-2">{t.name}</h2>
                </div>
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                {t.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{t.address}</span>
                  </div>
                )}
                {t.phone && (
                  <div className="flex items-center gap-2 text-emerald-700 font-medium">
                    <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{t.phone}</span>
                  </div>
                )}
                {t.contact && (
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Contacto: {t.contact}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
