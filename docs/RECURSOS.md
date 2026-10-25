# Recursos y dirección de arte

La referencia DESIGN.md se aplicó como lenguaje visual: fotografía a gran escala, fondo oscuro, interfaz contenida, navegación en píldoras y jerarquía editorial. Se adaptaron la paleta y la tipografía a SK Lashes Studio. El verde de la referencia no se incorporó porque el encargo define rosa oscuro, negro y blanco.

## Imágenes

Se generaron con la herramienta integrada de generación de imágenes para este proyecto. No se utilizaron API externas de generación ni fotografías de clientas. Los archivos del proyecto se optimizaron a WebP sin recorte ni cambio de color.

| Archivo | Resolución | Función |
| --- | --- | --- |
| public/images/hero/editorial.webp | 1536 × 1024 | Mirada protagonista y espacio oscuro para texto |
| public/images/gallery/gallery-1.webp | 1672 × 941 | Detalle de pestañas separadas |
| public/images/gallery/gallery-2.webp | 1672 × 941 | Perfil con pestañas de volumen |
| public/images/gallery/gallery-3.webp | 1672 × 941 | Herramientas de precisión |
| public/images/gallery/gallery-4.webp | 1672 × 941 | Retrato con ojos cerrados |
| public/images/gallery/gallery-5.webp | 1672 × 941 | Mirada con efecto delineado |

Estas imágenes son recursos editoriales generados, no prueba de los resultados de un servicio. No se presentan como testimonios ni trabajos reales. No se afirma exclusividad sobre los recursos generados. Para sustituirlas, usa imágenes propias o con autorización de uso comercial.

### Prompts de generación

Prompt compartido:

> Use case: photorealistic-natural. Asset type: cinematic luxury lash studio website editorial inspiration. Professional high-end beauty photography, real skin pores and natural texture, elegant serious mood, deep black and dark wine-pink / muted plum shadows, warm ivory key light. No text, no logos, no watermarks, no UI, no artificial sparkle. Adult subjects only. A finished photograph, not a mockup.

Variantes:

1. Hero: Wide landscape about 1536×1024, extreme close-up adult brunette upper face and brown eye, long separated feathered eyelashes sharply focused, subtle rose makeup. Face on right 60%; left 40% near-black negative space. Crop above forehead and below nose; dominant eye upper right. Dramatic soft side light and cinematic rich tonal depth.
2. Galería 1: Wide 16:9 macro brown eye with delicate separated lashes, calm direct gaze, soft taupe eyeshadow, warm natural skin, eye middle-right, gentle depth of field, iris catchlight and dark plum background.
3. Galería 2: Wide 16:9 extreme side profile of eye and cheek, fuller feathered curved lashes, softly lowered eyelid, clean lash silhouette against warm cream highlights and wine shadows.
4. Galería 3: Wide 16:9 still life of two slender stainless steel lash tweezers, tiny clean lash brush and unbranded black lash palette on dark wine silk; diagonal sculptural composition and warm metallic light.
5. Galería 4: Wide 16:9 brunette portrait cropped forehead to lips, both eyes softly closed with feathered lashes, mauve rose makeup, calm expression, gentle head tilt, natural skin and warm side light.
6. Galería 5: Wide 16:9 macro brown eye with elongated outer-corner lashes and fine winged liner; tasteful cat-eye effect, natural brow and skin, oblique warm side light and dark plum edges.

## Tipografías

Inter y Cormorant Garamond se distribuyen bajo SIL Open Font License. Las copias locales WOFF2 provienen de los paquetes oficiales de Fontsource, fijados en package-lock.json. Sus licencias completas están en docs/licenses/.

## Carrusel

Gallery.tsx es una adaptación del código aportado por el usuario. Conserva desplazamiento relativo de 65 %, escalas 1/0.85/0.70, opacidades 1/0.65/0.18, desenfoque 0/3/8 px y transición de 800 ms. Se reemplazaron listeners globales por eventos de React y se añadió bloqueo durante cada transición, controles de 44 px como mínimo, detección de dirección táctil y limpieza de temporizadores.

## Google Maps

URL original: https://maps.app.goo.gl/JLxjknSfmM7sDLW98

Redirección observada: https://www.google.com/maps/place//@21.2937741,-89.6096494,21z?entry=tts&g_ep=EgoyMDI2MTAyMC4wIPu8ASoASAFQAw%3D%3D&skid=08d3e2e5-0c6a-4c5c-a423-763f56b14071

El embed fue devuelto por Google al solicitar el mapa de esas coordenadas con output=embed. Respondió HTTP 200 y contenía las coordenadas. Corresponde al centro del mapa compartido, no a una ficha del establecimiento validada independientemente. Se conserva el enlace original para “Cómo llegar” y se deja visible la atribución de Google.

## Referencias técnicas

- https://nextjs.org/docs/app/guides/static-exports
- https://nextjs.org/blog/next-16-4
- https://react.dev/blog/2026/09/09/react-19-3
- https://www.npmjs.com/package/typescript-eslint
- https://developers.google.com/maps/documentation/embed/embedding-map

