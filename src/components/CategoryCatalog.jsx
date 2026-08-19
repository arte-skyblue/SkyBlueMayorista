import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Layers, 
  TrendingUp, 
  MessageCircle, 
  FileText, 
  Lock, 
  ExternalLink, 
  Filter
} from 'lucide-react';
import { CATEGORIES, PRODUCTS_FEATURED, COMPANY_INFO } from '../data/mockData';
import TiltedCard from './reactbits/TiltedCard';

export default function CategoryCatalog({ onOpenModal, onOpenAdvisorModal }) {
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const filterOptions = [
    { id: 'todas', name: 'Todos los Modelos' },
    { id: 'dama', name: 'Calzado Dama' },
    { id: 'caballero', name: 'Caballero' },
    { id: 'ninos', name: 'XTI Kids' },
    { id: 'marroquineria', name: 'Marroquinería' },
    { id: 'accesorios', name: 'Accesorios' },
  ];

  const filteredProducts = selectedCategory === 'todas'
    ? PRODUCTS_FEATURED
    : PRODUCTS_FEATURED.filter((p) => p.category === selectedCategory);

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-extrabold uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4 text-sky-600" />
            <span>Muestrario de Modelos Seleccionados</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Colecciones Mayoristas por Módulos de 8 y 12 Pares
          </h2>

          <p className="text-slate-700 text-base sm:text-lg">
            Presentamos una selección de nuestros modelos más vendidos. Para ver el catálogo completo de +300 artículos con precios mayoristas, ingresá con tu cuenta en <span className="font-bold text-sky-700">mayoristas.skyblue.com.ar</span>.
          </p>
        </div>

        {/* 5 Main Category Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-12">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer group p-3.5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                selectedCategory === cat.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xl shadow-sky-600/20 scale-[1.02]'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-sky-300 hover:shadow-md'
              }`}
            >
              <div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2.5 relative bg-slate-100">
                  <img
                    src={cat.image}
                    alt={`Categoría mayorista ${cat.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className={`absolute top-2 right-2 text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                    selectedCategory === cat.id ? 'bg-white text-sky-800' : 'bg-slate-950/80 text-white'
                  }`}>
                    {cat.itemCount}
                  </span>
                </div>

                <h3 className="font-black text-xs sm:text-sm leading-tight mb-1">
                  {cat.name}
                </h3>
              </div>

              <div className="pt-1.5">
                <span className={`text-[10px] font-semibold block ${
                  selectedCategory === cat.id ? 'text-sky-100' : 'text-slate-700'
                }`}>
                  {cat.moduleInfo}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Navigation Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-700" />
            <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
              Filtrar por Categoría:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedCategory(opt.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === opt.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Columns Products Grid on Desktop with React Bits TiltedCard */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredProducts.map((product) => (
            <TiltedCard key={product.id} maxTilt={8} scale={1.01} className="h-full">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col justify-between h-full">
                {/* Product Top */}
                <div>
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.altText}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Brand Tag */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                      <span className="bg-slate-950/90 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">
                        {product.brand}
                      </span>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-2 right-2 bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow">
                      {product.badge}
                    </div>
                  </div>

                  {/* Info Content */}
                  <div className="p-3 space-y-2">
                    <h4 className="font-bold text-xs text-slate-900 group-hover:text-sky-600 transition-colors leading-snug line-clamp-2">
                      {product.name}
                    </h4>

                    {/* Specs */}
                    <div className="space-y-1 text-[10px]">
                      <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 flex items-center justify-between">
                        <span className="font-semibold text-slate-700">Módulo:</span>
                        <span className="font-bold text-slate-900">{product.module.replace('Módulo ', '')}</span>
                      </div>

                      <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 flex items-center justify-between">
                        <span className="font-semibold text-emerald-800">Rentabilidad:</span>
                        <span className="font-black text-emerald-700">{product.profitMargin}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="p-3 pt-0">
                  <a
                    href={`https://wa.me/5491138916779?text=${encodeURIComponent(`Hola Juliana! Quiero consultar disponibilidad del módulo de: ${product.name} (${product.brand}) para mi local.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-2.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white font-bold text-[10px] sm:text-xs transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm"
                    title="Consultar por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Consultar Módulo</span>
                  </a>
                </div>

              </div>
            </TiltedCard>
          ))}
        </div>

        {/* B2B Private Platform CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase">
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso Exclusivo a Precios Mayoristas</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black">
              ¿Querés ver el catálogo con todos los precios de fábrica?
            </h4>
            <p className="text-sky-100 text-xs sm:text-sm max-w-xl">
              Ingresá a <span className="font-bold underline">mayoristas.skyblue.com.ar</span> y solicitá tu cuenta comercial con CUIT para acceder a toda la lista de precios y stock en tiempo real.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={COMPANY_INFO.b2bPlatformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-all"
            >
              <span>Ir a mayoristas.skyblue.com.ar</span>
              <ExternalLink className="w-4 h-4 text-amber-400" />
            </a>

            <button
              onClick={() => onOpenModal('catalogo')}
              className="px-5 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Pedir PDF por WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
