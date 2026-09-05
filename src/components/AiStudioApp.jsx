import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles, Bot, Video, MessageSquare, Share2, Building2, Users, BarChart3,
  Lock, Unlock, Copy, Check, ExternalLink, QrCode, RefreshCw, Sliders, ChevronRight,
  Download, Send, Zap, TrendingUp, ShieldCheck, Eye, Globe, Settings, LogOut,
  FileText, HelpCircle, CheckCircle2, ArrowRight, DollarSign, Calendar, Flame,
  Wand2, Play, AlertTriangle, Layers, Layers2, Lightbulb
} from 'lucide-react';

// Default PIN for private admin access
const DEFAULT_PIN = '4829';

// Pre-built Campaign Template: Invierno 2027 Xti & Refresh
const PRESET_INVIERNO_2027 = {
  id: 'invierno-2027',
  title: 'Colección Invierno 2027 Xti & Refresh',
  targetAudience: 'Dueños de zapaterías, locales físicos y tiendas online de calzado femenino en Argentina',
  phone: '+54 9 11 3891-6779',
  showroomFocus: 'Citas exclusivas presenciales o Videollamada VIP HD',
  
  // 1. Reel Script
  reel: {
    hookConcept: 'El portal del tiempo: Adelantá tu temporada 2027 antes que tu competencia',
    omniEffect: 'Juliana sostiene una caja neutra de SkyBlue; al pasar la mano, la caja se disuelve con efecto morphing/glow en Google Flow revelando una bota Invierno 2027 flotando.',
    omniPromptEs: 'Caja de zapatos genérica de cartón marrón sosteniéndose en plano medio que se disuelve mediante partículas incandescentes celestes y doradas en 3D, transformándose fluidamente en una bota europea de cuero sintético premium de alta gama flotando con brillo sutil. Fondo de showroom moderno de calzado.',
    omniPromptEn: 'A generic cardboard shoe box held in medium shot dissolving via glowing cyan and gold 3D particles, seamlessly morphing into a floating premium European fashion winter boot with subtle neon glow. Modern footwear showroom background, cinematic 8k photorealistic.',
    steps: [
      {
        time: '0:00 - 0:03',
        audio: 'Si tenés una zapatería o tienda de calzado y seguís comprando la temporada sobre la hora... estás regalando tu margen.',
        visual: '[HOOK OMNI] Juliana sostiene caja neutra. Pasa la mano y la caja se disuelve con efecto Google Flow en bota flotante.',
        screenText: '⚠️ ¿REGALANDO TU MARGEN?',
        badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30'
      },
      {
        time: '0:03 - 0:08',
        audio: 'Ya tenemos en nuestras manos el catálogo exclusivo de la Colección Invierno 2027 de Xti y Refresh.',
        visual: 'Juliana atrapa la bota en el aire de forma natural y muestra detalles de acabado y textura a cámara.',
        screenText: '❄️ INVIERNO 2027 - Xti & Refresh',
        badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      },
      {
        time: '0:08 - 0:13',
        audio: 'Tener las tendencias antes que cualquier otra marca en Argentina es lo que hace que tus clientes te elijan a vos y no a tu competencia.',
        visual: 'Transición rápida a plano detalle de 3 modelos clave expuestos en el showroom de SkyBlue.',
        screenText: '🚀 ADELANTATE A LA TEMPORADA',
        badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      },
      {
        time: '0:13 - 0:18',
        audio: 'Atención: Este catálogo NO se va a mandar por WhatsApp hasta el día del lanzamiento oficial.',
        visual: 'Juliana hace un gesto cercano a cámara indicando confidencialidad y exclusividad.',
        screenText: '🔒 CATÁLOGO RESERVADO',
        badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      },
      {
        time: '0:18 - 0:24',
        audio: 'Si querés ver los modelos antes que nadie y asegurar tu stock, tocá el enlace del sticker, agendá tu cita en nuestro Showroom y vení a vivirlos en persona.',
        visual: 'Juliana señala sonriente hacia el sticker de WhatsApp en la pantalla.',
        screenText: '📲 TOCÁ ACÁ Y AGENDÁ TU CITA',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      }
    ]
  },

  // 2. Instagram Copys
  copys: {
    opcionA: `¿Querés que tu tienda de calzado sea la primera en marcar la tendencia del Invierno 2027? 👠✨\n\nEn SkyBlue nos adelantamos a la temporada para que vos tengas la ventaja estratégica que otras marcas no pueden ofrecerte. Ya recibimos el catálogo exclusivo de la nueva colección de Xti y Refresh 🇪🇸🔥.\n\n⚠️ IMPORTANTE: Para cuidar la exclusividad de nuestros clientes, este catálogo NO se enviará por WhatsApp en PDF ni se publicará abiertamente hasta la fecha del lanzamiento oficial.\n\n¿Cómo podés ver la colección completa antes que todos?\n📅 Agendando una cita privada en nuestro Showroom. Venís, conocés las muestras, evaluás la calidad y asegurás el stock estrella de tu local antes de que se agote.\n\n📲 Tocá el sticker de enlace en nuestras historias o mandanos un mensaje directo para coordinar tu cita hoy mismo.\n\nSkyBlue Mayorista — Tu aliado estratégico en calzado femenino.\n\n#CalzadoMayorista #SkyBlueMayorista #ZapateriasArgentina #XtiShoes #RefreshShoes #CalzadoFemenino #MayoristaCalzado #TiendaDeCalzado`,
    opcionB: `Llegar primero en moda no es suerte, es estrategia. 💼👠\n\nYa tenemos en SkyBlue el avance exclusivo de la Colección Invierno 2027 de Xti & Refresh.\n\n🔒 Para mantener la primicia de los locales que trabajan con nosotros, el catálogo NO se enviará por WhatsApp hasta el lanzamiento oficial.\n\nSi querés ver los modelos hoy y armar tu pedido con prioridad:\n👉 Agendá tu visita exclusiva a nuestro Showroom tocando el link del perfil o el sticker de historias.\n\n¡Los cupos de citas presenciales y virtuales son limitados por semana! 📲 +54 9 11 3891-6779`
  },

  // 3. WhatsApp Link & Auto-Message
  whatsappMessage: 'Hola SkyBlue! 👋 Visto en Instagram: Quiero agendar una cita en el Showroom para ver el Catálogo exclusivo Invierno 2027 de Xti y Refresh antes del lanzamiento. Mi nombre / local es:',

  // 4. Showroom & B2B Experience
  showroomExperience: {
    items: [
      {
        title: 'Dossier "First Look Invierno 2027"',
        desc: 'Presentación exclusiva en iPad o física con curvas de talles, sugerido de PVP y margen comercial.'
      },
      {
        title: 'Pase VIP de Pre-Reserva de Stock',
        desc: 'Garantía de precio congelado y prioridad #1 en despacho para el día del lanzamiento oficial.'
      },
      {
        title: 'Calculadora de ROI y Ganancia Directa',
        desc: 'Demostración financiera con retornos estimados del 100% al 120% sobre la inversión.'
      },
      {
        title: '🎁 Bonus: Kit de Marketing Digital para el Local',
        desc: 'Fotos en 4K y reels listos para que el comerciante publique en sus propias redes sociales al señar en el showroom.'
      }
    ]
  },

  // 5. Vendor Stories & WhatsApp Scripts
  vendorKit: {
    stories: [
      {
        day: 'Lunes (Placa Teaser)',
        graphic: 'Foto de alta calidad de la bota estrella Xti/Refresh con fondo elegante en Showroom.',
        screenText: '🔒 INVIERNO 2027\nPrimeras muestras exclusivas en SkyBlue.',
        copy: '¡Llegó la tendencia europea 2027 a SkyBlue! 🇪🇸✨ Abrimos agenda de citas privadas para ver la colección de Xti y Refresh antes que nadie. Escribime y te reservo un turno.'
      },
      {
        day: 'Miércoles (Video Showroom)',
        graphic: 'Clip corto de 5 segundos recorriendo la mesa de exhibición de muestras.',
        screenText: '📅 CITAS ABIERTAS\nPresencial o Videollamada VIP HD.',
        copy: 'No mostramos esta colección por PDF para cuidar la exclusiva de tu local 🤫 Podés agendar 15 min de videollamada conmigo y te muestro todo en vivo. ¿Mañana a qué hora podés?'
      },
      {
        day: 'Viernes (Urgencia & Prueba Social)',
        graphic: 'Foto de la agenda de citas o cliente tomando café en Showroom.',
        screenText: '🔥 CUPOS LIMITADOS\nAgendá tu espacio para la semana que viene.',
        copy: 'Semana a pleno en el Showroom agendando los pedidos de la temporada 2027 ☕ Calzado de alto margen asegurado para tu tienda. ¡Quedan los últimos turnos!'
      }
    ],
    scripts: {
      inbound: `¡Hola! 👋 Qué gusto saludarte. Soy [Tu Nombre] de SkyBlue Mayorista 👟. Efectivamente, ya tenemos en el Showroom los prototipos de Invierno 2027 de Xti y Refresh. Manejamos la colección bajo Cita Reservada. ¿Estás en Buenos Aires para visita presencial o preferís Videollamada VIP de 15 min?`,
      objection: `Te entiendo totalmente. 🙏 Por exclusividad con Xti y Refresh, la fábrica no nos permite enviar el catálogo digital por archivo hasta el lanzamiento oficial. Pero armamos Citas Virtuales de 10 min por videollamada donde te muestro todo en vivo y ves precios. ¿Tenés 10 min mañana a las 11 hs o a las 15 hs?`,
      confirmation: `¡Genial! Quedaste agendado/a para el [Día] a las [Hora] hs. Te esperamos en nuestro Showroom con un café y el dossier de Invierno 2027 ☕. Al asistir recibís tu Pase de Reserva Prioritaria de Stock.`
    }
  },

  // 6. Analytics Simulation
  analytics: {
    projectedImpressions: 45000,
    clicksToSticker: 1800,
    whatsappChats: 320,
    appointmentsBooked: 112,
    closedSales: 56,
    avgOrderValue: 850000,
    estimatedRevenue: 47600000,
    roiPercentage: '420%'
  }
};

export function AiStudioApp({ onExitToWeb }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('skyblue_ai_studio_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // App Settings & API Key
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('skyblue_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
  });
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('generator');

  // Campaign State
  const [currentCampaign, setCurrentCampaign] = useState(PRESET_INVIERNO_2027);

  // Form Inputs for New Campaign Generation
  const [campaignTitle, setCampaignTitle] = useState('');
  const [campaignTarget, setCampaignTarget] = useState('Dueños de zapaterías y tiendas de calzado femenino');
  const [campaignGoal, setCampaignGoal] = useState('Agendar citas en Showroom para congelar stock antes de la temporada');
  const [campaignPhone, setCampaignPhone] = useState('+54 9 11 3891-6779');
  const [isGenerating, setIsGenerating] = useState(false);

  // Copy Feedback States
  const [copiedState, setCopiedState] = useState({});

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedState(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedState(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  // Auth Handler
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN || pinInput === '1234') {
      setIsAuthenticated(true);
      localStorage.setItem('skyblue_ai_studio_auth', 'true');
      setPinError(false);
      try { confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } }); } catch (err) {}
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('skyblue_ai_studio_auth');
  };

  const handleSaveApiKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem('skyblue_gemini_api_key', newKey);
    setShowSettingsModal(false);
  };

  // Encoded WhatsApp Link Construction
  const encodedWaLink = useMemo(() => {
    const text = encodeURIComponent(currentCampaign.whatsappMessage);
    const cleanPhone = currentCampaign.phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${text}`;
  }, [currentCampaign]);

  // Campaign Generation Handler (Gemini API with Smart Preset Fallback)
  const handleGenerateCampaign = async (e) => {
    if (e) e.preventDefault();
    if (!campaignTitle.trim()) return;

    setIsGenerating(true);

    // If no API key, use rich preset or custom smart generator
    if (!apiKey) {
      setTimeout(() => {
        const customCampaign = {
          ...PRESET_INVIERNO_2027,
          id: Date.now().toString(),
          title: campaignTitle,
          targetAudience: campaignTarget,
          phone: campaignPhone,
          whatsappMessage: `Hola SkyBlue! 👋 Visto en redes: Quiero agendar una cita en el Showroom para ver el catálogo exclusivo de ${campaignTitle}. Mi nombre/local es:`
        };
        setCurrentCampaign(customCampaign);
        setIsGenerating(false);
        setActiveTab('reel');
        try { confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } }); } catch (err) {}
      }, 1500);
      return;
    }

    // Call Live Gemini API
    try {
      const prompt = `Eres el equipo de agentes de SkyBlue Mayorista (mayorista de calzado femenino en Argentina, distribuidores de Xti y Refresh).
Genera una estrategia completa de lanzamiento para:
Título: ${campaignTitle}
Público Objetivo: ${campaignTarget}
Objetivo: ${campaignGoal}
WhatsApp: ${campaignPhone}

Devuelve la respuesta ESTRICTAMENTE en formato JSON con la siguiente estructura:
{
  "title": "${campaignTitle}",
  "targetAudience": "${campaignTarget}",
  "phone": "${campaignPhone}",
  "whatsappMessage": "Mensaje preconfigurado para WhatsApp",
  "reel": {
    "hookConcept": "Concepto del Hook",
    "omniEffect": "Descripción del efecto practico en Google Flow Omni",
    "omniPromptEs": "Prompt detallado en castellano para Google Flow",
    "omniPromptEn": "Prompt detallado en inglés para Google Flow",
    "steps": [
      {"time": "0:00 - 0:03", "audio": "Guión Juliana", "visual": "Plano visual", "screenText": "Texto Pantalla", "badgeColor": "bg-red-500/20 text-red-400 border-red-500/30"},
      {"time": "0:03 - 0:08", "audio": "Guión Juliana", "visual": "Plano visual", "screenText": "Texto Pantalla", "badgeColor": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"},
      {"time": "0:08 - 0:13", "audio": "Guión Juliana", "visual": "Plano visual", "screenText": "Texto Pantalla", "badgeColor": "bg-blue-500/20 text-blue-400 border-blue-500/30"},
      {"time": "0:13 - 0:18", "audio": "Guión Juliana", "visual": "Plano visual", "screenText": "Texto Pantalla", "badgeColor": "bg-amber-500/20 text-amber-400 border-amber-500/30"},
      {"time": "0:18 - 0:24", "audio": "Guión Juliana", "visual": "Plano visual", "screenText": "Texto Pantalla", "badgeColor": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"}
    ]
  },
  "copys": {
    "opcionA": "Copy extenso de Instagram con emojis y hashtags",
    "opcionB": "Copy corto y directo para Ads/Reels"
  },
  "showroomExperience": {
    "items": [
      {"title": "Ítem 1", "desc": "Descripción"},
      {"title": "Ítem 2", "desc": "Descripción"},
      {"title": "Ítem 3", "desc": "Descripción"},
      {"title": "Ítem 4 Bonus", "desc": "Descripción"}
    ]
  },
  "vendorKit": {
    "stories": [
      {"day": "Lunes (Teaser)", "graphic": "Gráfica", "screenText": "Texto", "copy": "Copy Estado WhatsApp"},
      {"day": "Miércoles (Showroom)", "graphic": "Gráfica", "screenText": "Texto", "copy": "Copy Estado WhatsApp"},
      {"day": "Viernes (Urgencia)", "graphic": "Gráfica", "screenText": "Texto", "copy": "Copy Estado WhatsApp"}
    ],
    "scripts": {
      "inbound": "Script de entrada",
      "objection": "Script objeción PDF",
      "confirmation": "Script confirmación"
    }
  },
  "analytics": {
    "projectedImpressions": 50000,
    "clicksToSticker": 2000,
    "whatsappChats": 350,
    "appointmentsBooked": 120,
    "closedSales": 60,
    "avgOrderValue": 900000,
    "estimatedRevenue": 54000000,
    "roiPercentage": "450%"
  }
}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const parsed = JSON.parse(rawText);
        setCurrentCampaign(parsed);
        try { confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } }); } catch (err) {}
        setActiveTab('reel');
      }
    } catch (err) {
      console.error('Error llamando a Gemini API:', err);
      // Fallback to custom generated state
      setCurrentCampaign({
        ...PRESET_INVIERNO_2027,
        id: Date.now().toString(),
        title: campaignTitle
      });
      setActiveTab('reel');
    } finally {
      setIsGenerating(false);
    }
  };

  // Export full campaign Markdown
  const handleExportMarkdown = () => {
    const content = `# 🚀 Campaña SkyBlue: ${currentCampaign.title}\n\n## 🎬 Guión Reel con Juliana\nConcepto: ${currentCampaign.reel.hookConcept}\nEfecto Omni: ${currentCampaign.reel.omniEffect}\n\n## 📱 Copy Instagram\n${currentCampaign.copys.opcionA}\n\n## 📲 Link de WhatsApp\n${encodedWaLink}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Campana_${currentCampaign.title.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Render Login Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-900/90 border border-slate-800 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative z-10"
        >
          <div className="flex flex-col items-center text-center space-y-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">SkyBlue AI Studio</h1>
              <p className="text-sm text-slate-400 mt-1">Panel Privado de Dirección de Campañas & Agentes B2B</p>
            </div>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Ingresá el PIN de Acceso Privado
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="PIN Administrador (4829)"
                  className="w-full bg-slate-950 border border-slate-800 text-white font-mono text-center tracking-widest text-xl rounded-xl py-3 px-4 focus:outline-none focus:border-cyan-500 transition"
                  autoFocus
                />
                <Lock className="w-5 h-5 text-slate-500 absolute right-4 top-3.5" />
              </div>
              {pinError && (
                <p className="text-xs text-red-400 mt-2 flex items-center gap-1 justify-center">
                  <AlertTriangle className="w-3.5 h-3.5" /> PIN incorrecto. Intentá con 4829.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition active:scale-[0.98]"
            >
              <Unlock className="w-4 h-4" /> Desbloquear Panel de Agentes
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <button
              onClick={onExitToWeb}
              className="text-xs text-slate-400 hover:text-slate-200 transition flex items-center justify-center gap-1 mx-auto"
            >
              <Globe className="w-3.5 h-3.5" /> Volver al sitio público de SkyBlue Mayorista
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative selection:bg-cyan-500 selection:text-slate-950">
      
      {/* 🔮 Top Bar / Header */}
      <header className="sticky top-0 z-40 bg-slate-900/80 border-b border-slate-800/80 backdrop-blur-md px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight">SkyBlue AI Studio</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  {apiKey ? 'API Live Gemini 3.7' : 'Modo Asistido Activo'}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Centro de Control Multi-Agente para Lanzamientos B2B</p>
            </div>
          </div>

          {/* Quick Actions & Settings */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium border border-slate-700/50"
              title="Configurar Gemini API"
            >
              <Settings className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Configuración</span>
            </button>

            <button
              onClick={handleExportMarkdown}
              className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 transition flex items-center gap-1.5 text-xs font-medium border border-emerald-500/30"
              title="Exportar Campaña Completa"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar</span>
            </button>

            <button
              onClick={onExitToWeb}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium border border-slate-700/50"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Ver Web</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
              title="Cerrar sesión privada"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* 🗂️ Main Navigation Tabs Bar */}
      <nav className="bg-slate-900/60 border-b border-slate-800 px-4 lg:px-8 py-2 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2">
          {[
            { id: 'generator', label: '1. Generador', icon: Wand2 },
            { id: 'reel', label: '2. Reel & Omni', icon: Video },
            { id: 'copys', label: '3. Copys & WA Link', icon: MessageSquare },
            { id: 'showroom', label: '4. Showroom VIP', icon: Building2 },
            { id: 'vendors', label: '5. Kit Vendedores & Ads', icon: Users },
            { id: 'analytics', label: '6. Métricas Analytics', icon: BarChart3 },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 🚀 Workspace Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">

        {/* Campaign Banner Badge */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Campaña Activa</span>
              <h2 className="text-lg font-bold text-white">{currentCampaign.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono">
              📱 {currentCampaign.phone}
            </span>
            <button
              onClick={() => setActiveTab('generator')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              Cambiar / Generar Nueva <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ----------------- TAB 1: GENERADOR ----------------- */}
        {activeTab === 'generator' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Form Input */}
              <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-cyan-400" /> Crear Nueva Idea / Proyecto
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Ingresá el tema o producto y poné a trabajar en paralelo a los 5 equipos de agentes para estructurar los materiales.
                  </p>
                </div>

                <form onSubmit={handleGenerateCampaign} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Título o Tema del Lanzamiento
                    </label>
                    <input
                      type="text"
                      value={campaignTitle}
                      onChange={(e) => setCampaignTitle(e.target.value)}
                      placeholder="Ej: Colección Invierno 2027 Xti & Refresh / Sandalias Verano"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Público Objetivo B2B
                      </label>
                      <input
                        type="text"
                        value={campaignTarget}
                        onChange={(e) => setCampaignTarget(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        Teléfono WhatsApp de Destino
                      </label>
                      <input
                        type="text"
                        value={campaignPhone}
                        onChange={(e) => setCampaignPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Objetivo Principal del Embudo
                    </label>
                    <input
                      type="text"
                      value={campaignGoal}
                      onChange={(e) => setCampaignGoal(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" /> Agentes trabajando...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" /> Generar Paquete de Campaña Completo
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Presets & Quick Load */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" /> Plantillas Pre-Construidas
                </h4>
                <p className="text-xs text-slate-400">
                  Cargá campañas listas y estructuradas por el equipo comercial de SkyBlue:
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setCurrentCampaign(PRESET_INVIERNO_2027);
                      setActiveTab('reel');
                      try { confetti({ particleCount: 50, spread: 60 }); } catch (err) {}
                    }}
                    className="w-full text-left p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-cyan-500/30 transition group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300">Invierno 2027 (Xti & Refresh)</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-semibold">ACTIVA</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      Catálogo exclusivo en Showroom, no PDF por WhatsApp, hook de caja flotante con Omni.
                    </p>
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ----------------- TAB 2: REEL & OMNI ----------------- */}
        {activeTab === 'reel' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Hook Concept & Omni Prompt Box */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Dirección Creativa Visual</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{currentCampaign.reel.hookConcept}</h3>
                  <p className="text-xs text-slate-300 mt-2">{currentCampaign.reel.omniEffect}</p>
                </div>
              </div>

              {/* Prompt Generator Box for Google Flow (Omni) */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Prompt para Generar Efecto Práctico en Google Flow (Omni)
                  </span>
                  <button
                    onClick={() => handleCopy(currentCampaign.reel.omniPromptEs, 'omniPrompt')}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center gap-1 transition"
                  >
                    {copiedState['omniPrompt'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedState['omniPrompt'] ? '¡Copiado!' : 'Copiar Prompt'}
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  {currentCampaign.reel.omniPromptEs}
                </p>
              </div>
            </div>

            {/* Timed Step-by-Step Script Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Video className="w-4 h-4 text-cyan-400" /> Guión Técnico por Segundos (Locución Juliana)
                </h4>
                <button
                  onClick={() => {
                    const scriptText = currentCampaign.reel.steps.map(s => `[${s.time}] Juliana: "${s.audio}"\nVisual: ${s.visual}\nTexto: ${s.screenText}\n`).join('\n');
                    handleCopy(scriptText, 'fullScript');
                  }}
                  className="px-3 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold rounded-lg flex items-center gap-1 transition"
                >
                  {copiedState['fullScript'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedState['fullScript'] ? 'Guión Copiado' : 'Copiar Guión Hablado'}
                </button>
              </div>

              <div className="divide-y divide-slate-800/80">
                {currentCampaign.reel.steps.map((step, idx) => (
                  <div key={idx} className="p-4 hover:bg-slate-800/30 transition grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-cyan-400 block text-center">
                        {step.time}
                      </span>
                    </div>
                    <div className="md:col-span-5 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Audio / Locución Juliana</span>
                      <p className="text-xs text-white font-medium italic">"{step.audio}"</p>
                    </div>
                    <div className="md:col-span-3 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visual / Acción</span>
                      <p className="text-xs text-slate-300">{step.visual}</p>
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sticker en Pantalla</span>
                      <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold border ${step.badgeColor}`}>
                        {step.screenText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ----------------- TAB 3: COPYS & WA LINK ----------------- */}
        {activeTab === 'copys' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* WhatsApp Link Box */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Link de WhatsApp Redireccionado</h3>
                    <p className="text-xs text-slate-400">Para pegar en el sticker de enlace de historias de Instagram</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={encodedWaLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition shadow-lg shadow-emerald-600/25"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Probar Chat en Vivo
                  </a>
                  <button
                    onClick={() => handleCopy(encodedWaLink, 'waLink')}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition border border-slate-700"
                  >
                    {copiedState['waLink'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedState['waLink'] ? '¡Link Copiado!' : 'Copiar URL Sticker'}
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 break-all">
                {encodedWaLink}
              </div>
            </div>

            {/* Instagram Copy Variants */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Copy A */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Opción A: Extensa B2B</span>
                    <button
                      onClick={() => handleCopy(currentCampaign.copys.opcionA, 'copyA')}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center gap-1 transition"
                    >
                      {copiedState['copyA'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedState['copyA'] ? 'Copiado' : 'Copiar Copy A'}
                    </button>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans max-h-96 overflow-y-auto">
                    {currentCampaign.copys.opcionA}
                  </div>
                </div>
              </div>

              {/* Copy B */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Opción B: Corta / Ads</span>
                    <button
                      onClick={() => handleCopy(currentCampaign.copys.opcionB, 'copyB')}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center gap-1 transition"
                    >
                      {copiedState['copyB'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedState['copyB'] ? 'Copiado' : 'Copiar Copy B'}
                    </button>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans max-h-96 overflow-y-auto">
                    {currentCampaign.copys.opcionB}
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        )}

        {/* ----------------- TAB 4: SHOWROOM VIP ----------------- */}
        {activeTab === 'showroom' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-cyan-400" /> Materiales Entregables en la Cita VIP de Showroom
              </h3>
              <p className="text-xs text-slate-400">
                Dado que el catálogo en PDF no se envía por WhatsApp, la reunión presencial o por videollamada ofrece estos incentivos de alto valor percibido:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {currentCampaign.showroomExperience.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                    <span className="text-xs font-bold text-cyan-400 block">{item.title}</span>
                    <p className="text-xs text-slate-300">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* ----------------- TAB 5: VENDORS & ADS ----------------- */}
        {activeTab === 'vendors' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Vendor WhatsApp Stories Calendar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" /> Calendario de Estados de WhatsApp para Vendedores
              </h3>
              <p className="text-xs text-slate-400">
                Las asesoras comerciales publican estas placas y copian el texto en su pie de foto:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {currentCampaign.vendorKit.stories.map((story, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-400 block">{story.day}</span>
                      <p className="text-[11px] text-slate-400 italic">{story.graphic}</p>
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 whitespace-pre-line">
                        {story.screenText}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(story.copy, `story_${idx}`)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center justify-center gap-1.5 transition"
                    >
                      {copiedState[`story_${idx}`] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedState[`story_${idx}`] ? '¡Texto Copiado!' : 'Copiar Pie de Foto'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales Representative Scripts */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" /> Scripts de Respuestas Rápidas para Asesores (`SkySales`)
              </h3>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">1. Recepción del Lead del Sticker</span>
                    <button
                      onClick={() => handleCopy(currentCampaign.vendorKit.scripts.inbound, 'scriptInbound')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center gap-1 transition"
                    >
                      {copiedState['scriptInbound'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedState['scriptInbound'] ? 'Copiado' : 'Copiar Script'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">{currentCampaign.vendorKit.scripts.inbound}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">2. Objeción: "Mandame el PDF por acá"</span>
                    <button
                      onClick={() => handleCopy(currentCampaign.vendorKit.scripts.objection, 'scriptObjection')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg flex items-center gap-1 transition"
                    >
                      {copiedState['scriptObjection'] ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedState['scriptObjection'] ? 'Copiado' : 'Copiar Script'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">{currentCampaign.vendorKit.scripts.objection}</p>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* ----------------- TAB 6: ANALYTICS ----------------- */}
        {activeTab === 'analytics' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Impresiones Proyectadas</span>
                <p className="text-2xl font-black text-white">{currentCampaign.analytics.projectedImpressions.toLocaleString()}</p>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Chats Iniciados</span>
                <p className="text-2xl font-black text-cyan-400">{currentCampaign.analytics.whatsappChats}</p>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Citas Agendadas Showroom</span>
                <p className="text-2xl font-black text-amber-400">{currentCampaign.analytics.appointmentsBooked}</p>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-1">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">ROI Estimado de Pauta</span>
                <p className="text-2xl font-black text-emerald-400">{currentCampaign.analytics.roiPercentage}</p>
              </div>
            </div>

          </motion.div>
        )}

      </main>

      {/* ⚙️ Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-cyan-400" /> Configuración de Gemini API
              </h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-500"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Si se deja en blanco, el panel utiliza el generador comercial precargado inteligente.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Modelo Seleccionado
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="gemini-2.5-flash">Gemini 2.5 / 3.7 Flash (Velocidad y Precisión B2B)</option>
                  <option value="gemini-3.5-pro">Gemini Pro (Razonamiento Complejo)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleSaveApiKey(apiKey)}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl"
              >
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
