import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Lock, 
  MessageCircle,
  ExternalLink,
  Filter,
  Sparkles
} from 'lucide-react';
import { CATEGORIES, PRODUCTS, COMPANY_INFO } from '../data/mockData';
import TiltedCard from './reactbits/TiltedCard';

export default function CategoryCatalog({ onOpenModal }) {
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const filterOptions = [
    { id: 'todas', name: 'Todos los Modelos (Top 10)' },
    { id: 'dama', name: 'Calzado Dama (8 modelos)' },
    { id: 'caballero', name: 'Caballero (8 modelos)' },
    { id: 'ninos', name: 'XTI Kids (8 modelos)' },
    { id: 'marroquineria', name: 'Marroquinería (8 modelos)' },
    { id: 'accesorios', name: 'Accesorios (8 modelos)' },
  ];

  // Exact 10 featured items (2 per category) in 'todas', or 8 items when specific category is chosen
  const filteredProducts = selectedCategory === 'todas'
    ? PRODUCTS.filter((p) => p.featuredInAll)
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="catalogo" className="py-16 sm:py-24 2xl:py-28 bg-slate-50 dark:bg-neutral-950 border-b border-slate-200 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-12 2xl:mb-16">
          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
            <span className="font-sf-light-italic text-slate-500 dark:text-neutral-400 mr-2">TIPOS DE</span>
            <span className="font-sf-bold text-slate-900 dark:text-white">PRODUCTO</span>
          </h2>

          <p className="font-sf-medium text-slate-600 dark:text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
            Modelos de alta rotación comercial con stock permanente y despacho inmediato por curva cerrada.
          </p>
          {/* Trust Badges - Franja Comercial */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="px-3.5 py-1 rounded-full bg-slate-900 dark:bg-neutral-900 border border-slate-700 dark:border-neutral-700 text-white text-xs font-sf-bold shadow-xs">
              ✓ Factura A/B
            </span>

            <span className="px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-sf-bold">
              ✓ Curvas de 8 y 12 pares
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-sf-bold">
              ✓ 10% OFF En tu primer compra
            </span>
            <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-sf-bold">
              ✓ Envíos a todo el país
            </span>
          </div>
        </div>

        {/* 5 Category Bento Preview Cards (3:4 Vertical) */}
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

        {/* Category Horizontal Filter Pills */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 px-2 no-scrollbar">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-muted/60 border border-border gap-1.5 shrink-0 shadow-inner">
            {filterOptions.map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-sf-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/60'
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid (Exact 10 in 'todas' / 8 in specific category) */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => {
              const estPrice = product.category === 'marroquineria' ? '$ 26.500' : product.category === 'ninos' ? '$ 24.500' : product.category === 'accesorios' ? '$ 12.500' : product.category === 'caballero' ? '$ 31.500' : '$ 34.500';
              const estBox = product.category === 'marroquineria' ? 'Pack x4: $ 106.000' : product.category === 'accesorios' ? 'Pack x6: $ 75.000' : 'Caja 8 pares: Desde $ 276.000';

              return (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <TiltedCard className="h-full">
                  <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/40 transition-all duration-300 group flex flex-col justify-between h-full">
                    
                    {/* Product Image in 1:1 Square on Crisp White Background */}
                    <div>
                      <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-2 border-b border-border/50">
                        <img
                          src={product.image}
                          alt={product.altText}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        
                        {/* Brand Tag */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                          <span className="bg-neutral-950/90 backdrop-blur-md text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-lg shadow-sm border border-white/10">
                            {product.brand}
                          </span>
                        </div>

                        {product.brand === 'Xti' && product.category === 'dama' && (
                          <div className="absolute top-2.5 right-2.5 bg-amber-400 text-neutral-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-lg shadow-sm">
                            María Becerra
                          </div>
                        )}
                      </div>

                      {/* Product SKU Code & Module info */}
                      <div className="p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-sf-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors tracking-wider">
                            {product.name}
                          </h4>
                          <span className="text-[10px] font-sf-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                            {product.markup || 'Margen x2.2'}
                          </span>
                        </div>
                        <span className="text-[11px] text-muted-foreground block font-sf-regular">
                          {product.module}
                        </span>

                        {/* Price Reference */}
                        <div className="bg-muted/40 p-2 rounded-xl border border-border/60 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-sf-bold text-foreground block">{estPrice}</span>
                            <span className="text-[9px] text-muted-foreground">neto/par</span>
                          </div>
                          <span className="text-[10px] font-sf-bold text-amber-600">{estBox}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Card Actions: Consultar por este producto */}
                    <div className="p-3.5 pt-0">
                      <a
                        href={`https://wa.me/5491138916779?text=${encodeURIComponent(`Hola Juliana! Quiero consultar disponibilidad y cotización mayorista del modelo: ${product.name} (${product.brand} - Ref: ${estPrice}/par - ${product.module}) para mi negocio.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-emerald-600 dark:bg-foreground dark:hover:bg-emerald-600 text-white dark:text-background dark:hover:text-white font-sf-bold text-[10px] sm:text-xs transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs"
                        title="Consultar por WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Consultar por este producto</span>
                      </a>
                    </div>

                  </div>
                </TiltedCard>
              </motion.div>
            );
            })}
          </AnimatePresence>
        </motion.div>

        {/* B2B Private Platform CTA Banner */}
        <div className="mt-14 p-6 sm:p-9 rounded-3xl bg-primary text-primary-foreground shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-primary/20">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase shadow-xs">
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso Exclusivo a Precios Mayoristas</span>
            </div>
            <h4 className="text-xl sm:text-2xl 2xl:text-3xl font-sf-bold">
              ¿Querés ver el catálogo mayorista?
            </h4>
            <p className="text-primary-foreground/90 text-xs sm:text-sm 2xl:text-base max-w-xl leading-relaxed font-sf-regular">
              Ingresá a <span className="font-bold underline">mayoristas.skyblue.com.ar</span> y solicitá tu cuenta comercial para acceder a toda la lista de precios y stock en tiempo real.
            </p>
          </div>

          {/* Horizontally Aligned CTA Buttons */}
          <div className="flex flex-row flex-wrap sm:flex-nowrap items-center justify-center gap-3 shrink-0">
            <a
              href={COMPANY_INFO.b2bPlatformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-foreground hover:bg-foreground/90 text-background font-sf-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-all"
            >
              <span>Ir a la plataforma B2B</span>
              <ExternalLink className="w-4 h-4 text-amber-400" />
            </a>

            <button
              onClick={() => onOpenModal('catalogo')}
              className="px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl bg-card text-card-foreground hover:bg-muted font-sf-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 hover:scale-105"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span>Pedir PDF por WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
