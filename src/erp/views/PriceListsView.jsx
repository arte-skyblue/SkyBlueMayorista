import React, { useState, useEffect } from 'react';
import { 
  Tag, Percent, DollarSign, RefreshCw, Layers, Edit3, 
  Check, ArrowRight, ShieldAlert, Sparkles
} from 'lucide-react';
import { fetchErpMeta } from '../erpClient';

export default function PriceListsView() {
  const [priceLists, setPriceLists] = useState([
    { listNumber: 1, name: 'Lista 1 - Público Cash / Minorista', description: 'Precio de venta al público en mostrador y web', markupPercent: 120.0, currency: 'ARS', isDefault: false },
    { listNumber: 2, name: 'Lista 2 - Mayorista Cuenta Corriente', description: 'Precio oficial mayorista por curva cerrada', markupPercent: 50.0, currency: 'ARS', isDefault: true },
    { listNumber: 3, name: 'Lista 3 - Mayorista Especial', description: 'Clientes VIP y volumen alto', markupPercent: 40.0, currency: 'ARS', isDefault: false },
    { listNumber: 4, name: 'Lista 4 - Stores y Locales Propios', description: 'Transferencias internas a sucursales', markupPercent: 35.0, currency: 'ARS', isDefault: false },
    { listNumber: 5, name: 'Lista 5 - Cash Outlet Curapaligue', description: 'Venta directa en mostrador outlet', markupPercent: 60.0, currency: 'ARS', isDefault: false },
    { listNumber: 6, name: 'Lista 6 - Clientes Especiales 2', description: 'Convenios mayoristas especiales', markupPercent: 45.0, currency: 'ARS', isDefault: false },
    { listNumber: 7, name: 'Lista 7 - Gran Distribuidor Interior', description: 'Distribuidores regionales por bulto', markupPercent: 38.0, currency: 'ARS', isDefault: false },
    { listNumber: 8, name: 'Lista 8 - Revendedores Online', description: 'Drop shipping y revendedores digitales', markupPercent: 55.0, currency: 'ARS', isDefault: false },
    { listNumber: 9, name: 'Lista 9 - Exportación Regional (USD)', description: 'Ventas internacionales en dólares', markupPercent: 25.0, currency: 'USD', isDefault: false },
    { listNumber: 10, name: 'Lista 10 - Liquidación Fin de Temporada', description: 'Discontinuos y saldos de stock', markupPercent: 15.0, currency: 'ARS', isDefault: false }
  ]);
  const [baseCostSim, setBaseCostSim] = useState(18500);

  useEffect(() => {
    const load = async () => {
      const res = await fetchErpMeta();
      if (res.success && res.data.priceLists?.length > 0) {
        setPriceLists(res.data.priceLists);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header (Light Mode) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shadow-xs">
            <Tag className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Estructura de 10 Listas de Precios</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-50 text-sky-700 border border-sky-200">
                10 Listas Oficiales
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Márgenes comerciales oficiales y simulador dinámico de precios por lista.
            </p>
          </div>
        </div>

        {/* Live Simulator Cost Input */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl flex items-center gap-3 shadow-2xs">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-500">Costo Base de Prueba</p>
            <p className="text-sm font-black text-slate-900 font-mono">${baseCostSim.toLocaleString('es-AR')}</p>
          </div>
          <input
            type="range"
            min="5000"
            max="60000"
            step="1000"
            value={baseCostSim}
            onChange={(e) => setBaseCostSim(Number(e.target.value))}
            className="w-28 accent-sky-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Grid of 10 Price Lists (Light Mode) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {priceLists.map((pl) => {
          const calcPrice = pl.currency === 'USD' 
            ? Math.round(baseCostSim / 1200)
            : Math.round(baseCostSim * (1 + (pl.markupPercent || 50) / 100));

          return (
            <div
              key={pl.listNumber}
              className={`p-5 rounded-3xl border shadow-xs space-y-3 transition-all ${
                pl.isDefault
                  ? 'bg-sky-50/70 border-sky-300 ring-2 ring-sky-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                  Lista {pl.listNumber}
                </span>
                {pl.isDefault && (
                  <span className="text-[10px] font-black uppercase bg-sky-600 text-white px-2 py-0.5 rounded-full">
                    Default
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">{pl.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{pl.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                <span className="text-xs text-slate-400 font-medium">Margen: +{pl.markupPercent}%</span>
                <span className="text-lg font-black font-mono text-slate-900">
                  {pl.currency === 'USD' ? `US$ ${calcPrice}` : `$ ${calcPrice.toLocaleString('es-AR')}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
