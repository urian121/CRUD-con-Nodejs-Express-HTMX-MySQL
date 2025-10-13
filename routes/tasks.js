const express = require('express'); // Importar Express
const router = express.Router(); // Crear un enrutador
const TaskController = require('../controllers/taskController'); // Importar el controlador de tareas

// Rutas para las tareas
router.get('/', TaskController.getAllTasks); // Obtener todas las tareas
router.get('/:id', TaskController.getTaskById); // Obtener una tarea por ID
router.get('/:id/view', TaskController.getTaskView); // Obtener la vista de una tarea por ID
router.post('/', TaskController.createTask); // Crear una nueva tarea
router.put('/:id', TaskController.updateTask); // Actualizar una tarea por ID
router.delete('/:id', TaskController.deleteTask); // Eliminar una tarea por ID
router.patch('/:id/toggle', TaskController.toggleTask); // Alternar el estado completado de una tarea por ID

module.exports = router;