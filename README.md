# LoL Diary

Diario personal de partidas de **League of Legends**. Importa tus partidas desde la API de Riot, anota cómo te sentiste, etiqueta aciertos y errores, y revisa tu progreso con estadísticas y un calendario mensual.

- **Backend:** Laravel 13 + Inertia 3
- **Frontend:** Vue 3.5 + Tailwind CSS 4 + componentes shadcn/reka-ui
- **Autenticación:** Fortify (passkeys y doble factor incluidos)
- **Base de datos:** MySQL 8+
- **Idioma:** español (`es`), fechas en `es-PY`
- **Zona horaria:** `America/Asuncion`

---

## Funcionalidades

| Sección | Ruta | Descripción |
| --- | --- | --- |
| Partidas | `/diary` | Listado de partidas importadas con resultado, KDA, duración y edición de la entrada del diario. |
| Calendario | `/diary/calendar` | Vista mensual de las partidas jugadas, con resumen diario. |
| Estadísticas | `/diary/stats` | Rendimiento agregado: winrate, KDA medio, CS/min, campeones y roles. |
| Falencias | `/diary/weaknesses` | Errores recurrentes detectados a partir de las etiquetas negativas. |
| Cuentas | `/diary/accounts` | Alta, edición, sincronización y borrado de cuentas de Riot (máx. 10). |
| Ajustes | `/settings/*` | Perfil, seguridad (contraseña, 2FA, passkeys) y apariencia. |

Cada partida permite registrar:

- **Ánimo** (`mood`): cómo te sentiste al jugar.
- **Etiquetas** (`tags`): aciertos y errores concretos, reutilizables entre partidas.
- **Notas**: texto libre para el análisis personal.

---

## Requisitos

- PHP 8.3 o superior con las extensiones habituales de Laravel
- Composer 2
- Node.js 20+ y npm
- MySQL 8+
- Una **clave de la API de Riot** ([developer.riotgames.com](https://developer.riotgames.com/))

---

## Instalación

### 1. Dependencias

```bash
composer install
npm install
```

### 2. Entorno

```bash
cp .env.example .env
php artisan key:generate
```

Edita `.env` con tus datos de MySQL y tu clave de Riot:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lol_diary
DB_USERNAME=root
DB_PASSWORD=

RIOT_API_KEY=RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Opcional: permite crear cuentas desde /register.
REGISTRATION_ENABLED=false
```

Crea la base de datos si aún no existe:

```sql
CREATE DATABASE lol_diary CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Base de datos y assets

```bash
php artisan migrate --seed
npm run build
```

### 4. Arrancar en desarrollo

```bash
composer dev
```

Levanta a la vez el servidor de Laravel, la cola y Vite. Alternativa manual:

```bash
php artisan serve
npm run dev
```

La aplicación queda disponible en `http://localhost:8000`.

> Sin `RIOT_API_KEY` la app funciona, pero no se pueden añadir cuentas ni importar partidas. La clave de desarrollo de Riot caduca cada 24 horas.

---

## Comandos útiles

| Comando | Qué hace |
| --- | --- |
| `composer dev` | Servidor + cola + Vite en paralelo. |
| `composer test` | Limpia la config, ejecuta Pint, PHPStan y Pest. |
| `php artisan test` | Solo la suite de pruebas (SQLite en memoria). |
| `vendor/bin/pint --dirty` | Formatea solo los archivos modificados. |
| `composer types:check` | Análisis estático con Larastan/PHPStan. |
| `npm run build` | Compila los assets para producción. |
| `npm run dev` | Vite en modo desarrollo con recarga en caliente. |

Las pruebas usan SQLite en memoria y aplican `RefreshDatabase`, así que no tocan tu base de datos MySQL.

---

## Estructura del proyecto

```
app/
├── Http/Controllers/
│   ├── LolDiaryController.php      # Partidas, calendario e importación
│   ├── DiaryEntryController.php    # Ánimo, notas y etiquetas por partida
│   ├── StatsController.php         # Agregados de rendimiento
│   ├── WeaknessController.php      # Errores recurrentes
│   ├── RiotAccountController.php   # CRUD de cuentas de Riot
│   └── Settings/                   # Perfil, seguridad y apariencia
├── Models/
│   ├── User.php
│   ├── RiotAccount.php
│   ├── LolMatch.php
│   ├── DiaryEntry.php
│   └── Tag.php
└── Services/                       # Cliente e importador de Riot

resources/
├── css/
│   ├── app.css
│   └── lol-theme.css               # Tokens, paletas y utilidades visuales
└── js/
    ├── components/lol/             # Componentes reutilizables del diario
    ├── layouts/                    # DiaryLayout, LolAuthLayout, settings
    ├── lib/lol.js                  # Formateadores y catálogos
    └── pages/                      # Diary, auth y settings

docs/
└── CAMBIOS.md                      # Registro detallado de la revisión
```

### Componentes reutilizables (`resources/js/components/lol/`)

- `PageHeader`: título, descripción y acciones de cabecera.
- `FlashNotice`: aviso único de éxito/error tras una acción.
- `StatStrip`: fila de métricas con variantes de color.
- `AccountCard`: tarjeta de cuenta de Riot con slots de metadatos y acciones.
- `AccountFilter`: selector de cuenta compartido por calendario, estadísticas y falencias.
- `MatchCard`: tarjeta de partida con resultado, KDA y formulario del diario.
- `MoodPicker`: selector de ánimo.
- `TagEditor`: alta y baja de etiquetas en línea.
- `ChampionTable`: tabla agregada por campeón.

---

## Apariencia

La interfaz usa un sistema de tokens definido en `resources/css/lol-theme.css`:

- Cinco paletas de la Liga (azul hextech, dorado, verde, rojo y oscuro).
- Estados (`victoria`, `derrota`, `ácido`, etc.) derivados con `color-mix()` a partir de los tokens base.
- Animaciones cortas y suaves, respetando `prefers-reduced-motion`.

La paleta se elige en **Ajustes → Apariencia** y se guarda en el navegador.

---

## Pruebas

```bash
php artisan test
```

- Entorno de pruebas: SQLite en memoria.
- `tests/Pest.php` aplica `RefreshDatabase` a todas las pruebas de `Feature`.
- `tests/Feature/ExampleTest.php` y `DashboardTest.php` verifican las redirecciones de entrada.

---

## Créditos

Proyecto personal sin afiliación con Riot Games. League of Legends y todos los activos relacionados son propiedad de Riot Games, Inc.
