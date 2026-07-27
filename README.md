# Dos Nodos · Landing de ventas

Landing premium para **ventas.dosnodos.com.co**: páginas profesionales conectadas a WhatsApp para negocios locales en Medellín (turismo, restaurantes, cafés, hoteles pequeños, hostales, spas, barberías, etc.).

Stack: HTML + CSS + JS mínimo. **Sin frameworks, sin sliders, sin dependencias externas.** Mobile first.

---

## 1. Archivos del proyecto

```
/
├── index.html                  Landing completa con SEO + JSON-LD
├── robots.txt                  Permite indexación + apunta al sitemap
├── sitemap.xml                 Sitemap mínimo
├── README.md                   Este archivo
└── assets/
    ├── css/styles.css          Estilos mobile-first
    ├── js/main.js              WhatsApp, form, dataLayer, UX
    └── img/
        ├── favicon.svg         Favicon vectorial
        └── og-cover.svg        Imagen Open Graph (1200x630)
```

## 2. Resumen técnico

- **HTML semántico**: `header`, `main`, `section`, `nav`, `footer`, headings ordenados, un solo `<h1>`.
- **CSS**: variables, system font stack, layout con CSS Grid y Flexbox, `prefers-reduced-motion` respetado, sombras y radios suaves, microinteracciones ligeras.
- **JavaScript**: ~6 KB. Sin dependencias. Gestiona:
  - Enlaces a WhatsApp con mensajes prellenados por contexto.
  - Formulario de contacto (validación cliente + apertura de WhatsApp con datos).
  - Header sticky con estado de scroll.
  - Menú móvil accesible (`aria-expanded`, cierre con `Escape`).
  - Reveal-on-scroll vía `IntersectionObserver`.
  - `dataLayer` push de todos los eventos de medición.
- **WhatsApp**: constante `WHATSAPP_NUMBER = '573127344026'`. Mensajes diferenciados por CTA (general, básico, pro, premium, demo, formulario).
- **SEO**: title, meta description, canonical, Open Graph + Twitter Card, JSON-LD `ProfessionalService` y `FAQPage`, `sitemap.xml`, `robots.txt`.
- **Accesibilidad**: `skip link`, focus visible, contrastes AA, labels reales, `aria-invalid`, `aria-live` para estado del form, áreas táctiles ≥ 44 px.

## 3. Correr local

No requiere build. Cualquier servidor estático sirve:

```bash
# Opción 1: Python (incluido en la mayoría de sistemas)
python3 -m http.server 8080

# Opción 2: Node
npx --yes serve .

# Luego abrir
open http://localhost:8080
```

> Importante usar un servidor (no abrir el `index.html` directamente con `file://`) para que las rutas absolutas `/assets/...` resuelvan bien.

## 4. Publicar en `ventas.dosnodos.com.co`

Es 100 % estático. Cualquiera de estas opciones funciona:

### Opción A — Hosting estático (recomendado)

1. Sube el contenido del repo (los archivos del root) a:
   - **Vercel** / **Netlify** / **Cloudflare Pages** (drag & drop o conectando el repo de GitHub).
2. Configura el dominio personalizado `ventas.dosnodos.com.co` en el panel del proveedor.
3. En tu DNS, crea un `CNAME` `ventas` → al host que te indica el proveedor.
4. Activa HTTPS automático.

### Opción B — Hosting propio / cPanel

1. Sube `index.html`, `robots.txt`, `sitemap.xml` y la carpeta `assets/` a `public_html/` (o al subdominio configurado para `ventas.`).
2. Verifica que el subdominio apunte a esa carpeta.
3. Activa HTTPS (Let's Encrypt en cPanel/Plesk).

### Verificaciones post-deploy

- `https://ventas.dosnodos.com.co/` carga el `index.html`.
- `https://ventas.dosnodos.com.co/robots.txt` y `/sitemap.xml` accesibles.
- Compartir el link en WhatsApp/Slack muestra preview con `og-cover.svg`.
- Click en cualquier CTA abre `wa.me/573127344026` con el mensaje correcto.

## 5. Checklist de SEO

- [x] `<title>` < 60 caracteres con marca + servicio + ciudad.
- [x] Meta description < 160 caracteres, persuasiva.
- [x] `<link rel="canonical">` con URL absoluta.
- [x] Open Graph completo (`title`, `description`, `type`, `url`, `image`).
- [x] Twitter Card `summary_large_image`.
- [x] JSON-LD `ProfessionalService` (datos del negocio).
- [x] JSON-LD `FAQPage` (mejora visibilidad de FAQs en Google).
- [x] `robots.txt` con `Sitemap:`.
- [x] `sitemap.xml` válido.
- [x] Un solo `<h1>`, jerarquía correcta de `<h2>`/`<h3>`.
- [x] URLs internas con anclas semánticas (`#beneficios`, `#planes`, etc.).
- [x] `lang="es-CO"`.
- [x] `geo.region` / `geo.placename` para señal local.
- [x] Imágenes con `alt` real o decorativas con `aria-hidden`.

**Por hacer al publicar**:

- [ ] Verificar dominio en Google Search Console.
- [ ] Enviar `sitemap.xml` en Search Console.
- [ ] Crear ficha en Google Business Profile (Medellín) y enlazarla.
- [ ] Listar la marca en directorios locales (Páginas Amarillas CO, etc.).
- [ ] Sustituir `og-cover.svg` por un JPG/PNG `1200×630` cuando se tenga foto real (mejor compatibilidad con LinkedIn/iOS).

## 6. Checklist de accesibilidad (WCAG 2.2 AA)

- [x] Un solo `<h1>` y orden correcto de headings.
- [x] Contraste AA en texto principal, secundario, botones y CTAs.
- [x] Skip-link inicial (`Saltar al contenido`).
- [x] Focus visible en todos los elementos interactivos.
- [x] Navegación por teclado (menú móvil cierra con `Escape`).
- [x] Labels reales en todos los inputs (no se usa `placeholder` como label).
- [x] Errores de formulario con `aria-invalid` y mensajes descriptivos.
- [x] Estado del envío anunciado con `aria-live="polite"`.
- [x] Imágenes decorativas marcadas (`aria-hidden`, `alt=""` cuando aplica).
- [x] Áreas táctiles ≥ 44×44 px en mobile.
- [x] Respeto de `prefers-reduced-motion`.
- [x] Tipografía base 16 px.
- [x] El color no es el único transmisor de información.
- [x] HTML semántico (`header`, `main`, `nav`, `section`, `footer`, `details/summary` para FAQ).

## 7. Checklist de performance

Objetivo Lighthouse **95+** en las 4 categorías.

- [x] Sin librerías externas (0 KB de JS de terceros).
- [x] System font stack (sin Google Fonts → 0 requests adicionales).
- [x] CSS y JS servidos como archivos estáticos pequeños.
- [x] `defer` en `main.js`.
- [x] SVG inline para iconos (sin sprite, sin font icons).
- [x] Sin imágenes raster en el hero (ilustración con CSS + SVG).
- [x] `preload` del CSS crítico.
- [x] Sin layout shift: el mockup del hero usa `aspect-ratio`.
- [x] Animaciones suaves (transform/opacity), desactivadas si el usuario lo pide.
- [x] HTML, CSS y JS escritos para ser minificables (sin patrones extraños).

**Recomendado al publicar**:

- [ ] Activar Brotli/Gzip en el servidor.
- [ ] `Cache-Control: public, max-age=31536000, immutable` para `/assets/*`.
- [ ] `Cache-Control: public, max-age=300` para `/index.html`.
- [ ] HTTP/2 o HTTP/3.
- [ ] Si se agregan imágenes raster: servir en WebP/AVIF con `width`/`height` y `loading="lazy"` excepto la del hero.

## 8. Medición / dataLayer

Eventos emitidos en `window.dataLayer`:

| Evento                          | Cuándo                                    |
| ------------------------------- | ----------------------------------------- |
| `view_landing_dos_nodos`        | Al cargar la página                       |
| `clic_whatsapp_hero`            | CTA "Quiero mi landing" del hero          |
| `clic_whatsapp_cta_final`       | CTA "Hablar por WhatsApp" del cierre      |
| `clic_whatsapp_header`          | CTA del header                            |
| `clic_whatsapp_footer`          | Enlace de WhatsApp en el footer           |
| `clic_whatsapp_fab`             | Botón flotante de WhatsApp                |
| `clic_whatsapp_plan_basico`     | CTA del Plan Básico                       |
| `clic_whatsapp_plan_pro`        | CTA del Plan Pro                          |
| `clic_whatsapp_plan_premium`    | CTA del Plan Premium                      |
| `clic_ver_demo`                 | Cualquiera de los 3 botones de demo       |
| `clic_ver_planes`               | Cualquier CTA secundario "Ver planes"     |
| `submit_form_contacto`          | Envío válido del formulario               |
| `clic_instagram`                | Enlace de Instagram en el footer          |
| `clic_email`                    | Enlace de email en el footer              |

Cada push incluye `component: 'landing_ventas_dos_nodos'`, `section`, y `cta_text`. Para conectar con **GA4** o **Meta Pixel**, basta con cargar el snippet correspondiente y mapear los eventos del `dataLayer`. Se puede insertar GTM en el `<head>` y `<body>` sin tocar nada más.

## 9. Próximos pasos recomendados

1. **GTM + GA4 + Meta Pixel**: instalar GTM y crear triggers sobre los eventos del `dataLayer` ya emitidos. Tiempo: ~30 min.
2. **OG en JPG**: exportar `og-cover.svg` a `og-cover.jpg` (1200×630) para máxima compatibilidad con WhatsApp/iOS Messages.
3. **Foto real**: cambiar el mockup CSS por una captura real (WebP) cuando haya el primer caso de éxito.
4. **Testimonios**: agregar bloque con 2-3 reseñas (con foto + nombre + negocio) antes del CTA final — sube conversión.
5. **Casos de éxito**: una página por nicho (turismo, café, spa) con métricas reales — apunta SEO long-tail.
6. **Política de privacidad y términos**: completar los enlaces del footer (hoy van a `#`) para cumplir Habeas Data (Ley 1581 de 2012).
7. **Formulario con backend**: integrar con Formspree, Resend o un webhook propio para guardar leads aunque no abran WhatsApp.
8. **A/B test del precio "Desde"**: probar mostrar el rango completo vs. el "Desde" actual.
9. **Schema adicional**: `Service` con `offers` para cada plan, y `BreadcrumbList` cuando crezca el sitio.
10. **PageSpeed real**: pasar Lighthouse en producción (no localhost) y ajustar `Cache-Control` y compresión.

---

## 8. Notas de mantenimiento

### Tipografías

IBM Plex Sans y Mono van **auto-hospedadas** en `assets/fonts/`, con las
declaraciones `@font-face` incrustadas al inicio de `assets/css/styles.css`.
Son las mismas familias del sitio principal, que las sirve con `next/font`.

No se cargan desde Google Fonts a propósito: eso costaba dos `preconnect` y
una hoja de estilos que bloqueaba el renderizado. Solo se incluye el
subconjunto **latino** — las tildes y la eñe están ahí; `latin-ext` cubre
lenguas de Europa del este y sería peso muerto.

### Cache busting — importante

`vercel.json` marca CSS y JS como `immutable` por un año. Eso es seguro
**únicamente** porque las URLs llevan versión (`styles.css?v=11`).

> Si modificas `assets/css/styles.css` o `assets/js/main.js`, **sube el número
> de versión** en los cuatro HTML (`index`, `terminos`, `privacidad`, `datos`).
> Si no lo haces, quien ya visitó el sitio seguirá viendo el archivo viejo
> durante un año.

### Imágenes

El logo del encabezado y del pie usa `logo-dosnodos-400.png` (4,7 KB, paleta
de 64 colores). El original de 850×430 y 155 KB se conserva porque el JSON-LD
y las metaetiquetas lo referencian a tamaño completo.

Para arte plano de pocos colores el PNG con paleta gana a WebP: en este logo
son 4,7 KB contra 21 KB.

### Formulario y CRM

El formulario envía el lead a `https://dosnodos.com.co/api/contact` con
`source: "ventas"` **antes** de abrir WhatsApp, y aparece en el panel de
`dosnodos.com.co/admin/leads`. El envío no bloquea la apertura del chat: si
se esperara la respuesta, el navegador la bloquearía como popup.

Ese endpoint solo acepta orígenes de una lista blanca. Si cambia el dominio
de esta landing, hay que agregarlo en `ALLOWED_ORIGINS` dentro de
`app/api/contact/route.ts` del repositorio principal.

### Demos

Las páginas de `demos/` mantienen tipografías y paletas propias a propósito:
son maquetas de negocios de clientes (café, spa, turismo), no del sistema de
marca de Dos Nodos. Uniformarlas anularía su función.
