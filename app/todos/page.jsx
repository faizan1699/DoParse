'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import { todoStorage } from '../../utils/todoStorage'

export default function TodosPage() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const fetchTodos = useCallback(async () => {
    setIsLoading(true)
    const data = await todoStorage.getTodos()
    setTodos(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this todo?')) {
      await todoStorage.deleteTodo(id)
      await fetchTodos()
    }
  }

  const handleToggleComplete = async (id) => {
    const todo = await todoStorage.getTodo(id)
    if (todo) {
      await todoStorage.updateTodo(id, { completed: !todo.completed })
      await fetchTodos()
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Todos</h1>
            <Link
              href="/todos/create"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Create Todo
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No todos yet
              </h3>
              <p className="text-gray-500 mb-6">
                Create your first todo to get started
              </p>
              <Link
                href="/todos/create"
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors inline-block"
              >
                Create Your First Todo
              </Link>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden rounded-md">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {todos.map((todo) => (
                      <tr key={todo.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {todo.id}
                        </td>
                        <td className="px-4 py-3">
                          <div className={`text-sm font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                            {todo.title}
                          </div>
                          <div className={`sm:hidden text-xs mt-1 ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                            {todo.description || 'No description'}
                          </div>
                        </td>
                        <td className="hidden sm:table-cell px-4 py-3">
                          <div className={`text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                            {todo.description || '-'}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${todo.completed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {todo.completed ? 'Complete' : 'Incomplete'}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Link
                              href={`/todos/edit/${todo.id}`}
                              className="text-green-600 hover:text-green-900 transition-colors inline-flex items-center gap-1 text-xs"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              <span className="sm:hidden">Edit</span>
                            </Link>
                            <button
                              onClick={() => handleToggleComplete(todo.id)}
                              className={`${todo.completed
                                  ? 'text-yellow-600 hover:text-yellow-900'
                                  : 'text-green-600 hover:text-green-900'
                                } transition-colors inline-flex items-center gap-1 text-xs`}
                            >
                              {todo.completed ? (
                                <>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="sm:hidden">Incomplete</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="sm:hidden">Complete</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleDelete(todo.id)}
                              className="text-red-600 hover:text-red-900 transition-colors inline-flex items-center gap-1 text-xs"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span className="sm:hidden">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
