# Despliegue gratuito en Cloudflare Pages

1. En https://aistudio.google.com/apikey crea una clave de Gemini API. No la copies en GitHub, en el chat ni en el frontend.
2. Sube el proyecto a un repositorio GitHub (excluye `.env`, `.dev.vars` y `node_modules`).
3. En Cloudflare → Workers & Pages → Create → Pages → Connect to Git.
4. Configura: build `npm run build`, output `dist`, root la carpeta con `package.json`.
5. En Pages → Settings → Variables and Secrets agrega el secreto cifrado `GEMINI_API_KEY`. Opcional `GEMINI_MODEL` = `gemini-2.5-flash`.
6. Crea una base D1 gratuita en Cloudflare llamada `zuame-visitors`. Ejecuta el contenido de `schema.sql` en su consola SQL.
7. En Pages → Settings → Bindings agrega binding de D1 con nombre exacto `DB`, apunta a `zuame-visitors`.
8. Vuelve a desplegar para activar secretos y binding. Prueba consulta `mazorca`, `¿dónde boto un tomate?`, `pila`, y otra desconocida.
9. Abre el sitio en celular, verifica las tres secciones y que el contador deje de mostrar `—`. Publica el QR solo después de esa prueba.

**Avisos**: El contador representa navegadores identificados, no personas únicas. No se almacenan IP en D1. El control de abuso de la API pública necesita protección adicional con límites de Cloudflare antes de uso a gran escala. Gemini puede tener cuotas o facturación dependiendo del modelo y uso.
