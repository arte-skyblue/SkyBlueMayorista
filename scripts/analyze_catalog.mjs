import fs from 'fs';

const prods = JSON.parse(fs.readFileSync('data/products_all.json', 'utf8'));

console.log('=== ANALISIS PROFUNDO DEL CATALOGO (551 PRODUCTOS) ===\n');

let titleEqualsSku = 0;
let emptyDesc = 0;
let shortDesc = 0;
let zeroPrice = 0;
let weirdPrice = 0;
let noVariants = 0;
let hasStockCount = 0;
let totalStockSum = 0;
let singleImageCount = 0;
let multiImageCount = 0;

const colorNames = new Set();
const brandsStats = {};
const seasonStats = {};
const modalitiesStats = {};
const priceRanges = { '< 20k': 0, '20k - 40k': 0, '40k - 60k': 0, '60k - 80k': 0, '> 80k': 0 };

for (const p of prods) {
  // Brand
  brandsStats[p.brand] = (brandsStats[p.brand] || 0) + 1;
  // Season
  seasonStats[p.season || 'Sin Temporada'] = (seasonStats[p.season || 'Sin Temporada'] || 0) + 1;

  // Title
  if (p.title === p.sku || !p.title) titleEqualsSku++;

  // Description
  if (!p.description || p.description.trim() === '') emptyDesc++;
  else if (p.description.length < 50) shortDesc++;

  // Price
  if (!p.price || p.price === 0) zeroPrice++;
  else if (p.price < 5000) weirdPrice++;

  if (p.price < 20000) priceRanges['< 20k']++;
  else if (p.price <= 40000) priceRanges['20k - 40k']++;
  else if (p.price <= 60000) priceRanges['40k - 60k']++;
  else if (p.price <= 80000) priceRanges['60k - 80k']++;
  else priceRanges['> 80k']++;

  // Images
  if (!p.images || p.images.length <= 1) singleImageCount++;
  else multiImageCount++;

  // Variants & Colors
  if (!p.variants || p.variants.length === 0) noVariants++;
  else {
    for (const v of p.variants) {
      if (v.color) colorNames.add(v.color);
    }
  }

  // Stock
  if (p.totalStock > 0) {
    hasStockCount++;
    totalStockSum += p.totalStock;
  }

  // Modalities
  for (const m of p.purchaseModalities || []) {
    modalitiesStats[m.taskName] = (modalitiesStats[m.taskName] || 0) + 1;
  }
}

console.log('1. Calidad de Títulos y Textos:');
console.log(`- Productos cuyo Título es idéntico al SKU (sin nombre descriptivo comercial): ${titleEqualsSku} / ${prods.length} (${((titleEqualsSku/prods.length)*100).toFixed(1)}%)`);
console.log(`- Productos con descripción vacía: ${emptyDesc} / ${prods.length}`);
console.log(`- Productos con descripción corta (<50 carac.): ${shortDesc} / ${prods.length}`);

console.log('\n2. Precios y Condiciones:');
console.log(`- Precios en 0 o no cargados: ${zeroPrice}`);
console.log(`- Precios atípicos (< $5.000 ARS): ${weirdPrice}`);
console.log('Distribución de precios mayoristas:', priceRanges);

console.log('\n3. Stock y Variantes:');
console.log(`- Productos sin variantes de color/talle: ${noVariants}`);
console.log(`- Productos con stock inmediato mayor a cero: ${hasStockCount} / ${prods.length} (${((hasStockCount/prods.length)*100).toFixed(1)}%)`);
console.log(`- Total de unidades de stock inmediato en sistema: ${totalStockSum}`);
console.log(`- Cantidad de nombres de colores distintos detectados: ${colorNames.size}`);

console.log('\n4. Imágenes:');
console.log(`- Productos con 1 sola imagen o sin galería: ${singleImageCount}`);
console.log(`- Productos con galería multi-imagen: ${multiImageCount}`);

console.log('\n5. Modalidades de compra detectadas:', modalitiesStats);
console.log('\n6. Distribución por marcas:', brandsStats);
console.log('\n7. Distribución por temporadas:', seasonStats);

// Sample color naming inconsistencies
const colorArray = Array.from(colorNames);
console.log('\nEjemplo de inconsistencias en colores (Mayúsculas/Minúsculas/Spanglish/Tipos):');
console.log(colorArray.slice(0, 35));
