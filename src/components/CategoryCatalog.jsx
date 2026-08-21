import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ExternalLink, 
  Lock, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  Check, 
  Filter 
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, COMPANY_INFO } from '../data/mockData';
import TiltedCard from './reactbits/TiltedCard';

export default function CategoryCatalog({ onOpenModal, onOpenAdvisorModal }) {
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const filterTabs = [
    { id: 'todas', name: 'Todos los Modelos' },
    { id: 'dama', name: 'Calzado Dama' },
    { id: 'caballero', name: 'Caballero' },
    { id: 'ninos', name: 'XTI Kids' },
    { id: 'marroquineria', name: 'Marroquinería' },
    { id: 'accesorios', name: 'Accesorios' }
  ];

  const filteredProducts = selectedCategory === 'todas'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="catalogo" className="py-16 sm:py-24 2xl:py-28 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-12 2xl:mb-16">
          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-neutral-400 mr-2">TIPOS DE</span>
            <span className="font-sf-bold text-white">PRODUCTO</span>
          </h2>

          <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Modelos de alta rotación comercial con stock permanente y despacho inmediato por curva cerrada.
          </p>

          {/* Micro Commercial Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-white text-xs font-sf-bold">
              ✓ Precios Netos sin IVA (Factura A/B)
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-sf-bold">
              ✓ Curvas Ideales de Fábrica
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-sf-bold">
              ✓ Envío 100% Gratis en CABA/GBA
            </span>
          </div>
        </div>

        {/* 5 Main Category Bento Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer group p-3.5 sm:p-4 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white border-primary shadow-xl shadow-primary/25 scale-[1.02]'
                  : 'bg-neutral-900/90 text-neutral-200 border-neutral-800 hover:border-primary/40 hover:shadow-lg'
              }`}
            >
              <div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 relative bg-neutral-950">
                  <img
                    src={cat.image}
                    alt={`Categoría mayorista ${cat.name}`}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className={`absolute top-2.5 right-2.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-md backdrop-blur-md shadow-xs ${
                    selectedCategory === cat.id ? 'bg-white text-primary font-black' : 'bg-neutral-950/80 text-white'
                  }`}>
                    {cat.itemCount}
                  </span>
                </div>

                <h3 className="font-sf-bold text-sm 2xl:text-base leading-tight mb-1 text-white">
                  {cat.name}
                </h3>
              </div>

              <div className="pt-2">
                <span className={`text-[11px] font-sf-medium block ${
                  selectedCategory === cat.id ? 'text-white/90' : 'text-neutral-400'
                }`}>
                  {cat.moduleInfo}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 gap-1.5 shadow-lg">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-sf-bold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid (6 columns desktop, 3 iPad, 2 iPhone) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {filteredProducts.map((product) => (
            <TiltedCard key={product.id} maxTilt={8} scale={1.03} glare={true} className="h-full">
              <div className="h-full rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-primary/40 p-3 flex flex-col justify-between transition-all duration-300 group shadow-lg">
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden bg-neutral-950 mb-3 relative">
                    <img
                      src={product.image}
                      alt={`Zapato mayorista modelo ${product.name}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 text-[9px] font-black uppercase px-2 py-0.5 rounded bg-primary text-white shadow-xs">
                      {product.brand}
                    </span>
                  </div>

                  <h4 className="font-sf-bold text-xs sm:text-sm text-white line-clamp-1 mb-1">
                    {product.name}
                  </h4>

                  <span className="text-[11px] text-neutral-400 block mb-2 font-sf-regular">
                    Módulo: {product.module}
                  </span>
                </div>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-xs font-sf-bold text-emerald-400">
                    {product.markup}
                  </span>
                  <button
                    onClick={() => onOpenModal(product.brand.toLowerCase())}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-primary text-white transition-colors"
                    aria-label="Ver Catálogo"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>

      </div>
    </section>
  );
}
