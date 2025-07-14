const express = require('express');
const router = express.Router();
const { getConnection } = require('../config/database');

// Database connection is now imported from config/database.js

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM tasks ORDER BY created_at DESC');
    
    if (req.headers['hx-request']) {
      return res.render('partials/task-list', { tasks: rows });
    }
    
    return res.json(rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Get a single task
router.get('/:id', async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (req.headers['hx-request']) {
      return res.render('partials/task-detail', { task: rows[0] });
    }
    
    return res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching task:', error);
    return res.status(500).json({ error: 'Error fetching task' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const conn = await getConnection();
    const [result] = await conn.execute(
      'INSERT INTO tasks (title, description, created_at) VALUES (?, ?, NOW())',
      [title, description || '']
    );
    
    const [newTask] = await conn.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    
    if (req.headers['hx-request']) {
      return res.render('partials/task-item', { task: newTask[0] });
    }
    
    return res.status(201).json(newTask[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Error creating task' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const taskId = req.params.id;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const conn = await getConnection();
    await conn.execute(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title, description || '', completed ? 1 : 0, taskId]
    );
    
    const [updatedTask] = await conn.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
    
    if (updatedTask.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    if (req.headers['hx-request']) {
      return res.render('partials/task-item', { task: updatedTask[0] });
    }
    
    return res.json(updatedTask[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    return res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const conn = await getConnection();
    
    const [task] = await conn.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
    
    if (task.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    await conn.execute('DELETE FROM tasks WHERE id = ?', [taskId]);
    
    if (req.headers['hx-request']) {
      return res.send('');
    }
    
    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting task:', error);
    return res.status(500).json({ error: 'Error deleting task' });
  }
});

// Toggle task completion status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const taskId = req.params.id;
    const conn = await getConnection();
    
    const [task] = await conn.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
    
    if (task.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const newStatus = task[0].completed ? 0 : 1;
    
    await conn.execute(
      'UPDATE tasks SET completed = ? WHERE id = ?',
      [newStatus, taskId]
    );
    
    const [updatedTask] = await conn.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
    
    if (req.headers['hx-request']) {
      return res.render('partials/task-item', { task: updatedTask[0] });
    }
    
    return res.json(updatedTask[0]);
  } catch (error) {
    console.error('Error toggling task:', error);
    return res.status(500).json({ error: 'Error toggling task' });
  }
});

module.exports = router;