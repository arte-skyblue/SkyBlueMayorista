import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Layers,
  Users,
  Truck,
  Building2,
  Tag,
  ArrowRight,
  Command,
  X,
  PlusCircle,
  Clock,
  Sparkles,
  Factory,
  Globe
} from 'lucide-react';
import { fetchErpProducts, fetchErpCustomers, fetchErpTransports } from '../erpClient';

export function OmnibarCommandMenu({ isOpen, onClose, onNavigate, onSelectProduct }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !query.trim()) {
      setProducts([]);
      setCustomers([]);
      setTransports([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const [pRes, cRes, tRes] = await Promise.all([
          fetchErpProducts({ search: query.trim(), limit: 8 }),
          fetchErpCustomers({ search: query.trim() }),
          fetchErpTransports()
        ]);

        if (pRes.success) setProducts((pRes.data || []).slice(0, 8));
        if (cRes.success) setCustomers((cRes.data || []).slice(0, 4));
        if (tRes.success) {
          const q = query.toLowerCase();
          setTransports(
            (tRes.data || [])
              .filter(t => t.name.toLowerCase().includes(q) || (t.code && t.code.toLowerCase().includes(q)))
              .slice(0, 4)
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  if (!isOpen) return null;

  const quickActions = [
    { id: 'act-products', label: 'Catálogo Maestro & 10 Listas', icon: Layers, tab: 'products' },
    { id: 'act-warehouses', label: 'Control Multi-Depósito', icon: Building2, tab: 'stock-warehouses' },
    { id: 'act-orders', label: 'Tablero de Pedidos & WhatsApp', icon: Clock, tab: 'orders-kanban' },
    { id: 'act-customers', label: 'Clientes & Cuentas Corrientes', icon: Users, tab: 'customers' },
    { id: 'act-transports', label: 'Directorio de 56 Transportes', icon: Truck, tab: 'transports' },
    { id: 'act-production', label: 'Producción & Talleres (MRP)', icon: Factory, tab: 'production' },
    { id: 'act-ecommerce', label: 'E-Commerce Omnicanal', icon: Globe, tab: 'ecommerce' }
  ];

  const handleAction = (tab) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar (Light Mode) */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-sky-600 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por SKU (ej: REF175019, 04748), cliente, transporte o acción..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-[10px] font-mono text-slate-500 shadow-2xs">
            ESC
          </kbd>
        </div>

        {/* Results Body (Light Mode) */}
        <div className="max-h-[420px] overflow-y-auto p-4 space-y-4 text-xs bg-white">
          {/* Quick Actions (when no query) */}
          {!query && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 py-1">
                Accesos Directos
              </div>
              {quickActions.map((act) => {
                const Icon = act.icon;
                return (
                  <div
                    key={act.id}
                    onClick={() => handleAction(act.tab)}
                    className="p-2.5 rounded-xl flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-800">{act.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                );
              })}
            </div>
          )}

          {/* Products Results */}
          {products.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-black uppercase tracking-wider text-sky-700 px-2 py-1 flex items-center justify-between">
                <span>Calzados ({products.length})</span>
                <span>Enter para ver</span>
              </div>
              {products.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onNavigate('products');
                    onClose();
                  }}
                  className="p-2 rounded-xl flex items-center justify-between hover:bg-sky-50/70 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.mainImage}
                      alt={p.sku}
                      className="w-9 h-9 object-cover rounded-lg bg-slate-100 border border-slate-200 shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400&auto=format&fit=crop';
                      }}
                    />
                    <div>
                      <div className="font-extrabold text-slate-900">{p.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        SKU: {p.sku} • {p.brand} • ${p.wholesalePrice?.toLocaleString('es-AR')}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
                    {p.totalPhysicalStock || 0}p
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Customers Results */}
          {customers.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 px-2 py-1">
                Clientes Mayoristas ({customers.length})
              </div>
              {customers.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onNavigate('customers');
                    onClose();
                  }}
                  className="p-2.5 rounded-xl flex items-center justify-between hover:bg-amber-50/70 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
                      {c.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">CUIT: {c.cuit || 'S/D'}</div>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-700">
                    ${c.currentBalance?.toLocaleString('es-AR') || 0}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
