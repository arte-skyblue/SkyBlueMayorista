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
import NumberTicker from './reactbits/NumberTicker';
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
                      <NumberTicker
                        value={investment}
                        formatter={(v) => formatCurrency(v)}
                      />
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
                  <label className="text-xs font-sf-bold uppercase text-neutral-300 tracking-wider block">
                    Markup / Multiplicador de Venta Público:
                  </label>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { val: 2.0, label: 'x2.0 (100% Margen)' },
                      { val: 2.2, label: 'x2.2 (120% Recomendado)' },
                      { val: 2.5, label: 'x2.5 (150% Premium)' }
                    ].map((item) => (
                      <button
                        key={item.val}
                        onClick={() => {
                          setMultiplier(item.val);
                          handleCalculateConfetti();
                        }}
                        className={`p-3 rounded-2xl border text-xs font-sf-bold transition-all text-center flex flex-col items-center justify-center gap-1 ${
                          multiplier === item.val
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105'
                            : 'bg-neutral-950/60 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <span className="text-base font-extrabold">{item.val}x</span>
                        <span className="text-[10px] opacity-80">{item.val === 2.2 ? 'Recomendado' : item.val === 2.0 ? 'Básico' : 'Premium'}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 10% Cash/Transfer Discount Toggle */}
                <div 
                  onClick={() => setApplyDiscount(!applyDiscount)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    applyDiscount 
                      ? 'bg-emerald-950/40 border-emerald-500/40 shadow-inner' 
                      : 'bg-neutral-950/40 border-neutral-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      applyDiscount ? 'bg-emerald-500 text-slate-950' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      ✓
                    </div>
                    <div>
                      <span className="text-xs font-sf-bold text-emerald-300 block">
                        10% Adicional por Transferencia / Efectivo
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        Ahorrás: {formatCurrency(discountAmount)} en el total
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    -10%
                  </span>
                </div>

              </div>

              {/* Right Column: Financial Results */}
              <div className="lg:col-span-6 bg-neutral-950/80 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div>
                  <span className="text-xs font-sf-bold uppercase text-neutral-400 tracking-wider block mb-1">
                    Ganancia Neta Proyectada:
                  </span>
                  <div className="text-3xl sm:text-4xl 2xl:text-5xl font-sf-bold text-emerald-400 tracking-tight">
                    <NumberTicker
                      value={estimatedProfit}
                      formatter={(v) => formatCurrency(v)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-800/80 text-xs">
                  <div>
                    <span className="text-neutral-400 block mb-1">Facturación Estimada:</span>
                    <span className="text-base font-sf-bold text-white">
                      <NumberTicker
                        value={estimatedRevenue}
                        formatter={(v) => formatCurrency(v)}
                      />
                    </span>
                  </div>

                  <div>
                    <span className="text-neutral-400 block mb-1">Retorno de Inversión (ROI):</span>
                    <span className="text-base font-sf-bold text-primary">
                      +<NumberTicker value={Number(roiPercentage)} suffix="%" />
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Módulos de 8 y 12 pares con curva surtida</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Envíos gratis en CABA/GBA y traslado a expresos</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Fotos y videos oficiales en 4K para tus redes</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/5491138916779?text=${encodeURIComponent(defaultWhatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-sf-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pedir Asesoramiento con este Cálculo</span>
                </a>

              </div>

            </div>
          </div>

        </div>
      </DotBackground>
    </section>
  );
}
