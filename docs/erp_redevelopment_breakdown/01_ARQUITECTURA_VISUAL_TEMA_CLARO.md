# Documento 01: Arquitectura Visual & Rediseño en Modo Claro Ejecutivo (Light Theme)

## 1. Diagnóstico del Estado Anterior y Problemas Corregidos
En la versión previa del panel ERP, se identificaron varios problemas críticos de experiencia de usuario y arquitectura visual:
- **Tonalidades oscuras y saturadas:** Uso de fondos oscuros (`bg-slate-950`, `bg-slate-900`) que dificultaban la lectura prolongada y generaban una estética alejada de un sistema de gestión empresarial y contable profesional.
- **Información ficticia:** Presencia de widgets y métricas de importaciones/contenedores marítimos ("MSCU-829182-3") que no correspondían a la operación cotidiana del depósito ni a los datos reales de iPN.
- **Módulo POS Mostrador innecesario:** Terminal de punto de venta mostrador que no se utiliza actualmente y sobrecargaba la navegación.
- **Tiempos de carga lentos en catálogo:** Renderizado de miles de elementos en memoria en el navegador sin paginación en backend.

---

## 2. Nueva Guía de Estilos y Paleta Ejecutiva (Light Theme)
El nuevo diseño sigue un estándar visual corporativo de alto rendimiento:

| Elemento | Token de Estilo Tailwind | Propósito y Sensación Visual |
| :--- | :--- | :--- |
| **Fondo General del Sistema** | `bg-slate-100/70` | Contraste suave que reduce la fatiga visual. |
| **Superficie de Tarjetas y Tablas** | `bg-white border-slate-200 shadow-xs` | Limpieza, separación clara de contenidos e higiene visual. |
| **Cabecera de Tablas** | `bg-slate-50 border-b border-slate-200` | Jerarquía visual clara con tipografía en mayúsculas `text-[11px] font-black text-slate-500`. |
| **Tipografía Principal** | `text-slate-900 font-extrabold` | Máxima legibilidad y contraste para nombres de productos y SKU. |
| **Tipografía Secundaria** | `text-slate-500 font-medium` | Metadatos, colores y descripciones técnicas. |
| **Acento Primario (Sky Blue)** | `bg-sky-600 text-white` / `text-sky-700 bg-sky-50` | Identidad institucional de SkyBlue Mayorista. |
| **Acento Éxito & Stock** | `bg-emerald-50 text-emerald-700 border-emerald-200` | Pares disponibles y sincronizaciones en línea. |
| **Acento Canales Digitales** | `bg-purple-50 text-purple-700 border-purple-200` | Stock exclusivo de Tiendanube y Outlet Curapaligue 1428. |

---

## 3. Estructura de Navegación Depurada
Se eliminaron los accesos innecesarios (POS y contenedores ficticios) y se consolidaron 10 módulos operativos:
1. **Panel General (Dashboard):** Visión global con KPIs de inventario, cuentas corrientes y sucursales.
2. **Catálogo & Matriz 360°:** 3.264 artículos con fotos reales, paginación en backend y buscador omnicanal.
3. **Control Multi-Depósito:** Saldos por depósito (Showroom Tapiales vs. Outlet Curapaligue) y transferencias.
4. **Pedidos & WhatsApp:** Flujo Kanban desde pedido recibido hasta despacho.
5. **Clientes & Cuentas Corrientes:** 53 clientes con CUIT y saldos deudores reales de iPN.
6. **Transportes & Despachos:** Directorio completo de 56 empresas de transporte al interior.
7. **Producción & Talleres (MRP):** Órdenes de producción (OPs) y liquidación de destajo por par.
8. **E-Commerce Omnicanal:** Monitor en vivo de Tiendanube, Mercado Libre, Mercado Shops y Provincia Compras.
9. **10 Listas de Precios:** Políticas oficiales y simulador de márgenes comerciales.
10. **Sincronizador Web:** Panel de integración continua.

---

## 4. Buscador Global Omnibar (`Ctrl + K`)
Se implementó un componente de búsqueda rápida accesible con el atajo de teclado `Ctrl + K`:
- Permite buscar instantáneamente calzados por SKU (`REF175019`, `04748`, `PJ...`), rubro (`Zapatilla`, `Sandalia`), clientes o expresos de transporte sin salir de la vista actual.
