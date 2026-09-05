# Documento 03: Control Multi-Depósito y Transferencias de Stock

## 1. Estructura de Depósitos Reales de SkyBlue
El sistema opera con 4 sucursales y depósitos reales registrados en iPN ERP:

| Código de Depósito | Nombre Oficial | Ubicación / Dirección | Finalidad Comercial | Volumen Físico |
| :--- | :--- | :--- | :--- | :--- |
| **`DEP_GRAL_SHOWROOM`** | Depósito General Showroom | Curapaligue 1428 (Planta Showroom), Tapiales | Venta mayorista por curva cerrada y pedidos B2B | **68.946 pares** (60%) |
| **`OUTLET_TAPIALES`** | Outlet Curapaligue 1428 | Curapaligue 1428 (Local Comercial), Tapiales | Venta minorista directa y stock en vivo de Tiendanube | **44.538 pares** (40%) |
| **`SBW_CANNING`** | SBW Canning | Canning, Buenos Aires | Local de distribución auxiliar | **0 pares** (en reserva) |
| **`DEP_CANUELAS`** | SkyBlue Cañuelas | Av. Libertad 1190, Cañuelas | Sucursal comercial | **0 pares** (en reserva) |

**Total de Stock Físico Consolidado:** **113.484 pares** distribuidos en los 3.264 artículos (19.584 variantes de talle del 35 al 40).

---

## 2. Lógica de Descuento de Stock por Canal
1. **Pedidos Mayoristas (Showroom / WhatsApp):** Descuentan stock inmediatamente del `DEP_GRAL_SHOWROOM`.
2. **Ventas Web (Tiendanube / www.skyblue.com.ar):** Descuentan stock automáticamente de `OUTLET_TAPIALES`.
3. **Ventas Mercado Libre:** Vinculadas al Showroom para envíos Flex/Full según tipo de publicación.

---

## 3. Transferencias Internas de Inventario
El módulo permite registrar remitos internos de transferencia de calzado entre depósitos:
- **Origen -> Destino:** Por ejemplo, de *Depósito General Showroom* a *Outlet Curapaligue 1428*.
- **Trazabilidad por Talle:** La transferencia descuenta del talle específico del depósito origen e incrementa la misma cantidad en el depósito destino.
- **Registro en Historial (`StockMovement`):** Generación de número de remito interno con fecha, usuario y motivo del movimiento.
