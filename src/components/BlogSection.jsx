import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  X
} from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="blog" className="py-16 sm:py-24 2xl:py-28 bg-background border-b border-border">
      <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-14 2xl:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs 2xl:text-sm font-extrabold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Blog & Estrategias para Zapaterías</span>
          </div>

          <h2 className="text-3xl sm:text-5xl 2xl:text-6xl font-black text-foreground tracking-tight">
            Consejos de Ventas y Tendencias del Calzado
          </h2>

          <p className="text-muted-foreground text-base sm:text-lg 2xl:text-xl">
            Artículos y guías comerciales prácticas para que aumentes la rotación en tu local, optimices tus curvas y multipliques tus márgenes.
          </p>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-card rounded-3xl border border-border overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-foreground/80 backdrop-blur-md text-background text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-border">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full py-2.5 px-4 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary font-bold text-xs border border-primary/20 hover:border-primary transition-all flex items-center justify-center gap-2"
                >
                  <span>Leer Artículo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card text-card-foreground rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-border relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/9] rounded-2xl overflow-hidden">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-primary font-bold uppercase">
                <span>{selectedPost.category}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-foreground">
                {selectedPost.title}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed pt-2">
                <p className="font-semibold text-foreground">
                  {selectedPost.excerpt}
                </p>
                <p>
                  El éxito en el comercio minorista de calzado radica en dos variables fundamentales: la tasa de conversión en vidriera y la velocidad de reposición. Cuando un comerciante incorpora marcas con tracción publicitaria nacional como Xti o productos diferenciados como Petite Jolie, el costo de adquisición de clientes se reduce drásticamente.
                </p>
                <p>
                  Al contar con curvas balanceadas y precios mayoristas directos con 10% de descuento por transferencia, el margen neto permite absorber promociones locales sin comprometer la rentabilidad del negocio.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
