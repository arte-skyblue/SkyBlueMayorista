import fs from 'fs';

export function parseProductDetailHtml(html, id) {
  // 1. SKU & Title
  const skuMatch = html.match(/<span class="sku"[^>]*>\s*SKU:\s*([^<]+)<\/span>/i);
  const sku = skuMatch ? skuMatch[1].trim() : '';

  const titleMatch = html.match(/<div class="pd-head pd-row">\s*<span class="sku"[^>]*>[\s\S]*?<\/span>\s*<h2>([^<]+)<\/h2>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  // 2. Brand & Season
  const seasonMatch = html.match(/<b>Temporada:<\/b>\s*([^<\n]+)/i);
  const season = seasonMatch ? seasonMatch[1].trim() : '';

  // 3. Description
  const descMatch = html.match(/<span class="descripcion-texto"[^>]*>([\s\S]*?)<\/span>/i);
  let description = '';
  if (descMatch) {
    description = descMatch[1]
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .trim();
  }

  // 4. Price
  const priceMatch = html.match(/<p class="current-price price-color">\s*([\s\S]*?)\s*<\/p>/i);
  let priceStr = '';
  let priceNum = null;
  if (priceMatch) {
    priceStr = priceMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const numMatch = priceStr.match(/\$\s*([\d\.,]+)/);
    if (numMatch) {
      priceNum = parseFloat(numMatch[1].replace(/\./g, '').replace(',', '.'));
    }
  }

  // 5. Images
  const showcaseMatch = html.match(/<div class="pd-showcase"[^>]*>([\s\S]*?)<\/div>/i);
  const images = [];
  if (showcaseMatch) {
    const imgMatches = [...showcaseMatch[1].matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
    for (const m of imgMatches) {
      let src = m[1].replace(/&amp;/g, '&');
      if (src && !images.includes(src)) {
        images.push(src);
      }
    }
  }
  const mainImage = images[0] || null;

  // 6. Product Tasks (Purchase modalities)
  let productTasks = [];
  let publishedByUnits = false;
  const tasksMatch = html.match(/var productTasks = (\[[\s\S]*?\]);/i);
  if (tasksMatch) {
    try {
      productTasks = JSON.parse(tasksMatch[1]);
    } catch (e) {
      // fallback ignore
    }
  }
  const unitsMatch = html.match(/var publishedByUnits = "(True|False)";/i);
  if (unitsMatch) {
    publishedByUnits = unitsMatch[1].toLowerCase() === 'true';
  }

  // 7. Colors & Sizes Table
  const tableMatch = html.match(/<table[\s\S]*?id="productVariants"[\s\S]*?>([\s\S]*?)<\/table>/i);
  const variants = [];
  const sizesHeader = [];

  if (tableMatch) {
    const tableHtml = tableMatch[0];

    // Extract headers (sizes)
    const thMatches = [...tableHtml.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)];
    for (const th of thMatches) {
      const text = th[1].replace(/<[^>]+>/g, '').trim();
      if (text && !['Color', 'Cantidad / Tarea', 'Precio', 'Total'].includes(text)) {
        sizesHeader.push(text);
      }
    }

    // Extract tbody rows
    const tbodyMatch = tableHtml.match(/<tbody>([\s\S]*?)<\/tbody>/i);
    if (tbodyMatch) {
      const rowMatches = [...tbodyMatch[1].matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)];
      for (const row of rowMatches) {
        const rHtml = row[1];

        // Color name & ID
        const colorNameMatch = rHtml.match(/<td data-title="Color"[^>]*>[\s\S]*?<span class="qty-total">([^<]+)<\/span>/i);
        const colorName = colorNameMatch ? colorNameMatch[1].trim() : '';

        const colorIdMatch = rHtml.match(/colorID="(\d+)"/i);
        const colorId = colorIdMatch ? colorIdMatch[1] : null;

        // Price for this color
        const colorPriceMatch = rHtml.match(/name="taskPrice"[^>]*originalPrice="([^"]*)"[^>]*>([^<]+)<\/td>/i);
        const colorPrice = colorPriceMatch ? colorPriceMatch[2].trim() : (priceStr || '');

        // Sizes in this row
        const rowSizes = [];
        const sizeTdMatches = [...rHtml.matchAll(/<td data-title="([^"]+)">([\s\S]*?)<\/td>/gi)];
        for (const std of sizeTdMatches) {
          const sizeTitle = std[1];
          if (['Color', 'Cantidad / Tarea', 'Precio', 'Total'].includes(sizeTitle)) continue;

          const stdHtml = std[2];
          const sizeIdMatch = stdHtml.match(/sizeID="(\d+)"/i);
          const sizeId = sizeIdMatch ? sizeIdMatch[1] : null;

          const stockMatch = stdHtml.match(/\/\s*(\d+)/i);
          const stock = stockMatch ? parseInt(stockMatch[1], 10) : 0;

          const masterPidMatch = stdHtml.match(/masterPID="(\d+)"/i);
          const masterPid = masterPidMatch ? masterPidMatch[1] : null;

          rowSizes.push({
            size: sizeTitle,
            sizeId,
            stock,
            masterPid
          });
        }

        variants.push({
          color: colorName,
          colorId,
          price: colorPrice,
          sizes: rowSizes
        });
      }
    }
  }

  // Calculate total stock
  let totalStock = 0;
  for (const v of variants) {
    for (const s of v.sizes) {
      totalStock += (s.stock || 0);
    }
  }

  const isAvailable = !html.includes('PRODUCTO NO DISPONIBLE') && (totalStock > 0 || variants.length > 0);

  return {
    id,
    sku,
    title,
    season,
    description,
    price: priceNum,
    priceFormatted: priceStr,
    available: isAvailable,
    totalStock,
    mainImage,
    images,
    publishedByUnits,
    productTasks,
    variants
  };
}
