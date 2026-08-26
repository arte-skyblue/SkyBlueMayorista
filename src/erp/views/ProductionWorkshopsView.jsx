import React, { useState, useEffect } from 'react';
import { 
  Factory, Hammer, Scissors, CheckCircle, Clock, Plus, 
  RefreshCw, ChevronRight, AlertTriangle, Layers, DollarSign,
  Package, ArrowRight, X
} from 'lucide-react';
import { fetchProductionSummary, createProductionOrder, advanceProductionOrder } from '../erpClient';

export default function ProductionWorkshopsView() {
  const [data, setData] = useState({ workshops: [], orders: [], kpis: {} });
  const [loading, setLoading] = useState(true);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newOpForm, setNewOpForm] = useState({
    sku: '04748',
    modelTitle: '04748 - Zapatilla - Miami Plataforma',
    workshop: 'FABRICA CENTRAL',
    pairsQuantity: '240',
    destajoRatePerPair: '1850',
    estimatedFinishDate: '2026-09-15'
  });

  const loadProduction = async () => {
    setLoading(true);
    const res = await fetchProductionSummary();
    if (res.success) {
      setData(res.data || { workshops: [], orders: [], kpis: {} });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProduction();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const res = await createProductionOrder(newOpForm);
    if (res.success) {
      alert('¡Orden de Producción creada exitosamente!');
      setShowNewModal(false);
      loadProduction();
    } else {
      alert('Error: ' + res.error);
    }
  };

  const handleAdvance = async (orderId, nextStage) => {
    await advanceProductionOrder(orderId, { nextStage });
    loadProduction();
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'CORTE': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'APARADO_Y_COSTURA': return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'ARMADO_Y_SUELA': return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'EMPAQUE_FINAL': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header (Light Mode) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shadow-xs">
            <Factory className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Producción & Talleres (MRP)</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-orange-50 text-orange-800 border border-orange-200">
                Destajo por Par
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Control de etapas de fabricación (Corte, Aparado, Armado, Empaque) y liquidación de haberes por lote terminado.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadProduction}
            className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-200 transition-all flex items-center gap-2 text-xs font-bold shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-md transition-all flex items-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4" />
            Nueva OP
          </button>
        </div>
      </div>

      {/* KPI Cards (Light Mode) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pares en Proceso Activo</p>
          <p className="text-3xl font-black text-slate-900 mt-1">
            {data.kpis?.totalPairsInProduction || 1480} pares
          </p>
          <p className="text-xs text-slate-400 mt-1">En corte, aparado y armado</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">Talleres Externos & Propios</p>
          <p className="text-3xl font-black text-orange-600 mt-1">
            {data.workshops?.length || 4} talleres
          </p>
          <p className="text-xs text-slate-400 mt-1">Capacidad: 3.500 pares/mes</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Tarifa Promedio por Par</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">$1.850 / par</p>
          <p className="text-xs text-slate-400 mt-1">Liquidación directa a operarios</p>
        </div>
      </div>

      {/* Active Production Orders (Light Mode) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-black text-slate-900">Órdenes de Producción en Línea</h2>

        <div className="space-y-3">
          {(data.orders || []).map((op) => (
            <div
              key={op.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-black bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-800">
                    OP #{op.id}
                  </span>
                  <span className="font-extrabold text-sm text-slate-900">{op.modelTitle}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Taller: {op.workshop} • Lote: {op.pairsQuantity} pares • Tarifa: ${op.destajoRatePerPair}/par
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-xl text-xs font-black border uppercase ${getStageColor(op.currentStage)}`}>
                  {op.currentStage?.replace(/_/g, ' ')}
                </span>

                {op.currentStage !== 'EMPAQUE_FINAL' && (
                  <button
                    onClick={() => handleAdvance(op.id, 'EMPAQUE_FINAL')}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 shadow-2xs"
                  >
                    Avanzar Etapa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
