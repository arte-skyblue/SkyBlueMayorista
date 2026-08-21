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
  shippingPolicy: "Envío 100% bonificado y gratuito en CABA y GBA. Despacho bonificado en 24/48 hs al expreso para el interior.",
  taxPolicy: "Precios de catálogo netos sin IVA. Facturación obligatoria (Factura A o B oficial con CUIT) por mercadería importada legalmente.",
  sizeGuideImage: "/assets/images/guia-de-tallas.jpeg",
  sizeCurves: {
    curve8: {
      pairs: 8,
      breakdown: "1/36 - 2/37 - 2/38 - 2/39 - 1/40",
      description: "Surtido ideal directo de fábrica concentrado en talles centrales para máxima rotación de mostrador."
    },
    curve12: {
      pairs: 12,
      breakdown: "1/35 - 2/36 - 3/37 - 3/38 - 2/39 - 1/40",
      description: "Cobertura completa de numeración con 8 pares concentrados en 37, 38 y 39."
    }
  },
  instagram: "@skyblue.mayorista",
  facebook: "SkyBlueCalzadoMayorista",
  email: "ventas@skybluecalzado.com.ar",
  siteUrl: "https://skybluecalzado.com.ar"
};

export const ADVISORS = [
  {
    id: "juliana",
    name: "Juliana",
    role: "Asesora Comercial Senior - Showroom",
    specialty: "Calzado Dama, Colecciones Xti, Coordinación de Visitas al Showroom y Grandes Cuentas",
    phone: "+54 9 11 3891-6779",
    cleanPhone: "5491138916779",
    avatar: "/images/advisors/juliana.jpg",
    status: "En línea",
    responseTime: "Responde en < 5 min",
    defaultMessage: "¡Hola Juliana! Vengo de la web de SkyBlue Calzado Mayorista y quiero consultar el catálogo y coordinar mi compra por módulos."
  },
  {
    id: "jesica",
    name: "Jesica",
    role: "Asesora Comercial - Facturación",
    specialty: "Línea XTI Kids, Marroquinería Petite Jolie, Giulia Domna y Facturación B2B",
    phone: "+54 9 11 3093-6075",
    cleanPhone: "5491130936075",
    avatar: "/images/advisors/jesica.jpg",
    status: "En línea",
    responseTime: "Responde en < 10 min",
    defaultMessage: "¡Hola Jesi! Vengo de la web mayorista de SkyBlue. Quiero consultar sobre facturación y condiciones para mi negocio."
  },
  {
    id: "marcelino",
    name: "Marcelino",
    role: "Asesor Comercial - Marketing",
    specialty: "Material Publicitario, Contenido para Redes y Acceso al Drive VIP",
    phone: "+54 9 11 3658-2482",
    cleanPhone: "5491136582482",
    avatar: "/images/advisors/marcelino.jpg",
    status: "En línea",
    responseTime: "Responde en < 10 min",
    defaultMessage: "¡Hola Marcelino! Quiero solicitar acceso al material de marketing y contenido publicitario de SkyBlue Calzado."
  }
];

export const BRANDS = [
  {
    id: "xti",
    name: "Xti",
    country: "España 🇪🇸",
    origin: "Moda Europea y Vanguardia Urbana",
    ambassador: "María Becerra",
    logoSvg: "/logos/Xti - maria becerra.svg",
    video: "/videos/brands/xti.mp4",
    description: "Marca líder internacional de calzado urbano y diseño contemporáneo. Con María Becerra como embajadora oficial, Xti tracciona clientas de forma masiva a zapaterías y showrooms de todo el país.",
    categories: ["Calzado de Dama", "Calzado de Caballero", "XTI Kids", "Marroquinería"],
    badge: "María Becerra Oficial",
    image: "/images/banners/hero-xti.jpg",
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
    logoSvg: "/logos/Refresh - Mar lucas.svg",
    video: "/videos/brands/refresh.mp4",
    description: "La marca joven española de referencia. Modelos versátiles, zapatillas livianas, calzado de media estación y sandalias que garantizan una rotación continua en escaparate.",
    categories: ["Calzado Femenino", "Zapatillas Urbanas", "Sandalias Casual"],
    badge: "Alta Rotación",
    image: "/images/banners/hero-refresh.jpg",
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
    logoSvg: "/logos/Petite jolie.svg",
    video: "/videos/brands/petite-jolie.mp4",
    description: "Marca icónica de Brasil famosa por su tecnología exclusiva en J-Lastic® (PVC patentado), colores intensos, resistencia al agua y su característica fragancia que genera atracción inmediata en el punto de venta.",
    categories: ["Carteras & Bolsos", "Mochilas & Bandoleras", "Calzado Dama", "Charms Coleccionables"],
    badge: "Aroma & J-Lastic®",
    image: "/images/banners/hero-petite-jolie.jpg",
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
    logoSvg: "/logos/Giulina domna Horizontal.svg",
    video: "/videos/brands/giulia-domna.mp4",
    description: "Línea brasileña de calzado de lujo y diseño refinado. Confeccionada con cueros seleccionados, texturas nobles y detalles de alta costura pensados para boutiques y zapaterías de segmento medio-alto.",
    categories: ["Calzado en Cuero", "Sandalias de Fiesta", "Zapatos de Vestir"],
    badge: "Cuero & Elegancia",
    image: "/images/placeholder.svg",
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
    brand: "Xti",
    tag: "CALZADO OFICIAL ESPAÑA",
    title: "MARÍA BECERRA × XTI",
    subtitle: "Calzado urbano europeo con tracción de venta masiva. Módulos de 8 y 12 pares con curva comercial directa de fábrica.",
    cta: "Ver Módulos Xti",
    link: "marcas",
    image: "/images/banners/banner1-xti.png",
    accent: "#E04C32"
  },
  {
    id: 2,
    brand: "Refresh",
    tag: "TENDENCIA JOVEN EUROPEA",
    title: "REFRESH SNEAKERS & CASUAL",
    subtitle: "Zapatillas ultralivianas y sandalias casual de máxima rotación en mostrador. Margen neto directo de reventa x2.2 a x2.5.",
    cta: "Ver Módulos Refresh",
    link: "marcas",
    image: "/images/banners/banner2-refresh.png",
    accent: "#F59E0B"
  },
  {
    id: 3,
    brand: "Petite Jolie",
    tag: "EXCLUSIVO BRASIL",
    title: "PETITE JOLIE & J-LASTIC®",
    subtitle: "Bolsos, carteras y calzado impermeable con su icónico aroma dulce. Compra por impulso asegurada en tu local.",
    cta: "Ver Módulos Petite Jolie",
    link: "marcas",
    image: "/images/banners/banner3-petitejolie.png",
    accent: "#EC4899"
  },
  {
    id: 4,
    brand: "SkyBlue",
    tag: "SHOWROOM MAYORISTA B2B",
    title: "SHOWROOM & ATENCIÓN DIRECTA",
    subtitle: "Atención personalizada en Curapaligüe 1428 (1er Piso), Tapiales. Muestrarios físicos completos y café para comerciantes.",
    cta: "Visitar Showroom",
    link: "showroom",
    image: "/images/banners/banner4-showroom.png",
    accent: "#10B981"
  }
];

export const CATEGORIES = [
  {
    id: "dama",
    name: "Calzado de Dama",
    description: "Botas, botinetas, sandalias, plataformas, mocasines y zapatillas urbanas de gran demanda.",
    image: "/images/categories/calzado-dama.jpg",
    itemCount: "+120 Modelos",
    moduleInfo: "Módulos de 8 o 12 pares (35 al 40)",
    brandTags: ["Xti", "Refresh", "Giulia Domna"]
  },
  {
    id: "caballero",
    name: "Calzado de Caballero",
    description: "Línea urbana, zapatillas confort, calzado casual y modelos clásicos con suelas durables.",
    image: "/images/categories/calzado-caballero.jpg",
    itemCount: "+60 Modelos",
    moduleInfo: "Módulos de 8 o 12 pares (39 al 44)",
    brandTags: ["Xti Men", "Refresh"]
  },
  {
    id: "ninos",
    name: "Calzado de Niños (XTI Kids)",
    description: "Colegiales reforzados, zapatillas urbanas resistentes y calzado ergonómico para chicos.",
    image: "/images/categories/calzado-ninos.jpg",
    itemCount: "+80 Modelos",
    moduleInfo: "Módulos de 8 o 12 pares (28 al 36)",
    brandTags: ["XTI Kids"]
  },
  {
    id: "marroquineria",
    name: "Marroquinería & Bolsos",
    description: "Carteras de mano, bandoleras, mochilas urbanas y bolsos impermeables en J-Lastic®.",
    image: "/images/categories/marroquineria-bolsos.jpg",
    itemCount: "+90 Modelos",
    moduleInfo: "Packs surtidos de 4 a 6 unidades",
    brandTags: ["Petite Jolie", "Xti Bags"]
  },
  {
    id: "accesorios",
    name: "Accesorios & Charms",
    description: "Charms coleccionables Petite Jolie, billeteras, valijas y complementos para el mostrador.",
    image: "/images/categories/accesorios-charms.jpg",
    itemCount: "+50 Modelos",
    moduleInfo: "Exhibidores surtidos por docena",
    brandTags: ["Petite Jolie", "SkyBlue"]
  }
];

export const PRODUCTS = [
  // --- 1. CALZADO DAMA (8 Modelos: 2 en 'todas' + 6 exclusivos de dama) ---
  {
    id: "dama-01",
    name: "Sneaker Urbano XTI María Becerra 145035",
    brand: "Xti",
    category: "dama",
    featuredInAll: true,
    module: "Módulo 8 o 12 pares (35 al 40)",
    markup: "Margen x2.2",
    image: "/images/banners/hero-xti.jpg",
    altText: "Zapatilla de mujer marca XTI oficial María Becerra"
  },
  {
    id: "dama-02",
    name: "Sneaker Refresh SS26 Camel 175009",
    brand: "Refresh",
    category: "dama",
    featuredInAll: true,
    module: "Módulo 8 o 12 pares (35 al 40)",
    markup: "Margen x2.2",
    image: "/images/banners/hero-refresh.jpg",
    altText: "Sneaker Refresh de mujer colección SS26"
  },
  {
    id: "dama-03",
    name: "Sandalia Plataforma XTI Be Magic 145066",
    brand: "Xti",
    category: "dama",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (35 al 40)",
    markup: "Margen x2.3",
    image: "/images/categories/calzado-dama.jpg",
    altText: "Sandalia plataforma de mujer XTI oficial"
  },
  {
    id: "dama-04",
    name: "Stiletto en Cuero Legítimo Giulia Domna 872710",
    brand: "Giulia Domna",
    category: "dama",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (35 al 40)",
    markup: "Margen x2.5",
    image: "/images/categories/calzado-dama.jpg",
    altText: "Stiletto en cuero legítimo Giulia Domna"
  },
  {
    id: "dama-05",
    name: "Mocasín Confort Refresh Daily 175110",
    brand: "Refresh",
    category: "dama",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (35 al 40)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-dama.jpg",
    altText: "Mocasín confort Refresh de mujer"
  },
  {
    id: "dama-06",
    name: "Sandalia de Fiesta en Cuero Giulia Domna 873090",
    brand: "Giulia Domna",
    category: "dama",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (35 al 40)",
    markup: "Margen x2.5",
    image: "/images/categories/calzado-dama.jpg",
    altText: "Sandalia de fiesta en cuero legítimo Giulia Domna"
  },
  {
    id: "dama-07",
    name: "Bota Urbana XTI Fashion Zip 145180",
    brand: "Xti",
    category: "dama",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (35 al 40)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-dama.jpg",
    altText: "Bota urbana XTI para mujer"
  },
  {
    id: "dama-08",
    name: "Sneaker Sporty Refresh Beige 175051",
    brand: "Refresh",
    category: "dama",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (35 al 40)",
    markup: "Margen x2.1",
    image: "/images/categories/calzado-dama.jpg",
    altText: "Zapatilla deportiva casual Refresh para mujer"
  },

  // --- 2. CALZADO CABALLERO (8 Modelos: 2 en 'todas' + 6 exclusivos) ---
  {
    id: "cab-01",
    name: "Zapatilla Urbana Refresh Men 175515",
    brand: "Refresh",
    category: "caballero",
    featuredInAll: true,
    module: "Módulo 8 o 12 pares (39 al 44)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-caballero.jpg",
    altText: "Calzado urbano para hombre Refresh Men"
  },
  {
    id: "cab-02",
    name: "Sneaker Confort XTI Men Sport 142010",
    brand: "Xti",
    category: "caballero",
    featuredInAll: true,
    module: "Módulo 8 o 12 pares (39 al 44)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-caballero.jpg",
    altText: "Sneaker confort para hombre XTI Men"
  },
  {
    id: "cab-03",
    name: "Zapato Casual XTI Men Leather Look 142055",
    brand: "Xti",
    category: "caballero",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (39 al 44)",
    markup: "Margen x2.3",
    image: "/images/categories/calzado-caballero.jpg",
    altText: "Zapato casual para hombre XTI Men"
  },
  {
    id: "cab-04",
    name: "Zapatilla Skate Refresh Men Street 175580",
    brand: "Refresh",
    category: "caballero",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (39 al 44)",
    markup: "Margen x2.1",
    image: "/images/categories/calzado-caballero.jpg",
    altText: "Zapatilla urbana para hombre Refresh"
  },
  {
    id: "cab-05",
    name: "Mocasín Náutico Refresh Men Confort 175620",
    brand: "Refresh",
    category: "caballero",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (39 al 44)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-caballero.jpg",
    altText: "Mocasín náutico confort para hombre"
  },
  {
    id: "cab-06",
    name: "Bota Urbana XTI Men Chelsea 142110",
    brand: "Xti",
    category: "caballero",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (39 al 44)",
    markup: "Margen x2.3",
    image: "/images/categories/calzado-caballero.jpg",
    altText: "Bota Chelsea para hombre XTI Men"
  },
  {
    id: "cab-07",
    name: "Sneaker All-Black XTI Men Runner 142145",
    brand: "Xti",
    category: "caballero",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (39 al 44)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-caballero.jpg",
    altText: "Zapatilla runner negra XTI Men"
  },
  {
    id: "cab-08",
    name: "Zapatilla Sport Confort Refresh Men 175690",
    brand: "Refresh",
    category: "caballero",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (39 al 44)",
    markup: "Margen x2.1",
    image: "/images/categories/calzado-caballero.jpg",
    altText: "Zapatilla sport confort Refresh Men"
  },

  // --- 3. CALZADO NIÑOS / XTI KIDS (8 Modelos: 2 en 'todas' + 6 exclusivos) ---
  {
    id: "ninos-01",
    name: "Zapatilla Luces XTI Kids Magic 150020",
    brand: "Xti",
    category: "ninos",
    featuredInAll: true,
    module: "Módulo 8 o 12 pares (28 al 36)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-ninos.jpg",
    altText: "Zapatilla con luces para niños XTI Kids"
  },
  {
    id: "ninos-02",
    name: "Sneaker Escolar Reforzado XTI Kids 150085",
    brand: "Xti",
    category: "ninos",
    featuredInAll: true,
    module: "Módulo 8 o 12 pares (28 al 36)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-ninos.jpg",
    altText: "Sneaker escolar reforzado XTI Kids"
  },
  {
    id: "ninos-03",
    name: "Botita Urbana XTI Kids Glitter 150110",
    brand: "Xti",
    category: "ninos",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (28 al 36)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-ninos.jpg",
    altText: "Botita con glitter para niñas XTI Kids"
  },
  {
    id: "ninos-04",
    name: "Zapatilla Velcro XTI Kids Play 150145",
    brand: "Xti",
    category: "ninos",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (28 al 36)",
    markup: "Margen x2.1",
    image: "/images/categories/calzado-ninos.jpg",
    altText: "Zapatilla con velcro para niños XTI Kids"
  },
  {
    id: "ninos-05",
    name: "Sandalia Ergonómica XTI Kids Summer 150180",
    brand: "Xti",
    category: "ninos",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (28 al 36)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-ninos.jpg",
    altText: "Sandalia ergonómica para niños XTI Kids"
  },
  {
    id: "ninos-06",
    name: "Sneaker Deportivo XTI Kids Runner 150210",
    brand: "Xti",
    category: "ninos",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (28 al 36)",
    markup: "Margen x2.2",
    image: "/images/categories/calzado-ninos.jpg",
    altText: "Zapatilla deportiva para niños XTI Kids"
  },
  {
    id: "ninos-07",
    name: "Botín Fashion XTI Kids Warm 150240",
    brand: "Xti",
    category: "ninos",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (28 al 36)",
    markup: "Margen x2.3",
    image: "/images/categories/calzado-ninos.jpg",
    altText: "Botín abrigado para niños XTI Kids"
  },
  {
    id: "ninos-08",
    name: "Zapatilla Lona XTI Kids Casual 150275",
    brand: "Xti",
    category: "ninos",
    featuredInAll: false,
    module: "Módulo 8 o 12 pares (28 al 36)",
    markup: "Margen x2.1",
    image: "/images/categories/calzado-ninos.jpg",
    altText: "Zapatilla de lona liviana para niños XTI Kids"
  },

  // --- 4. MARROQUINERÍA & BOLSOS (8 Modelos: 2 en 'todas' + 6 exclusivos) ---
  {
    id: "marroq-01",
    name: "Bolso Petite Jolie Bloom J-Lastic®",
    brand: "Petite Jolie",
    category: "marroquineria",
    featuredInAll: true,
    module: "Pack 4 unidades surtidas",
    markup: "Margen x2.4",
    image: "/images/banners/hero-petite-jolie.jpg",
    altText: "Bolso estructurado Petite Jolie material J-Lastic"
  },
  {
    id: "marroq-02",
    name: "Cartera Bandolera Petite Jolie Daily",
    brand: "Petite Jolie",
    category: "marroquineria",
    featuredInAll: true,
    module: "Pack 4 unidades surtidas",
    markup: "Margen x2.3",
    image: "/images/categories/marroquineria-bolsos.jpg",
    altText: "Bandolera urbana Petite Jolie impermeable"
  },
  {
    id: "marroq-03",
    name: "Mochila Urbana Petite Jolie Kit J-Lastic®",
    brand: "Petite Jolie",
    category: "marroquineria",
    featuredInAll: false,
    module: "Pack 4 unidades surtidas",
    markup: "Margen x2.4",
    image: "/images/categories/marroquineria-bolsos.jpg",
    altText: "Mochila urbana Petite Jolie impermeable"
  },
  {
    id: "marroq-04",
    name: "Tote Bag Impermeable Petite Jolie Love",
    brand: "Petite Jolie",
    category: "marroquineria",
    featuredInAll: false,
    module: "Pack 4 unidades surtidas",
    markup: "Margen x2.3",
    image: "/images/categories/marroquineria-bolsos.jpg",
    altText: "Tote bag Petite Jolie lavable"
  },
  {
    id: "marroq-05",
    name: "Bandolera Mini Bag XTI Bags Chic",
    brand: "Xti",
    category: "marroquineria",
    featuredInAll: false,
    module: "Pack 4 unidades surtidas",
    markup: "Margen x2.3",
    image: "/images/categories/marroquineria-bolsos.jpg",
    altText: "Mini bag bandolera XTI Bags"
  },
  {
    id: "marroq-06",
    name: "Cartera Estructurada Petite Jolie Elegance",
    brand: "Petite Jolie",
    category: "marroquineria",
    featuredInAll: false,
    module: "Pack 4 unidades surtidas",
    markup: "Margen x2.4",
    image: "/images/categories/marroquineria-bolsos.jpg",
    altText: "Cartera de mano estructurada Petite Jolie"
  },
  {
    id: "marroq-07",
    name: "Bolsón Shopping XTI Bags European",
    brand: "Xti",
    category: "marroquineria",
    featuredInAll: false,
    module: "Pack 4 unidades surtidas",
    markup: "Margen x2.2",
    image: "/images/categories/marroquineria-bolsos.jpg",
    altText: "Bolso shopping amplio XTI Bags"
  },
  {
    id: "marroq-08",
    name: "Cartera de Hombro Petite Jolie Sweet",
    brand: "Petite Jolie",
    category: "marroquineria",
    featuredInAll: false,
    module: "Pack 4 unidades surtidas",
    markup: "Margen x2.3",
    image: "/images/categories/marroquineria-bolsos.jpg",
    altText: "Cartera de hombro con fragancia Petite Jolie"
  },

  // --- 5. ACCESORIOS & CHARMS (8 Modelos: 2 en 'todas' + 6 exclusivos) ---
  {
    id: "acc-01",
    name: "Charms Coleccionables Petite Jolie Pack x12",
    brand: "Petite Jolie",
    category: "accesorios",
    featuredInAll: true,
    module: "Exhibidor docena surtida",
    markup: "Margen x2.5",
    image: "/images/categories/accesorios-charms.jpg",
    altText: "Charms coleccionables Petite Jolie para calzado y carteras"
  },
  {
    id: "acc-02",
    name: "Billetera Compacta Petite Jolie Pocket",
    brand: "Petite Jolie",
    category: "accesorios",
    featuredInAll: true,
    module: "Pack 6 unidades surtidas",
    markup: "Margen x2.3",
    image: "/images/categories/accesorios-charms.jpg",
    altText: "Billetera compacta impermeable Petite Jolie"
  },
  {
    id: "acc-03",
    name: "Neceser Impermeable Petite Jolie Travel",
    brand: "Petite Jolie",
    category: "accesorios",
    featuredInAll: false,
    module: "Pack 6 unidades surtidas",
    markup: "Margen x2.4",
    image: "/images/categories/accesorios-charms.jpg",
    altText: "Neceser impermeable de viaje Petite Jolie"
  },
  {
    id: "acc-04",
    name: "Portacosméticos Petite Jolie Beauty",
    brand: "Petite Jolie",
    category: "accesorios",
    featuredInAll: false,
    module: "Pack 6 unidades surtidas",
    markup: "Margen x2.3",
    image: "/images/categories/accesorios-charms.jpg",
    altText: "Portacosméticos lavable Petite Jolie"
  },
  {
    id: "acc-05",
    name: "Billetera Grande con Cierre XTI Accessories",
    brand: "Xti",
    category: "accesorios",
    featuredInAll: false,
    module: "Pack 6 unidades surtidas",
    markup: "Margen x2.2",
    image: "/images/categories/accesorios-charms.jpg",
    altText: "Billetera con cierre perimetral XTI"
  },
  {
    id: "acc-06",
    name: "Llaveros Icon Petite Jolie Heart",
    brand: "Petite Jolie",
    category: "accesorios",
    featuredInAll: false,
    module: "Exhibidor docena surtida",
    markup: "Margen x2.5",
    image: "/images/categories/accesorios-charms.jpg",
    altText: "Llaveros coleccionables en J-Lastic"
  },
  {
    id: "acc-07",
    name: "Porta Celular Bandolera Petite Jolie Phone",
    brand: "Petite Jolie",
    category: "accesorios",
    featuredInAll: false,
    module: "Pack 6 unidades surtidas",
    markup: "Margen x2.4",
    image: "/images/categories/accesorios-charms.jpg",
    altText: "Porta celular impermeable con correa"
  },
  {
    id: "acc-08",
    name: "Exhibidor de Mostrador Charms SkyBlue",
    brand: "SkyBlue",
    category: "accesorios",
    featuredInAll: false,
    module: "Exhibidor x24 unidades",
    markup: "Margen x2.5",
    image: "/images/categories/accesorios-charms.jpg",
    altText: "Exhibidor de mostrador para venta por impulso"
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
    title: "Envíos Gratis CABA/GBA & 24/48hs Interior",
    subtitle: "Logística Bonificada y Asegurada",
    description: "Envío 100% gratuito en CABA y GBA. Despacho bonificado en 24 a 48 hs al expreso de tu elección para todo el país."
  },
  {
    id: "asesoria",
    icon: "Users",
    title: "Asesores Dedicados por WhatsApp",
    subtitle: "Juliana, Jesica y Marcelino",
    description: "Atención comercial personalizada para armar tus módulos, consultar disponibilidad de stock y coordinar reposiciones ágiles."
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
    image: "/images/banners/hero-xti.jpg",
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
    image: "/images/banners/hero-catalogos.jpg",
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
    image: "/images/banners/hero-petite-jolie.jpg",
    altText: "Bolsos y carteras Petite Jolie exhibidos en tienda de moda"
  }
];

export const REELS = [
  { id: "reel-1", title: "Campaña Oficial María Becerra × XTI SS26", category: "Línea Dama", brand: "XTI Oficial", views: "240K", likes: "18.4K", videoUrl: "/reels/0820-1.mp4", poster: "/images/banners/hero-xti.jpg" },
  { id: "reel-2", title: "XTI Be Magic - Sandalias y Plataformas de Temporada", category: "Tendencia", brand: "XTI España", views: "195K", likes: "15.1K", videoUrl: "/reels/0820-2.mp4", poster: "/images/categories/calzado-dama.jpg" },
  { id: "reel-3", title: "Stilettos y Calzado de Fiesta XTI Fashion", category: "Alta Costura", brand: "XTI Oficial", views: "168K", likes: "12.8K", videoUrl: "/reels/0820-3.mp4", poster: "/images/banners/hero-xti.jpg" },
  { id: "reel-4", title: "Ingreso de Módulos XTI en Local Oficial", category: "Showroom", brand: "XTI Oficial", views: "210K", likes: "16.5K", videoUrl: "/reels/0820-4.mp4", poster: "/images/showroom/showroom-1.jpg" },
  { id: "reel-5", title: "Sneakers Urbanos María Becerra Collection", category: "Sneakers", brand: "XTI España", views: "285K", likes: "22.3K", videoUrl: "/reels/0820-5.mp4", poster: "/images/banners/hero-xti.jpg" },
  { id: "reel-6", title: "XTI SS26 Colección Europea en Pasarela", category: "Fashion Film", brand: "XTI Oficial", views: "172K", likes: "14.2K", videoUrl: "/reels/0820-6.mp4", poster: "/images/categories/calzado-dama.jpg" },
  { id: "reel-7", title: "Lookbook Primavera Verano XTI", category: "Lookbook", brand: "XTI Oficial", views: "188K", likes: "14.7K", videoUrl: "/reels/0820-7.mp4", poster: "/images/banners/hero-xti.jpg" },
  { id: "reel-8", title: "Sandalias de Temporada XTI Be Magic", category: "Sandalias", brand: "XTI", views: "160K", likes: "11.9K", videoUrl: "/reels/0820-8.mp4", poster: "/images/categories/calzado-dama.jpg" },
  { id: "reel-9", title: "Refresh Essence SS26 - Colección Urbana", category: "Streetwear", brand: "Refresh Casual", views: "174K", likes: "13.9K", videoUrl: "/reels/0820-9.mp4", poster: "/images/banners/hero-refresh.jpg" },
  { id: "reel-10", title: "Unboxing Módulos Refresh en Tienda Mayorista", category: "Unboxing", brand: "Refresh", views: "142K", likes: "10.4K", videoUrl: "/reels/0820-10.mp4", poster: "/images/banners/hero-refresh.jpg" },
  { id: "reel-11", title: "Línea Refresh Men & Zapatillas Urbanas", category: "Hombres", brand: "Refresh Men", views: "135K", likes: "9.7K", videoUrl: "/reels/0820-11.mp4", poster: "/images/categories/calzado-caballero.jpg" },
  { id: "reel-12", title: "Detalle de Texturas y Confort Refresh Shoes", category: "Calce & Detalle", brand: "Refresh", views: "158K", likes: "11.6K", videoUrl: "/reels/0820-12.mp4", poster: "/images/banners/hero-refresh.jpg" },
  { id: "reel-13", title: "Giro 360° Sandalias & Plataformas Refresh", category: "Calzado 360°", brand: "Refresh Casual", views: "163K", likes: "12.5K", videoUrl: "/reels/0820-13.mp4", poster: "/images/categories/calzado-dama.jpg" },
  { id: "reel-14", title: "UGC Calce Real y Lookbook Refresh en Local", category: "UGC Local", brand: "Refresh", views: "180K", likes: "15.3K", videoUrl: "/reels/0820-14.mp4", poster: "/images/banners/hero-refresh.jpg" },
  { id: "reel-15", title: "Sneakers Urbanos Ultralivianos Refresh", category: "Sneakers", brand: "Refresh", views: "150K", likes: "11.2K", videoUrl: "/reels/0820-15.mp4", poster: "/images/banners/hero-refresh.jpg" },
  { id: "reel-16", title: "Colección Casual Refresh para Vidriera", category: "Streetwear", brand: "Refresh Casual", views: "138K", likes: "9.8K", videoUrl: "/reels/0820-16.mp4", poster: "/images/banners/hero-refresh.jpg" },
  { id: "reel-17", title: "Showroom Petite Jolie - Bolsos J-Lastic® Perfumados", category: "Marroquinería", brand: "Petite Jolie", views: "230K", likes: "19.2K", videoUrl: "/reels/0820-17.mp4", poster: "/images/banners/hero-petite-jolie.jpg" },
  { id: "reel-18", title: "Charms y Accesorios Coleccionables Petite Jolie", category: "Accesorios", brand: "Petite Jolie", views: "145K", likes: "10.8K", videoUrl: "/reels/0820-18.mp4", poster: "/images/categories/accesorios-charms.jpg" },
  { id: "reel-19", title: "XTI Kids - Curvas Escolares y Juveniles", category: "Infantil", brand: "XTI Kids", views: "115K", likes: "8.3K", videoUrl: "/reels/0820-19.mp4", poster: "/images/categories/calzado-ninos.jpg" },
  { id: "reel-20", title: "Línea Confort y Pantuflas de Invierno", category: "Confort Wear", brand: "Refresh Casual", views: "122K", likes: "8.9K", videoUrl: "/reels/0820-20.mp4", poster: "/images/categories/calzado-dama.jpg" },
  { id: "reel-21", title: "Pantuflas de Temporada Colección Confort", category: "Confort", brand: "Refresh", views: "118K", likes: "7.9K", videoUrl: "/reels/0820-21.mp4", poster: "/images/banners/hero-refresh.jpg" },
  { id: "reel-22", title: "Bandoleras Impermeables Petite Jolie", category: "Marroquinería", brand: "Petite Jolie", views: "190K", likes: "14.5K", videoUrl: "/reels/0820-22.mp4", poster: "/images/categories/marroquineria-bolsos.jpg" },
  { id: "reel-23", title: "Sandalias y Calzado de Media Estación XTI", category: "Colección Dama", brand: "XTI España", views: "205K", likes: "17.4K", videoUrl: "/reels/0820-23.mp4", poster: "/images/categories/calzado-dama.jpg" },
  { id: "reel-24", title: "Showroom Recorrido Tapiales SkyBlue", category: "Showroom", brand: "SkyBlue", views: "215K", likes: "18.1K", videoUrl: "/reels/0820-24.mp4", poster: "/images/showroom/showroom-2.jpg" }
];

export const DRIFT_WALL_ITEMS = [
  { image: "/images/banners/hero-xti.jpg", title: "Campaña Oficial María Becerra × XTI", brand: "XTI España", category: "Campaña Dama", videoUrl: "/reels/0820-1.mp4" },
  { image: "/images/banners/hero-refresh.jpg", title: "Sandalias Urbanas Confort", brand: "Refresh", category: "Streetwear", videoUrl: "/reels/0820-9.mp4" },
  { image: "/images/banners/hero-petite-jolie.jpg", title: "Bolsos J-Lastic® Perfumados", brand: "Petite Jolie", category: "Marroquinería", videoUrl: "/reels/0820-17.mp4" },
  { image: "/images/categories/calzado-dama.jpg", title: "Calzado de Fiesta y Tendencia", brand: "Giulia Domna", category: "Alta Gama", videoUrl: "/reels/0820-3.mp4" },
  { image: "/images/categories/calzado-ninos.jpg", title: "Zapatillas Urbanas Juveniles", brand: "XTI Kids", category: "Infantil", videoUrl: "/reels/0820-19.mp4" },
  { image: "/images/categories/marroquineria-bolsos.jpg", title: "Mochilas & Bandoleras Impermeables", brand: "Petite Jolie", category: "Accesorios", videoUrl: "/reels/0820-22.mp4" },
  { image: "/images/showroom/showroom-1.jpg", title: "Showroom Mayorista Tapiales", brand: "SkyBlue Showroom", category: "Showroom", videoUrl: "/reels/0820-4.mp4" },
  { image: "/images/categories/calzado-caballero.jpg", title: "Sneakers Hombre Urban Men", brand: "Refresh Men", category: "Hombre", videoUrl: "/reels/0820-11.mp4" },
  { image: "/images/showroom/showroom-2.jpg", title: "Muestrarios Físicos Completos", brand: "SkyBlue VIP", category: "Muestrario", videoUrl: "/reels/0820-24.mp4" },
  { image: "/images/categories/accesorios-charms.jpg", title: "Charms y Accesorios de Impulso", brand: "Petite Jolie", category: "Accesorios", videoUrl: "/reels/0820-18.mp4" },
  { image: "/images/banners/hero-catalogos.jpg", title: "Módulos Cerrados 8 y 12 Pares", brand: "SkyBlue B2B", category: "Módulos", videoUrl: "/reels/0820-10.mp4" },
  { image: "/images/showroom/showroom-3.jpg", title: "Atención Exclusiva Comerciantes", brand: "SkyBlue Asesoras", category: "Atención", videoUrl: "/reels/0820-14.mp4" }
];

export const EVENTS = [
  {
    id: "efica",
    title: "Exposición EFICA 114",
    location: "Centro Costa Salguero, CABA",
    date: "Edición Anterior",
    badge: "Evento Finalizado",
    description: "Presentación oficial de las nuevas colecciones mayoristas de Xti, Refresh, Petite Jolie y Giulia Domna ante comerciantes de todo el país.",
    stand: "Stand Principal SkyBlue - Pabellón A"
  },
  {
    id: "exical",
    title: "Feria EXICAL Córdoba",
    location: "Centro de Convenciones Córdoba",
    date: "Edición Anterior",
    badge: "Evento Finalizado",
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
    question: "¿Cómo están compuestas las curvas de talles de fábrica?",
    answer: "Las curvas vienen surtidas de manera ideal directo desde fábrica con concentración en los números de mayor venta para rápida rotación de mostrador: La curva de 8 pares se compone de 1/36 - 2/37 - 2/38 - 2/39 - 1/40 (75% en talles centrales). La curva de 12 pares se compone de 1/35 - 2/36 - 3/37 - 3/38 - 2/39 - 1/40. En nuestro portal podés consultar la Guía de Talles Oficial con medidas en centímetros.",
    category: "minimos"
  },
  {
    question: "¿Cómo son los envíos a CABA, GBA y al interior del país?",
    answer: "En CABA y Gran Buenos Aires (GBA) el envío es 100% bonificado y gratuito. Para el interior del país, el embalaje reforzado y el flete de traslado hasta la terminal del transporte en CABA/GBA (Vía Cargo, Cruz del Sur, etc.) es 100% bonificado en 24 a 48 hs hábiles (el cliente solo abona el costo del transporte hasta su localidad).",
    category: "envios"
  },
  {
    question: "¿Los precios incluyen IVA? ¿Emiten factura?",
    answer: "Los precios de catálogo y plataforma son netos sin IVA. Todas nuestras ventas requieren facturación obligatoria (Factura A o Factura B oficial con CUIT comercial), ya que comercializamos mercadería 100% legal e importada de manera formal por aduana.",
    category: "precios"
  },
  {
    question: "¿Cuáles son los requisitos para comprar en SkyBlue Mayorista?",
    answer: "Somos distribuidores exclusivamente mayoristas B2B. Para acceder a la lista de precios y compras, solicitamos contar con CUIT comercial, local a la calle, showroom o actividad de reventa activa. El alta es inmediata ingresando en nuestra plataforma B2B (https://mayoristas.skyblue.com.ar/) o contactando a nuestras asesoras por WhatsApp.",
    category: "requisitos"
  },
  {
    question: "¿Cómo funciona el 10% de descuento adicional por pago al contado o transferencia?",
    answer: "Si abonas tu pedido mayorista en efectivo en nuestro showroom de Tapiales, mediante transferencia bancaria o depósito bancario, se aplica un 10% de descuento adicional sobre la liquidación neta de tu compra, aumentando de inmediato tu margen de ganancia neta.",
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
    question: "¿Cómo accedo al material de marketing y fotos de María Becerra para mis redes?",
    answer: "Al darte de alta como cliente mayorista de SkyBlue, tu asesora te otorga acceso a nuestro Google Drive VIP con fotos de estudio en alta resolución, videos verticales listos para publicar en Instagram/TikTok y gráficas oficiales de las campañas de Xti con María Becerra, Refresh, Petite Jolie y Giulia Domna.",
    category: "marketing"
  }
];

export const SEO_DATA = {
  inicio: {
    path: "/",
    metaTitle: "SkyBlue Calzado Mayorista | Distribuidor Oficial B2B Argentina",
    metaDescription: "Distribuidora mayorista de calzado en Argentina por módulos de 8 y 12 pares. Marcas oficiales Xti con María Becerra, Refresh, Petite Jolie y Giulia Domna con CUIT. Despachos a todo el país."
  },
  marcas: {
    path: "/marcas-oficiales",
    metaTitle: "Marcas Oficiales de Calzado Mayorista | Xti, Refresh, Petite Jolie, Giulia Domna",
    metaDescription: "Conocé las marcas internacionales que distribuimos en exclusiva para zapaterías: Xti España con María Becerra, Refresh, Petite Jolie Brasil y Giulia Domna en cuero."
  },
  catalogo: {
    path: "/catalogo-mayorista",
    metaTitle: "Catálogo Mayorista por Módulos de Calzado B2B | SkyBlue",
    metaDescription: "Explorá calzado de dama, caballero, niños XTI Kids y marroquinería por módulos de 8 y 12 pares. Acceso a plataforma B2B mayoristas.skyblue.com.ar."
  },
  beneficios: {
    path: "/beneficios-comerciales",
    metaTitle: "Beneficios para Zapaterías y Comercios | SkyBlue Mayorista",
    metaDescription: "Márgenes del 100% al 150%, 10% adicional por pago contado o transferencia, envíos en 24 a 48 hs a todo el país y kit de marketing gratuito."
  },
  showroom: {
    path: "/showroom-tapiales",
    metaTitle: "Showroom Mayorista en Tapiales Buenos Aires | SkyBlue Calzado",
    metaDescription: "Visitá nuestro showroom exclusivo para comerciantes en Curapaligüe 1428 (1er Piso), Tapiales. Más de 300 modelos exhibidos con cita previa."
  },
  faq: {
    path: "/preguntas-frecuentes",
    metaTitle: "Preguntas Frecuentes sobre Compra Mayorista de Calzado | SkyBlue",
    metaDescription: "Respuestas sobre módulos mínimos de 8 y 12 pares, CUIT comercial, bonificación del 10%, envíos por expreso y acceso a plataforma privada."
  },
  blog: {
    path: "/blog-zapaterias",
    metaTitle: "Blog para Dueños de Zapaterías y Negocios de Calzado | SkyBlue",
    metaDescription: "Guías comerciales, estrategias de vidriera, marketing de calzado y consejos para rentabilizar módulos mayoristas sin pares sobrantes."
  }
};


export const SEO_PAGES = {
  inicio: {
    metaTitle: "SkyBlue Calzado Mayorista | Distribuidor Oficial Argentina (Xti, Refresh, Petite Jolie, Giulia Domna)",
    metaDescription: "Distribuidor oficial de calzado y marroquinería en Argentina. Venta mayorista por curvas de fábrica de 8 y 12 pares. Precios netos sin IVA, envíos gratis en CABA/GBA y showroom en Tapiales.",
    h1: "SkyBlue Calzado Mayorista — Distribuidor Oficial en Argentina",
    topicCluster: "Inicio Mayorista",
    path: "/"
  },
  marcas: {
    metaTitle: "Marcas Oficiales de Calzado Mayorista | Xti, Refresh, Petite Jolie, Giulia Domna",
    metaDescription: "Representación e importación oficial de calzado español y brasileño en Argentina: Xti (María Becerra), Refresh, Petite Jolie y Giulia Domna.",
    h1: "Marcas Internacionales Oficiales de Calzado y Marroquinería",
    topicCluster: "Marcas Oficiales",
    path: "/#marcas"
  },
  catalogo: {
    metaTitle: "Catálogo Mayorista de Calzado | Curvas de 8 y 12 Pares Directo de Fábrica",
    metaDescription: "Accedé a nuestro catálogo mayorista de sandalias, botas, zapatillas, stilettos y carteras por curvas completas para zapaterías y boutiques.",
    h1: "Catálogo de Calzado y Marroquinería por Módulos Mayoristas",
    topicCluster: "Catálogo Mayorista",
    path: "/#catalogo"
  },
  beneficios: {
    metaTitle: "Beneficios Comerciales y Rentabilidad Mayorista | SkyBlue Argentina",
    metaDescription: "Conocé las ventajas de comprar con SkyBlue: 10% adicional por transferencia, material para redes sociales, envíos bonificados y Factura A/B.",
    h1: "Condiciones Comerciales y Rentabilidad para tu Zapatería",
    topicCluster: "Beneficios & Márgenes",
    path: "/#beneficios"
  },
  showroom: {
    metaTitle: "Showroom Mayorista en Tapiales | Cita Previa con Asesor B2B SkyBlue",
    metaDescription: "Visitá nuestro showroom exclusivo en Tapiales (Curapaligüe 1428, 1er Piso) para probar muestras, texturas y armar pedidos de temporada.",
    h1: "Showroom Mayorista B2B en Tapiales — Cita Previa",
    topicCluster: "Showroom Tapiales",
    path: "/#showroom"
  },
  contacto: {
    metaTitle: "Contacto y Asesoras Comerciales WhatsApp | SkyBlue Mayorista",
    metaDescription: "Chateá directamente con Juliana, Jesica y Marcelino para recibir listas de precios netos, catálogos en PDF y coordinar despachos.",
    h1: "Equipo de Asesores Comerciales SkyBlue Mayorista",
    topicCluster: "Contacto WhatsApp",
    path: "/#asesoras"
  }
};


export const REVIEWS = [{id:1,name:`Valeria Gómez`,business:`Zapatería 'Valen Calzados'`,location:`Córdoba Capital`,rating:5,avatar:`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80`,date:`Hace 3 días`,verified:!0,bought:`Módulos Xti & Refresh`,text:`Hola gente! La verdad que las zapas de Xti con la foto de Maria Becerra vuelan en el local, no me duraron ni 4 dias el modulo de 12 pares. Ya es el tercer pedido que le hago a Juli por whatsapp y siempre despachan al toque x expreso. Recomendadisimos!!`},{id:2,name:`Mariano Rossi`,business:`Rossi Shoes & Accesorios`,location:`Rosario, Santa Fe`,rating:5,avatar:`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80`,date:`Hace 1 semana`,verified:!0,bought:`Marroquinería Petite Jolie`,text:`Las carteras de Petite Jolie tienen un aroma tremendo que llama la atencion apenas entran al negocio. El material J-Lastic es super facil de vender porque no se arruina con la lluvia. Buen margen y atencion de diez.`},{id:3,name:`Carolina Méndez`,business:`Showroom Caro Méndez`,location:`San Miguel de Tucumán`,rating:5,avatar:`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,date:`Hace 2 semanas`,verified:!0,bought:`Línea Giulia Domna Cuero`,text:`El calzado de Giulia Domna tiene unas terminaciones de cuero de primer nivel. Para el segmento boutique que manejo en Tucuman me vino barbaro. Ademas el descuento del 10% por transferencia suma un monton.`},{id:4,name:`Gonzalo Benítez`,business:`Calzados Benítez e Hijos`,location:`Mendoza Capital`,rating:5,avatar:`https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80`,date:`Hace 2 semanas`,verified:!0,bought:`Módulos Refresh & XTI Kids`,text:`Excelente distribuidora. Compramos modulos cerrados para la temporada y llegaron a Mendoza en 48hs por Cruz del Sur bien embalados con su remito. La linea kids de Xti salio rapidisimo.`},{id:5,name:`Florencia Álvarez`,business:`Flor Álvarez Boutique`,location:`Neuquén Capital`,rating:5,avatar:`https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80`,date:`Hace 3 semanas`,verified:!0,bought:`Xti Zapatillas & Sandalias`,text:`Fui al showroom de Tapiales a ver los muestrarios y me atendieron super bien con un cafe mientras elegia los codigos. Comprobe la calidad en persona y me quede re tranquila. Ya arme mi segundo pedido.`},{id:6,name:`Lucas Pereyra`,business:`Tienda Urbana Calzado`,location:`Mar del Plata, Bs As`,rating:5,avatar:`https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80`,date:`Hace 1 mes`,verified:!0,bought:`Zapatillas Refresh`,text:`El material de fotos y reels que te mandan al Drive VIP te ahorra contratar fotografo. Subo las historias a Instagram y se venden solas las zapas. Muy conforme con Skyblue.`},{id:7,name:`Romina Castillo`,business:`Romina Calzados`,location:`Salta Capital`,rating:5,avatar:`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80`,date:`Hace 1 mes`,verified:!0,bought:`Petite Jolie & Xti`,text:`Las clientas me piden especificamente las zapatillas de Maria Becerra. El marketing que tienen atras las marcas oficiales hace toda la diferencia. Los modulos de 8 pares vienen super balanceados en talles.`},{id:8,name:`Esteban Morales`,business:`Morales Shoes`,location:`San Juan Capital`,rating:5,avatar:`https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80`,date:`Hace 1 mes`,verified:!0,bought:`Módulos Xti`,text:`Precios transparentes y respetan la exclusividad mayorista con CUIT. No le venden suelto a particulares lo cual para los que tenemos local es fundamental para cuidar el precio al publico.`},{id:9,name:`Daniela Aguirre`,business:`Aguirre Calzados y Carteras`,location:`La Plata, Bs As`,rating:5,avatar:`https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80`,date:`Hace 2 meses`,verified:!0,bought:`Petite Jolie & Refresh`,text:`Compre varios bultos de Petite Jolie y Refresh para la temporada de verano. La calidad de los herrajes y costuras es impecable. El asesoramiento por WhatsApp fue rápido y cordial en todo momento.`}];

// ==========================================
// REGISTRO Y METADATA SEO DE ASSETS DIGITALES
// ==========================================
export const ASSET_SEO_METADATA = {
  banners: {
    heroXti: {
      path: "/images/banners/banner1-xti.png",
      title: "Campaña Oficial Xti España con María Becerra — Calzado Mayorista",
      altText: "María Becerra luciendo calzado urbano Xti España para venta mayorista por curva en Argentina",
      metaDescription: "Distribuidor oficial de calzado Xti en Argentina. Módulos cerrados de 8 y 12 pares de la campaña oficial con María Becerra. Venta con CUIT y Factura A/B.",
      keywords: ["Xti Argentina", "calzado Maria Becerra", "calzado mayorista España", "zapaterias modulos Xti", "distribuidora de zapatos CUIT"]
    },
    heroRefresh: {
      path: "/images/banners/banner2-refresh.png",
      title: "Campaña Refresh con Mar Lucas — Sneakers y Sandalias Mayoristas",
      altText: "Mar Lucas presentando la colección de zapatillas urbanas y sandalias Refresh para zapaterías",
      metaDescription: "Sneakers ultralivianos y sandalias europeas Refresh por mayor. Margen de reventa del 120% (x2.2 a x2.5). Despacho en 24/48 hs a todo el país.",
      keywords: ["Refresh calzado mayorista", "sneakers por mayor Argentina", "sandalias europeas por curva", "zapatillas por modulo"]
    },
    heroPetiteJolie: {
      path: "/images/banners/banner3-petitejolie.png",
      title: "Petite Jolie Brasil — Bolsos y Calzado en J-Lastic® Impermeable",
      altText: "Bolsos, carteras y sandalias Petite Jolie en material impermeable J-Lastic aromático para reventa",
      metaDescription: "Mayorista oficial Petite Jolie en Argentina. Bolsos y carteras impermeables con fragancia dulce icónica. Compra por impulso asegurada en mostrador.",
      keywords: ["Petite Jolie mayorista", "bolsos Jlastic por mayor", "carteras Petite Jolie Argentina", "marroquineria importada Brasil"]
    },
    heroCatalogos: {
      path: "/images/banners/banner4-showroom.png",
      title: "Catálogo Mayorista B2B SkyBlue — Módulos Cerrados de Fábrica",
      altText: "Cajas cerradas de fábrica y módulos surtidos de 8 y 12 pares de calzado importado oficial",
      metaDescription: "Catálogo oficial de calzado mayorista en Argentina. Curvas ideales de fábrica (75% talles 37 y 38 sin clavos de stock). 10% OFF extra por transferencia.",
      keywords: ["curva de calzado mayorista", "modulos de 8 pares zapatos", "zapateria por mayor Flores Once", "distribuidora calzado Tapiales"]
    }
  },
  categories: {
    calzadoDama: {
      path: "/images/categories/calzado-dama.jpg",
      title: "Calzado de Dama Mayorista — Stilettos, Sandalias y Botas Xti",
      altText: "Colección de calzado femenino de fiesta, sandalias y plataformas europeas para zapaterías",
      metaDescription: "Venta mayorista de calzado femenino importado de España y Brasil. Modelos de alta costura, confort y tendencia por curvas de 8 y 12 pares.",
      keywords: ["calzado de mujer por mayor", "sandalias de dama mayorista", "botas importadas España por mayor", "stilettos mayoristas"]
    },
    calzadoCaballero: {
      path: "/images/categories/calzado-caballero.jpg",
      title: "Calzado Masculino Urbano y Casual — Xti Men & Refresh Men",
      altText: "Zapatillas urbanas, mocasines y calzado casual de hombre para tiendas de calzado",
      metaDescription: "Línea de calzado de hombre mayorista con suelas de memory foam y materiales resistentes. Diseños urbanos europeos listos para despacho inmediato.",
      keywords: ["calzado masculino mayorista", "zapatillas de hombre por curva", "calzado casual hombre por mayor", "distribuidor calzado hombre"]
    },
    calzadoNinos: {
      path: "/images/categories/calzado-ninos.jpg",
      title: "Xti Kids — Calzado Infantil Mayorista Resistente y Ergonómico",
      altText: "Zapatillas y botines infantiles Xti Kids con plantilla ergonómica y suela antideslizante",
      metaDescription: "Calzado para niños y niñas importado con certificación europea. Módulos escolares y urbanos de alta durabilidad para zapaterías infantiles.",
      keywords: ["calzado infantil mayorista", "zapatillas de niños por mayor", "Xti Kids Argentina", "calzado escolar por mayor"]
    },
    marroquineriaBolsos: {
      path: "/images/categories/marroquineria-bolsos.jpg",
      title: "Marroquinería Mayorista — Bolsos, Mochilas y Carteras Petite Jolie",
      altText: "Bolsos de mano, mochilas urbanas y bandoleras en material J-Lastic de colores vibrantes",
      metaDescription: "Marroquinería importada de Brasil por mayor. Carteras y bolsos 100% lavables, impermeables y con aroma dulce. Alta rentabilidad en caja.",
      keywords: ["marroquineria mayorista", "bolsos Petite Jolie por mayor", "carteras por mayor Argentina", "mochilas importadas por mayor"]
    },
    accesoriosCharms: {
      path: "/images/categories/accesorios-charms.jpg",
      title: "Accesorios de Moda y Charms Coleccionables Petite Jolie",
      altText: "Llaveros, monederos, charms y accesorios de moda para sumar al ticket de compra",
      metaDescription: "Accesorios y complementos de moda para zapaterías. Incrementá el ticket promedio de tu local con productos de impulso de bajo costo y alto margen.",
      keywords: ["accesorios de moda por mayor", "llaveros Petite Jolie por mayor", "charms para carteras mayorista", "productos de impulso zapateria"]
    }
  },
  showroom: {
    showroom1: {
      path: "/images/showroom/showroom-1.jpg",
      title: "Salón de Exposición Mayorista SkyBlue — Tapiales (Buenos Aires)",
      altText: "Showroom mayorista en Curapaligüe 1428 Tapiales con estanterías y exhibidores de calzado europeo",
      metaDescription: "Visitá nuestro showroom físico en Tapiales (La Matanza). Muestrarios completos, café para comerciantes y atención personalizada con cita previa.",
      keywords: ["showroom calzado Tapiales", "distribuidora de zapatos La Matanza", "venta mayorista calzado Buenos Aires", "visita showroom calzado"]
    },
    showroom2: {
      path: "/images/showroom/showroom-2.jpg",
      title: "Sector de Asesoramiento Comercial y Armado de Módulos",
      altText: "Mesas de trabajo y atención personalizada para dueños de zapaterías armando sus pedidos",
      metaDescription: "Comprobá la calidad de los cueros, herrajes y suelas en persona. Asesoramiento 1 a 1 con Juliana, Jesica y Marcelino para armar tu stock.",
      keywords: ["atencion personalizada zapaterias", "armado de curvas calzado", "compra mayorista presencial calzado"]
    },
    showroom3: {
      path: "/images/showroom/showroom-3.jpg",
      title: "Exhibición de Colecciones de Temporada en Showroom",
      altText: "Detalle de calzado de temporada exhibido bajo iluminación profesional en el showroom de SkyBlue",
      metaDescription: "Todas las líneas de Xti, Refresh, Petite Jolie y Giulia Domna en exhibición permanente para comerciantes mayoristas.",
      keywords: ["coleccion calzado temporada mayorista", "muestrarios de calzado Argentina", "exhibicion calzado importado"]
    }
  },
  events: {
    efica: {
      path: "/images/events/efica.jpg",
      title: "Stand de SkyBlue en EFICA — Exposición de Fabricantes de la Industria del Calzado",
      altText: "Stand oficial de SkyBlue Calzado Mayorista en el Centro Costa Salguero, CABA",
      metaDescription: "Participación oficial de SkyBlue en EFICA Costa Salguero. Presentación exclusiva de las colecciones europeas y brasileñas para el canal mayorista.",
      keywords: ["EFICA Costa Salguero calzado", "feria de calzado Buenos Aires", "SkyBlue en EFICA", "exposicion mayorista calzado"]
    },
    exical: {
      path: "/images/events/exical.jpg",
      title: "Stand de SkyBlue en EXICAL — Exposición de Calzado de la Región Centro",
      altText: "Stand de exhibición de calzado SkyBlue en el Complejo Ferial Córdoba",
      metaDescription: "Presencia federal de SkyBlue en EXICAL Córdoba. Abastecemos a zapaterías y comercios de Córdoba, Santa Fe, Cuyo y el norte argentino.",
      keywords: ["EXICAL Cordoba calzado", "feria calzado region centro", "SkyBlue EXICAL", "zapaterias Cordoba mayorista"]
    },
    tucumanVideo: {
      path: "/videos/events/tucuman.mp4",
      title: "Gira Comercial SkyBlue en Tucumán y el Norte Argentino",
      altText: "Video de la gira comercial de SkyBlue acercando colecciones y muestras a zapaterías del NOA",
      metaDescription: "Llevamos nuestras colecciones de calzado oficial a los principales centros comerciales del interior del país con logística bonificada.",
      keywords: ["gira comercial calzado Tucuman", "calzado mayorista NOA", "distribuidor calzado interior Argentina"]
    }
  },
  videos: {
    xtiCampaign: {
      path: "/videos/brands/xti.mp4",
      title: "Fashion Film Internacional María Becerra × XTI SS26",
      altText: "Spot publicitario de alta definición de María Becerra luciendo calzado Xti en pasarela",
      metaDescription: "Video promocional oficial de Xti España con María Becerra. Material en 4K disponible para descargar en el Drive VIP de clientes mayoristas.",
      keywords: ["video Maria Becerra Xti", "spot publicitario calzado", "reels calzado mayorista"]
    },
    refreshCampaign: {
      path: "/videos/brands/refresh.mp4",
      title: "Campaña Oficial Refresh con Mar Lucas",
      altText: "Spot de moda casual y sneakers urbanos de la marca europea Refresh",
      metaDescription: "Video de campaña de Refresh España con Mar Lucas. Descargá el material audiovisual oficial para publicar en tus historias de Instagram.",
      keywords: ["video Refresh Mar Lucas", "campaña calzado casual", "video zapatillas urbanas"]
    },
    petiteJolieCampaign: {
      path: "/videos/brands/petite-jolie.mp4",
      title: "Spot Petite Jolie — El Poder del J-Lastic® Impermeable",
      altText: "Video demostrativo de bolsos y calzado Petite Jolie destacando su resistencia al agua y aroma",
      metaDescription: "Video de producto de Petite Jolie demostrando la flexibilidad, impermeabilidad y brillo del material exclusivo J-Lastic.",
      keywords: ["video Petite Jolie", "demostracion Jlastic impermeable", "reels carteras por mayor"]
    },
    giuliaDomnaCampaign: {
      path: "/videos/brands/giulia-domna.mp4",
      title: "Spot Giulia Domna — Cuero Legítimo de Brasil",
      altText: "Video de confección artesanal y calzado de cuero de alta gama Giulia Domna",
      metaDescription: "Spot de calzado brasileño en cuero genuino con terminaciones artesanales para boutiques de calzado fino.",
      keywords: ["video Giulia Domna", "calzado cuero Brasil mayorista", "botas de cuero por mayor"]
    }
  }
};
