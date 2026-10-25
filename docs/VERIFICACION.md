# Verificación

## Comprobaciones ejecutadas

| Comprobación | Resultado |
| --- | --- |
| Compilación Next.js con exportación estática | Correcta; Inicio, Agenda y 404 generados |
| Comprobación TypeScript estricta | Correcta |
| ESLint | Correcto |
| Instalación limpia con npm ci | Correcta, usando el lockfile entregado |
| Pruebas automatizadas del formulario y mensaje | 6 pruebas aprobadas |
| Portada en Chrome de escritorio | Inspeccionada visualmente: imagen, tipografía, navegación y CTA |
| Apertura de Agenda | Verificada en una pestaña nueva; Inicio permanece abierto |
| Estructura accesible de la agenda | Inspeccionada: etiquetas, 13 servicios, fecha y aviso de confirmación |
| URL de Google Maps | Redirección y respuesta HTTP del embed verificadas |

Las pruebas automatizadas cubren selección de 0, 1, 5 y 6 servicios, duplicados, IDs ajenos, campos vacíos, nombres con acentos y apóstrofos, fechas pasadas e imposibles, conservación del día local, teléfono de destino, codificación del mensaje y precio variable del retoque.

## Límites de la revisión

Al retomar la sesión, el servicio administrado de vista previa dejó de mantenerse activo y el navegador recibió una conexión rechazada. No se sustituyó ese servicio ni se modificaron las restricciones del entorno.

La adaptación a móvil/tablet, el swipe táctil real, la vuelta completa del carrusel, el mapa renderizado, la carga lenta y los ajustes del sistema de movimiento reducido están implementados y revisados en el código, pero no se completó su verificación visual/interactiva en navegador. No se afirma una prueba en dispositivos físicos ni una puntuación de Lighthouse.

No se envió ningún mensaje de prueba por WhatsApp. Se verificó la generación de la URL y el texto de forma local. La entrega y recepción efectiva de mensajes depende de WhatsApp, de la cuenta del negocio y de la acción del visitante.

## Comprobación manual recomendada antes de publicar

1. Iniciar el sitio con npm start y comprobar anchos de 360, 390, 768, 1024 y 1440 px.
2. Abrir el menú móvil con teclado y cerrarlo con Escape.
3. Recorrer las cinco imágenes con botones, flechas y gesto horizontal; confirmar que un gesto vertical sigue desplazando la página.
4. Bajar y subir para observar la reaparición de las secciones; repetir con movimiento reducido activado y zoom al 200 %.
5. Seleccionar cinco servicios, comprobar que no se permite un sexto, y desmarcar uno.
6. Introducir una fecha anterior y luego una válida; comprobar el mensaje prellenado y que no se afirme una reserva confirmada.
7. Confirmar que el punto de Google Maps corresponda a la entrada del estudio.
8. Sustituir las imágenes de inspiración si se quiere mostrar trabajo real, conservando autorizaciones de uso.

El mapa y WhatsApp son las únicas integraciones externas necesarias en ejecución. No se añadieron analíticas, cookies de seguimiento propias, formularios remotos, autenticación ni almacenamiento de datos personales.

