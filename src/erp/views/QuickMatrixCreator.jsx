import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  Layers,
  Calculator,
  ArrowLeft
} from 'lucide-react';
import { fetchErpMeta, createProductMatrix } from '../erpClient';

export function QuickMatrixCreator({ onNavigate }) {
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Form states
  const [sku, setSku] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brandId, setBrandId] = useState('');
  const [seasonId, setSeasonId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productTypeId, setProductTypeId] = useState('');
  const [priceCost, setPriceCost] = useState(15000);
  const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80');

  // Matrix Colors & Sizes
  const [colors, setColors] = useState([
    {
      colorName: 'Negro',
      hexCode: '#000000',
      sizesStock: { '35': 12, '36': 24, '37': 36, '38': 36, '39': 24, '40': 12 },
      sizesInTransit: { '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0 }
    }
  ]);

  useEffect(() => {
    fetchErpMeta().then((res) => {
      if (res.success) {
        setMeta(res.data);
        if (res.data.brands?.[0]) setBrandId(res.data.brands[0].id);
        if (res.data.seasons?.[0]) setSeasonId(res.data.seasons[0].id);
        if (res.data.categories?.[0]) setCategoryId(res.data.categories[0].id);
        if (res.data.productTypes?.[0]) setProductTypeId(res.data.productTypes[0].id);
      }
      setLoading(false);
    });
  }, []);

  const selectedType = meta?.productTypes?.find((pt) => pt.id === Number(productTypeId));
  const sizes = selectedType ? selectedType.sizesList.split(',').map((s) => s.trim()) : ['35', '36', '37', '38', '39', '40'];

  const addColorRow = () => {
    const defaultStock = {};
    const defaultInTransit = {};
    sizes.forEach((s) => {
      defaultStock[s] = 12;
      defaultInTransit[s] = 0;
    });
    setColors([...colors, { colorName: 'Nuevo Color', hexCode: '#E8D0BA', sizesStock: defaultStock, sizesInTransit: defaultInTransit }]);
  };

  const removeColorRow = (idx) => {
    if (colors.length <= 1) return;
    setColors(colors.filter((_, i) => i !== idx));
  };

  const updateColorName = (idx, val) => {
    const updated = [...colors];
    updated[idx].colorName = val;
    setColors(updated);
  };

  const updateColorHex = (idx, val) => {
    const updated = [...colors];
    updated[idx].hexCode = val;
    setColors(updated);
  };

  const updateSizeStock = (colorIdx, sizeNum, val) => {
    const updated = [...colors];
    if (!updated[colorIdx].sizesStock) updated[colorIdx].sizesStock = {};
    updated[colorIdx].sizesStock[sizeNum] = Number(val) || 0;
    setColors(updated);
  };

  const updateSizeInTransit = (colorIdx, sizeNum, val) => {
    const updated = [...colors];
    if (!updated[colorIdx].sizesInTransit) updated[colorIdx].sizesInTransit = {};
    updated[colorIdx].sizesInTransit[sizeNum] = Number(val) || 0;
    setColors(updated);
  };

  // Price calculations live
  const wholesalePrice = Math.round((Number(priceCost) || 0) * 1.5);
  const publicPrice = Math.round((Number(priceCost) || 0) * 2.0);
  const mlPrice = Math.round((Number(priceCost) || 0) * 2.5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sku || !title) {
      setError('Por favor completá el SKU / Código y el Título del modelo.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    // Format payload
    const formattedColors = colors.map((c) => ({
      colorName: c.colorName,
      hexCode: c.hexCode,
      sizes: sizes.map((s) => ({
        sizeNumber: s,
        initialStockGral: c.sizesStock?.[s] || 0,
        initialStockOutlet: Math.floor((c.sizesStock?.[s] || 0) * 0.4),
        inTransit: c.sizesInTransit?.[s] || 0
      }))
    }));

    const payload = {
      sku,
      title,
      description,
      brandId: Number(brandId),
      seasonId: Number(seasonId),
      categoryId: Number(categoryId),
      productTypeId: Number(productTypeId),
      priceCost: Number(priceCost) || 0,
      mainImage,
      colors: formattedColors
    };

    try {
      const res = await createProductMatrix(payload);
      if (res.success) {
        setSuccess(`¡Modelo ${sku} cargado con éxito con todas sus variantes y precios!`);
        setTimeout(() => {
          onNavigate('products');
        }, 1200);
      } else {
        setError(res.error || 'Error al guardar el modelo');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 text-sm">Cargando catálogo maestro...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('products')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Carga Ultra-Rápida en 1 Sola Pantalla
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Cargar Nuevo Modelo de Calzado (Matriz)
            </h1>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-lg shadow-sky-600/30 transition-all hover:scale-105"
        >
          <Save className="w-4 h-4" />
          {submitting ? 'Guardando...' : 'Guardar y Publicar Modelo'}
        </button>
      </div>

      {/* Alerts */}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          {error}
        </div>
      )}

      {/* Form Grid */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Info */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-black">1</span>
            Información del Modelo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Código / SKU *
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="ej: PJ-9940"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white uppercase focus:ring-2 focus:ring-sky-500 outline-none"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nombre / Título Comercial *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ej: Sandalia Taco Medio Scarlett"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Marca *
              </label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
              >
                {meta?.brands?.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Temporada
              </label>
              <select
                value={seasonId}
                onChange={(e) => setSeasonId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
              >
                {meta?.seasons?.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Categoría / Rubro
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
              >
                {meta?.categories?.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Curva de Talles
              </label>
              <select
                value={productTypeId}
                onChange={(e) => setProductTypeId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
              >
                {meta?.productTypes?.map((pt) => (
                  <option key={pt.id} value={pt.id}>{pt.name} ({pt.sizesList})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Live Price Automation */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-black">2</span>
            Costo y Cálculo Automático de las 10 Listas de Precios
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
            <div>
              <label className="block text-xs font-extrabold text-sky-700 dark:text-sky-300 mb-1">
                Costo Base de Adquisición ($) *
              </label>
              <input
                type="number"
                value={priceCost}
                onChange={(e) => setPriceCost(e.target.value)}
                className="w-full px-3 py-2.5 bg-sky-50/60 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 rounded-xl text-base font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-[11px] font-bold text-slate-500 uppercase">1. Mayorista (+50%)</span>
              <span className="text-lg font-black text-emerald-600">${wholesalePrice.toLocaleString('es-AR')}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-[11px] font-bold text-slate-500 uppercase">2. Público (+100%)</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">${publicPrice.toLocaleString('es-AR')}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="block text-[11px] font-bold text-slate-500 uppercase">3. Mercado Libre (+150%)</span>
              <span className="text-lg font-black text-purple-600">${mlPrice.toLocaleString('es-AR')}</span>
            </div>
          </div>
        </div>

        {/* Step 3: Interactive Colors & Sizes Grid */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-black">3</span>
              Matriz de Variantes (Colores $\times$ Curva de Talles)
            </h2>
            <button
              type="button"
              onClick={addColorRow}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar Color
            </button>
          </div>

          <div className="space-y-4">
            {colors.map((c, cIdx) => (
              <div key={cIdx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={c.hexCode}
                      onChange={(e) => updateColorHex(cIdx, e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={c.colorName}
                      onChange={(e) => updateColorName(cIdx, e.target.value)}
                      placeholder="Nombre del Color (ej: Nude, Negro, Camel)"
                      className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                  {colors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeColorRow(cIdx)}
                      className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sizes Row for this Color */}
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-500 mb-1.5 block">
                    Stock Inicial por Talle (Depósito General Showroom):
                  </span>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                    {sizes.map((sNum) => (
                      <div key={sNum} className="text-center bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                        <span className="block text-[10px] font-bold text-slate-400 mb-1">Talle {sNum}</span>
                        <input
                          type="number"
                          value={c.sizesStock?.[sNum] ?? 12}
                          onChange={(e) => updateSizeStock(cIdx, sNum, e.target.value)}
                          className="w-full text-center text-xs font-extrabold bg-slate-50 dark:bg-slate-800 rounded py-1 border border-slate-200 dark:border-slate-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
