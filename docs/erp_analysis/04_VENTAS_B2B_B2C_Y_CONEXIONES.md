# 04. Ventas B2B, B2C, Canales Digitales y Conexiones Externas

## 1. Portal Mayorista iB2B (`mayoristas.skyblue.com.ar`)
El módulo B2B permite a los clientes mayoristas autorizados acceder a un catálogo online personalizado con sus condiciones comerciales.

### Componentes Técnicos B2B:
- **Gestión de Usuarios B2B (`/iB2B/users/default.asp`)**:
  - Alta de clientes con CUIT, Razón Social, Vendedor asignado, Lista de precios aplicable (ej: Lista 2 Mayorista o Lista 8 Clientes 2), y tope de crédito en cuenta corriente.
- **Gestor de Contenidos B2B (`/B2C/CMS/default.asp?ib2b=1`)**:
  - Configuración de banners, marcas destacadas, promociones por volumen y avisos de preventa.
- **Pedidos Abiertos B2B (`/iB2B/openOrders/default.asp`)**:
  - Recepción de carritos mayoristas enviados por los clientes.
  - Flujo de estados: *Borrador $\rightarrow$ Recibido $\rightarrow$ Aprobación de Crédito $\rightarrow$ Armado / Picking en Depósito $\rightarrow$ Facturación AFIP $\rightarrow$ Despacho*.

---

## 2. Conectores e Integraciones E-Commerce

### A. Mercado Libre Argentina (MLA)
- **Módulo de Publicaciones**: `/B2C/MLA/Items/default.asp`
- **Módulo de Ventas**: `/B2C/MLA/orders/default.asp`
- **Lógica de Conexión**:
  - Mapeo de categorías de calzado de Mercado Libre.
  - Lista de precios específica: **Lista 9 - ML CLASSIC** (con un recargo del $+150\%$ para absorber comisiones de plataforma e impuestos).
  - Sincronización bidireccional de stock disponible para evitar reclamos por falta de stock.

### B. Tiendanube (TDN)
- **Módulo de Productos**: `/B2C/TDN/Products/default.asp`
- **Módulo de Órdenes**: `/B2C/TDN/orders/default.asp`
- **Lógica de Conexión**:
  - Exportación automática del catálogo (imágenes, títulos, variantes de color y curva de talles).
  - Sincronización periódica de precios y stock.
  - Importación automática de órdenes de compra con datos del comprador para facturación.

### C. Pasarelas de Pago y Mercado Pago
- **Configuración de Cuentas**: `/B2C/mercadoPagoAccounts/default.asp`
- **Cobros QR en Locales**: `/admin/InStoreQRPayments/default.asp`
- Conciliación automática de acreditaciones, comisiones de retención y liquidación bancaria.

---

## 3. Clientes y Gestión de Cuentas Corrientes
- **Ficha Integral de Clientes (`/admin/customers/default.asp`)**:
  - Datos fiscales (CUIT, IVA, IIBB, Exenciones).
  - Condiciones de pago (Contado, Cheques a 30/60/90 días, Cuenta Corriente con cupo).
- **Reportes Financieros de Clientes**:
  - *Saldos de Clientes por Fecha* (`/admin/accounting/customersBalance.asp`).
  - *Extracto de Cuenta Corriente por Vendedor* (`/reports/customerAcctRescBySalesMan/default.asp`).
  - *Aging de Deuda Vencida y a Vencer* (`/admin/accounting/aging.asp`).
  - *Comprobantes Pendientes de Cobro* (`/admin/accounting/reportPayedSales.asp`).
