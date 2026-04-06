export const todoStorage = {
  getTodos() {
    if (typeof window === 'undefined') return []
    const todos = localStorage.getItem('todos')
    return todos ? JSON.parse(todos) : []
  },

  saveTodos(todos) {
    if (typeof window === 'undefined') return
    localStorage.setItem('todos', JSON.stringify(todos))
  },

  addTodo(todo) {
    const todos = this.getTodos()
    const newTodo = {
      id: Date.now(),
      ...todo,
      completed: false
    }
    todos.push(newTodo)
    this.saveTodos(todos)
    return newTodo
  },

  updateTodo(id, updates) {
    const todos = this.getTodos()
    const index = todos.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updates }
      this.saveTodos(todos)
      return todos[index]
    }
    return null
  },

  deleteTodo(id) {
    const todos = this.getTodos()
    const filteredTodos = todos.filter(todo => todo.id !== id)
    this.saveTodos(filteredTodos)
    return filteredTodos
  },

  getTodo(id) {
    const todos = this.getTodos()
    return todos.find(todo => todo.id === id) || null
  }
}
