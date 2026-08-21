import fs from 'fs';
import path from 'path';

function sanitizeFilename(name) {
  return (name || 'sin_nombre').replace(/[/\\?%*:|"<>]/g, '_').trim();
}

async function downloadWithRetry(url, destPath, retries = 3) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
    return true; // Already downloaded
  }

  while (retries > 0) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(destPath, buffer);
      return true;
    } catch (e) {
      retries--;
      if (retries === 0) {
        console.error(`\nError descargando ${url}: ${e.message}`);
        return false;
      }
      await new Promise(r => setTimeout(r, 400));
    }
  }
  return false;
}

async function main() {
  console.log('=== INICIANDO DESCARGA DE IMÁGENES DE PRODUCTOS ===\n');

  const products = JSON.parse(fs.readFileSync('data/products_all.json', 'utf8'));

  const baseDir = path.resolve('data', 'images');
  const mainOnlyDir = path.join(baseDir, 'imagenes_principales');
  const allByProductDir = path.join(baseDir, 'por_producto');

  fs.mkdirSync(mainOnlyDir, { recursive: true });
  fs.mkdirSync(allByProductDir, { recursive: true });

  // Prepare download queue
  const tasks = [];

  for (const p of products) {
    const brandClean = sanitizeFilename(p.brand);
    const skuClean = sanitizeFilename(p.sku || p.id);
    const prodFolder = path.join(allByProductDir, brandClean, `${skuClean}_${p.id}`);
    fs.mkdirSync(prodFolder, { recursive: true });

    // Main image
    if (p.mainImage) {
      const mainFlatDest = path.join(mainOnlyDir, `${brandClean}_${skuClean}_${p.id}.webp`);
      const mainProdDest = path.join(prodFolder, `00_principal.webp`);
      tasks.push({ url: p.mainImage, dest: mainProdDest, secondaryDest: mainFlatDest });
    }

    // All gallery images
    if (p.images && Array.isArray(p.images)) {
      p.images.forEach((imgUrl, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const imgDest = path.join(prodFolder, `foto_${num}.webp`);
        tasks.push({ url: imgUrl, dest: imgDest });
      });
    }
  }

  // Deduplicate tasks by destination
  const uniqueTasksMap = new Map();
  for (const t of tasks) {
    uniqueTasksMap.set(t.dest, t);
  }
  const uniqueTasks = Array.from(uniqueTasksMap.values());

  console.log(`Total de productos: ${products.length}`);
  console.log(`Total de imágenes a descargar: ${uniqueTasks.length}\n`);

  const CONCURRENCY = 20;
  let completed = 0;
  let successCount = 0;
  const total = uniqueTasks.length;

  async function worker(task) {
    const success = await downloadWithRetry(task.url, task.dest);
    if (success) {
      successCount++;
      if (task.secondaryDest) {
        try {
          fs.copyFileSync(task.dest, task.secondaryDest);
        } catch (e) {}
      }
    }
    completed++;
    if (completed % 50 === 0 || completed === total) {
      const pct = ((completed / total) * 100).toFixed(1);
      process.stdout.write(`\rProgreso descarga imágenes: ${completed}/${total} (${pct}%) completadas...`);
    }
  }

  // Execute in batches
  for (let i = 0; i < uniqueTasks.length; i += CONCURRENCY) {
    const chunk = uniqueTasks.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(worker));
  }

  console.log(`\n\nDescarga finalizada con éxito!`);
  console.log(`- Total descargadas: ${successCount} de ${total}`);
  console.log(`- Carpeta de imágenes por producto y marca: data/images/por_producto/`);
  console.log(`- Carpeta de imágenes principales: data/images/imagenes_principales/`);
}

main().catch(console.error);
