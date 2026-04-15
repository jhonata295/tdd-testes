import { toggleTask } from '../src/taskManager.js';
import { describe, it, expect, beforeEach } from 'vitest';

import {
  validateTitle,
  createTask,
  addTask,
  resetId,
} from '../src/taskManager.js';

// ============================================================
// 1. validateTitle
// ============================================================
describe('validateTitle', () => {
  it('deve retornar true para um título válido', () => {
    expect(validateTitle('Estudar Vitest')).toBe(true);
  });

  it('deve retornar true para título com exatamente 3 caracteres', () => {
    expect(validateTitle('abc')).toBe(true);
  });

  it('deve retornar false para string vazia', () => {
    expect(validateTitle('')).toBe(false);
  });

  it('deve retornar false para string com apenas espaços', () => {
    expect(validateTitle('   ')).toBe(false);
  });

  it('deve retornar false para título com menos de 3 caracteres', () => {
    expect(validateTitle('ab')).toBe(false);
  });

  it('deve retornar false para null', () => {
    expect(validateTitle(null)).toBe(false);
  });

  it('deve retornar false para undefined', () => {
    expect(validateTitle(undefined)).toBe(false);
  });

  it('deve retornar false para número', () => {
    expect(validateTitle(123)).toBe(false);
  });

  it('deve retornar false para booleano', () => {
    expect(validateTitle(true)).toBe(false);
  });

  it('deve retornar false para array', () => {
    expect(validateTitle(['tarefa'])).toBe(false);
  });

  it('deve considerar o título após trim', () => {
    expect(validateTitle('  abc  ')).toBe(true);
  });
});

// ============================================================
// 2. createTask
// ============================================================
describe('createTask', () => {
    beforeEach(() => {
      resetId();
    });
  
    it('deve criar uma tarefa com as propriedades corretas', () => {
      const task = createTask('Estudar TDD');
  
      expect(task).toHaveProperty('id');
      expect(task).toHaveProperty('title', 'Estudar TDD');
      expect(task).toHaveProperty('completed', false);
    });
  
    it('deve atribuir IDs incrementais', () => {
      const task1 = createTask('Tarefa 1');
      const task2 = createTask('Tarefa 2');
  
      expect(task2.id).toBe(task1.id + 1);
    });
  
    it('deve iniciar com completed = false', () => {
      const task = createTask('Nova tarefa');
  
      expect(task.completed).toBe(false);
    });
  
    it('deve fazer trim do título', () => {
      const task = createTask('  Título com espaços  ');
  
      expect(task.title).toBe('Título com espaços');
    });
  });

  // ============================================================
// 3. addTask
// ============================================================
describe('addTask', () => {
  beforeEach(() => {
    resetId();
  });

  it('deve adicionar uma tarefa a uma lista vazia', () => {
    const tasks = addTask([], 'Primeira tarefa');

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Primeira tarefa');
  });

  it('deve adicionar uma tarefa a uma lista existente', () => {
    let tasks = addTask([], 'Tarefa 1');
    tasks = addTask(tasks, 'Tarefa 2');

    expect(tasks).toHaveLength(2);
    expect(tasks[1].title).toBe('Tarefa 2');
  });

  it('deve retornar um NOVO array (imutabilidade)', () => {
    const original = [];
    const updated = addTask(original, 'Nova tarefa');

    expect(updated).not.toBe(original);
    expect(original).toHaveLength(0);
  });

  it('deve lançar erro para título vazio', () => {
    expect(() => addTask([], '')).toThrow('Título inválido');
  });

  it('deve lançar erro para título null', () => {
    expect(() => addTask([], null)).toThrow('Título inválido');
  });

  it('deve lançar erro para título undefined', () => {
    expect(() => addTask([], undefined)).toThrow('Título inválido');
  });

  it('deve lançar erro para título com menos de 3 caracteres', () => {
    expect(() => addTask([], 'ab')).toThrow('Título inválido');
  });

  it('deve lançar erro para título numérico', () => {
    expect(() => addTask([], 42)).toThrow('Título inválido');
  });
});

// ============================================================
// 4. toggleTask
// ============================================================

describe('toggleTask', () => {
    beforeEach(() => {
      resetId();
    });
  
    it('deve alternar completed de false para true', () => {
      let tasks = addTask([], 'Tarefa 1');
  
      const updated = toggleTask(tasks, 1);
  
      expect(updated[0].completed).toBe(true);
    });
  
    it('deve alternar completed de true para false', () => {
      let tasks = addTask([], 'Tarefa 1');
      tasks = toggleTask(tasks, 1);
  
      const updated = toggleTask(tasks, 1);
  
      expect(updated[0].completed).toBe(false);
    });
  
    it('deve retornar um NOVO array (imutabilidade)', () => {
      const tasks = addTask([], 'Tarefa 1');
  
      const updated = toggleTask(tasks, 1);
  
      expect(updated).not.toBe(tasks);
    });
  
    it('não deve alterar outras tarefas', () => {
      let tasks = addTask([], 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
  
      const updated = toggleTask(tasks, 1);
  
      expect(updated[0].completed).toBe(true);
      expect(updated[1].completed).toBe(false);
    });
  
    it('deve lançar erro se ID não existir', () => {
      const tasks = addTask([], 'Tarefa 1');
  
      expect(() => toggleTask(tasks, 999)).toThrow('Tarefa não encontrada');
    });
  });

  describe('toggleTask', () => {
    beforeEach(() => {
      resetId();
    });
  
    it('deve alternar completed de false para true', () => {
      let tasks = addTask([], 'Tarefa 1');
  
      tasks = toggleTask(tasks, 1);
  
      expect(tasks[0].completed).toBe(true);
    });
  
    it('deve alternar completed de true para false', () => {
      let tasks = addTask([], 'Tarefa 1');
      tasks = toggleTask(tasks, 1);
  
      tasks = toggleTask(tasks, 1);
  
      expect(tasks[0].completed).toBe(false);
    });
  
    it('deve manter outras tarefas inalteradas', () => {
      let tasks = addTask([], 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
  
      tasks = toggleTask(tasks, 1);
  
      expect(tasks[0].completed).toBe(true);
      expect(tasks[1].completed).toBe(false);
    });
  
    it('deve retornar um NOVO array (imutabilidade)', () => {
      const tasks = addTask([], 'Tarefa 1');
  
      const updated = toggleTask(tasks, 1);
  
      expect(updated).not.toBe(tasks);
    });
  
    it('deve lançar erro se o ID não existir', () => {
      const tasks = addTask([], 'Tarefa 1');
  
      expect(() => toggleTask(tasks, 999)).toThrow('Tarefa não encontrada');
    });
  });

  describe('removeTask', () => {
    beforeEach(() => {
      resetId();
    });
  
    it('deve remover uma tarefa pelo ID', () => {
      let tasks = addTask([], 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
  
      const updated = removeTask(tasks, 1);
  
      expect(updated).toHaveLength(1);
      expect(updated[0].id).toBe(2);
    });
  
    it('deve retornar um NOVO array (imutabilidade)', () => {
      const tasks = addTask([], 'Tarefa 1');
  
      const updated = removeTask(tasks, 1);
  
      expect(updated).not.toBe(tasks);
    });
  
    it('deve lançar erro se o ID não existir', () => {
      const tasks = addTask([], 'Tarefa 1');
  
      expect(() => removeTask(tasks, 999))
        .toThrow('Tarefa não encontrada');
    });
  
    it('deve remover apenas a tarefa correta', () => {
      let tasks = addTask([], 'Tarefa 1');
      tasks = addTask(tasks, 'Tarefa 2');
      tasks = addTask(tasks, 'Tarefa 3');
  
      const updated = removeTask(tasks, 2);
  
      expect(updated).toHaveLength(2);
      expect(updated.find(t => t.id === 2)).toBeUndefined();
    });
  });