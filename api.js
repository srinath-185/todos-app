const express = require('express');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

// Define the database file path
const dbPath = path.join(__dirname, 'todolist.db');
let db = null;

// Initialize database
const initializeDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    await db.exec(`
        CREATE TABLE IF NOT EXISTS task_mst (
          task_id INTEGER PRIMARY KEY AUTOINCREMENT,
          task_name TEXT,
          task_title TEXT NOT NULL,
          task_description TEXT,
          is_completed INTEGER DEFAULT 0,
          is_deleted INTEGER DEFAULT 0,
          created_on DATETIME,
          updated_on DATETIME
        );
      `);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(`DB Error: ${error.message}`);
    process.exit(1); // Exit if DB initialization fails
  }
};

// Define task functions
const createTask = async (req, res) => {
  const { task_name, task_title, task_description } = req.body;
  console.log(req.body)
  if (!task_title || task_title.trim() === '') {
    return res.status(400).json({
      code: 400,
      status: false,
      data: 'Task title cannot be empty. Please enter a valid title.',
    });
  }

  const str_sql = `
    INSERT INTO task_mst (task_name, task_title, task_description, created_on)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
  `;

  try {
    await db.run(str_sql, [task_name, task_title, task_description]);
    res.status(200).json({
      code: 200,
      status: true,
      data: 'Task created successfully',
    });
  } catch (e) {
    res.status(500).json({
      code: 500,
      status: false,
      data: e,
    });
  }
};

const editTask = async (req, res) => {
  const { task_name, task_title, task_description, task_id } = req.body;

  if (!task_title || task_title.trim() === '') {
    return res.status(400).json({
      code: 400,
      status: false,
      data: 'Task title cannot be empty. Please enter a valid title.',
    });
  }

  const str_sql = `
    UPDATE task_mst
    SET task_name = ?, task_title = ?, task_description = ?, updated_on = CURRENT_TIMESTAMP
    WHERE task_id = ?
  `;

  try {
    await db.run(str_sql, [task_name, task_title, task_description, task_id]);
    res.status(200).json({
      code: 200,
      status: true,
      data: 'Task updated successfully',
    });
  } catch (e) {
    res.status(500).json({
      code: 500,
      status: false,
      data: e,
    });
  }
};

const viewTasks = async (req, res) => {
  const str_sql = 'SELECT * FROM task_mst WHERE is_deleted = 0';
  try {
    const tasks = await db.all(str_sql);
    console.log(tasks);
    res.status(200).json({
      code: 200,
      status: true,
      data: tasks.map(convertDBObjectToResponseObject),
    });
  } catch (e) {
    res.status(500).json({
      code: 500,
      status: false,
      data: e,
    });
  }
};

const markTaskCompleted = async (req, res) => {
  const { task_id } = req.body;

  const str_sql = 'UPDATE task_mst SET is_completed = 1 WHERE task_id = ?';

  try {
    const result = await db.run(str_sql, [task_id]);
    if (result.changes === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        data: 'Task not found.',
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      data: 'Task marked as completed successfully',
    });
  } catch (e) {
    res.status(500).json({
      code: 500,
      status: false,
      data: e,
    });
  }
};

const deleteTask = async (req, res) => {
  const { task_id } = req.body;

  const str_sql = 'UPDATE task_mst SET is_deleted = 1 WHERE task_id = ?';

  try {
    const result = await db.run(str_sql, [task_id]);
    if (result.changes === 0) {
      return res.status(404).json({
        code: 404,
        status: false,
        data: 'Task not found.',
      });
    }
    res.status(200).json({
      code: 200,
      status: true,
      data: 'Task deleted successfully',
    });
  } catch (e) {
    res.status(500).json({
      code: 500,
      status: false,
      data: e,
    });
  }
};

// Convert database object to response object
const convertDBObjectToResponseObject = (dbObject) => {
  return {
    task_id: dbObject.task_id,
    task_name: dbObject.task_name,
    task_title: dbObject.task_title,
    task_description: dbObject.task_description,
    is_completed: dbObject.is_completed === 0 ? 0 : 1,
    is_deleted: dbObject.is_deleted === 0 ? 0 : 1,
    created_on: dbObject.created_on,
    updated_on: dbObject.updated_on,
  };
};

// Define and export router with routes
const router = express.Router();

router.post("/createTask", createTask);          // Route to create a new task
router.put("/editTask", editTask);               // Route to edit a task
router.get("/viewTasks", viewTasks);             // Route to view all tasks
router.post("/markTaskCompleted", markTaskCompleted); // Mark task completed
router.delete("/deleteTask", deleteTask);        // Route to delete a task

module.exports = {
  initializeDB,
  router, // Export the router object
};
