const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// Rutas para las tareas
router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.get('/:id/view', TaskController.getTaskView);
router.post('/', TaskController.createTask);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);
router.patch('/:id/toggle', TaskController.toggleTask);

module.exports = router;