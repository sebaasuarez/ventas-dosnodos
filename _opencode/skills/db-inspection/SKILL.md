---
name: db-inspection
description: "Inspecciona la estructura de la base de datos PostgreSQL. Usar cuando el usuario mencione tablas, relaciones, esquema, base de datos, FK, columnas, migraciones o entidades JPA. Ejecuta db_inspector.py para listar tablas, describir columnas y obtener foreign keys."
---

# Skill: Database Inspection

## Cuándo activar esta skill (TRIGGERS)

Usar SIEMPRE que el usuario mencione cualquiera de estas palabras o frases:
- "tablas", "tabla", "tables", "qué tablas", "cuántas tablas"
- "base de datos", "base de dato", "database", "DB", "esquema", "schema"
- "relaciones", "relación", "foreign key", "FK", "llave foránea", "clave foránea"
- "columnas", "campos", "estructura de la tabla"
- "existe en la DB", "existe en base de datos", "está en la base de datos"
- "migraciones", "entidades JPA", "coincide con la DB"
- "inspecciona la DB", "revisa la base de datos", "analiza las tablas"

**Si el usuario pregunta algo sobre la estructura, tablas o relaciones de la DB → esta skill es OBLIGATORIA antes de responder.**

## Comandos disponibles

Ejecutar desde la raíz del proyecto mediante bash:

| Comando | Acción |
|---|---|
| `python .opencode/tools/db_inspector.py list` | Lista todas las tablas del schema `public` |
| `python .opencode/tools/db_inspector.py describe <tabla>` | Columnas, tipos y nullability de una tabla |
| `python .opencode/tools/db_inspector.py relations` | Todas las FK y relaciones entre tablas |
| `python .opencode/tools/db_inspector.py relations <tabla>` | Relaciones de una tabla específica |

## Flujo obligatorio

1. Cargar variables de entorno desde `.env` en la raíz (si existe): `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`.
2. Ejecutar `python .opencode/tools/db_inspector.py list` para obtener el inventario completo de tablas.
3. Si se piden relaciones → ejecutar `python .opencode/tools/db_inspector.py relations`.
4. Si se pide detalle de una tabla específica → ejecutar `describe <nombre_tabla>`.
5. Contrastar los resultados con las entidades JPA en `src/main/java/**/model/` o `**/entity/`.

## Configuración de credenciales
Variables de entorno requeridas (definir en `.env` en la raíz del proyecto):
- `DB_HOST` (default: `localhost`)
- `DB_PORT` (default: `5432`)
- `DB_NAME` (default: `siprum_db`)
- `DB_USER` (default: `postgres`)
- `DB_PASS` (default: `postgres`)
