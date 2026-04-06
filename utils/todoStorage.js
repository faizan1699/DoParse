const STORAGE_TYPE = typeof chrome !== 'undefined' && chrome.storage ? 'sync' : 'local';

const getStorage = () => {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    return chrome.storage.sync;
  }
  return null;
};

export const todoStorage = {
  getPassword() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('todo_password');
  },

  setPassword(password) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('todo_password', password);
  },

  async getTodos() {
    if (typeof window === 'undefined') return [];

    const password = this.getPassword();
    if (!password) return [];

    const storage = getStorage();
    if (storage) {
      return new Promise((resolve) => {
        storage.get([`todos_${password}`], (result) => {
          resolve(result[`todos_${password}`] || []);
        });
      });
    } else {
      const todos = localStorage.getItem(`todos_${password}`);
      return todos ? JSON.parse(todos) : [];
    }
  },

  async saveTodos(todos) {
    if (typeof window === 'undefined') return;

    const password = this.getPassword();
    if (!password) return;

    const storage = getStorage();
    if (storage) {
      return new Promise((resolve) => {
        storage.set({ [`todos_${password}`]: todos }, () => {
          resolve();
        });
      });
    } else {
      localStorage.setItem(`todos_${password}`, JSON.stringify(todos));
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
