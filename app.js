const express = require('express'); // Importar Express
const path = require('path'); // Importar Path
require('dotenv').config(); // Cargar variables de entorno
const { getConnection } = require('./config/database'); // Importar la conexión a la base de datos

const app = express(); // Inicializar Express
const PORT = process.env.PORT || 3002; // Definir el puerto

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// Motor de plantillas
app.set('view engine', 'ejs'); // Configurar el motor de plantillas
app.set('views', path.join(__dirname, 'views')); // Configurar la carpeta de vistas


// Ruta principal - renderizar la página principal con las tareas
app.get('/', async (req, res) => {
  try {
    const connection = await getConnection(); // Obtener la conexión a la base de datos
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

// Iniciar el servidor
startServer().catch(err => {
  console.error('Failed to start server:', err);
});