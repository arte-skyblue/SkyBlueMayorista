# Documento 06: Módulo de Producción (MRP) & Liquidación de Talleres a Destajo

## 1. Flujo de Fabricación del Calzado por Etapas
El sistema soporta la gestión integral de órdenes de producción (OP) divididas en las 4 fases clásicas de la industria del calzado:
1. **Fase 1 - Corte de Materiales (`CORTE`):** Troquelado y corte manual/mecánico de capelladas, cueros, forros y sintéticos.
2. **Fase 2 - Aparado y Costura (`APARADO_Y_COSTURA`):** Ensamblado y cosido superior de la capellada en talleres externos y propios.
3. **Fase 3 - Armado, Suela y Pegado (`ARMADO_Y_SUELA`):** Calzado sobre horma, colocación de vira, cambrillón, inyección/pegado de base y suela.
4. **Fase 4 - Limpieza y Empaque Final (`EMPAQUE_FINAL`):** Control de calidad, colocación de plantillas, empaque en caja individual con etiqueta de código de barras EAN-13 y embalaje en bultos de curva cerrada.

---

## 2. Liquidación Automática de Haberes a Destajo por Par
- **Tarifa por Par:** Cada orden de producción estipula el valor acordado por par terminado (ej: $1.850 ARS/par).
- **Cálculo de Haberes:** Al finalizar una etapa o lote, el sistema calcula automáticamente el haber a liquidar:
  $$\text{Total a Liquidar} = \text{Cantidad de Pares Producidos} \times \text{Tarifa por Par}$$
- **Talleres Vinculados:** Soporte para Fábrica Central y talleres externos satélites.
