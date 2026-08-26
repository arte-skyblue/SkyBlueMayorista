import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Plus, DollarSign, Phone, MapPin, 
  CreditCard, ArrowUpRight, CheckCircle2, AlertCircle, RefreshCw,
  Building, UserCheck, ChevronRight, X
} from 'lucide-react';
import { fetchErpCustomers, createCustomer } from '../erpClient';

export default function CustomersView() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [onlyDebtors, setOnlyDebtors] = useState(false);
  const [totalDebtors, setTotalDebtors] = useState(0);

  // Detail / New modal states
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newCustForm, setNewCustForm] = useState({
    name: '',
    businessName: '',
    cuit: '',
    customerType: 'Mayorista',
    phone: '',
    address: '',
    city: '',
    creditLimit: '5000000',
    sellerName: 'Juliana'
  });

  const loadCustomers = async () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (typeFilter !== 'ALL') params.customerType = typeFilter;
    if (onlyDebtors) params.onlyDebtors = 'true';

    const res = await fetchErpCustomers(params);
    if (res.success) {
      setCustomers(res.data || []);
      setTotalDebtors(res.totalDebtorsBalance || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, [typeFilter, onlyDebtors]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadCustomers();
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    const res = await createCustomer(newCustForm);
    if (res.success) {
      alert('¡Cliente creado exitosamente!');
      setShowNewModal(false);
      loadCustomers();
    } else {
      alert('Error: ' + res.error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header (Light Mode) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Cuentas Corrientes & Clientes</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-50 text-amber-800 border border-amber-200">
                {customers.length} Clientes Oficiales
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Base de clientes mayoristas sincronizada desde iPN ERP con saldos deudores, CUITs y límites de crédito comercial.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadCustomers}
            className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-200 transition-all flex items-center gap-2 text-xs font-bold shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </button>
          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-2xl shadow-md transition-all flex items-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* KPI Cards (Light Mode) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Clientes Activos</p>
          <p className="text-3xl font-black text-slate-900 mt-1">{customers.length}</p>
          <p className="text-xs text-slate-400 mt-1">Mayoristas, Showroom, Tiendanube y ML</p>
        </div>

        <div className="p-5 bg-white border border-rose-200 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">Saldo Total Deudor Cta. Cte.</p>
          <p className="text-3xl font-black text-rose-600 mt-1">
            ${totalDebtors.toLocaleString('es-AR')}
          </p>
          <p className="text-xs text-rose-500 mt-1">Cobranzas pendientes a liquidar</p>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
          <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">Lista Predeterminada</p>
          <p className="text-2xl font-black text-sky-700 mt-1">Lista 2 - Mayorista</p>
          <p className="text-xs text-slate-400 mt-1">50% markup sobre costo directo</p>
        </div>
      </div>

      {/* Filters Bar (Light Mode) */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-xs">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por Nombre, CUIT, Ciudad, Razón Social..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-all font-medium"
          />
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-500"
          >
            <option value="ALL">Todos los Tipos</option>
            <option value="Mayorista">Mayorista</option>
            <option value="Tiendanube">Tiendanube</option>
            <option value="Mercado Libre">Mercado Libre</option>
            <option value="Franquicia">Franquicia</option>
            <option value="Activo">Activo General</option>
          </select>

          <button
            onClick={() => setOnlyDebtors(!onlyDebtors)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
              onlyDebtors 
                ? 'bg-rose-50 border-rose-300 text-rose-700' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            Solo con Saldo Deudor
          </button>
        </div>
      </div>

      {/* Customers Table (Light Mode) */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                <th className="py-3 px-6">Cliente / Razón Social</th>
                <th className="py-3 px-4">Tipo & Vendedor</th>
                <th className="py-3 px-4">CUIT</th>
                <th className="py-3 px-4">Contacto & Ubicación</th>
                <th className="py-3 px-4 text-right">Límite Crédito</th>
                <th className="py-3 px-6 text-right">Saldo Actual Cta. Cte.</th>
                <th className="py-3 px-4 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-500 mb-2" />
                    Cargando cuentas corrientes...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No se encontraron clientes registrados con ese criterio.
                  </td>
                </tr>
              ) : (
                customers.map((c) => {
                  const isDebtor = c.currentBalance > 0;
                  return (
                    <tr 
                      key={c.id} 
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedCustomer(c)}
                    >
                      <td className="py-3 px-6">
                        <div className="font-extrabold text-slate-900 text-sm">{c.name}</div>
                        {c.businessName && c.businessName !== c.name && (
                          <div className="text-[11px] text-slate-500">{c.businessName}</div>
                        )}
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: #{c.id}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-slate-100 text-slate-700 border border-slate-200">
                          {c.customerType || 'Mayorista'}
                        </span>
                        <div className="text-[11px] text-slate-500 mt-1">Vend: {c.sellerName || 'Juliana'}</div>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-700">
                        {c.cuit ? (
                          <span className="bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-bold text-[11px]">
                            {c.cuit}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Consumidor Final</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-slate-600">
                        {c.phone && (
                          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                            <Phone className="w-3 h-3" />
                            {c.phone}
                          </div>
                        )}
                        {(c.city || c.address) && (
                          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {c.city ? `${c.city}` : c.address}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-medium text-slate-600">
                        ${c.creditLimit?.toLocaleString('es-AR') || '0'}
                      </td>

                      <td className="py-3 px-6 text-right">
                        <span className={`font-mono text-sm font-black px-2.5 py-1 rounded-xl border ${
                          isDebtor 
                            ? 'bg-rose-50 text-rose-700 border-rose-200' 
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                          ${(c.currentBalance || 0).toLocaleString('es-AR')}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomer(c);
                          }}
                          className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 rounded-xl transition-all border border-slate-200 shadow-2xs"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Drawer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xl bg-white border-l border-slate-200 shadow-2xl h-full flex flex-col justify-between overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-black uppercase bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-md">
                    {selectedCustomer.customerType || 'Mayorista'}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-2">{selectedCustomer.name}</h2>
                  <p className="text-xs text-slate-500 font-mono">CUIT: {selectedCustomer.cuit || 'Sin CUIT'}</p>
                </div>
                <button 
                  onClick={() => setSelectedCustomer(null)}
                  className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Financial Status */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">Estado Financiero</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-500">Saldo Deudor:</div>
                    <div className="text-xl font-black font-mono text-rose-600 mt-1">
                      ${(selectedCustomer.currentBalance || 0).toLocaleString('es-AR')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Límite de Crédito:</div>
                    <div className="text-xl font-black font-mono text-slate-900 mt-1">
                      ${(selectedCustomer.creditLimit || 0).toLocaleString('es-AR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedCustomer(null)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl text-xs"
            >
              Cerrar Detalle
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
