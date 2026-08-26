import React, { useState, useEffect } from 'react';
import {
  Ship,
  Plus,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Package,
  Users,
  ArrowRight,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';
import { fetchErpShipments, receiveShipment, fetchErpMeta } from '../erpClient';

export function ShipmentsView() {
  const [loading, setLoading] = useState(true);
  const [shipments, setShipments] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [processingId, setProcessingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchErpShipments();
      if (res.success) {
        setShipments(res.data);
        if (res.data.length > 0 && !selectedShipment) {
          setSelectedShipment(res.data[0]);
        }
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

  const handleReceiveShipment = async (id) => {
    if (!window.confirm('¿Confirmar recepción física de este embarque en Depósito General? El stock pasará a Físico Real y los pedidos reservados se marcarán listos para empaque.')) {
      return;
    }

    setProcessingId(id);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await receiveShipment(id);
      if (res.success) {
        setSuccessMessage(res.message);
        await loadData();
      } else {
        setErrorMessage(res.error || 'Error al recibir embarque');
      }
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Ship className="w-4 h-4" /> Módulo de Importaciones & Mercadería en Tránsito
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Embarques, Contenedores y Preventas
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Control exacto de mercadería en altamar y viaje. Tomá preventas para clientes mayoristas con fecha estimada de arribo (ETA) sin alterar el stock físico real.
          </p>
        </div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-xl text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: List of Shipments */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex justify-between items-center">
            <span>Listado de Embarques ({shipments.length})</span>
          </div>

          {shipments.map((sh) => {
            const isSelected = selectedShipment?.id === sh.id;
            const isReceived = sh.status === 'RECEIVED';

            return (
              <div
                key={sh.id}
                onClick={() => setSelectedShipment(sh)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-sky-50/80 dark:bg-sky-950/40 border-sky-500 shadow-md ring-2 ring-sky-400/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-slate-900 dark:text-white">
                    {sh.shipmentNumber}
                  </span>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-extrabold uppercase ${
                      isReceived
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 animate-pulse'
                    }`}
                  >
                    {isReceived ? '✓ Recibido en Depósito' : '🚢 En Tránsito'}
                  </span>
                </div>

                <div className="mt-2 text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                  <span className="font-semibold">Contenedor:</span>
                  <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                    {sh.containerNumber || 'No especificado'}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-500">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Arribo Estimado</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      {new Date(sh.etaDate).toLocaleDateString('es-AR')}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">Total Carga</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                      <Package className="w-3.5 h-3.5 text-sky-600" />
                      {sh.totalUnitsExpected} pares
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{sh.totalPreorderedUnits} pares ya reservados en preventa</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Shipment Detail & Action */}
        {selectedShipment && (
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                      {selectedShipment.shipmentNumber}
                    </h2>
                    <span className="text-xs px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-slate-700 dark:text-slate-300">
                      {selectedShipment.containerNumber}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Origen: <strong>{selectedShipment.origin}</strong> • ETA Arribo: <strong>{new Date(selectedShipment.etaDate).toLocaleDateString('es-AR')}</strong>
                  </p>
                </div>

                {selectedShipment.status !== 'RECEIVED' ? (
                  <button
                    onClick={() => handleReceiveShipment(selectedShipment.id)}
                    disabled={processingId === selectedShipment.id}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {processingId === selectedShipment.id ? 'Procesando...' : 'Confirmar Recepción de Embarque'}
                  </button>
                ) : (
                  <span className="px-4 py-2 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Mercadería ingresada al stock físico
                  </span>
                )}
              </div>

              {/* Informational Callout */}
              <div className="my-4 p-4 bg-sky-50/70 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-900 text-xs text-sky-900 dark:text-sky-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-sky-800 dark:text-sky-300">
                  <Sparkles className="w-4 h-4" /> ¿Cómo funciona la recepción automática de importación?
                </div>
                <p>
                  Al hacer clic en <strong>Confirmar Recepción</strong>, los <strong>{selectedShipment.totalUnitsExpected} pares</strong> se traspasan instantáneamente a <strong>Stock Físico Real en Depósito General</strong>, y los <strong>{selectedShipment.preordersCount} pedidos de preventa</strong> asociados cambian automáticamente su estado a <em>"Listo para Despacho"</em> para que los operarios comiencen el embalaje sin demoras.
                </p>
              </div>

              {/* Items Breakdown Table */}
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
                  Detalle de Calzado en este Contenedor ({selectedShipment.items.length} variantes)
                </h3>
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="p-3">Marca / Modelo</th>
                        <th className="p-3">Color</th>
                        <th className="p-3">Talle</th>
                        <th className="p-3 text-right">Pares en Embarque</th>
                        <th className="p-3 text-right">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                      {selectedShipment.items.map((it) => (
                        <tr key={it.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="p-3">
                            <span className="font-extrabold text-sky-600">{it.brand}</span> {it.sku} - {it.productTitle}
                          </td>
                          <td className="p-3">{it.color}</td>
                          <td className="p-3 font-mono font-bold">{it.size}</td>
                          <td className="p-3 text-right font-black">{it.quantityExpected}</td>
                          <td className="p-3 text-right">
                            {selectedShipment.status === 'RECEIVED' ? (
                              <span className="text-emerald-600 font-semibold">✓ Ingresado</span>
                            ) : (
                              <span className="text-sky-600 font-semibold">En tránsito</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Preorders Linked */}
              {selectedShipment.preorders && selectedShipment.preorders.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-3 flex items-center gap-1.5">
                    <Users className="w-4 h-4" /> Preventas Mayoristas Asignadas a este Embarque ({selectedShipment.preorders.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedShipment.preorders.map((po, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {po.customerName}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">
                            Pedido #{po.orderNumber}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-amber-800 dark:text-amber-300">
                            {po.quantity} pares
                          </span>
                          <span className="block text-[10px] text-slate-500 uppercase font-semibold">
                            {po.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
