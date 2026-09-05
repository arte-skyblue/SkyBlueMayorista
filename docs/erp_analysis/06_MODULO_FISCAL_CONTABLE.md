# 06. Módulo Fiscal, Contabilidad y Tesorería

## 1. Facturación Electrónica AFIP (WSFEv1)
El ERP se integra con los Web Services de la AFIP / ARCA para la emisión fiscal de comprobantes:
- **Tipos de Comprobantes Soportados**:
  - Facturas `A`, `B`, `C` (Electrónicas y de Exportación `E`).
  - Notas de Crédito y Débito `A`, `B`, `C`.
  - Remitos Electrónicos de Transporte.
- **Campos Fiscales Clave**:
  - `CAE` (Código de Autorización Electrónico) y Fecha de Vencimiento de CAE.
  - Generación de Código QR Fiscal obligatorio según normativa RG 4291.
  - Desglose de Alícuotas de IVA ($21\%$, $10.5\%$, $0\%$, Exento, No Gravado).

---

## 2. Libros y Subdiarios Impositivos
1. **Subdiario IVA Ventas (`/admin/accounting/salesBook.asp`)**:
   - Registro cronológico de todas las operaciones facturadas con detalle de CUIT, Razón Social, Neto Gravado, IVA Débito Fiscal, Percepciones de IIBB y Total Facturado.
2. **Subdiario IVA Compras (`/admin/accounting/purchasesBookResume.asp`)**:
   - Registro de facturas de proveedores de materias primas, servicios y gastos con cómputo del Crédito Fiscal e Impuestos Internos.
3. **Resumen de Convenio Multilateral e IIBB (`/admin/accounting/agreementResume.asp`)**:
   - Liquidación de Ingresos Brutos por jurisdicción de venta (Provincia de Buenos Aires - ARBA, CABA - AGIP, Resto de Provincias).

---

## 3. Retenciones, Percepciones y Regímenes de Recaudación
- **Listado de Percepciones y Retenciones (`/admin/accounting/perceptionsRetentions.asp`)**:
  - Aplicación automática del padrón mensual de alícuotas de ARBA y AGIP al momento de emitir la factura según el CUIT del cliente mayorista.
  - Emisión y control de certificados de retención de IVA y Ganancias a proveedores.

---

## 4. Exportaciones e Interfaces para Aplicativos AFIP (`/admin/accounting/exportTXT.asp`)
El sistema genera los archivos `.txt` planos con el formato exacto requerido por los aplicativos fiscales:
- **Libro IVA Digital (AFIP)**:
  - `LIBRO_IVA_DIGITAL_VENTAS_CBTE.txt` y `LIBRO_IVA_DIGITAL_VENTAS_ALICUOTAS.txt`.
  - `LIBRO_IVA_DIGITAL_COMPRAS_CBTE.txt` y `LIBRO_IVA_DIGITAL_COMPRAS_ALICUOTAS.txt`.
- **Régimen de Información de Compras y Ventas (ex CITI)**.
- **Arciba (AGIP) y Arba (SIRTAC / SIPRIB)**.

---

## 5. Tesorería, Cheques y Medios de Pago
- **Gestión de Cartera de Cheques (`/admin/checks/default.asp`)**:
  - Cheques físicos y E-Cheqs recibidos de clientes mayoristas.
  - Estados: *En cartera $\rightarrow$ Depositado $\rightarrow$ Endosado a proveedor $\rightarrow$ Rechazado por falta de fondos $\rightarrow$ Acreditado*.
- **Cupones de Tarjetas de Crédito y Débito (`/admin/coupons/default.asp`)**:
  - Conciliación de liquidaciones de adquirentes (Posnet / LaPos / Payway / Mercado Pago).
  - Control de retenciones bancarias e impositivas deducidas de las liquidaciones.
