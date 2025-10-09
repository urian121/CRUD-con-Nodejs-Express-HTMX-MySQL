-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 17-07-2025 a las 19:08:57
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `crud_app_nodejs_htmx`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `completed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `completed`, `created_at`) VALUES
(1, 'Completar el proyecto CRUD1', 'Finalizar la implementación del CRUD con Node.js, Express, HTMX y MySQL', 0, '2025-07-14 14:18:50'),
(2, 'Aprender HTMX', 'Estudiar la documentación de HTMX para entender cómo funciona', 1, '2025-07-14 14:18:50'),
(3, 'Configurar el entorno de desarrollo', 'Instalar todas las dependencias necesarias para el proyecto', 1, '2025-07-14 14:18:50'),
(4, 'holdsdasad', 'tertert', 1, '2025-07-14 14:38:24'),
(6, 'ACTUALIZADO', 'tretre', 0, '2025-07-14 14:48:22'),
(7, 'nuevo', 'weqwe', 1, '2025-07-14 14:52:47'),
(8, 'Diseñar la interfaz de usuario (UI)', 'Crear un mockup o wireframe para la apariencia de la lista de tareas.', 1, '2025-07-17 19:08:24'),
(9, 'Implementar la vista de lista de tareas', 'Usar HTMX para obtener y mostrar todas las tareas de la base de datos.', 0, '2025-07-17 19:08:24'),
(10, 'Crear el endpoint de la API para crear tareas', 'Desarrollar la ruta POST en Express para añadir una nueva tarea a la base de datos.', 1, '2025-07-17 19:08:24'),
(11, 'Añadir funcionalidad de borrado de tareas', 'Implementar el botón y la lógica (ruta DELETE) para eliminar una tarea de la lista y la base de datos.', 0, '2025-07-17 19:08:24'),
(12, 'Implementar la edición de tareas', 'Permitir que el usuario pueda hacer clic en una tarea y editar su título y descripción (rutas PUT/PATCH).', 0, '2025-07-17 19:08:24'),
(13, 'Estilizar la aplicación con CSS', 'Añadir estilos para que la aplicación se vea limpia y moderna. Considerar usar un framework como Tailwind CSS.', 0, '2025-07-17 19:08:24'),
(14, 'Escribir pruebas unitarias para el backend', 'Usar Jest o Mocha para probar la lógica de los endpoints de la API (crear, leer, actualizar, borrar).', 0, '2025-07-17 19:08:24'),
(15, 'Desplegar la aplicación en un servidor', 'Configurar un entorno de producción (ej. Vercel, Heroku, DigitalOcean) y desplegar la aplicación.', 0, '2025-07-17 19:08:24'),
(16, 'Revisar el código en busca de mejoras (Refactoring)', 'Optimizar el código existente para mejorar la legibilidad y el rendimiento.', 0, '2025-07-17 19:08:24'),
(17, 'Documentar la API', 'Crear una documentación clara para los endpoints de la API, explicando los parámetros y las respuestas esperadas.', 0, '2025-07-17 19:08:24'),
(18, 'Preparar la presentación del proyecto', 'Crear diapositivas y un guion para la demo del proyecto final.', 0, '2025-07-17 19:08:24'),
(19, 'Investigar sobre WebSockets para actualizaciones en tiempo real', 'Explorar cómo integrar WebSockets para que la lista de tareas se actualice automáticamente para todos los usuarios.', 0, '2025-07-17 19:08:24'),
(20, 'Hacer una copia de seguridad de la base de datos', 'Realizar un dump de la base de datos MySQL como medida de seguridad antes de desplegar.', 1, '2025-07-17 19:08:24'),
(21, 'Comprar dominio para el proyecto', 'Buscar y registrar un nombre de dominio apropiado para la aplicación.', 1, '2025-07-17 19:08:24'),
(22, 'Configurar un pipeline de CI/CD', 'Automatizar el proceso de pruebas y despliegue usando GitHub Actions o Jenkins.', 0, '2025-07-17 19:08:24'),
(23, 'Resolver bug en la actualización de estado', 'El checkbox de \"completado\" no actualiza la base de datos correctamente. Investigar y corregir.', 0, '2025-07-17 19:08:24'),
(24, 'Optimizar las consultas a la base de datos', 'Revisar las consultas SQL y añadir índices en las columnas adecuadas para mejorar la velocidad.', 0, '2025-07-17 19:08:24'),
(25, 'Actualizar las dependencias del proyecto', 'Ejecutar \"npm update\" y asegurarse de que todas las librerías estén al día y sean compatibles.', 1, '2025-07-17 19:08:24'),
(26, 'Escribir el archivo README.md del proyecto', 'Documentar cómo instalar, configurar y ejecutar el proyecto localmente en el archivo README.', 0, '2025-07-17 19:08:24'),
(27, 'Planificar las características de la v2.0', 'Hacer una lluvia de ideas para nuevas funcionalidades como categorías, fechas de vencimiento y usuarios.', 0, '2025-07-17 19:08:24');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
