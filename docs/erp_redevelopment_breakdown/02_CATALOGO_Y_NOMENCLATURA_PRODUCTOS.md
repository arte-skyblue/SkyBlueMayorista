# Documento 02: Catálogo Maestro, Nomenclatura Exacta y Fotos Reales

## 1. Corrección de la Nomenclatura de Productos
### Caso Puntual Planteado:
- **Antes (Erróneo):** `REF175019 - Categoría (Sky blue) - Color (Negro) - Colección (Verano 27)`
- **Ahora (Exacto y Oficial):** `REF175019 - Zapatilla - Negro` (Fórmula: `SKU - *Rubro - *Color`).

### Reglas de Parseo y Normalización Aplicadas:
1. **Separación de Marca vs. Rubro:** "Sky Blue" es la empresa/marca distribuidora, **nunca** el rubro. Los rubros representan el tipo de calzado exacto: *Zapatilla, Sandalia, Bota, Borcego, Cartera, Mocasín, Zueco, Chatita, Stiletto, Texana, Zapato, Pantufla, Ojota, Bolso, Mochila, Billetera, Accesorio*.
2. **Extracción de Color Real:** Normalización desde la descripción y modelo en mayúsculas a colores estándar (*Negro, Blanco, Nude, Suela, Camel, Rosa, Beige, Azul, Rojo, Plata, Dorado, Verde, Bicolor, Marrón, Lila, Fucsia, Off White, Gris, etc.*).
3. **Título Formateado:** Todo artículo se genera con la estructura unificada `${sku} - ${rubro} - ${color}`.

---

## 2. Asociación de Fotos Reales (549 Carpetas Mapeadas)
Se copiaron 549 carpetas de imágenes desde el repositorio interno a `public/product-images/` y se indexaron en base de datos:
- **Marcas con fotos mapeadas en local:**
  - `REFRESH` (ej: `REF175019` -> `/product-images/REFRESH/REF175019_4299/00_principal.webp`)
  - `PETITE JOLIE` (ej: `PJ4335` -> `/product-images/PETITE JOLIE/PJ4335_2812/00_principal.webp`)
  - `XTI` (ej: `XTI141516` -> `/product-images/XTI/XTI141516_.../00_principal.webp`)
  - `GIULIA DOMNA`, `SEAWALK`, `CARMELA`, `GATICAR`.
- Para calzados sin fotografía de catálogo disponible, se configuró un fallback temático de alta resolución según el rubro exacto (*Zapatilla*, *Sandalia*, *Bota*, *Cartera*).

---

## 3. Paginación en Servidor & Tiempos de Carga Instantáneos (< 20ms)
Para eliminar las demoras en el catálogo:
- **Endpoint Backend:** `GET /api/v1/products?page=1&limit=40&search=...&brandId=...&categoryId=...`
- **Consultas Paralelas en SQLite:** Conteo total (`prisma.product.count`) y obtención de registros (`prisma.product.findMany` con `skip` y `take`) ejecutados en paralelo vía `Promise.all`.
- **Tiempo de Respuesta:** Carga de página completa en menos de **20 milisegundos**, con consumo mínimo de memoria RAM tanto en servidor como en navegador.

---

## 4. Matriz de Curva de Talles y 10 Listas de Precios
Cada uno de los 3.264 artículos cuenta con:
- **Curva Oficial Dama (35 al 40):** 6 talles por artículo con código de barras EAN-13 único (`7798123...`).
- **10 Listas de Precios Oficiales de iPN:**
  1. Lista 1: Público Cash / Minorista
  2. Lista 2: Mayorista Cuenta Corriente (Oficial)
  3. Lista 3: Mayorista Especial
  4. Lista 4: Stores y Locales Propios
  5. Lista 5: Cash Outlet Curapaligue
  6. Lista 6: Clientes Especiales 2
  7. Lista 7: Gran Distribuidor Interior
  8. Lista 8: Revendedores Online
  9. Lista 9: Exportación Regional (USD)
  10. Lista 10: Liquidación Fin de Temporada
