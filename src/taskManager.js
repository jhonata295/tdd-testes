let currentId = 1;

// ============================================================
// validateTitle
// ============================================================
function validateTitle(title) {
  if (typeof title !== 'string') return false;

  const trimmed = title.trim();

  return trimmed.length >= 3;
}

// ============================================================
// createTask
// ============================================================
function createTask(title) {
  return {
    id: currentId++,
    title: title.trim(),
    completed: false,
  };
}

// ============================================================
// addTask
// ============================================================
function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido');
  }

  const newTask = createTask(title);

  return [...tasks, newTask];
}

// ============================================================
// toggleTask
// ============================================================
function toggleTask(tasks, id) {
  let found = false;

  const updatedTasks = tasks.map(task => {
    if (task.id === id) {
      found = true;
      return {
        ...task,
        completed: !task.completed,
      };
    }
    return task;
  });

  if (!found) {
    throw new Error('Tarefa não encontrada');
  }

  return updatedTasks;
}

// ============================================================
// removeTask
// ============================================================
function removeTask(tasks, id) {
  const exists = tasks.some(task => task.id === id);

  if (!exists) {
    throw new Error('Tarefa não encontrada');
  }

  return tasks.filter(task => task.id !== id);
}

// ============================================================
// getTasks
// ============================================================
function getTasks(tasks) {
  return [...tasks];
}

// ============================================================
// resetId (usado nos testes)
// ============================================================
function resetId() {
  currentId = 1;
}

// ============================================================
// EXPORTS
// ============================================================
module.exports = {
  validateTitle,
  createTask,
  addTask,
  toggleTask,
  removeTask,
  getTasks,
  resetId,
};