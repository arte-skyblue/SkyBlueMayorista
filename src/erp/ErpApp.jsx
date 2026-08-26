import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Package,
  Layers,
  Building2,
  Clock,
  Globe,
  PlusCircle,
  Menu,
  X,
  Store,
  Sparkles,
  Search,
  Users,
  Factory,
  Tag,
  Truck,
  Command,
  ChevronRight,
  ExternalLink,
  DollarSign,
  RefreshCw,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

import { DashboardView } from './views/DashboardView';
import { ProductsCatalogView } from './views/ProductsCatalogView';
import { StockWarehouseView } from './views/StockWarehouseView';
import { OrdersKanbanView } from './views/OrdersKanbanView';
import CustomersView from './views/CustomersView';
import ProductionWorkshopsView from './views/ProductionWorkshopsView';
import PriceListsView from './views/PriceListsView';
import { WebSyncManager } from './views/WebSyncManager';
import { TransportsLogisticsView } from './views/TransportsLogisticsView';
import EcommerceOmnichannelView from './views/EcommerceOmnichannelView';
import { OmnibarCommandMenu } from './components/OmnibarCommandMenu';
import { fetchStockSummary, fetchErpCustomers } from './erpClient';

export function ErpApp({ onExitToWeb }) {
  const [activeCompany, setActiveCompany] = useState('DANIEL ALEJANDRO GRASSO');
  const [activeStore, setActiveStore] = useState('DEP_GRAL_SHOWROOM');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [omnibarOpen, setOmnibarOpen] = useState(false);
  const [hudData, setHudData] = useState({
    showroomStock: 68946,
    outletStock: 44538,
    debtorsTotal: 0
  });

  // Load HUD stats
  useEffect(() => {
    async function loadHud() {
      try {
        const [stRes, cRes] = await Promise.all([
          fetchStockSummary(),
          fetchErpCustomers()
        ]);

        let showroom = 68946;
        let outlet = 44538;
        if (stRes.success && Array.isArray(stRes.data)) {
          const dep = stRes.data.find(w => w.code === 'DEP_GRAL_SHOWROOM');
          const out = stRes.data.find(w => w.code === 'OUTLET_TAPIALES');
          if (dep) showroom = dep.availableNowPares || dep.physicalStock || 68946;
          if (out) outlet = out.availableNowPares || out.physicalStock || 44538;
        }

        let debtors = 0;
        if (cRes.success && Array.isArray(cRes.data)) {
          debtors = cRes.data.reduce((acc, c) => acc + (c.currentBalance > 0 ? c.currentBalance : 0), 0);
        }

        setHudData({ showroomStock: showroom, outletStock: outlet, debtorsTotal: debtors });
      } catch (e) {
        console.error(e);
      }
    }
    loadHud();
  }, [activeTab]);

  // Global Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOmnibarOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Panel General', icon: LayoutDashboard },
    { id: 'products', label: 'Catálogo & Matriz 360°', icon: Layers, badge: '3.264 Artículos' },
    { id: 'stock-warehouses', label: 'Control Multi-Depósito', icon: Building2, badge: '4 Sucursales' },
    { id: 'orders-kanban', label: 'Pedidos & WhatsApp', icon: Clock },
    { id: 'customers', label: 'Clientes & Cuentas Ctes.', icon: Users, badge: '53 Reales' },
    { id: 'transports', label: 'Transportes & Despachos', icon: Truck, badge: '56 Expresos' },
    { id: 'production', label: 'Producción & Talleres (MRP)', icon: Factory, badge: 'Destajo' },
    { id: 'ecommerce', label: 'E-Commerce Omnicanal', icon: Globe, badge: 'Tiendanube/MLA' },
    { id: 'price-lists', label: '10 Listas de Precios', icon: Tag },
    { id: 'web-sync', label: 'Sincronizador Web', icon: RefreshCw }
  ];

  const handleNavigate = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col selection:bg-sky-500 selection:text-white">
      {/* Top Executive Header Bar (Light Mode) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavigate('dashboard')}>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-sky-500/20">
              SB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-slate-900">
                  SKY BLUE <span className="text-sky-600">ERP</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-black px-2 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-md">
                  v3.0 Executive
                </span>
              </div>
            </div>
          </div>

          {/* Multi-Company & Branch Selector (Light Mode) */}
          <div className="hidden xl:flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
            <select
              value={activeCompany}
              onChange={(e) => setActiveCompany(e.target.value)}
              className="bg-slate-50 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 outline-none focus:border-sky-500 shadow-2xs"
            >
              <option value="DANIEL ALEJANDRO GRASSO">🏢 DANIEL GRASSO (SkyBlue)</option>
              <option value="GATICAR S.R.L.">🏢 GATICAR S.R.L.</option>
            </select>

            <select
              value={activeStore}
              onChange={(e) => setActiveStore(e.target.value)}
              className="bg-sky-50 text-sky-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-sky-200 hover:border-sky-300 outline-none focus:border-sky-500 shadow-2xs"
            >
              <option value="DEP_GRAL_SHOWROOM">📍 Showroom Tapiales (General)</option>
              <option value="OUTLET_TAPIALES">📍 Outlet Curapaligue 1428 (Web)</option>
              <option value="SBW_CANNING">📍 SBW Canning</option>
              <option value="DEP_CANUELAS">📍 SkyBlue Cañuelas</option>
            </select>
          </div>
        </div>

        {/* Center Omnibar Search Button */}
        <button
          onClick={() => setOmnibarOpen(true)}
          className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-xs text-slate-500 transition-all w-80 justify-between shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-sky-600" />
            <span className="font-medium">Buscar calzado, cliente o comando...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded-md bg-white text-[10px] font-mono text-slate-600 border border-slate-200 shadow-2xs">
            Ctrl+K
          </kbd>
        </button>

        {/* Right HUD Quick Stats & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Showroom Stock Chip */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-500 font-medium">Showroom:</span>
            <strong className="text-slate-900 font-mono font-bold">{hudData.showroomStock.toLocaleString('es-AR')}p</strong>
          </div>

          {/* Outlet Stock Chip */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-xl text-xs">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-purple-700 font-medium">Outlet (Web):</span>
            <strong className="text-purple-900 font-mono font-bold">{hudData.outletStock.toLocaleString('es-AR')}p</strong>
          </div>

          {/* Tienda Web Button */}
          {onExitToWeb && (
            <button
              onClick={onExitToWeb}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 shadow-2xs"
              title="Volver a la Web Mayorista"
            >
              <Store className="w-3.5 h-3.5 text-sky-600" />
              <span className="hidden sm:inline">Tienda Web</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Body with Collapsible Sidebar + Content */}
      <div className="flex flex-1 relative">
        {/* Sidebar (Light Mode) */}
        <aside
          className={`fixed md:sticky top-[53px] left-0 h-[calc(100vh-53px)] w-64 bg-white border-r border-slate-200 z-30 transition-transform duration-300 p-3 space-y-2 flex flex-col justify-between overflow-y-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-2">
              Módulos del Sistema
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 font-black'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-black shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Multi-Warehouse Status Widget (Light Mode) */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] space-y-2 text-slate-600">
            <div className="font-extrabold text-slate-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sky-600" />
                4 Sucursales Activas:
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="text-slate-700 font-medium">📍 Showroom Tapiales (Mayorista)</div>
              <div className="text-purple-700 font-medium">📍 Outlet Curapaligue 1428 (Web)</div>
              <div className="text-slate-500">📍 SBW Canning & Cañuelas</div>
            </div>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-2xs z-20 md:hidden"
          />
        )}

        {/* Content Area (Light Mode) */}
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <DashboardView onNavigate={handleNavigate} onOpenOmnibar={() => setOmnibarOpen(true)} />}
          {activeTab === 'products' && <ProductsCatalogView onNavigate={handleNavigate} onOpenOmnibar={() => setOmnibarOpen(true)} />}
          {activeTab === 'stock-warehouses' && <StockWarehouseView />}
          {activeTab === 'orders-kanban' && <OrdersKanbanView />}
          {activeTab === 'customers' && <CustomersView />}
          {activeTab === 'transports' && <TransportsLogisticsView />}
          {activeTab === 'production' && <ProductionWorkshopsView />}
          {activeTab === 'ecommerce' && <EcommerceOmnichannelView />}
          {activeTab === 'price-lists' && <PriceListsView />}
          {activeTab === 'web-sync' && <WebSyncManager />}
        </main>
      </div>

      {/* Global Omnibar Command Menu (Ctrl+K) */}
      <OmnibarCommandMenu
        isOpen={omnibarOpen}
        onClose={() => setOmnibarOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
