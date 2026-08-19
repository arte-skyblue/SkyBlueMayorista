import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  X,
  Share2
} from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <section id="blog" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-extrabold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-sky-600" />
            <span>Blog & Estrategias para Zapaterías</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Consejos de Ventas y Tendencias del Calzado
          </h2>

          <p className="text-slate-700 text-base sm:text-lg">
            Artículos y guías comerciales prácticas para que aumentes la rotación en tu local, optimices tus curvas y multipliques tus márgenes.
          </p>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border border-white/10">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      <span>{post.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-700" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-sky-600 hover:text-white text-slate-900 font-bold text-xs border border-slate-200 hover:border-sky-600 transition-all flex items-center justify-center gap-2"
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
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700"
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
              <div className="flex items-center gap-3 text-xs text-sky-700 font-bold uppercase">
                <span>{selectedPost.category}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {selectedPost.title}
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
                <p className="font-semibold text-slate-900">
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

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Cerrar Lectura
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
