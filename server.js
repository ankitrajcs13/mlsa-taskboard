const express = require("express");
const path = require("path");
const { getAllTasks, addTask, deleteTask, updateTaskStatus } = require("./src/tasks");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.json(getAllTasks());
});

// POST a new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Task title is." });
  }
  const task = addTask(title.trim());
  res.status(201).json(task);
});

// PATCH — update task status
app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = updateTaskStatus(id, status);
  if (!updated) {
    return res.status(404).json({ error: "Task not found." });
  }
  res.json(updated);
});

// DELETE a task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const deleted = deleteTask(id);
  if (!deleted) {
    return res.status(404).json({ error: "Task not found." });
  }
  res.json({ message: "Task deleted successfully." });
});

// Only start listening if this file is run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 MLSA TaskBoard running at http://localhost:${PORT}`);
  });
}

module.exports = app;