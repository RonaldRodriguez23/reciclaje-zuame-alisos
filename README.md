# Proyecto reciclaje Zuame Alisos

Aplicación web educativa de separación de residuos para el conjunto Zuame Alisos en Funza, Cundinamarca.

## Requisitos
- Node.js 20.19+ o 22.12+ y npm
- Clave de Google Gemini (opcional para el catálogo; necesaria para preguntas nuevas)

## Ejecutar en Windows PowerShell
1. Extraer el ZIP.
2. Abrir PowerShell en la carpeta `reciclaje-zuame-alisos` (la que contiene `package.json`).
3. Ejecutar `npm install`.
4. Para conectar Gemini: copiar `.env.example` como `.env` y escribir `GEMINI_API_KEY` en ese archivo. **Nunca publiques ni compartas tu clave.**
5. Ejecutar `npm run dev`.
6. Abrir http://localhost:5173. El frontend usa Vite y el backend de API usa el puerto 3001. `npm run dev` inicia ambos.

## Validación
- `npm run build`: verifica tipos y genera `dist/` del frontend.
- http://localhost:3001/api/health: confirma backend y si existe la clave de Gemini.
- Búsquedas de ejemplo: mazorca, tomate, cáscara de banano, botella plástica limpia, servilleta usada y pila usada.
- Sin clave Gemini, el catálogo integrado sí funciona; las consultas no reconocidas muestran un aviso.

## Arquitectura
- `src/main.ts`: navegación (Inicio, Guía, Proyecto), categorías interactivas, buscador y contador.
- `src/style.css`: diseño responsive, proporciones y paleta visual.
- `public/images`: imágenes WebP optimizadas y foto contextual del chute.
- `server/catalog.ts`: clasificación determinista de residuos conocidos.
- `server/index.ts`: API de visitantes y clasificación Gemini, clave exclusiva de servidor.
- `.env.example`: variables disponibles.

## Contador
Cuenta identificadores de navegador y los guarda en `data/visitors.json`; no mide personas únicas reales ni visitantes en línea. Es adecuado para un piloto en un servidor local. Si se despliega en alojamiento efímero, el registro puede perderse y será necesaria una persistencia adecuada. El contador puede resetearse borrando `data/visitors.json`. No recolecta nombres ni correo, pero registra un identificador aleatorio persistente del navegador.

## Guía legal y limitaciones
La clasificación se basa en el código de colores de la Resolución 2184 de 2019 (blanca, verde y negra), junto a la categoría de manejo especial. Debe confirmarse con la administración la ruta de orgánicos y el destino real de cada compuerta antes de colocar el QR. La IA puede equivocarse: la guía educativa y el catálogo validado prevalecen, y se evita asignar cualquier residuo especial a las tres bolsas.

La imagen de la reunión comunitaria **no se incluye** para no publicar rostros sin autorización. Puede incorporarse cuando se cuente con consentimiento.

## Estado de las pruebas
Los archivos fuente se consolidaron y se validó su estructura. En el entorno de generación no fue posible terminar `npm install` por bloqueo de descarga de paquetes, por lo que **no se afirma compilación ni prueba end-to-end superada**. Ejecutar `npm install` y `npm run build` en el equipo local antes de publicar.
