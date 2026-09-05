# Documento 05: Logística, Despachos & Directorio de 56 Transportes

## 1. Directorio Oficial de Expresos y Transportes
Se integró la nómina completa de **56 empresas de transporte, expresos y comisionistas** utilizadas por SkyBlue Mayorista para el envío de bultos al interior del país:
- **Expreso Imaz, Expreso Brio, Expreso Luján de Cuyo, Expreso Malargüe, Expreso Rivadavia, Expreso Zapala, Vía Cargo, Cruz del Sur, La Sevillanita, Expreso Oro Negro, Expreso Morabito, Expreso San Juan, Expreso Paraná, entre otros 56 transportes.**

---

## 2. Información por Empresa de Transporte
Cada tarjeta de transporte contiene:
- **Código Interno:** Ej: `TR-01`, `TR-14`.
- **Razón Social y Nombre de Fantasía:** Nombre comercial del transporte.
- **Dirección del Depósito en Buenos Aires:** Domicilio de recepción de bultos (ej: Villa Soldati, Parque Patricios, Barracas).
- **Teléfono y Persona de Contacto:** Datos del receptor o encargado de logística para coordinar entregas.

---

## 3. Integración con el Módulo de Pedidos
Al momento de despachar un pedido desde el **Tablero Kanban**, el operador selecciona el transporte correspondiente, generando el rótulo de despacho con cantidad de bultos, datos del cliente y destino final.
