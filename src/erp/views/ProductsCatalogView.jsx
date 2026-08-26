import React, { useState, useEffect } from 'react';
import {
  Search,
  Layers,
  ChevronLeft,
  ChevronRight,
  Filter,
  Eye,
  Download,
  CheckCircle2,
  RefreshCw,
  SlidersHorizontal,
  Package,
  Boxes,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { fetchErpProducts, fetchErpMeta } from '../erpClient';
import { ProductDetailDrawer } from '../components/ProductDetailDrawer';

export function ProductsCatalogView({ onNavigate, onOpenOmnibar }) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 40, totalCount: 3264, totalPages: 82 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [meta, setMeta] = useState({ brands: [], categories: [] });
  const [page, setPage] = useState(1);
  const [selectedProductForDrawer, setSelectedProductForDrawer] = useState(null);

  // Load Meta (Brands & Categories) on mount
  useEffect(() => {
    async function loadMeta() {
      const res = await fetchErpMeta();
      if (res.success && res.data) {
        setMeta(res.data);
      }
    }
    loadMeta();
  }, []);

  // Load paginated products with debounce on search
  const loadProducts = async (targetPage = 1) => {
    setLoading(true);
    try {
      const params = {
        page: targetPage,
        limit: 40,
        search: search.trim(),
        brandId: selectedBrand !== 'ALL' ? selectedBrand : undefined,
        categoryId: selectedCategory !== 'ALL' ? selectedCategory : undefined
      };

      const res = await fetchErpProducts(params);
      if (res.success) {
        setProducts(res.data || []);
        if (res.pagination) {
          setPagination(res.pagination);
          setPage(res.pagination.page);
        }
      }
    } catch (e) {
      console.error('Error fetching catalog data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts(1);
    }, 250);
    return () => clearTimeout(timer);
  }, [search, selectedBrand, selectedCategory]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
      loadProducts(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card (Light Mode) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shadow-xs">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Catálogo Maestro & Precios</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-sky-50 text-sky-700 border border-sky-200">
                {pagination.totalCount?.toLocaleString('es-AR')} Artículos
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Catálogo oficial con nomenclatura normalizada <strong className="text-slate-800">SKU - Rubro - Color</strong>, 10 listas de precios y stock discriminado por sucursal.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadProducts(page)}
            disabled={loading}
            className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-200 transition-all shadow-2xs"
            title="Refrescar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por SKU (ej: REF175019, 04748), Rubro (Zapatilla, Bota) o Color..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 outline-none font-medium transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Brand Selector */}
          <div className="w-full lg:w-48">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 text-xs font-bold px-3 py-2.5 rounded-2xl border border-slate-200 outline-none focus:border-sky-500 shadow-2xs"
            >
              <option value="ALL">Todas las Marcas</option>
              {(meta.brands || []).map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category / Rubro Selector */}
          <div className="w-full lg:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 text-slate-800 text-xs font-bold px-3 py-2.5 rounded-2xl border border-slate-200 outline-none focus:border-sky-500 shadow-2xs"
            >
              <option value="ALL">Todos los Rubros</option>
              {(meta.categories || []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Data Grid (Light Mode) */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 w-16 text-center">Foto</th>
                <th className="py-3 px-4">Artículo / Nomenclatura Exacta</th>
                <th className="py-3 px-4">Marca & Rubro</th>
                <th className="py-3 px-4 text-right">Costo</th>
                <th className="py-3 px-4 text-right">Lista 2 (Mayorista)</th>
                <th className="py-3 px-4 text-right">Lista 1 (Público)</th>
                <th className="py-3 px-4 text-center">Showroom</th>
                <th className="py-3 px-4 text-center">Outlet Web</th>
                <th className="py-3 px-4 text-center">Stock Total</th>
                <th className="py-3 px-4 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <RefreshCw className="w-6 h-6 animate-spin text-sky-600" />
                      <span className="font-bold">Cargando catálogo ultrarrápido...</span>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-slate-400">
                    No se encontraron productos que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                products.map((p) => {
                  const hasStock = p.totalPhysicalStock > 0;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-sky-50/60 transition-colors cursor-pointer group"
                      onClick={() => setSelectedProductForDrawer(p)}
                    >
                      {/* Photo Thumbnail */}
                      <td className="py-2.5 px-4 text-center">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden mx-auto flex items-center justify-center shadow-2xs">
                          {p.mainImage ? (
                            <img
                              src={p.mainImage}
                              alt={p.sku}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400&auto=format&fit=crop';
                              }}
                            />
                          ) : (
                            <Package className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                      </td>

                      {/* Nomenclature: SKU - Rubro - Color */}
                      <td className="py-2.5 px-4">
                        <div className="font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors text-sm">
                          {p.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                          <span>SKU: {p.sku}</span>
                          <span>•</span>
                          <span>Color: {p.description?.split('-')[1]?.trim() || 'Estándar'}</span>
                        </div>
                      </td>

                      {/* Brand & Rubro */}
                      <td className="py-2.5 px-4">
                        <div className="font-bold text-slate-800">{p.brand}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{p.category}</div>
                      </td>

                      {/* Cost */}
                      <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-500">
                        ${p.priceCost?.toLocaleString('es-AR')}
                      </td>

                      {/* Wholesale Price (Lista 2) */}
                      <td className="py-2.5 px-4 text-right font-mono font-extrabold text-sky-700 text-sm">
                        ${p.wholesalePrice?.toLocaleString('es-AR')}
                      </td>

                      {/* Retail Price (Lista 1) */}
                      <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-700">
                        ${p.retailPrice?.toLocaleString('es-AR')}
                      </td>

                      {/* Stock Showroom */}
                      <td className="py-2.5 px-4 text-center">
                        <span className="font-mono font-bold text-slate-700">
                          {p.depGralStock || 0}p
                        </span>
                      </td>

                      {/* Stock Outlet */}
                      <td className="py-2.5 px-4 text-center">
                        <span className="font-mono font-bold text-purple-700">
                          {p.outletStock || 0}p
                        </span>
                      </td>

                      {/* Total Stock Badge */}
                      <td className="py-2.5 px-4 text-center">
                        <span
                          className={`inline-block font-mono font-black text-xs px-2.5 py-1 rounded-xl border ${
                            hasStock
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-400 border-slate-200'
                          }`}
                        >
                          {p.totalPhysicalStock || 0} pares
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-2.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedProductForDrawer(p)}
                          className="px-3 py-1.5 bg-slate-50 hover:bg-sky-600 hover:text-white text-slate-700 font-bold rounded-xl text-xs border border-slate-200 transition-all flex items-center gap-1.5 mx-auto shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ficha 360°</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar (Light Mode) */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 font-medium">
            Mostrando página <strong className="text-slate-900">{pagination.page}</strong> de{' '}
            <strong className="text-slate-900">{pagination.totalPages}</strong> (
            {pagination.totalCount?.toLocaleString('es-AR')} artículos totales)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 disabled:opacity-40 transition-all flex items-center gap-1 shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center gap-1 px-2 font-mono font-bold text-slate-700">
              <span>{pagination.page}</span>
              <span>/</span>
              <span>{pagination.totalPages}</span>
            </div>

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || loading}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 disabled:opacity-40 transition-all flex items-center gap-1 shadow-2xs"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 360° Slide-over Drawer for Product Details */}
      {selectedProductForDrawer && (
        <ProductDetailDrawer
          product={selectedProductForDrawer}
          onClose={() => setSelectedProductForDrawer(null)}
        />
      )}
    </div>
  );
}
