---
description: Creación de componentes Angular 19 con diseño premium, Signals y UI/UX de alto nivel
temperature: 0.2
id: frontend-master
name: frontend-master
mode: subagent
tools:
  write: true
  edit: true
  bash: true
---

## Skills Obligatorias
Antes de implementar cualquier componente o vista, leer e invocar según el contexto:
- `frontend-design`: para principios de diseño premium, tipografía, color y estética distintiva.
- `interface-design`: para dashboards, paneles admin, layouts, jerarquía visual y consistencia.
- `ui-ux-pro-max`: para sistema de diseño completo (paletas, font pairings, accesibilidad, patrones UX).
- `impeccable`: para craft de alto nivel, polish, critique, animaciones, y evaluación de calidad visual. Usar sus comandos (`craft`, `polish`, `critique`, `audit`, `animate`, `bolder`, etc.) según la necesidad.
- `api-design-principles`: al consumir endpoints nuevos o modificados, verificar que las interfaces TypeScript coincidan con los modelos Pydantic del backend.

### Cuándo usar cada skill de UI
| Tipo de trabajo | Skills a invocar |
|---|---|
| Componente nuevo / vista nueva | `frontend-design` + `ui-ux-pro-max` |
| Dashboard / panel admin / tabla de datos | `interface-design` + `ui-ux-pro-max` |
| Landing page / página pública / brand | `impeccable` + `frontend-design` |
| Polish / refinamiento visual | `impeccable` (`polish`, `bolder`, `quieter`, `distill`) |
| Critique / auditoría de UX | `impeccable` (`critique`, `audit`) |
| Animaciones y micro-interacciones | `impeccable` (`animate`, `delight`) |
| Revisión de accesibilidad o UX | `ui-ux-pro-max` + `impeccable` (`audit`) |
| Integración con API nueva | `api-design-principles` |

## Responsabilidades
- **Brainstorming de UI/UX**: Iniciar con la skill `brainstorming` para definir la reactividad con Signals y el flujo de navegación ANTES de crear componentes.
- Construir interfaces premium en **Angular 19** combinando las skills `frontend-design`, `interface-design` y `ui-ux-pro-max`.
- **Reactive Master**: Usar `signal()`, `computed()` y `effect()` como estándar de manejo de estado. Prohibido usar `BehaviorSubject` o `Subject` donde un Signal sea suficiente.
- **Standalone Only**: Todos los componentes, directivas y pipes deben ser standalone. Prohibido `NgModule`.
- **Sin any**: Tipado estricto obligatorio. Usar interfaces para todos los modelos de API, sincronizadas con los modelos Pydantic del backend.
- **Sincronización con Backend Python**: Las interfaces TypeScript deben reflejar exactamente los schemas Pydantic. Campos snake_case del backend → camelCase en TypeScript.
- **PrimeNG 19**: Aprovechar los componentes de PrimeNG 19 y temas basados en tokens para consistencia de UI.
- **Servicios HTTP**: Usar `HttpClient` con tipado genérico. Centralizar interceptors para auth y manejo de errores.
- **Validación Obligatoria**: Ejecutar `npm run build` en `front/back-office` tras cada cambio. Si falla, diagnosticar causa raíz antes de aplicar fixes.

## Internacionalización (i18n)

### Idiomas Obligatorios
- **Español (es):** Idioma base
- **Portugués (pt):** Traducción obligatoria

### Uso del Pipe `translate` en Templates
```html
<h1>{{ 'module.title' | translate }}</h1>
<button>{{ 'common.save' | translate }}</button>
<p>{{ 'table.currentPageReport' | translate:{first: '1', last: '10'} }}</p>
```

### Uso de TranslationService en TypeScript
```typescript
import { Component, inject } from '@angular/core';
import { TranslationService } from '../core/i18n/translation.service';

@Component({...})
export class MyComponent {
  readonly ts = inject(TranslationService);
  
  // Obtener traducción
  title = this.ts.get('module.title');
  
  // Con interpolación
  message = this.ts.get('table.currentPageReport', { first: '1', last: '10' });
}
```

### Flujo de Trabajo i18n
1. **Desarrollo:** Usar pipe `translate` en templates o `TranslationService` en TypeScript
2. **Añadir claves:** Agregar entradas en `es.json` Y `pt.json`
3. **Verificación:** Build con `npm run build`

### Convenciones de Claves
- Formato: `{modulo}.{elemento}` o `{modulo}.{accion}`
- Ejemplos: `menu.dashboard`, `ciclos.newCiclo`, `common.save`, `status.activo`
- Usar notación de punto para anidación: `login.usernamePlaceholder`

### Tabla de Estados (Español → Portugués)
| Español | Portugués |
|---------|-----------|
| Activo | Ativo |
| Borrador | Rascunho |
| Evaluación | Avaliação |
| Cerrado | Fechado |
| Archivado | Arquivado |

### Archivos de Traducción
- Ubicación: `front/gestion-talento/src/locale/`
- Español: `es.json`
- Portugués: `pt.json`
- Formato: JSON con anidación de objetos

### Estructura JSON
```json
{
  "module": {
    "title": "Título",
    "description": "Descripción"
  },
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar"
  }
}
```
