const express = require('express');
const path = require('path');
require('dotenv').config();
const { getConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Rutas
app.get('/', async (req, res) => {
  try {
    const connection = await getConnection();
    const [rows] = await connection.execute('SELECT * FROM tasks ORDER BY created_at DESC');
    res.render('index', { tasks: rows });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).render('index', { tasks: [], error: 'Error fetching tasks' });
  }
});

// Rutas de la API
app.use('/api/tasks', require('./routes/tasks'));

// Middleware para rutas no encontradas - redireccionar a la página principal
app.use('*', (req, res) => {
  res.redirect('/');
});

// Iniciar el servidor
async function startServer() {
  try {
    // Inicializar la conexión a la base de datos
    await getConnection();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});