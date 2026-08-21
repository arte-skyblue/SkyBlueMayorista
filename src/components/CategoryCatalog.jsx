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
    <section id="catalogo" className="py-16 sm:py-24 2xl:py-28 bg-background border-b border-border">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-12 2xl:mb-16">
          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-muted-foreground mr-2">TIPOS DE</span>
            <span className="font-sf-bold text-foreground">PRODUCTO</span>
          </h2>

          <p className="font-sf-medium text-muted-foreground text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Modelos de alta rotación comercial con stock permanente y despacho inmediato por curva cerrada.
          </p>

          {/* Micro Commercial Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-sf-bold">
              ✓ Precios Netos sin IVA (Factura A/B)
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-sf-bold">
              ✓ Curvas Ideales de Fábrica
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-sf-bold">
              ✓ Envío 100% Gratis en CABA/GBA
            </span>
          </div>
        </div>

        {/* 5 Main Category Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer group p-3.5 sm:p-4 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/25 scale-[1.02]'
                  : 'bg-card text-card-foreground border-border hover:border-primary/40 hover:shadow-lg'
              }`}
            >
              <div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-3 relative bg-muted">
                  <img
                    src={cat.image}
                    alt={`Categoría mayorista ${cat.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className={`absolute top-2.5 right-2.5 text-[9px] font-black uppercase px-2 py-0.5 rounded-md backdrop-blur-md shadow-xs ${
                    selectedCategory === cat.id ? 'bg-card text-primary font-black' : 'bg-foreground/80 text-background'
                  }`}>
                    {cat.itemCount}
                  </span>
                </div>

                <h3 className="font-sf-bold text-sm 2xl:text-base leading-tight mb-1">
                  {cat.name}
                </h3>
              </div>

              <div className="pt-2">
                <span className={`text-[11px] font-sf-medium block ${
                  selectedCategory === cat.id ? 'text-primary-foreground/90' : 'text-muted-foreground'
                }`}>
                  {cat.moduleInfo}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-xs font-sf-bold uppercase text-foreground tracking-wider">
              Filtrar Catálogo:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-sf-medium transition-colors z-10 ${
                    isSelected
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground bg-card border border-border hover:bg-muted'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-catalog-filter"
                      className="absolute inset-0 bg-primary rounded-xl shadow-md shadow-primary/25 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <TiltedCard maxTilt={8} scale={1.01} className="h-full">
                  <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 flex flex-col justify-between h-full group">
                    <div>
                      <div className="aspect-square relative overflow-hidden bg-muted">
                        <img
                          src={product.image}
                          alt={product.altText}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-[9px] font-sf-bold uppercase px-2 py-0.5 rounded-full shadow-xs">
                          {product.badge}
                        </span>
                      </div>

                      <div className="p-3.5 space-y-1.5">
                        <span className="text-[10px] font-sf-bold text-red-600 uppercase tracking-wider block">
                          {product.brand}
                        </span>
                        <h4 className="text-xs font-sf-bold text-foreground leading-snug line-clamp-2">
                          {product.name}
                        </h4>
                        <span className="text-[10px] text-muted-foreground font-sf-regular block">
                          {product.module}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 pt-0">
                      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
                        <span className="text-emerald-600 font-sf-bold">{product.profitMargin}</span>
                        <button
                          onClick={() => onOpenModal('alta')}
                          className="text-primary font-sf-bold hover:underline flex items-center gap-1"
                        >
                          Ver Precio <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
