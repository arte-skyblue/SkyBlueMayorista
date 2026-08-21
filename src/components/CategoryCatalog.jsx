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

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-sf-bold">
              ✓ Precios Netos de Fábrica sin IVA
            </span>
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-sf-bold">
              ✓ Módulos Cerrados de 8 y 12 Pares
            </span>
            <span className="px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-sf-bold">
              ✓ 10% Descuento Adicional en tu Pago
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

        {/* Filter Navigation Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <span className="text-xs font-sf-bold uppercase text-foreground tracking-wider">
              {selectedCategory === 'todas' ? 'Mostrando Selección Top 10:' : `Mostrando Categoría (${filteredProducts.length} modelos):`}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => {
              const isSelected = selectedCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedCategory(opt.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-sf-medium transition-colors z-10 ${
                    isSelected
                      ? 'text-primary-foreground font-sf-bold'
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
                  <span>{opt.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid (10 on 'todas', 8 on specific category) */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
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
                      <div className="p-3.5 space-y-1">
                        <h4 className="font-sf-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors tracking-wider">
                          {product.name}
                        </h4>
                        <span className="text-[11px] text-muted-foreground block font-sf-regular">
                          {product.module}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Card Actions: Consultar por este producto */}
                    <div className="p-3.5 pt-0">
                      <a
                        href={`https://wa.me/5491138916779?text=${encodeURIComponent(`Hola Juliana! Quiero consultar disponibilidad mayorista del modelo: ${product.name} (${product.brand}) para mi negocio.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl bg-foreground hover:bg-emerald-600 text-background hover:text-white font-sf-bold text-[10px] sm:text-xs transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs"
                        title="Consultar por WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Consultar por este producto</span>
                      </a>
                    </div>

                  </div>
                </TiltedCard>
              </motion.div>
            ))}
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
