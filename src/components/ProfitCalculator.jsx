import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Percent, 
  Sparkles, 
  DollarSign, 
  ArrowRight, 
  MessageCircle,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ADVISORS } from '../data/mockData';
import DotBackground from './reactbits/DotBackground';
import ShinyText from './reactbits/ShinyText';

export default function ProfitCalculator({ onOpenAdvisorModal }) {
  const [investment, setInvestment] = useState(800000); // 800.000 ARS
  const [multiplier, setMultiplier] = useState(2.2); // x2.2
  const [applyDiscount, setApplyDiscount] = useState(true); // 10% OFF

  const discountRate = applyDiscount ? 0.10 : 0.0;
  const discountAmount = investment * discountRate;
  const netInvestment = investment - discountAmount;
  const estimatedRevenue = investment * multiplier;
  const netProfit = estimatedRevenue - netInvestment;
  const roiPercentage = ((netProfit / netInvestment) * 100).toFixed(0);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const prefilledWhatsappMsg = `Hola! Estuve calculando en la web de SkyBlue un pedido mayorista de ${formatCurrency(investment)} con margen x${multiplier} (Ganancia estimada: ${formatCurrency(netProfit)}). Quiero que me asesoren para armar mi compra por módulos.`;

  return (
    <section id="calculadora" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      
      {/* React Bits DotBackground integration */}
      <DotBackground dotColor="rgba(14, 165, 233, 0.15)">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold uppercase tracking-wider">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>Simulador Interactivo B2B</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Calculadora de Rentabilidad Mayorista
            </h2>

            <p className="text-slate-300 text-base sm:text-lg">
              Proyectá tus números con total claridad. Ingresá el monto estimado de tu compra y descubrí tu margen de ganancia real con el beneficio del 10% adicional por transferencia o efectivo.
            </p>
          </div>

          {/* Calculator Main Box */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Inputs & Controls */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Investment Amount Slider */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                      Inversión Mayorista Estimada:
                    </label>
                    <span className="text-xl font-black text-sky-400">
                      {formatCurrency(investment)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="200000"
                    max="5000000"
                    step="50000"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>$ 200.000 (Mínimo)</span>
                    <span>$ 2.500.000</span>
                    <span>$ 5.000.000+</span>
                  </div>
                </div>

                {/* Multiplier / Margin Selection */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center justify-between">
                    <span>Margen de Venta al Público (Markup):</span>
                    <span className="text-xs text-amber-400 font-extrabold">x{multiplier}</span>
                  </label>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { val: 2.0, label: 'x2.0 (100%)', desc: 'Línea Básica' },
                      { val: 2.2, label: 'x2.2 (120%)', desc: 'Recomendado' },
                      { val: 2.5, label: 'x2.5 (150%)', desc: 'Temporada Alta' },
                    ].map((m) => (
                      <button
                        key={m.val}
                        onClick={() => setMultiplier(m.val)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          multiplier === m.val
                            ? 'bg-sky-600 border-sky-400 text-white shadow-lg shadow-sky-600/30 scale-105'
                            : 'bg-slate-950/60 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <div className="font-extrabold text-sm">{m.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 10% Discount Toggle Checkbox */}
                <div 
                  onClick={() => setApplyDiscount(!applyDiscount)}
                  className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between cursor-pointer hover:bg-emerald-950/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      applyDiscount ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-500'
                    }`}>
                      {applyDiscount && <span className="text-xs font-black">✓</span>}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-emerald-300 block">
                        Aplicar 10% Adicional en Contado / Transferencia
                      </span>
                      <span className="text-xs text-slate-400">
                        Descuento financiero directo en tu liquidación
                      </span>
                    </div>
                  </div>
                  {applyDiscount && (
                    <span className="text-xs font-black text-emerald-400 bg-emerald-900/60 px-2 py-1 rounded-lg border border-emerald-500/30">
                      -{formatCurrency(discountAmount)}
                    </span>
                  )}
                </div>

              </div>

              {/* Right Column: Calculated Results Box */}
              <div className="lg:col-span-6 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-inner flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs text-slate-400 font-semibold">Inversión Neta a Abonar:</span>
                    <span className="text-base font-bold text-white">
                      {formatCurrency(netInvestment)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs text-slate-400 font-semibold">Facturación Minorista Estimada:</span>
                    <span className="text-base font-bold text-sky-300">
                      {formatCurrency(estimatedRevenue)}
                    </span>
                  </div>

                  {/* Big Profit Box with ShinyText */}
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 text-center space-y-1">
                    <span className="text-xs font-extrabold uppercase text-emerald-400 tracking-wider">
                      Ganancia Neta Estimada para tu Negocio:
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                      <ShinyText text={formatCurrency(netProfit)} speed={3.5} />
                    </div>
                    <div className="text-xs text-emerald-300/80 font-bold">
                      Retorno sobre la Inversión (ROI): +{roiPercentage}%
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/5491138916779?text=${encodeURIComponent(prefilledWhatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleConfetti}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    <MessageCircle className="w-5 h-5 text-slate-950" />
                    <span>Quiero Armar este Pedido por Módulos</span>
                    <ArrowRight className="w-5 h-5 text-slate-950" />
                  </a>

                  <p className="text-[11px] text-slate-400 text-center">
                    *Valores estimados sugeridos para venta al público por módulo.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </DotBackground>
    </section>
  );
}
