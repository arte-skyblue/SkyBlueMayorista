# 03. Gestión de Stock, Logística y Depósitos

## 1. Topología de Sucursales y Depósitos
El ERP gestiona el inventario distribuido entre múltiples puntos físicos asociados a cada razón social:

### Sucursales Empresa 1 (DANIEL ALEJANDRO GRASSO):
- **Store 1**: Local / Showroom Principal (Tapiales / Outlet).
- **Store 3**: Depósito Central de Distribución y Almacenamiento.
- **Store 9**: Local Comercial Adicional.
- **Store 10**: Depósito de Tránsito / Reservas Mayoristas.

### Sucursales Empresa 2 (GATICAR):
- **Store 5**: Local Comercial (SBW CANNING).
- **Store 6**: Depósito de Mercadería Gaticar.

---

## 2. Estados y Tipos de Stock
Para evitar ventas sin stock (quiebres) y sobreventas en canales online (B2B, Mercado Libre, Tiendanube), el sistema maneja 3 capas de inventario por cada SKU (Artículo + Color + Talle + Depósito):

```
Stock Físico (Total en Estantería)
 ├── (-) Stock Comprometido (Pedidos confirmados pendientes de empaque)
 ├── (-) Stock Reservado (Cotizaciones / Apartados preventa)
 └── (=) Stock Disponible para la Venta (Lo que se publica en la Web / B2B)
```

1. **Stock Disponible (`/control/stockAvailable/`)**:
   - Cantidad neta que se publica en los catálogos y plataformas online.
2. **Stock Comprometido (`/control/stockCommitted/`)**:
   - Pares o bultos asignados a pedidos B2B abiertos (`iB2B/openOrders`), ventas de Mercado Libre o Tiendanube que aún no fueron rematadas o facturadas.
3. **Stock Reservado (`/control/stockReservation/`)**:
   - Bloqueo temporal de mercadería por parte de ejecutivos de venta para clientes mayoristas.

---

## 3. Movimientos y Logística Inter-Sucursal
- **Envíos de Mercadería / Transferencias (`/control/stockTracking/default.asp`)**:
  - Generación de guías de despacho y remitos internos de transferencia (ej: de Depósito Central a Local Tapiales o Canning).
  - Estados: *En tránsito*, *Recibido*, *Con discrepancias*.
- **Remitos de Ingreso de Proveedores (`/control/purchasesRefer/default.asp`)**:
  - Ingreso de stock por orden de compra o importación. Impacto directo en el stock físico del depósito receptor y actualización de costos promedio ponderados.

---

## 4. Auditoría y Control de Inventario
1. **Control Manual de Stock (`/control/stockSummary/filter.asp`)**:
   - Conteos periódicos por pasillo, marca o temporada con ajuste de diferencias de inventario (faltantes / sobrantes).
2. **Control con Colector de Datos (`/control/stockSummary/projects.asp`)**:
   - Integración con pistolas lectoras y terminales portátiles mediante escaneo masivo de códigos EAN13 para inventarios rápidos.

---

## 5. Valorización de Stock
- Endpoint: `/reports/stockReports/valuedStockByDate.asp`
- Permite valorizar el inventario a una fecha histórica determinada:
  - **Valor a Costo**: Cantidad $\times$ Costo de reposición.
  - **Valor a Precio de Venta Mayorista**: Cantidad $\times$ Lista Mayorista.
  - **Valor a Precio Público**: Cantidad $\times$ Lista Público.
