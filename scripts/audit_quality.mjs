import fs from 'fs';

const prods = JSON.parse(fs.readFileSync('data/products_all.json', 'utf8'));

function decodeHtml(str) {
  if (!str) return '';
  return str
    .replaceAll('&#xF1;', 'ñ')
    .replaceAll('&#xD1;', 'Ñ')
    .replaceAll('&quot;', '"')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#xE1;', 'á')
    .replaceAll('&#xE9;', 'é')
    .replaceAll('&#xED;', 'í')
    .replaceAll('&#xF3;', 'ó')
    .replaceAll('&#xFA;', 'ú');
}

const auditResults = [];

let stats = {
  total: prods.length,
  sinFotos: 0,
  unaSolaFoto: 0,
  galeriaCompleta: 0,
  tituloEsSku: 0,
  sinDescripcion: 0,
  descripcionCorta: 0,
  descripcionCompleta: 0,
  precioCeroOInvalido: 0,
  precioBajoSospechoso: 0,
  sinVariantes: 0,
  sinStock: 0,
  conStock: 0,
  marcas: {},
  temporadas: {},
  puntajes: {
    critico: 0,
    regular: 0,
    excelente: 0
  }
};

for (const p of prods) {
  const issues = [];
  let score = 100;
  
  const brand = p.brand || 'Sin Marca';
  const season = decodeHtml(p.season || 'Sin Temporada');
  const title = p.title ? p.title.trim() : '';
  const sku = p.sku ? p.sku.trim() : '';
  const desc = p.description ? p.description.trim() : '';
  const price = typeof p.price === 'number' ? p.price : 0;
  const numImages = (p.images && Array.isArray(p.images)) ? p.images.length : (p.mainImage ? 1 : 0);
  const numVariants = (p.variants && Array.isArray(p.variants)) ? p.variants.length : 0;
  const totalStock = p.totalStock || 0;
  const numModalities = (p.purchaseModalities && Array.isArray(p.purchaseModalities)) ? p.purchaseModalities.length : 0;

  stats.marcas[brand] = (stats.marcas[brand] || 0) + 1;
  stats.temporadas[season] = (stats.temporadas[season] || 0) + 1;

  if (numImages === 0) {
    issues.push('SIN_FOTOS');
    score -= 40;
    stats.sinFotos++;
  } else if (numImages === 1) {
    issues.push('SOLO_1_FOTO');
    score -= 10;
    stats.unaSolaFoto++;
  } else {
    stats.galeriaCompleta++;
  }

  if (!title || title === sku) {
    issues.push('TITULO_ES_SKU');
    score -= 20;
    stats.tituloEsSku++;
  }

  if (!desc) {
    issues.push('SIN_DESCRIPCION');
    score -= 25;
    stats.sinDescripcion++;
  } else if (desc.length < 40) {
    issues.push('DESCRIPCION_MUY_CORTA');
    score -= 10;
    stats.descripcionCorta++;
  } else {
    stats.descripcionCompleta++;
  }

  if (price === 0) {
    issues.push('PRECIO_EN_CERO');
    score -= 30;
    stats.precioCeroOInvalido++;
  } else if (price < 5000) {
    issues.push('PRECIO_ANOMALO (<$5k)');
    score -= 15;
    stats.precioBajoSospechoso++;
  }

  if (numVariants === 0) {
    issues.push('SIN_VARIANTES');
    score -= 15;
    stats.sinVariantes++;
  }

  if (totalStock === 0) {
    issues.push('SIN_STOCK_INMEDIATO');
    stats.sinStock++;
  } else {
    stats.conStock++;
  }

  if (numModalities === 0) {
    issues.push('SIN_CURVAS_MODALIDADES');
  }

  score = Math.max(0, score);

  let statusLevel = 'EXCELENTE';
  if (score < 50) {
    statusLevel = 'CRITICO';
    stats.puntajes.critico++;
  } else if (score < 80) {
    statusLevel = 'REGULAR';
    stats.puntajes.regular++;
  } else {
    statusLevel = 'EXCELENTE';
    stats.puntajes.excelente++;
  }

  auditResults.push({
    id: p.id,
    sku: sku,
    brand: brand,
    season: season,
    title: title,
    price: price,
    priceFormatted: p.priceFormatted,
    numImages: numImages,
    hasDesc: desc ? 'SI' : 'NO',
    descLength: desc.length,
    descSnippet: desc.substring(0, 60).replace(/\r?\n|\r/g, ' '),
    totalStock: totalStock,
    numVariants: numVariants,
    modalitiesCount: numModalities,
    score: score,
    statusLevel: statusLevel,
    issues: issues.join(' | '),
    url: p.url
  });
}

const csvHeaders = [
  'ID', 'SKU', 'Marca', 'Temporada', 'Titulo_Actual', 'Precio', 'Precio_Formateado',
  'Cant_Fotos', 'Tiene_Descripcion', 'Largo_Desc', 'Resumen_Desc', 'Stock_Total',
  'Cant_Variantes_Color', 'Cant_Modalidades_Curva', 'Puntaje_Calidad_100', 'Nivel_Estado', 'Problemas_Detectados', 'URL_ERP'
];

const csvRows = [csvHeaders.join(';')];
for (const r of auditResults) {
  const row = [
    r.id,
    `"${r.sku}"`,
    `"${r.brand}"`,
    `"${r.season}"`,
    `"${(r.title || '').replaceAll('"', '""')}"`,
    r.price,
    `"${r.priceFormatted}"`,
    r.numImages,
    r.hasDesc,
    r.descLength,
    `"${(r.descSnippet || '').replaceAll('"', '""')}"`,
    r.totalStock,
    r.numVariants,
    r.modalitiesCount,
    r.score,
    r.statusLevel,
    `"${r.issues}"`,
    `"${r.url}"`
  ];
  csvRows.push(row.join(';'));
}

fs.writeFileSync('data/catalogo_auditoria_completa.csv', csvRows.join('\n'), 'utf8');
fs.writeFileSync('data/catalogo_auditoria_completa.json', JSON.stringify({ stats, results: auditResults }, null, 2), 'utf8');

console.log('=== AUDITORIA FINALIZADA EXITOSAMENTE ===');
console.log('Total analizados:', stats.total);
console.log(JSON.stringify(stats, null, 2));
