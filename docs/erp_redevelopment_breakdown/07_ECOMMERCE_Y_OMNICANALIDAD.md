# Documento 07: E-Commerce Omnicanal & Sincronización en Tiempo Real

## 1. Los 4 Canales Digitales Conectados
El ERP consolida la comercialización digital en 4 plataformas líderes del mercado:

| Canal Digital | Subtítulo / URL | Depósito de Stock Asignado | Estrategia Comercial |
| :--- | :--- | :--- | :--- |
| **Tiendanube** | `www.skyblue.com.ar` | **Outlet Curapaligue 1428** | Tienda minorista oficial directa al consumidor final |
| **Mercado Libre** | Tienda Oficial SkyBlue | **Depósito General Showroom** | Venta mayorista y minorista con envíos Flex y Full |
| **Mercado Shops** | Catálogo Mayorista Express | **Depósito General Showroom** | Catálogo digital complementario sin comisiones de marketplace |
| **Provincia Compras** | Portal Banco Provincia | **Outlet Curapaligue 1428** | Ventas con promociones bancarias y cuotas sin interés |

---

## 2. Reglas de Descuento Automático de Stock
- Las ventas generadas en **Tiendanube** y **Provincia Compras** descuentan inventario físico inmediatamente del depósito `OUTLET_TAPIALES` (Curapaligue 1428), protegiendo el inventario mayorista del showroom.
- Las ventas mayoristas y de **Mercado Libre** descuentan del `DEP_GRAL_SHOWROOM`.

---

## 3. Botón de Sincronización Global
El módulo incluye un botón maestro para sincronizar instantáneamente:
- Precios actualizados según las 10 listas oficiales.
- Altas, modificaciones y bajas de artículos.
- Estado de stock en tiempo real para evitar quiebres o sobreventas en los canales digitales.
