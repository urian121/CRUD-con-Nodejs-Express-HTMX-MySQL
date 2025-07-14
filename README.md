# CRUD con Node.js, Express, HTMX y MySQL

Aplicación CRUD de gestión de tareas con interfaz interactiva usando HTMX y diseño responsivo con Tailwind CSS.

## Características

- CRUD completo de tareas
- Marcar tareas como completadas
- Interfaz interactiva con HTMX
- Diseño responsivo con Tailwind CSS

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Configura la base de datos:
   - Crea una base de datos MySQL
   - Importa el archivo `database.sql`

3. Configura las variables de entorno en `.env`

## Ejecución

```bash
npm run dev    # Modo desarrollo
npm start      # Modo producción
```

La aplicación estará disponible en `http://localhost:3000`

## Estructura del proyecto

```
├── app.js                # Servidor principal
├── config/database.js    # Configuración de BD
├── routes/tasks.js       # API de tareas
├── views/                # Plantillas EJS
│   ├── index.ejs
│   └── partials/
├── public/               # Archivos estáticos
└── database.sql          # Script de BD
```

## Tecnologías

- Node.js + Express
- HTMX + Tailwind CSS
- MySQL + EJS