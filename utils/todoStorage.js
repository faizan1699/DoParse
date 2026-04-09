const STORAGE_TYPE = typeof chrome !== 'undefined' && chrome.storage ? 'sync' : 'local';

const getStorage = () => {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    return chrome.storage.sync;
  }
  return null;
};

const hashPassword = async (password) => {
  if (!password) return '';
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const todoStorage = {
  getPasswordHash() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('todo_password_hash');
  },

  async setPassword(password) {
    if (typeof window === 'undefined') return;
    const hash = await hashPassword(password);
    localStorage.setItem('todo_password_hash', hash);
  },

  async getTodos() {
    if (typeof window === 'undefined') return [];

    const hash = this.getPasswordHash();
    if (!hash) return [];

    const storage = getStorage();
    if (storage) {
      return new Promise((resolve) => {
        const key = `todos_v2_${hash}`;
        storage.get([key], (result) => {
          resolve(result[key] || []);
        });
      });
    } else {
      const todos = localStorage.getItem(`todos_v2_${hash}`);
      return todos ? JSON.parse(todos) : [];
    }
  },

  async saveTodos(todos) {
    if (typeof window === 'undefined') return;

    const hash = this.getPasswordHash();
    if (!hash) return;

    const storage = getStorage();
    if (storage) {
      return new Promise((resolve) => {
        const key = `todos_v2_${hash}`;
        storage.set({ [key]: todos }, () => {
          resolve();
        });
      });
    } else {
      localStorage.setItem(`todos_v2_${hash}`, JSON.stringify(todos));
    }
  },

  async addTodo(todo) {
    const todos = await this.getTodos();
    const newTodo = {
      id: Date.now(),
      ...todo,
      completed: false
    };
    todos.push(newTodo);
    await this.saveTodos(todos);
    return newTodo;
  },

  async updateTodo(id, updates) {
    const todos = await this.getTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updates };
      await this.saveTodos(todos);
      return todos[index];
    }
    return null;
  },

  async deleteTodo(id) {
    const todos = await this.getTodos();
    const filteredTodos = todos.filter(todo => todo.id !== id);
    await this.saveTodos(filteredTodos);
    return filteredTodos;
  },

  async getTodo(id) {
    const todos = await this.getTodos();
    return todos.find(todo => todo.id === id) || null;
  }
};
