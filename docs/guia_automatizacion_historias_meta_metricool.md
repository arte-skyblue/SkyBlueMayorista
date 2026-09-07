# 📱 Guía Operativa de Automatización de Historias (Instagram & Facebook)
**SkyBlue Mayorista** | Versión 1.0

Esta guía explica paso a paso cómo dejar funcionando la publicación automática de historias para mantener las redes sociales activas todos los días sin intervención manual diaria.

---

## 🚀 Método Recomendado: Metricool con Autolistas (Evergreen)

### ¿Por qué este método?
Permite cargar un lote de 20 a 50 historias de una sola vez y definir un horario fijo (ej. 11:30 hs y 18:30 hs). La plataforma las va publicando secuencialmente todos los días en Instagram Stories y Facebook Stories sin pedir confirmación en el celular.

### Paso 1: Requisitos de Conexión
1. Entrar a [Metricool.com](https://metricool.com/) y crear o iniciar sesión en la cuenta.
2. Ir a **Conexiones**:
   - Conectar la **Página de Facebook** de SkyBlue Mayorista.
   - Conectar la **Cuenta de Instagram Profesional (Empresa)** vinculada a esa página.
3. En la configuración de Instagram dentro de Metricool, asegurarse de marcar la casilla:
   - ✅ **Habilitar publicación automática directa** (sin notificaciones móviles).

### Paso 2: Configurar la Autolista (Cola de Publicación)
1. En el menú superior de Metricool, hacer clic en **Planificación** -> **Autolistas**.
2. Hacer clic en **Crear nueva autolista** y nombrarla: `SkyBlue - Historias Diarias`.
3. **Configurar el Calendario de la Autolista**:
   - Días: Lunes a Domingo.
   - Horas: 11:30 hs (turno mañana) y 18:30 hs (turno tarde/noche).
   - Redes: Marcar **Instagram** y **Facebook**.
   - Tipo de contenido: **Story / Historias**.
4. **Subir los Creativos**:
   - Podés arrastrar todas las imágenes generadas en la carpeta:
     `public/stories_auto_batch/` (o importar el archivo `data/metricool_autolist_historias_skyblue.csv`).
   - En cada elemento, agregar el enlace directo de WhatsApp:
     `https://wa.me/5491138916779?text=Hola!%20Quiero%20consultar%20el%20catalogo%20mayorista`
5. Activar el interruptor de la Autolista a **Activo / ON**.

¡Listo! A partir de ese momento, Metricool publicará automáticamente 2 historias por día manteniendo tu cuenta activa 24/7.

---

## 🆓 Método Alternativo: Meta Business Suite (Costo $0)

Si no desean contratar una herramienta de pago en esta etapa, Meta Business Suite permite programar historias de forma nativa:

1. Ingresar a [Meta Business Suite](https://business.facebook.com/).
2. En la barra lateral izquierda, ir a **Planificador**.
3. En la esquina superior derecha, hacer clic en la flecha al lado de "Crear" y seleccionar **"Crear historia"**.
4. En **"Compartir en"**, seleccionar **ambas casillas**:
   - [x] Página de Facebook (SkyBlue Mayorista)
   - [x] Perfil de Instagram (@skybluemayorista)
5. En **"Contenido multimedia"**, subir el diseño vertical (1080x1920) de la carpeta `public/stories_auto_batch/`.
6. En las herramientas creativas de la derecha:
   - Tocar **"Agregar enlace"** y pegar: `https://wa.me/5491138916779`
   - En Instagram, esto crea automáticamente el **Sticker de Enlace** tocable.
7. En la parte inferior, cambiar de "Publicar ahora" a **"Programar"**.
   - Elegir fecha y hora deseada.
8. Repetir el proceso para calendarizar las semanas del mes.

---

## 🤖 Método Avanzado "Zero-Touch": Make.com + Google Drive

Para un flujo donde el personal del depósito o showroom simplemente saca fotos/videos con su celular y se publican solos:

### Arquitectura del Escenario Make
```text
[Google Drive: Carpeta "Historias_Pendientes"]
                    ↓ (Cada día a las 11:00 y 18:00 hs)
             [Make.com Cron]
             /             \
            ↓               ↓
[Instagram Graph API]   [Facebook Page API]
(Publica Story)         (Publica Story)
            \               /
             [Google Drive]
  (Mueve el archivo a "Historias_Publicadas")
```

### Configuración en Make.com:
1. Módulo 1: **Google Drive - List Files** en la carpeta `/SkyBlue/Historias_Pendientes` (Límite: 1 archivo, ordenado por fecha de creación ascendente).
2. Módulo 2: **Google Drive - Download a File**.
3. Módulo 3: **Instagram for Business - Create Story** (usando la imagen descargada).
4. Módulo 4: **Facebook Pages - Create a Photo/Video Story**.
5. Módulo 5: **Google Drive - Move a File** hacia la carpeta `/SkyBlue/Historias_Publicadas`.
6. Configurar la ejecución del escenario: "At regular intervals" (o dos disparos fijos por día a las 11:00 y 18:00 hs).

---

## 🔄 Rutina de Renovación de Contenido (15 minutos al mes)

Para que el contenido nunca se vuelva repetitivo:
1. **Nuevos ingresos de catálogo**: Correr el comando de generación:
   ```bash
   node scripts/generate_stories_batch.mjs
   ```
2. **Cargar en la Autolista**: Subir los nuevos archivos generados a Metricool o a la carpeta de Drive.
3. Con este sistema, **15 minutos de trabajo al principio de cada mes garantizan 60 historias publicadas con precisión de reloj suizo**.
