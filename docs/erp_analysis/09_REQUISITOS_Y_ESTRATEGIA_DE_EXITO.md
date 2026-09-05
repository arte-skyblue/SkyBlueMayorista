# 09. Requisitos Clave y Estrategia para el Mejor Resultado Posible

Para que el desarrollo del nuevo ERP de SkyBlue sea un éxito rotundo, rápido y sin fricciones, hemos establecido los pilares esenciales de infraestructura, automatización y agentes especializados:

---

## 1. Agentes Especializados de Desarrollo Configurados

Hemos configurado un equipo de agentes autónomos especializados para construir cada capa del sistema:

1. **`erp_architect`**:
   - Encargado del diseño de la base de datos PostgreSQL, esquemas relacionales de calzado (Artículos $\times$ Colores $\times$ Curvas de Talles), modelos de precios dinámicos y arquitectura de API modular.
2. **`erp_sync_engine`**:
   - Encargado del motor de sincronización en tiempo real con la web de SkyBlue, colas Redis, WebSockets para el Showroom, y el módulo de **Embarques / Preventas de Importación**.
3. **`afip_fiscal_agent`**:
   - Encargado de la facturación electrónica AFIP (WSFEv1), emisión de comprobantes A/B con CAE y QR fiscal, y exportación automática para el Libro IVA Digital.

---

## 2. Pila Tecnológica e Infraestructura Sugerida

Para lograr una plataforma con costo de mantenimiento mínimo, ultra-rápida y escalable:

- **Base de Datos**: **PostgreSQL** alojado en la nube (ej: Supabase, Railway o VPS propio con Docker).
- **Backend / API**: **Node.js (TypeScript con Fastify o NestJS)** con conexión en tiempo real vía WebSockets.
- **Frontend / Panel ERP**: **Next.js 15 + Tailwind CSS + Shadcn UI** (desplegable en Vercel con CDN global).
- **Almacenamiento Multimedia**: **Cloudflare R2** (almacenamiento de imágenes de alta resolución sin costo de transferencia de ancho de banda).

---

## 3. ¿Qué Hace Falta para Comenzar? (Checklist de Requisitos)

Para garantizar un desarrollo ágil y alineado al 100% con la operación real:

### A. Definición del MVP (Fase 1 de Impacto Inmediato):
Recomendamos lanzar una primera versión funcional enfocada en resolver el dolor principal:
1. **Módulo de Catálogo y Carga Rápida** (Artículos, Curvas, Colores, Precios).
2. **Módulo de Embarques y Stock en Tránsito** (Separación de stock real vs importaciones + preventas).
3. **Control de Stock Depósito General vs Outlet Tapiales**.
4. **API de Sincronización Directa con la Web de SkyBlue**.

### B. Datos para Conexiones Fiscales (Para la etapa de Facturación):
- Certificado digital de AFIP (`.crt` y `.key`) emitido desde la web de AFIP con clave fiscal (puede usarse primero el entorno de pruebas/homologación de AFIP).
- Punto de venta electrónico asignado en AFIP para Web Services.

### C. Estrategia de Migración Inicial de Datos:
- Ejecutar el script extractor automático para importar en la nueva base de datos todo el catálogo de calzados, fotos, temporadas y marcas existentes sin tener que cargar nada a mano.
