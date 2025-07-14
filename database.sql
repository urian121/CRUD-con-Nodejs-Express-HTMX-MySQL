-- Create database
CREATE DATABASE IF NOT EXISTS crud_app_nodejs_htmx;

-- Use database
USE crud_app_nodejs_htmx;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tasks (title, description, completed) VALUES
('Completar el proyecto CRUD', 'Finalizar la implementación del CRUD con Node.js, Express, HTMX y MySQL', FALSE),
('Aprender HTMX', 'Estudiar la documentación de HTMX para entender cómo funciona', FALSE),
('Configurar el entorno de desarrollo', 'Instalar todas las dependencias necesarias para el proyecto', TRUE);