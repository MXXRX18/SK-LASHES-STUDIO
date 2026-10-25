# SK Lashes Studio

Web de estética con composición cinematográfica, negro y rosa vino, fotografía editorial, cristal discreto y tipografía Cormorant + Inter. Incluye página principal y agenda independiente en /agendar/.

## Ver la web

El ZIP incluye la carpeta **out/**, lista para servir: no necesitas instalar las dependencias para visualizar esta versión.

1. Descomprime la carpeta completa.
2. Instala Node.js 24 LTS o una versión compatible (24–26) desde https://nodejs.org/.
3. Abre una terminal dentro de la carpeta del proyecto.
4. Ejecuta:

    node scripts/serve.mjs

5. Abre http://localhost:3000 en tu navegador. Mantén la terminal abierta.

En Windows también puedes abrir **INICIAR-WINDOWS.cmd** y después entrar en la dirección indicada. La web usa rutas y módulos que necesitan un servidor HTTP; sirve out/ en lugar de abrir los HTML como archivos.

## Editar y reconstruir

Instala las versiones exactas del archivo de bloqueo:

    npm ci
    npm run dev

Desarrollo: http://localhost:3000. Para regenerar la versión final:

    npm run lint
    npm run typecheck
    npm test
    npm run build
    npm start

El comando build vuelve a generar out/. El comando start sirve esa carpeta. Puedes usar otro puerto con la variable PORT.

## Funciones incluidas

- Menú adaptable con Inicio, Servicios, Galería, Agenda y Ubicación.
- Catálogo completo: 13 opciones; Tecnológicas contiene cuatro variantes independientes.
- Carrusel manual basado en el código aportado, con escala, desenfoque, opacidad, flechas, teclado y reconocimiento de deslizamiento horizontal.
- Los enlaces para agendar abren /agendar/ en una pestaña nueva.
- Nombre, apellido, selección de 1 a 5 servicios y fecha de preferencia.
- Validación de datos, límite de selección y fechas anteriores al día local.
- WhatsApp: **+52 999 340 3892**, configurado como 529993403892.
- Mensaje prellenado con los datos seleccionados. La persona lo envía desde WhatsApp. La cita queda pendiente de confirmación del estudio.
- Mapa de Google basado en la ubicación compartida y enlace original para llegar.
- Apariciones al volver a entrar en pantalla, skeletons limitados a 1.8 segundos y adaptación a movimiento reducido.
- Fuentes e imágenes locales; la presentación no depende de una CDN de imágenes.

## Cambiar datos y recursos

| Elemento | Archivo |
| --- | --- |
| Teléfono, nombre, ruta de agenda y Google Maps | src/config/site.ts |
| Servicios, grupos y precios | src/data/services.ts |
| Fotografías, títulos y descripciones de galería | src/data/gallery.ts |
| Mensaje de WhatsApp y validación | src/lib/whatsapp.ts |
| Paleta, tipografía y responsive | src/styles/globals.css |
| Apariciones y skeleton | src/styles/motion.css |
| Imagen principal | public/images/hero/editorial.webp |
| Imágenes del carrusel | public/images/gallery/ |

Mantén los nombres de archivo o actualiza sus referencias. Para sustituir la fotografía de la agenda y la imagen junto al catálogo, revisa también src/app/agendar/page.tsx y src/components/sections/HomeSections.tsx.

Las imágenes incluidas fueron generadas como inspiración editorial. No son fotografías de trabajos reales ni de clientas del estudio. La galería lo indica. Sustitúyelas por fotografías autorizadas del negocio antes de presentar resultados propios.

La firma tipográfica SK es provisional y editable en src/components/layout/Brand.tsx. No se añadió una moneda internacional porque solo se proporcionó el símbolo $. El precio de Retoque sigue sujeto a valoración.

## Mapa

El enlace original resolvió a un centro de mapa en **21.2937741, -89.6096494**. El mapa insertado utiliza ese punto. El enlace no incluía una ficha comercial, dirección o Place ID verificables; no se inventaron esos datos. Comprueba que ese punto sea exactamente la entrada del estudio antes de una publicación pública.

## Versiones y compatibilidad

Next.js 16.4.3, React/React DOM 19.3.1, TypeScript 6.0.3 y ESLint 10.13.0. Se verificaron los números mediante el registro oficial npm. El entorno utilizado tiene Node.js 24.22.1.

Fechas de publicación verificadas, todas anteriores al corte solicitado del 24 de octubre de 2026: Next.js 16.4.3 (23/oct/2026), React 19.3.1 (14/oct/2026), TypeScript 6.0.3 (16/abr/2026) y ESLint 10.13.0 (16/oct/2026).

TypeScript 7.0.2 era la versión más reciente observada, pero el analizador estable typescript-eslint 8.72.0 declara compatibilidad con TypeScript menor que 6.1.0. Se fijó 6.0.3 para mantener el conjunto compatible y comprobable, como pide el encargo. No se incluyeron versiones beta o canary. Se usa CSS nativo en vez de añadir Tailwind como dependencia innecesaria.

Consulta docs/VERIFICACION.md, docs/RECURSOS.md y docs/licenses/ para conocer las pruebas, los recursos y sus licencias.

## Entrega y publicación

El proyecto se entrega localmente; no se publicó ni se enviaron mensajes a terceros. La carpeta out/ puede alojarse en un servidor estático que sirva index.html dentro de cada directorio. El formulario no requiere backend ni guarda datos personales; los conserva en memoria mientras está abierto.

Las imágenes y fuentes locales funcionan sin servicios externos. El mapa interactivo y la apertura de WhatsApp requieren conexión a Internet y disponibilidad de sus respectivos servicios.

