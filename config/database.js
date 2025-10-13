const mysql = require('mysql2/promise'); // Importar MySQL2 con soporte para promesas
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

let connection; // Variable para almacenar la conexión a la base de datos

// Función para obtener la conexión a la base de datos
async function getConnection() {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'crud_app_nodejs_htmx'
      });
      console.log('Connected to MySQL database');
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  }
  return connection;
}

// Exportar la función getConnection para ser utilizada en otras partes de la aplicación
module.exports = {
  getConnection
};