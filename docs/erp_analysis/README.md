# Índice de Documentación: Análisis de ERP iPN y Blueprint para Plataforma Propia SkyBlue

Este directorio contiene el análisis técnico exhaustivo, arquitectura de base de datos, módulos y el plan de desarrollo para reemplazar el ERP actual (**iPN ERP Cloud SaaS**) por una plataforma propia centralizada y vinculada a la web de **SkyBlue Mayorista**.

---

## Documentos Disponibles:

1. **[01. Arquitectura y Funcionamiento General](file:///d:/Usuarios/BRUNO-PC/Documents/ads/SkyBlueMayorista/docs/erp_analysis/01_ARQUITECTURA_Y_FUNCIONAMIENTO_GENERAL.md)**
   - Mecanismo de autenticación, sesiones, esquema multi-empresa (DANIEL ALEJANDRO GRASSO y GATICAR) y mapa global de módulos.

2. **[02. Modelo de Datos, Artículos, Temporadas y Catálogo](file:///d:/Usuarios/BRUNO-PC/Documents/ads/SkyBlueMayorista/docs/erp_analysis/02_MODELO_DE_DATOS_Y_CATALOGO.md)**
   - Entidad de Producto, matriz bidimensional de calzado (Talles x Colores), 33 tipos de curvas, 10 listas de precios dinámicas con fórmulas de recargo y marcas.

3. **[03. Gestión de Stock, Logística y Depósitos](file:///d:/Usuarios/BRUNO-PC/Documents/ads/SkyBlueMayorista/docs/erp_analysis/03_STOCK_LOGISTICA_Y_SUCURSALES.md)**
   - Topología multi-sucursal (Tapiales Showroom, Canning, Outlets, Depósitos Centrales), capas de stock (Físico, Comprometido, Disponible), transferencias y auditorías con colector.

4. **[04. Ventas B2B, B2C, Canales Digitales y Conexiones](file:///d:/Usuarios/BRUNO-PC/Documents/ads/SkyBlueMayorista/docs/erp_analysis/04_VENTAS_B2B_B2C_Y_CONEXIONES.md)**
   - Portal mayorista B2B (`mayoristas.skyblue.com.ar`), integraciones con Mercado Libre (MLA), Tiendanube (TDN), Mercado Pago QR y Cuentas Corrientes.

5. **[05. Módulo de Producción, Fichas Técnicas y Talleres](file:///d:/Usuarios/BRUNO-PC/Documents/ads/SkyBlueMayorista/docs/erp_analysis/05_PRODUCCION_Y_FICHAS_TECNICAS.md)**
   - Fichas técnicas de despiece de calzado, materias primas, órdenes de producción (OP), control de talleres externos y liquidación de haberes por par.

6. **[06. Módulo Fiscal, Contabilidad y Tesorería](file:///d:/Usuarios/BRUNO-PC/Documents/ads/SkyBlueMayorista/docs/erp_analysis/06_MODULO_FISCAL_CONTABLE.md)**
   - Facturación electrónica AFIP (WSFEv1), Subdiarios IVA Ventas / Compras, retenciones y percepciones ARBA/AGIP, Libro IVA Digital y gestión de cheques.

7. **[07. Plan de Desarrollo y Blueprint de la Plataforma ERP Propia](file:///d:/Usuarios/BRUNO-PC/Documents/ads/SkyBlueMayorista/docs/erp_analysis/07_PLAN_DESARROLLO_ERP_PROPIO.md)**
   - Hoja de ruta completa en 5 fases, stack tecnológico recomendado (Node/TypeScript + PostgreSQL + Redis + Next.js), arquitectura de sincronización en tiempo real con la web y estrategia de migración sin cortes.

8. **[08. Mejoras Operativas, Fluidez y Solución de Stock en Tránsito](file:///d:/Usuarios/BRUNO-PC/Documents/ads/SkyBlueMayorista/docs/erp_analysis/08_MEJORAS_OPERATIVAS_Y_UX.md)**
   - Solución al problema de mezclar stock físico con importaciones en camino, manejo de preventas automáticas, topología de Depósito General (Showroom) vs Outlet Tapiales (Web/Local) y reducción drástica de pasos operativos.

9. **[09. Requisitos Clave y Estrategia para el Mejor Resultado Posible](file:///d:/Usuarios/BRUNO-PC/Documents/ads/SkyBlueMayorista/docs/erp_analysis/09_REQUISITOS_Y_ESTRATEGIA_DE_EXITO.md)**
   - Pila tecnológica recomendada, checklist de inicio, agentes especializados configurados y plan de ejecución del MVP.
