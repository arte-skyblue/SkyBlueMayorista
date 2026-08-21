import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  Zap
} from 'lucide-react';
import DotBackground from './reactbits/DotBackground';
import ShinyText from './reactbits/ShinyText';
import { COMPANY_INFO, ADVISORS } from '../data/mockData';

export default function ProfitCalculator({ onOpenAdvisorModal }) {
  const [investment, setInvestment] = useState(800000);
  const [multiplier, setMultiplier] = useState(2.2);
  const [applyDiscount, setApplyDiscount] = useState(true);

  const discountAmount = investment * (applyDiscount ? 0.10 : 0);
  const netInvestment = investment - discountAmount;
  const estimatedRevenue = investment * multiplier;
  const estimatedProfit = estimatedRevenue - netInvestment;
  const roiPercentage = ((estimatedProfit / netInvestment) * 100).toFixed(0);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleCalculateConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  const defaultWhatsappMessage = `Hola! Estuve calculando en la web de SkyBlue un pedido mayorista de ${formatCurrency(investment)} con margen x${multiplier} (Ganancia estimada: ${formatCurrency(estimatedProfit)}). Quiero que me asesoren para armar mi compra por módulos.`;

  return (
    <section id="calculadora" className="py-16 sm:py-24 2xl:py-28 bg-neutral-950 text-white relative overflow-hidden border-b border-neutral-800">
      <DotBackground dotColor="rgba(224, 76, 50, 0.14)">
        <div className="max-w-7xl 2xl:max-w-[1720px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl 2xl:max-w-4xl mx-auto space-y-4 mb-14 2xl:mb-18">
            <h2 className="text-3xl sm:text-5xl 2xl:text-6xl uppercase tracking-tight apple-headline">
              <span className="font-sf-light-italic text-neutral-400 mr-2">SIMULADOR DE</span>
              <span className="font-sf-bold text-white">RENTABILIDAD</span>
            </h2>

            <p className="font-sf-medium text-neutral-300 text-base sm:text-lg 2xl:text-xl apple-subheadline">
              Calculá la rentabilidad neta de tu compra mayorista con márgenes proyectados de x2.0 a x2.5
            </p>
          </div>

          {/* Calculator Card */}
          <div className="max-w-4xl 2xl:max-w-5xl mx-auto rounded-3xl bg-neutral-900/90 border border-neutral-700/80 p-6 sm:p-10 2xl:p-12 shadow-2xl backdrop-blur-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Sliders and Inputs */}
              <div className="lg:col-span-6 space-y-7">
                
                {/* Investment Slider */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-sf-bold uppercase text-neutral-300 tracking-wider">
                      Inversión Mayorista Estimada:
                    </label>
                    <span className="text-2xl font-sf-bold text-primary">
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
                    className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary"
                  />

                  <div className="flex justify-between text-[11px] text-neutral-400 font-sf-medium">
                    <span>$ 200.000 (Mínimo)</span>
                    <span>$ 2.500.000</span>
                    <span>$ 5.000.000+</span>
                  </div>
                </div>

                {/* Multiplier Margins */}
                <div className="space-y-3">
                  <label className="text-xs font-sf-bold uppercase text-neutral-300 tracking-wider flex items-center justify-between flex-wrap gap-1">
                    <span>Margen de Venta al Público:</span>
                    <span className="text-xs text-amber-400 font-sf-bold whitespace-nowrap">
                      Multiplicador x{multiplier}
                    </span>
                  </label>

                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { val: 2.0, label: "x2.0 (100% markup)", desc: "Rotación rápida" },
                      { val: 2.2, label: "x2.2 (120% markup)", desc: "Promedio mercado" },
                      { val: 2.5, label: "x2.5 (150% markup)", desc: "Boutique & Cuero" }
                    ].map((m) => (
                      <button
                        key={m.val}
                        onClick={() => setMultiplier(m.val)}
                        className={`p-3 rounded-2xl border text-center transition-all ${
                          multiplier === m.val
                            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30 scale-105'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="font-sf-bold text-xs sm:text-sm">{m.label.split(' ')[0]}</div>
                        <div className="text-[10px] opacity-80 mt-0.5">{m.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 10% OFF Toggle */}
                <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Percent className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-sf-bold text-white block">10% OFF Transferencia / Contado</span>
                      <p className="text-[11px] text-neutral-400 font-sf-regular">Ahorrás {formatCurrency(discountAmount)} sobre tu compra neta.</p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={applyDiscount}
                    onChange={(e) => setApplyDiscount(e.target.checked)}
                    className="w-5 h-5 rounded accent-emerald-500 cursor-pointer"
                  />
                </div>

              </div>

              {/* Right Column: Projected Returns Box */}
              <div className="lg:col-span-6 bg-neutral-950 rounded-3xl p-6 sm:p-8 border border-neutral-800 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <span className="text-xs font-sf-bold uppercase text-neutral-400 tracking-wider">
                    Resultados Financieros Proyectados
                  </span>
                  <button
                    onClick={handleCalculateConfetti}
                    className="text-xs font-sf-bold text-primary hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Calcular</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-neutral-300 font-sf-regular">
                    <span>Recaudación Bruta Estimada:</span>
                    <span className="font-sf-bold text-white text-base">{formatCurrency(estimatedRevenue)}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-neutral-300 font-sf-regular">
                    <span>Costo Neto de Mercadería (con 10% OFF):</span>
                    <span className="font-sf-bold text-red-400 text-sm">{formatCurrency(netInvestment)}</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-neutral-900 border border-emerald-500/30 space-y-1">
                    <div className="text-xs font-sf-bold uppercase text-emerald-400 tracking-wider">
                      Ganancia Neta Estimada para tu Local:
                    </div>
                    <div className="text-3xl sm:text-4xl font-sf-bold text-emerald-400">
                      {formatCurrency(estimatedProfit)}
                    </div>
                    <div className="text-[11px] text-emerald-300 font-sf-medium">
                      Retorno sobre la Inversión (ROI): +{roiPercentage}% en cada curva vendida.
                    </div>
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${ADVISORS[0].cleanPhone}?text=${encodeURIComponent(defaultWhatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-sm shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Pedir Asesoría para este Presupuesto</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </DotBackground>
    </section>
  );
}
