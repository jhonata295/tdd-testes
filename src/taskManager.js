let _nextId = 1;

export function resetId() {
  _nextId = 1;
}

// ============================================================
// taskManager.js
// ============================================================

export function validateTitle(title) {
    if (typeof title !== 'string') {
      return false;
    }
  
    const trimmed = title.trim();
    return trimmed.length >= 3;
  }

  // ------------------------------------------------------------
// Criação
// ------------------------------------------------------------

export function createTask(title) {
    return {
      id: _nextId++,
      title: title.trim(),
      completed: false,
    };
  }

  // ------------------------------------------------------------
// Adição com validação
// ------------------------------------------------------------

export function addTask(tasks, title) {
    if (!validateTitle(title)) {
      throw new Error('Título inválido');
    }
  
    const newTask = createTask(title);
    return [...tasks, newTask];
  }

  export function toggleTask(tasks, id) {
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