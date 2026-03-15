/**
 * tasks.js
 * Core business logic for the TaskBoard app.
 * This is what gets tested in the CI pipeline.
 * MLSA CI/CD Demo by Ankit
 */

let tasks = [];
let nextId = 1;

function getAllTasks() {
  return tasks;
}

function addTask(title) {
  const task = {
    id: String(nextId++),
    title,
    status: "todo",
    createdAt: new Date().toISOString()
  };
  tasks.push(task);
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const deleted = tasks.splice(index, 1);
  return deleted[0];
}

function updateTaskStatus(id, status) {
  const validStatuses = ["todo", "in-progress", "done"];
  if (!validStatuses.includes(status)) return null;
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  task.status = status;
  return task;
}

// Reset for testing purposes
function resetTasks() {
  tasks = [];
  nextId = 1;
}

module.exports = { getAllTasks, addTask, deleteTask, updateTaskStatus, resetTasks };