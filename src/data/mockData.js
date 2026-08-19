// Data source for SkyBlue Calzado Mayorista B2B Portal

export const COMPANY_INFO = {
  name: "SkyBlue Calzado Mayorista",
  slogan: "Distribuidor Oficial B2B de Calzado y Marroquinería Internacional",
  cuit: "30-71689234-8",
  city: "Buenos Aires, Argentina",
  b2bPlatformUrl: "https://mayoristas.skyblue.com.ar/",
  showroom: {
    address: "Curapaligüe 1428 - 1er Piso, Tapiales, Buenos Aires",
    city: "Tapiales (La Matanza, Buenos Aires)",
    schedule: "Lunes a Viernes de 08:00 a 17:00 hs",
    requirement: "Cita previa obligatoria coordinada por WhatsApp con Juliana",
    googleMapsQuery: "Curapaligüe 1428, Tapiales, Buenos Aires"
  },
  retailStores: [
    {
      name: "Local Minorista Tapiales",
      address: "Curapaligüe 1428, Tapiales (Buenos Aires)",
      type: "Venta al Público Minorista",
      city: "Tapiales"
    },
    {
      name: "Local Minorista Cañuelas",
      address: "Av. Libertad 1190, Cañuelas (Buenos Aires)",
      type: "Venta al Público Minorista",
      city: "Cañuelas"
    }
  ],
  defaultDiscount: 10, // 10% adicional abonando en efectivo, transferencia o depósito
  minimumPurchase: "1 módulo (8 o 12 pares) por modelo",
  instagram: "@skyblue.mayorista",
  facebook: "SkyBlueCalzadoMayorista",
  email: "ventas@skybluecalzado.com.ar",
  siteUrl: "https://skybluecalzado.com.ar"
};

export const ADVISORS = [
  {
    id: "juliana",
    name: "Juliana",
    role: "Asesora Comercial Senior & Showroom",
    specialty: "Calzado Dama, Colecciones Xti, Coordinación de Visitas al Showroom y Grandes Cuentas",
    phone: "+54 9 11 3891-6779",
    cleanPhone: "5491138916779",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    status: "En línea",
    responseTime: "Responde en < 5 min",
    defaultMessage: "¡Hola Juliana! Vengo de la web de SkyBlue Calzado Mayorista y quiero consultar el catálogo y coordinar mi compra por módulos."
  },
  {
    id: "jesica",
    name: "Jesica",
    role: "Asesora Comercial - Interior & Kids",
    specialty: "Línea XTI Kids, Marroquinería Petite Jolie, Giulia Domna y Envíos por Expreso al Interior",
    phone: "+54 9 11 3093-6075",
    cleanPhone: "5491130936075",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    status: "En línea",
    responseTime: "Responde en < 10 min",
    defaultMessage: "¡Hola Jesi! Vengo de la web mayorista de SkyBlue. Quiero consultar stock por módulos y despachos al interior para mi negocio."
  },
  {
    id: "marcelino",
    name: "Marcelino",
    role: "Asesor Comercial - Cuentas Corporativas",
    specialty: "Distribución Mayorista, Apertura de Cuentas B2B y Pedidos por Volumen para Cadenas",
    phone: "+54 9 11 3658-2482",
    cleanPhone: "5491136582482",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    status: "En línea",
    responseTime: "Responde en < 10 min",
    defaultMessage: "¡Hola Marcelino! Quiero solicitar información mayorista y alta de cuenta en la plataforma B2B de SkyBlue Calzado."
  }
];

export const BRANDS = [
  {
    id: "xti",
    name: "Xti",
    country: "España 🇪🇸",
    origin: "Moda Europea y Vanguardia Urbana",
    ambassador: "María Becerra",
    logoSvg: "/logos/Xti.svg",
    description: "Marca líder internacional de calzado urbano y diseño contemporáneo. Con María Becerra como embajadora oficial, Xti tracciona clientas de forma masiva a zapaterías y showrooms de todo el país.",
    categories: ["Calzado de Dama", "Calzado de Caballero", "XTI Kids", "Marroquinería"],
    badge: "María Becerra Oficial",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
    uspList: [
      "Embajadora oficial de marca: María Becerra",
      "Venta por módulo de 8 o 12 pares balanceados",
      "Confección europea con suelas antideslizantes y calce anatómico",
      "Material gráfico oficial provisto para vidrieras y redes"
    ]
  },
  {
    id: "refresh",
    name: "Refresh",
    country: "España 🇪🇸",
    origin: "Casual Wear & Street Style",
    ambassador: "Línea Juvenil",
    logoSvg: "/logos/Refresh.svg",
    description: "La marca joven española de referencia. Modelos versátiles, zapatillas livianas, calzado de media estación y sandalias que garantizan una rotación continua en escaparate.",
    categories: ["Calzado Femenino", "Zapatillas Urbanas", "Sandalias Casual"],
    badge: "Alta Rotación",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    uspList: [
      "Calzado ultraliviano de uso cotidiano",
      "Excelente relación margen-rotación minorista",
      "Modelos street chic ideales para vidriera",
      "Módulos accesibles para rápida reposición"
    ]
  },
  {
    id: "petite-jolie",
    name: "Petite Jolie",
    country: "Brasil 🇧🇷",
    origin: "Marroquinería y Calzado en J-Lastic®",
    ambassador: "Diseño & Aroma Icónico",
    logoSvg: "/logos/Petite.svg",
    description: "Marca icónica de Brasil famosa por su tecnología exclusiva en J-Lastic® (PVC patentado), colores intensos, resistencia al agua y su característica fragancia que genera atracción inmediata en el punto de venta.",
    categories: ["Carteras & Bolsos", "Mochilas & Bandoleras", "Calzado Dama", "Charms Coleccionables"],
    badge: "Aroma & J-Lastic®",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    uspList: [
      "Material exclusivo J-Lastic® impermeable y lavable",
      "Fragancia dulce inconfundible en cada producto",
      "Línea de charms y accesorios de venta por impulso",
      "Carteras estructuradas de alto valor percibido"
    ]
  },
  {
    id: "giulia-domna",
    name: "Giulia Domna",
    country: "Brasil 🇧🇷",
    origin: "Calzado Premium en Cuero y Alta Moda",
    ambassador: "Línea Sofisticada",
    logoSvg: "/logos/Giulia Domna - Texto.svg",
    description: "Línea brasileña de calzado de lujo y diseño refinado. Confeccionada con cueros seleccionados, texturas nobles y detalles de alta costura pensados para boutiques y zapaterías de segmento medio-alto.",
    categories: ["Calzado en Cuero", "Sandalias de Fiesta", "Zapatos de Vestir"],
    badge: "Cuero & Elegancia",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    uspList: [
      "Confección en cuero legítimo de exportación",
      "Diseños elegantes con herrajes de alta gama",
      "Plantillas confort acolchadas de densidad superior",
      "Margen premium para zapaterías boutique"
    ]
  }
];

export const BANNERS = [
  {
    id: 1,
    tag: "CAMPAÑA GLOBAL 2026",
    title: "MARÍA BECERRA × XTI",
    subtitle: "Incorporá a tu zapatería la marca internacional que genera demanda espontánea de tus clientas.",
    benefitBadge: "🔥 Alta Demanda Comprobada",
    ctaText: "Ver Colección Xti",
    categoryLink: "marcas",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
    highlight: "Venta exclusiva por módulos mayoristas de 8 o 12 pares"
  },
  {
    id: 2,
    tag: "CONDICIÓN MAYORISTA",
    title: "MÓDULOS DE 8 Y 12 PARES",
    subtitle: "Mínimos de compra optimizados para comerciantes. Despacho ágil en 24 a 48 hs hábiles a todo el país.",
    benefitBadge: "📦 Curvas Comerciales",
    ctaText: "Conocer Condiciones",
    categoryLink: "condiciones",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1200&q=80",
    highlight: "10% adicional por pago efectivo, transferencia o depósito"
  },
  {
    id: 3,
    tag: "TENDENCIA BRASIL",
    title: "PETITE JOLIE & GIULIA DOMNA",
    subtitle: "Bolsos en J-Lastic®, charms coleccionables y calzado en cuero legítimo de máxima sofisticación.",
    benefitBadge: "🌸 Exclusividad y Aroma",
    ctaText: "Ver Marroquinería",
    categoryLink: "marcas",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
    highlight: "Productos con alto valor percibido y rotación garantizada"
  },
  {
    id: 4,
    tag: "SHOWROOM EXCLUSIVO",
    title: "SHOWROOM TAPIALES CITA PREVIA",
    subtitle: "Vení a conocer más de 300 modelos exhibidos en Curapaligüe 1428 (1er Piso). Lunes a viernes de 08:00 a 17:00 hs.",
    benefitBadge: "📍 Cita Previa con Juliana",
    ctaText: "Agendar Visita Showroom",
    categoryLink: "showroom",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    highlight: "Atención comercial VIP y café de cortesía"
  }
];

export const CATEGORIES = [
  {
    id: "dama",
    name: "Calzado de Dama",
    description: "Botas, botinetas, sandalias, plataformas, mocasines y zapatillas urbanas de gran demanda.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    itemCount: "+120 Modelos",
    moduleInfo: "Módulos de 8 o 12 pares (35 al 40)",
    brandTags: ["Xti", "Refresh", "Giulia Domna"]
  },
  {
    id: "caballero",
    name: "Calzado de Caballero",
    description: "Línea urbana, zapatillas confort, calzado casual y modelos clásicos con suelas durables.",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    itemCount: "+60 Modelos",
    moduleInfo: "Módulos de 8 o 12 pares (39 al 44)",
    brandTags: ["Xti Men", "Refresh"]
  },
  {
    id: "ninos",
    name: "Calzado de Niños (XTI Kids)",
    description: "Colegiales reforzados, zapatillas urbanas resistentes y calzado ergonómico para chicos.",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80",
    itemCount: "+80 Modelos",
    moduleInfo: "Módulos de 8 o 12 pares (28 al 36)",
    brandTags: ["XTI Kids"]
  },
  {
    id: "marroquineria",
    name: "Marroquinería & Bolsos",
    description: "Carteras de mano, bandoleras, mochilas urbanas y bolsos impermeables en J-Lastic®.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
    itemCount: "+90 Modelos",
    moduleInfo: "Packs surtidos de 4 a 6 unidades",
    brandTags: ["Petite Jolie", "Xti Bags"]
  },
  {
    id: "accesorios",
    name: "Accesorios & Charms",
    description: "Charms coleccionables Petite Jolie, billeteras, valijas y complementos para el mostrador.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    itemCount: "+50 Modelos",
    moduleInfo: "Exhibidores surtidos por docena",
    brandTags: ["Petite Jolie", "SkyBlue"]
  }
];

// 12 Selected Products displayed in 6 columns on desktop
export const PRODUCTS_FEATURED = [
  {
    id: "xti-boot-01",
    name: "Bota Urbana Plataforma XTI María Becerra",
    brand: "Xti",
    category: "dama",
    module: "Módulo 8 o 12 pares (35 al 40)",
    profitMargin: "Margen x2.2",
    badge: "Top Ventas",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80",
    altText: "Bota urbana con plataforma marca XTI oficial María Becerra venta mayorista por módulo",
    tags: ["Campaña Oficial", "Plataforma"]
  },
  {
    id: "pj-bag-01",
    name: "Cartera Petite Jolie Bloom J-Lastic®",
    brand: "Petite Jolie",
    category: "marroquineria",
    module: "Pack 4 unidades surtidas",
    profitMargin: "Margen x2.4",
    badge: "Aroma Icónico",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80",
    altText: "Cartera estructurada Petite Jolie material J-Lastic impermeable por mayor",
    tags: ["J-Lastic®", "Impermeable"]
  },
  {
    id: "xti-kids-01",
    name: "Zapatilla Urbana XTI Kids Reforzada",
    brand: "Xti",
    category: "ninos",
    module: "Módulo 8 o 12 pares (28 al 35)",
    profitMargin: "Margen x2.0",
    badge: "Alta Rotación",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=500&q=80",
    altText: "Zapatilla infantil reforzada XTI Kids venta mayorista para zapaterías",
    tags: ["XTI Kids", "Urbana"]
  },
  {
    id: "refresh-sneaker-01",
    name: "Zapatilla Chunky Refresh Sporty",
    brand: "Refresh",
    category: "dama",
    module: "Módulo 8 o 12 pares (35 al 40)",
    profitMargin: "Margen x2.1",
    badge: "Tendencia",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80",
    altText: "Zapatilla deportiva casual Refresh para mujer venta mayorista",
    tags: ["Ultraliviana", "Street"]
  },
  {
    id: "gd-leather-01",
    name: "Sandalia Cuero Legítimo Giulia Domna",
    brand: "Giulia Domna",
    category: "dama",
    module: "Módulo 8 o 12 pares (35 al 40)",
    profitMargin: "Margen x2.5",
    badge: "Cuero Premium",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80",
    altText: "Sandalia de vestir en cuero legítimo Giulia Domna distribución mayorista",
    tags: ["Cuero Vacuno", "Boutique"]
  },
  {
    id: "xti-men-01",
    name: "Zapatilla Casual XTI Men Comfort",
    brand: "Xti",
    category: "caballero",
    module: "Módulo 8 o 12 pares (39 al 44)",
    profitMargin: "Margen x2.2",
    badge: "Clásico",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80",
    altText: "Calzado urbano para hombre XTI Men venta por curva cerrada mayorista",
    tags: ["Plantilla Memory", "Hombre"]
  },
  {
    id: "pj-backpack-01",
    name: "Mochila Petite Jolie Kit J-Lastic®",
    brand: "Petite Jolie",
    category: "marroquineria",
    module: "Pack 4 unidades surtidas",
    profitMargin: "Margen x2.3",
    badge: "Moda Brasil",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80",
    altText: "Mochila urbana Petite Jolie impermeable con aroma exclusivo",
    tags: ["Mochila", "Lavable"]
  },
  {
    id: "pj-charms-01",
    name: "Exhibidor Charms Petite Jolie",
    brand: "Petite Jolie",
    category: "accesorios",
    module: "Exhibidor 24 piezas",
    profitMargin: "Margen x2.5",
    badge: "Impulso",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=500&q=80",
    altText: "Charms coleccionables Petite Jolie para llaveros y carteras por mayor",
    tags: ["Coleccionable", "Ticket +"]
  },
  {
    id: "xti-sandal-01",
    name: "Sandalia Plataforma Yute Xti",
    brand: "Xti",
    category: "dama",
    module: "Módulo 8 o 12 pares (35 al 40)",
    profitMargin: "Margen x2.2",
    badge: "Temporada",
    image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=500&q=80",
    altText: "Sandalia de verano con plataforma de yute marca XTI para zapaterías",
    tags: ["Verano", "Plataforma"]
  },
  {
    id: "refresh-boot-01",
    name: "Borcego Urbano Refresh Classic",
    brand: "Refresh",
    category: "dama",
    module: "Módulo 8 o 12 pares (35 al 40)",
    profitMargin: "Margen x2.1",
    badge: "Otoño/Invierno",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=500&q=80",
    altText: "Borcegos urbanos con cordones Refresh para comercio minorista",
    tags: ["Borcego", "Tendencia"]
  },
  {
    id: "gd-pump-01",
    name: "Zapato Stiletto Cuero Giulia Domna",
    brand: "Giulia Domna",
    category: "dama",
    module: "Módulo 8 o 12 pares (35 al 40)",
    profitMargin: "Margen x2.4",
    badge: "Alta Noche",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80",
    altText: "Zapato de tacón elegante en cuero vacuno Giulia Domna mayorista",
    tags: ["Fiesta", "Cuero"]
  },
  {
    id: "xti-sneaker-men-02",
    name: "Zapatilla Urbana XTI Men Retro",
    brand: "Xti",
    category: "caballero",
    module: "Módulo 8 o 12 pares (39 al 44)",
    profitMargin: "Margen x2.2",
    badge: "Novedad",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=80",
    altText: "Zapatilla retro urbana para hombre XTI Men venta por bulto mayorista",
    tags: ["Retro", "Suela Antideslizante"]
  }
];

export const BENEFITS = [
  {
    id: "margen",
    icon: "TrendingUp",
    title: "Márgenes de x2.0 a x2.5",
    subtitle: "Rentabilidad Neta Comprobada",
    description: "Precios directos de distribuidor oficial para que tu zapatería o showroom duplique su inversión en cada curva vendida."
  },
  {
    id: "marketing",
    icon: "Camera",
    title: "Kit de Marketing HD Gratuito",
    subtitle: "Fotos y Videos Listos para Publicar",
    description: "Te entregamos fotos de estudio en alta resolución, videos para Reels/TikTok y gráficas comerciales para tus redes y estados de WhatsApp."
  },
  {
    id: "embajadora",
    icon: "Star",
    title: "Impulso de María Becerra",
    subtitle: "Demanda Masiva en tu Vidriera",
    description: "La exposición masiva de la artista internacional vistiendo Xti genera que las clientas busquen los modelos directamente en tu comercio."
  },
  {
    id: "descuento",
    icon: "Percent",
    title: "10% Adicional en tu Pago",
    subtitle: "Beneficio Financiero Mayorista",
    description: "Ahorro del 10% adicional abonando en efectivo, transferencia bancaria o depósito, aplicable sobre la liquidación de tu pedido."
  },
  {
    id: "logistica",
    icon: "Truck",
    title: "Despachos en 24 a 48 hs",
    subtitle: "Envíos Asegurados a Todo el País",
    description: "Embalaje reforzado y entrega puntual en el transporte o expreso de tu preferencia con número de guía y remito asegurado."
  },
  {
    id: "asesoria",
    icon: "Users",
    title: "Asesores Dedicados por WhatsApp",
    subtitle: "Juliana, Jesica y Marcelino",
    description: "Atención comercial personalizada para armar tus módulos, consultar disponibilidad de stock y coordinar reposiciones ágiles."
  }
];

export const REELS_DATA = [
  {
    id: "reel-1",
    title: "Prueba de Flexibilidad y Suela Xti",
    category: "Calzado Dama",
    views: "42.8K",
    likes: "2.4K",
    duration: "0:24",
    poster: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80",
    description: "Mirá la calidad de confección, costuras reforzadas y amortiguación de la bota Xti elegida por María Becerra.",
    tag: "Calidad en Vivo",
    altText: "Video vertical demostrando flexibilidad y calidad del calzado Xti para comerciantes"
  },
  {
    id: "reel-2",
    title: "Unboxing de Módulo XTI Kids",
    category: "XTI Kids",
    views: "29.1K",
    likes: "1.8K",
    duration: "0:30",
    poster: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=400&q=80",
    description: "Así viene embalada la caja máster con numeración del 28 al 35 lista para exhibir en tu estantería.",
    tag: "Módulo Mayorista",
    altText: "Unboxing de módulo de 8 pares de calzado infantil XTI Kids embalado de fábrica"
  },
  {
    id: "reel-3",
    title: "Marroquinería Petite Jolie en J-Lastic®",
    category: "Marroquinería",
    views: "58.4K",
    likes: "3.9K",
    duration: "0:20",
    poster: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80",
    description: "Descubrí el brillo inalterable, la flexibilidad total y la fragancia exclusiva de las carteras Petite Jolie.",
    tag: "Tendencia Brasil",
    altText: "Muestra en video de carteras Petite Jolie con material impermeable J-Lastic"
  },
  {
    id: "reel-4",
    title: "Tour Showroom Mayorista Tapiales",
    category: "Showroom",
    views: "35.2K",
    likes: "2.1K",
    duration: "0:35",
    poster: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80",
    description: "Recorré nuestro espacio exclusivo en Curapaligüe 1428 (1er Piso, Tapiales) con más de 300 modelos exhibidos.",
    tag: "Experiencia VIP",
    altText: "Recorrido en video por el Showroom mayorista de SkyBlue Calzado en Tapiales Buenos Aires"
  }
];

export const BLOG_POSTS = [
  {
    id: 1,
    slug: "impacto-maria-becerra-xti-zapaterias",
    title: "Cómo la imagen de María Becerra con Xti potencia las ventas de tu zapatería",
    excerpt: "Estrategias de vidriera, marketing digital local y colocación de producto para capitalizar la campaña internacional de Xti España en tu negocio.",
    date: "18 Agosto 2026",
    readTime: "4 min de lectura",
    category: "Marketing B2B",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    altText: "Vidriera de zapatería exhibiendo calzado Xti con imagen de María Becerra"
  },
  {
    id: 2,
    slug: "gestion-modulos-curvas-calzado-sin-sobrantes",
    title: "5 Claves para gestionar módulos de calzado de 8 y 12 pares sin quedarte con pares clavados",
    excerpt: "Aprende a balancear la compra de numeraciones centrales (37-38-39) y organizar promociones cruzadas con accesorios Petite Jolie.",
    date: "12 Agosto 2026",
    readTime: "5 min de lectura",
    category: "Gestión Comercial",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=600&q=80",
    altText: "Organización de cajas de calzado por curva y módulo en depósito mayorista"
  },
  {
    id: 3,
    slug: "marroquineria-jlastic-petite-jolie-rentabilidad",
    title: "Marroquinería en J-Lastic®: Por qué Petite Jolie es el producto estrella de impulso",
    excerpt: "Análisis del comportamiento del consumidor ante productos impermeables, coleccionables y aromáticos para maximizar el ticket promedio en caja.",
    date: "05 Agosto 2026",
    readTime: "3 min de lectura",
    category: "Tendencias",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    altText: "Bolsos y carteras Petite Jolie exhibidos en tienda de moda"
  }
];

export const REELS = [
  {
    id: "reel-1",
    title: "Nueva Colección María Becerra × XTI Primavera/Verano",
    category: "Línea Dama",
    brand: "XTI Oficial",
    views: "240K",
    likes: "18.4K",
    poster: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "reel-2",
    title: "Bolsos & Bandoleras Petite Jolie en J-Lastic® Impermeables",
    category: "Marroquinería",
    brand: "Petite Jolie",
    views: "185K",
    likes: "14.2K",
    poster: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "reel-3",
    title: "Unboxing Módulos Refresh Urban Shoes",
    category: "Streetwear",
    brand: "Refresh Casual",
    views: "142K",
    likes: "9.8K",
    poster: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "reel-4",
    title: "Calzado Giulia Domna en Cuero 100% Legítimo",
    category: "Alta Gama",
    brand: "Giulia Domna",
    views: "98K",
    likes: "7.1K",
    poster: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "reel-5",
    title: "XTI Kids: Curvas Escolares y Zapatillas Juveniles",
    category: "Infantil",
    brand: "XTI Kids",
    views: "115K",
    likes: "8.3K",
    poster: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80"
  }
];

export const EVENTS = [
  {
    id: "efica",
    title: "Exposición EFICA 114",
    location: "Centro Costa Salguero, CABA",
    date: "Próxima Edición de Temporada",
    badge: "Feria Nacional",
    description: "Presentación oficial de las nuevas colecciones mayoristas de Xti, Refresh, Petite Jolie y Giulia Domna ante comerciantes de todo el país.",
    stand: "Stand Principal SkyBlue - Pabellón A"
  },
  {
    id: "exical",
    title: "Feria EXICAL Córdoba",
    location: "Centro de Convenciones Córdoba",
    date: "Próxima Edición Centro del País",
    badge: "Interior Federal",
    description: "Encuentro comercial con zapaterías y boutiques de Córdoba, Santa Fe, Cuyo y el NOA para pedidos por módulos de 8 y 12 pares.",
    stand: "Stand SkyBlue Marcas Oficiales"
  },
  {
    id: "gira-norte",
    title: "Showrooms Itinerantes Interior",
    location: "Tucumán, Salta, Rosario & Mendoza",
    date: "Fechas Programadas de Gira",
    badge: "Gira Exclusiva",
    description: "Nuestros asesores comerciales viajan a las principales plazas del interior con muestrarios completos para que armes tus pedidos sin viajar.",
    stand: "Salones de Eventos Hoteleros"
  }
];

export const FAQS = [
  {
    question: "¿Cuál es el mínimo de compra en calzado?",
    answer: "El mínimo de compra en calzado es de 1 módulo (8 o 12 pares) por modelo y color. Los módulos vienen con las numeraciones comerciales más vendidas (del 35 al 40 en dama, 39 al 44 en hombre o 28 al 35 en kids). En marroquinería y accesorios manejamos packs surtidos a partir de 4 unidades.",
    category: "minimos"
  },
  {
    question: "¿Cuáles son los requisitos para comprar en SkyBlue Mayorista?",
    answer: "Somos distribuidores exclusivamente mayoristas B2B. Para acceder a la lista de precios y compras, solicitamos contar con CUIT comercial, local a la calle, showroom o actividad de reventa activa. El alta es inmediata ingresando en nuestra plataforma B2B (https://mayoristas.skyblue.com.ar/) o contactando a nuestras asesoras por WhatsApp.",
    category: "requisitos"
  },
  {
    question: "¿Por qué no se muestran los precios de los productos en la web pública?",
    answer: "Para proteger la rentabilidad y el precio de venta al público de nuestros clientes comerciantes, no publicamos listas de precios abiertas. Los comerciantes pueden solicitar su cuenta en https://mayoristas.skyblue.com.ar/ cargando sus datos personales y de empresa para acceder al catálogo completo con precios mayoristas.",
    category: "precios"
  },
  {
    question: "¿Cómo funciona el 10% de descuento adicional por pago al contado o transferencia?",
    answer: "Si abonas tu pedido mayorista en efectivo en nuestro showroom de Tapiales, mediante transferencia bancaria o depósito bancario, se aplica un 10% de descuento adicional sobre la liquidación de tu compra, aumentando de inmediato tu margen de ganancia neta.",
    category: "pagos"
  },
  {
    question: "¿Dónde queda el Showroom Mayorista y cómo puedo visitarlo?",
    answer: "Nuestro Showroom Mayorista está ubicado en Curapaligüe 1428 - 1er Piso, Tapiales (Buenos Aires). Atendemos de lunes a viernes de 08:00 a 17:00 hs. Requiere cita previa obligatoria coordinada por WhatsApp con nuestra asesora Juliana para brindarte atención personalizada.",
    category: "showroom"
  },
  {
    question: "¿Dónde están ubicados los locales a la calle para compras minoristas?",
    answer: "Nuestros locales comerciales de venta al público minorista están ubicados en: 1) Curapaligüe 1428, Tapiales (Buenos Aires) y 2) Av. Libertad 1190, Cañuelas (Buenos Aires).",
    category: "locales"
  },
  {
    question: "¿Cómo realizan los envíos al interior y cuánto demoran?",
    answer: "Despachamos de lunes a viernes por el expreso o transporte terrestre de tu preferencia (Vía Cargo, Cruz del Sur, Expreso Luján, etc.). Los pedidos se entregan en el transporte dentro de las 24 a 48 hs hábiles tras confirmarse el pago, y enviamos el remito con número de guía de seguimiento.",
    category: "envios"
  },
  {
    question: "¿Cómo accedo al material de marketing y fotos de María Becerra para mis redes?",
    answer: "Al darte de alta como cliente mayorista de SkyBlue, tu asesora te otorga acceso a nuestro Google Drive VIP con fotos de estudio en alta resolución, videos verticales listos para publicar en Instagram/TikTok y gráficas oficiales de las campañas de Xti con María Becerra, Refresh, Petite Jolie y Giulia Domna.",
    category: "marketing"
  },
  {
    question: "¿Tienen garantía por fallas de fabricación?",
    answer: "Todos los módulos pasan por control de calidad previo al embalaje y cuentan con garantía oficial de distribuidor por defectos de fabricación, gestionando el recambio en tu siguiente pedido.",
    category: "garantia"
  }
];

// Complete SEO Configurations for each section / page
export const SEO_PAGES = {
  inicio: {
    path: "/",
    metaTitle: "SkyBlue Calzado Mayorista | Distribuidor Oficial B2B Argentina",
    metaDescription: "Distribuidora mayorista de calzado en Argentina por módulos de 8 y 12 pares. Marcas oficiales Xti con María Becerra, Refresh, Petite Jolie y Giulia Domna con CUIT.",
    h1: "Distribución Mayorista de Calzado y Marroquinería Internacional en Argentina",
    searchIntent: "Comprar calzado por mayor en Argentina para zapaterías, showrooms y locales de moda con marcas oficiales y venta por módulos.",
    tldr: [
      "Venta exclusiva a comerciantes con CUIT por módulos de 8 o 12 pares.",
      "Distribuidor oficial de Xti (España feat. María Becerra), Refresh, Petite Jolie (Brasil) y Giulia Domna.",
      "10% de descuento adicional en pagos por efectivo, transferencia o depósito bancario.",
      "Plataforma B2B exclusiva con acceso privado a precios en mayoristas.skyblue.com.ar.",
      "Showroom mayorista en Curapaligüe 1428 (Tapiales) con cita previa de 08:00 a 17:00 hs."
    ],
    topicCluster: "Calzado Mayorista Argentina B2B"
  },
  marcas: {
    path: "/marcas-oficiales",
    metaTitle: "Marcas Oficiales de Calzado Mayorista | Xti, Refresh, Petite Jolie, Giulia Domna",
    metaDescription: "Conocé las marcas internacionales representadas por SkyBlue: Xti España con María Becerra, Refresh, Petite Jolie en J-Lastic® y Giulia Domna en cuero vacuno.",
    h1: "Marcas Internacionales Oficiales de Calzado y Marroquinería en Argentina",
    searchIntent: "Descubrir las marcas oficiales distribuidas por SkyBlue, especificaciones de calce, materiales y respaldo publicitario.",
    tldr: [
      "Xti España: Colección de moda urbana internacional con María Becerra como embajadora oficial.",
      "Refresh España: Streetwear juvenil y calzado ultraliviano de alta rotación.",
      "Petite Jolie Brasil: Bolsos y calzado en J-Lastic® impermeable con aroma icónico.",
      "Giulia Domna Brasil: Calzado boutique confeccionado en cuero legítimo de exportación."
    ],
    topicCluster: "Marcas de Calzado B2B"
  },
  catalogo: {
    path: "/catalogo-mayorista",
    metaTitle: "Catálogo Mayorista por Módulos de Calzado B2B | SkyBlue",
    metaDescription: "Explorá calzado de dama, caballero, niños XTI Kids y marroquinería por módulos de 8 y 12 pares. Acceso a plataforma B2B mayoristas.skyblue.com.ar.",
    h1: "Catálogo de Calzado Mayorista por Módulos de 8 y 12 Pares",
    searchIntent: "Ver colecciones mayoristas de calzado, composición de módulos por talles y solicitar cuenta para ver precios de fábrica.",
    tldr: [
      "Composición de curvas en módulos de 8 o 12 pares para optimizar el inventario sin sobrantes.",
      "Líneas disponibles: Dama (35-40), Caballero (39-44), XTI Kids (28-35), Marroquinería y Accesorios.",
      "Sin precios visibles al público para resguardar el margen del comerciante minorista.",
      "Acceso directo a la plataforma de pedidos en https://mayoristas.skyblue.com.ar/."
    ],
    topicCluster: "Catálogo de Calzado Mayorista"
  },
  beneficios: {
    path: "/beneficios-rentabilidad",
    metaTitle: "Márgenes y Beneficios Mayoristas B2B | Calculadora SkyBlue",
    metaDescription: "Calculá tu rentabilidad con márgenes de x2.0 a x2.5 en calzado. Kit de marketing HD gratuito, impulso de María Becerra y despachos en 24/48hs.",
    h1: "Beneficios Comerciales y Calculadora de Margen de Ganancia Mayorista",
    searchIntent: "Calcular rentabilidad de compra mayorista de calzado, ahorro por 10% OFF y herramientas de venta provistas.",
    tldr: [
      "Márgenes reales de ganancia entre x2.0 (100%) y x2.5 (150%) sobre el costo mayorista.",
      "Kit digital de marketing incluido gratis: fotos en estudio HD y reels verticales editados.",
      "Ahorro directo del 10% pagando por transferencia, depósito o efectivo.",
      "Despachos rápidos en 24 a 48 hs por expresos a todas las provincias argentinas."
    ],
    topicCluster: "Rentabilidad B2B Zapaterías"
  },
  showroom: {
    path: "/showroom-tapiales",
    metaTitle: "Showroom Mayorista Tapiales y Locales Minoristas | SkyBlue Calzado",
    metaDescription: "Visitá nuestro Showroom B2B en Curapaligüe 1428 (Tapiales, 1er piso) con cita previa. Locales minoristas en Tapiales y Av. Libertad 1190 (Cañuelas).",
    h1: "Showroom Mayorista Exclusivo en Tapiales y Locales a la Calle",
    searchIntent: "Conocer la ubicación del Showroom mayorista en Tapiales, horarios de atención, solicitud de cita previa y locales minoristas.",
    tldr: [
      "Showroom Mayorista: Curapaligüe 1428 (1er Piso, Tapiales, Buenos Aires).",
      "Horario de atención: Lunes a viernes de 08:00 a 17:00 hs con cita previa coordinada con Juliana.",
      "Local Minorista 1: Curapaligüe 1428, Tapiales (Buenos Aires).",
      "Local Minorista 2: Av. Libertad 1190, Cañuelas (Buenos Aires).",
      "+300 modelos exhibidos en vivo con prueba física de materiales y calce."
    ],
    topicCluster: "Showroom y Locales SkyBlue"
  },
  faq: {
    path: "/faq-mayorista",
    metaTitle: "Preguntas Frecuentes y Asesores Comerciales | SkyBlue Mayorista",
    metaDescription: "Respuestas a dudas sobre compra mínima de 1 módulo (8 o 12 pares), CUIT, 10% OFF, envíos y contacto directo con Juliana, Jesica y Marcelino.",
    h1: "Preguntas Frecuentes Mayoristas y Contacto con Asesores Comerciales",
    searchIntent: "Resolver dudas comerciales sobre requisitos con CUIT, medios de pago, tiempos de envío y contacto con asesores por WhatsApp.",
    tldr: [
      "Mínimo de compra: 1 módulo de 8 o 12 pares.",
      "Asesores directos: Juliana (+54 9 11 3891-6779), Jesica (+54 9 11 3093-6075), Marcelino (+54 9 11 3658-2482).",
      "Medios de pago: Efectivo, transferencia o depósito con 10% de descuento adicional.",
      "Envíos por expreso a toda la Argentina con despacho en 24 a 48 hs hábiles."
    ],
    topicCluster: "Soporte y Preguntas Frecuentes B2B"
  }
};
