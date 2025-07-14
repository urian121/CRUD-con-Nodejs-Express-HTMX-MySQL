const mysql = require('mysql2/promise');
require('dotenv').config();

let connection;

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

module.exports = {
  getConnection
};